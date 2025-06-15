
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, Users, Video, Star, Activity, Package, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Schedule {
  id: string;
  title: string;
  description: string | null;
  schedule_type: string;
  date: string;
  time: string;
  duration: number;
  max_participants: number;
  current_participants: number;
  meeting_link: string | null;
  location: string | null;
  status: string;
}

interface Subscription {
  id: string;
  plan_name: string;
  plan_price: number;
  status: string;
  start_date: string;
  end_date: string | null;
}

interface UserBooking {
  id: string;
  schedule_id: string;
  status: string;
  created_at: string;
  admin_schedules: Schedule;
}

const PremiumDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (!error && data) {
      setSubscription(data);
    }
  };

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('admin_schedules')
      .select('*')
      .eq('status', 'scheduled')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data || []);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('schedule_bookings')
      .select(`
        *,
        admin_schedules(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user bookings:', error);
    } else {
      setUserBookings(data || []);
    }
  };

  const bookSchedule = async (scheduleId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('schedule_bookings')
      .insert({
        schedule_id: scheduleId,
        user_id: user.id
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      // Update participant count
      const schedule = schedules.find(s => s.id === scheduleId);
      if (schedule) {
        await supabase
          .from('admin_schedules')
          .update({ current_participants: schedule.current_participants + 1 })
          .eq('id', scheduleId);
      }

      toast({
        title: "Success",
        description: "Successfully booked the schedule!"
      });
      fetchSchedules();
      fetchUserBookings();
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([
        checkSubscription(),
        fetchSchedules(),
        fetchUserBookings()
      ]).finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="border border-gray-200">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Please log in to access the premium dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="border border-gray-200">
          <CardContent className="p-8 text-center">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Premium Access Required</h2>
            <p className="text-gray-600 mb-4">
              You need an active subscription to access the premium dashboard.
            </p>
            <Button className="rounded-none bg-gray-900 hover:bg-gray-800">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'default';
      case 'call': return 'secondary';
      case 'checkup': return 'outline';
      case 'consultation': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'default';
      case 'attended': return 'secondary';
      case 'missed': return 'destructive';
      case 'cancelled': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-light text-gray-900">Premium Dashboard</h1>
          </div>

          {/* Subscription Status */}
          <Card className="border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Your Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-semibold">{subscription.plan_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold">${subscription.plan_price}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge variant="default" className="capitalize">{subscription.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="schedules" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 rounded-none">
              <TabsTrigger value="schedules" className="rounded-none">
                <Calendar className="mr-2 h-4 w-4" />Schedules
              </TabsTrigger>
              <TabsTrigger value="bookings" className="rounded-none">
                <Activity className="mr-2 h-4 w-4" />My Bookings
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-none">
                <FileText className="mr-2 h-4 w-4" />Resources
              </TabsTrigger>
              <TabsTrigger value="shop" className="rounded-none">
                <Package className="mr-2 h-4 w-4" />Shop Access
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedules">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Available Schedules</CardTitle>
                </CardHeader>
                <CardContent>
                  {schedules.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No schedules available at the moment.</p>
                  ) : (
                    <div className="grid gap-4">
                      {schedules.map((schedule) => {
                        const isBooked = userBookings.some(b => b.schedule_id === schedule.id);
                        const isFull = schedule.current_participants >= schedule.max_participants;
                        
                        return (
                          <Card key={schedule.id} className="border border-gray-100">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">{schedule.title}</h3>
                                    <Badge variant={getTypeColor(schedule.schedule_type)} className="capitalize">
                                      {schedule.schedule_type}
                                    </Badge>
                                  </div>
                                  {schedule.description && (
                                    <p className="text-gray-600 mb-3">{schedule.description}</p>
                                  )}
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(schedule.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {schedule.time} ({schedule.duration} min)
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {schedule.current_participants}/{schedule.max_participants}
                                    </div>
                                    {schedule.meeting_link && (
                                      <div className="flex items-center gap-1">
                                        <Video className="h-4 w-4" />
                                        Online
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  {isBooked ? (
                                    <Badge variant="secondary">Booked</Badge>
                                  ) : isFull ? (
                                    <Badge variant="destructive">Full</Badge>
                                  ) : (
                                    <Button 
                                      size="sm" 
                                      onClick={() => bookSchedule(schedule.id)}
                                      className="rounded-none bg-gray-900 hover:bg-gray-800"
                                    >
                                      Book Now
                                    </Button>
                                  )}
                                  {schedule.meeting_link && isBooked && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => window.open(schedule.meeting_link!, '_blank')}
                                      className="rounded-none border-gray-200"
                                    >
                                      <Video className="h-4 w-4 mr-1" />
                                      Join
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {userBookings.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No bookings yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map((booking) => (
                        <Card key={booking.id} className="border border-gray-100">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">{booking.admin_schedules.title}</h3>
                                  <Badge variant={getTypeColor(booking.admin_schedules.schedule_type)} className="capitalize">
                                    {booking.admin_schedules.schedule_type}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(booking.admin_schedules.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {booking.admin_schedules.time}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={getStatusColor(booking.status)} className="capitalize">
                                  {booking.status}
                                </Badge>
                                {booking.admin_schedules.meeting_link && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => window.open(booking.admin_schedules.meeting_link!, '_blank')}
                                    className="rounded-none border-gray-200"
                                  >
                                    <Video className="h-4 w-4 mr-1" />
                                    Join
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Premium Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access exclusive fitness guides, meal plans, and workout routines designed specifically for premium members.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border border-gray-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Advanced Workout Plans</h4>
                        <p className="text-sm text-gray-600">Customized training programs</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-gray-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Nutrition Guides</h4>
                        <p className="text-sm text-gray-600">Detailed meal planning resources</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-gray-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Video Tutorials</h4>
                        <p className="text-sm text-gray-600">Exclusive training videos</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shop">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Premium Shop Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Enjoy exclusive discounts and early access to new products in our shop.
                  </p>
                  <div className="flex gap-4">
                    <Badge variant="default" className="text-sm">20% Off All Supplements</Badge>
                    <Badge variant="secondary" className="text-sm">Early Access to New Products</Badge>
                    <Badge variant="outline" className="text-sm">Free Shipping</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PremiumDashboard;
