
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";

const trainersData = [
  {
    id: "1",
    name: "Patrick Kamande",
    location: "Nairobi",
    specialties: ["Calisthenics", "Strength Training"],
    rating: 4.9,
    onlineRate: 25,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    achievement: "5+ years, 200+ transformations"
  },
  {
    id: "2", 
    name: "Dennis Kabiru",
    location: "Kiambu",
    specialties: ["Powerlifting", "Muscle Building"],
    rating: 4.8,
    onlineRate: 30,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    achievement: "National Champion, 7+ years"
  }
];

const TrainersPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Elite Personal Trainers
          </h2>
          <p className="text-lg text-gray-600">
            Train with Kenya's most accomplished fitness professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
          {trainersData.map((trainer) => (
            <div key={trainer.id} className="bg-white p-8 group">
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{trainer.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{trainer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{trainer.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{trainer.achievement}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-gray-100 text-gray-600">
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Online sessions from ${trainer.onlineRate}/hour</p>
              </div>

              <Button 
                onClick={() => navigate(`/trainers/book/${trainer.id}`)}
                variant="outline"
                className="w-full border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black rounded-none group-hover:border-black group-hover:text-black transition-colors"
              >
                Book Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate("/trainers")}
            className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6"
          >
            View All Trainers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainersPreview;
