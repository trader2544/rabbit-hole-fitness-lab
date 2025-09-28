import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, DollarSign, Users, Award, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logActivity, sendNotification } from "@/components/activity/ActivityLogger";
import { useIsMobile } from "@/hooks/use-mobile";

const trainers = [
  {
    id: 1,
    name: "Marcus Thompson",
    specialty: "Strength & Conditioning",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Former collegiate athlete specializing in Olympic lifts and athletic performance.",
    certifications: ["CSCS", "USAW", "FMS"],
    availability: "Mon-Fri 6AM-8PM"
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "Calisthenics & Flexibility",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 75,
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Yoga instructor turned calisthenics coach with expertise in bodyweight progressions.",
    certifications: ["RYT-500", "PCC", "MovNat"],
    availability: "Tue-Sat 7AM-6PM"
  },
  {
    id: 3,
    name: "David Rodriguez",
    specialty: "Nutrition & Body Composition",
    location: "Austin, TX",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 95,
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Registered dietitian and certified trainer specializing in physique transformation.",
    certifications: ["RD", "NASM-CPT", "PN1"],
    availability: "Mon-Sun 5AM-9PM"
  },
  {
    id: 4,
    name: "Emma Wilson",
    specialty: "Rehabilitation & Mobility",
    location: "Seattle, WA",
    rating: 4.7,
    reviews: 73,
    hourlyRate: 90,
    experience: "7 years",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Physical therapist and movement specialist focusing on injury prevention.",
    certifications: ["DPT", "SFMA", "Graston"],
    availability: "Mon-Fri 8AM-5PM"
  }
];

const Trainers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [isBooking, setIsBooking] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const trainer = trainers.find(t => t.id === parseInt(id));
      setSelectedTrainer(trainer);
    }
  }, [id]);

  const handleBookSession = async (trainer: any) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setIsBooking(true);
    try {
      // Note: Bookings table not yet implemented - just log activity
      await logActivity(
        user.id,
        'booking_created',
        `Attempted to book session with ${trainer.name}`,
        { trainer_name: trainer.name, session_type: 'Online Session', cost: trainer.hourlyRate }
      );

      // Send notification to user
      const sessionDate = new Date();
      sessionDate.setDate(sessionDate.getDate() + 3);
      
      await sendNotification(
        user.id,
        'Booking Request',
        `Your booking request for ${trainer.name} has been received. This is a demo - bookings table not yet implemented.`,
        'info'
      );

      toast({
        title: "Booking Request Received!",
        description: `Your booking request for ${trainer.name} has been received. This is a demo feature.`,
      });
      navigate('/profile?tab=bookings');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book session.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (selectedTrainer) {
    return (
      <div className="min-h-screen bg-white">
        {/* Trainer Detail View */}
        <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => navigate("/trainers")}
                className={`${isMobile ? 'mb-4 text-xs h-8' : 'mb-8'} border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none`}
              >
                ← Back to Trainers
              </Button>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'lg:grid-cols-2 gap-12'}`}>
                <div>
                  <img 
                    src={selectedTrainer.image} 
                    alt={selectedTrainer.name}
                    className={`w-full ${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]'} object-cover ${isMobile ? 'mb-3' : 'mb-6'}`}
                  />
                  
                  <div className={`space-y-${isMobile ? '2' : '4'}`}>
                    <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
                      <div className="flex items-center">
                        <Star className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-yellow-500 fill-current mr-1`} />
                        <span className={`${isMobile ? 'text-sm' : ''} font-semibold`}>{selectedTrainer.rating}</span>
                        <span className={`text-gray-500 ml-1 ${isMobile ? 'text-xs' : ''}`}>({selectedTrainer.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline" className={`rounded-none ${isMobile ? 'text-xs' : ''}`}>{selectedTrainer.experience}</Badge>
                    </div>
                    
                    <div className={`flex items-center text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
                      <MapPin className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
                      {selectedTrainer.location}
                    </div>
                    
                    <div className={`flex items-center text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
                      <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
                      {selectedTrainer.availability}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-light ${isMobile ? 'mb-1' : 'mb-2'}`}>{selectedTrainer.name}</h1>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 ${isMobile ? 'mb-3' : 'mb-6'}`}>{selectedTrainer.specialty}</p>
                  
                  <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-6'} ${isMobile ? 'mb-3' : 'mb-6'}`}>
                    <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
                      <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold`}>${selectedTrainer.hourlyRate}/hour</span>
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>Starting rate</span>
                    </div>
                    
                    <div className={`space-y-${isMobile ? '2' : '3'} ${isMobile ? 'mb-3' : 'mb-6'}`}>
                      <Button
                        onClick={() => handleBookSession(selectedTrainer)}
                        disabled={isBooking}
                        className={`w-full bg-black text-white hover:bg-gray-800 rounded-none ${isMobile ? 'py-2 text-sm' : 'py-3'}`}
                      >
                        <Calendar className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        {isBooking ? 'Booking...' : 'Book Session (mock)'}
                      </Button>
                      <Button variant="outline" className={`w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none ${isMobile ? 'py-2 text-sm' : 'py-3'}`}>
                        <MessageSquare className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        Send Message
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`space-y-${isMobile ? '3' : '6'}`}>
                    <div>
                      <h3 className={`font-semibold ${isMobile ? 'mb-2 text-sm' : 'mb-3'}`}>About</h3>
                      <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>{selectedTrainer.description}</p>
                    </div>
                    
                    <div>
                      <h3 className={`font-semibold ${isMobile ? 'mb-2 text-sm' : 'mb-3'}`}>Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTrainer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className={`rounded-none ${isMobile ? 'text-xs' : ''}`}>{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center bg-gray-100 rounded-full ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-8'}`}>
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Elite Personal Training
            </div>
            
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-light ${isMobile ? 'mb-3' : 'mb-6'} text-gray-900 leading-tight`}>
              Train with the
              <br />
              <span className="font-semibold">Best in the Industry</span>
            </h1>
            
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} text-gray-600 ${isMobile ? 'mb-6' : 'mb-12'} max-w-2xl mx-auto leading-relaxed`}>
              {isMobile ? 'Connect with certified trainers for your goals' : 'Connect with certified personal trainers who specialize in your goals. From strength building to rehabilitation, find your perfect fitness mentor.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className={`${isMobile ? 'pb-12' : 'pb-24'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
              <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                Our Expert Trainers
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600`}>
                {isMobile ? 'Certified, experienced, committed to your success' : 'Each trainer is certified, experienced, and committed to your success'}
              </p>
            </div>

            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-2 gap-6'}`}>
              {trainers.map((trainer) => (
                <Card key={trainer.id} className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/trainers/book/${trainer.id}`)}>
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                    <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3] md:aspect-auto'} overflow-hidden`}>
                      <img 
                        src={trainer.image} 
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className={`${isMobile ? 'p-3' : 'p-6'}`}>
                      <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-3'}`}>
                        <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>{trainer.name}</h3>
                        <div className="flex items-center">
                          <Star className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-yellow-500 fill-current mr-1`} />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{trainer.rating}</span>
                        </div>
                      </div>
                      
                      <p className={`text-gray-600 ${isMobile ? 'mb-2 text-sm' : 'mb-3'}`}>{trainer.specialty}</p>
                      
                      <div className={`space-y-${isMobile ? '1' : '2'} ${isMobile ? 'mb-3' : 'mb-4'}`}>
                        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                          <MapPin className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3'} mr-2`} />
                          {trainer.location}
                        </div>
                        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                          <DollarSign className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3'} mr-2`} />
                          ${trainer.hourlyRate}/hour
                        </div>
                        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                          <Users className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3'} mr-2`} />
                          {trainer.reviews} reviews
                        </div>
                      </div>
                      
                      <Button className={`w-full bg-black text-white hover:bg-gray-800 rounded-none ${isMobile ? 'text-xs h-8' : 'text-sm'}`}>
                        View Profile
                        <ArrowRight className={`ml-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-4' : 'mb-8'}`}>
              Why Choose Our Trainers
            </h2>
            
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-8'}`}>
              <div className="text-center">
                <Award className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Certified Professionals</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>All trainers hold industry-recognized certifications</p>
              </div>
              <div className="text-center">
                <Users className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Proven Track Record</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Hundreds of successful client transformations</p>
              </div>
              <div className="text-center">
                <MessageSquare className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Ongoing Support</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>24/7 communication and progress tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainers;
