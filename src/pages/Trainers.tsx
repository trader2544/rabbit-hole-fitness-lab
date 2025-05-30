
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, DollarSign, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrainerCard from "@/components/trainers/TrainerCard";

const allTrainers = [
  {
    id: "1",
    name: "Patrick Kamande",
    location: "Nairobi",
    specialties: ["Calisthenics", "Strength Training", "Weight Loss"],
    achievements: [
      "Certified Personal Trainer (NASM)",
      "5+ years transforming 200+ clients",
      "Calisthenics competition winner 2023",
      "Featured in Fitness Kenya Magazine"
    ],
    experience: "5+ years",
    rating: 4.9,
    onlineRate: 15,
    physicalRate: 25,
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
      "Trained 50+ athletes to competition level",
      "Olympic lifting certified"
    ],
    experience: "7+ years",
    rating: 4.8,
    onlineRate: 20,
    physicalRate: 30,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Expert in strength development and muscle building. Proven track record in preparing athletes for competitions and helping clients achieve their physique goals.",
    availability: "Tue-Sat: 5AM-7PM, Sun: 9AM-2PM"
  },
  {
    id: "3",
    name: "Mohamed Hassan",
    location: "Mombasa",
    specialties: ["Functional Fitness", "HIIT", "Beach Body Training"],
    achievements: [
      "Certified CrossFit Level 2 Trainer",
      "Marine Corps fitness background",
      "300+ successful transformations",
      "Functional movement specialist"
    ],
    experience: "6+ years",
    rating: 4.9,
    onlineRate: 18,
    physicalRate: 28,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Coastal fitness expert specializing in high-intensity functional training. Perfect for those looking to build endurance and achieve a beach-ready physique.",
    availability: "Mon-Sat: 5:30AM-7:30PM, Sun: 8AM-3PM"
  },
  {
    id: "4",
    name: "Daniel Sugoi",
    location: "Kisumu",
    specialties: ["Running Performance", "Endurance Training", "Marathon Prep"],
    achievements: [
      "Former professional marathon runner",
      "Sub 2:20 marathon personal best",
      "Coached 15+ athletes to Boston qualifying times",
      "Certified Running Coach (USATF)"
    ],
    experience: "8+ years",
    rating: 4.7,
    onlineRate: 16,
    physicalRate: 24,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Elite running coach with professional racing background. Specializes in helping runners of all levels improve their performance and achieve personal bests.",
    availability: "Daily: 5AM-7AM, 4PM-7PM (flexible for runners)"
  }
];

const Trainers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const handleBookOnline = (trainerId: string) => {
    navigate(`/trainers/book/${trainerId}?type=online`);
  };

  const handleBookPhysical = (trainerId: string) => {
    navigate(`/trainers/book/${trainerId}?type=physical`);
  };

  const filteredTrainers = allTrainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesLocation = selectedLocation === "all" || trainer.location === selectedLocation;
    const matchesSpecialty = selectedSpecialty === "all" || 
                            trainer.specialties.some(specialty => specialty === selectedSpecialty);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const locations = ["all", ...new Set(allTrainers.map(trainer => trainer.location))];
  const specialties = ["all", ...new Set(allTrainers.flatMap(trainer => trainer.specialties))];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Elite Personal Training
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
              Find Your Perfect 
              <br />
              <span className="font-semibold">Personal Trainer</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with certified fitness professionals across Kenya for personalized training sessions at affordable rates.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search trainers or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 rounded-none"
              />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48 border-gray-200 rounded-none">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48 border-gray-200 rounded-none">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTrainers.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onBookOnline={handleBookOnline}
                onBookPhysical={handleBookPhysical}
              />
            ))}
          </div>
          
          {filteredTrainers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No trainers found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("all");
                  setSelectedSpecialty("all");
                }}
                className="mt-4 border-gray-200 rounded-none"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Trainers;
