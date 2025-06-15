
-- Create blogs table for admin content management
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  category TEXT NOT NULL,
  tags TEXT[],
  slug TEXT UNIQUE NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin schedules table for premium user meetings
CREATE TABLE public.admin_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('meeting', 'call', 'checkup', 'consultation')),
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  max_participants INTEGER DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  meeting_link TEXT,
  location TEXT,
  is_premium_only BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create schedule bookings table for user registrations
CREATE TABLE public.schedule_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES admin_schedules(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'missed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(schedule_id, user_id)
);

-- Enable RLS on new tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for blogs (public read, admin write)
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can manage all blogs" 
ON public.blogs FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- RLS policies for admin_schedules
CREATE POLICY "Premium users can view schedules" 
ON public.admin_schedules FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions 
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Admins can manage schedules" 
ON public.admin_schedules FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- RLS policies for schedule_bookings
CREATE POLICY "Users can view their own schedule bookings" 
ON public.schedule_bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can book schedules" 
ON public.schedule_bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.schedule_bookings FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all schedule bookings" 
ON public.schedule_bookings FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Add triggers for activity logging
CREATE TRIGGER trigger_log_blog_activity
  AFTER INSERT OR UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION log_user_activity();

CREATE TRIGGER trigger_log_schedule_activity
  AFTER INSERT OR UPDATE ON admin_schedules
  FOR EACH ROW EXECUTE FUNCTION log_user_activity();

CREATE TRIGGER trigger_log_schedule_booking_activity
  AFTER INSERT OR UPDATE ON schedule_bookings
  FOR EACH ROW EXECUTE FUNCTION log_user_activity();
