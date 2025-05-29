
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Star, MapPin } from "lucide-react";
import TrainerCard from "./TrainerCard";

const trainersData = [
  {
    id: "1",
    name: "Patrick Kamande",
    location: "Nairobi",
    specialties: ["Calisthenics", "Strength Training", "Weight Loss"],
    achievements: [
      "Certified Personal Trainer (NASM)",
      "5+ years transforming 200+ clients",
      "Calisthenics competition winner 2023"
    ],
    experience: "5+ years",
    rating: 4.9,
    onlineRate: 25,
    physicalRate: 40,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Specializing in bodyweight training and functional fitness. Helping clients build strength and confidence through progressive calisthenics.",
    availability: "Mon-Fri: 6AM-8PM, Sat: 8AM-4PM"
  },
  {
    id: "2",
    name: "Dennis Kabiru",
    location: "Kiambu",
    specialties: ["Powerlifting", "Muscle Building", "Sports Performance"],
    achievements: [
      "National Powerlifting Champion",
      "Certified Strength & Conditioning Coach",
      "Trained 50+ athletes to competition level"
    ],
    experience: "7+ years",
    rating: 4.8,
    onlineRate: 30,
    physicalRate: 45,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Expert in strength development and muscle building. Proven track record in preparing athletes for competitions and helping clients achieve their physique goals.",
    availability: "Tue-Sat: 5AM-7PM, Sun: 9AM-2PM"
  }
];

const TrainersPreview = () => {
  const navigate = useNavigate();

  const handleBookOnline = (trainerId: string) => {
    navigate(`/trainers/book/${trainerId}?type=online`);
  };

  const handleBookPhysical = (trainerId: string) => {
    navigate(`/trainers/book/${trainerId}?type=physical`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Train with Expert Personal Trainers
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-100">
            Get personalized guidance from certified trainers across Kenya. Choose online consultations or in-person sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {trainersData.map((trainer, index) => (
            <div key={trainer.id} className={`opacity-0 animate-fade-in animate-delay-${(index + 2) * 100}`}>
              <TrainerCard
                trainer={trainer}
                onBookOnline={handleBookOnline}
                onBookPhysical={handleBookPhysical}
              />
            </div>
          ))}
        </div>

        <div className="text-center opacity-0 animate-fade-in animate-delay-400">
          <Button 
            variant="default" 
            size="lg" 
            onClick={() => navigate("/trainers")}
            className="font-medium"
          >
            View All Trainers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainersPreview;
