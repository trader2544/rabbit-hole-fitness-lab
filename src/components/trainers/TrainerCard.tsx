
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, DollarSign } from "lucide-react";

interface TrainerCardProps {
  trainer: {
    id: string;
    name: string;
    location: string;
    specialties: string[];
    achievements: string[];
    experience: string;
    rating: number;
    onlineRate: number;
    physicalRate: number;
    image: string;
    bio: string;
    availability: string;
  };
  onBookOnline: (trainerId: string) => void;
  onBookPhysical: (trainerId: string) => void;
}

const TrainerCard = ({ trainer, onBookOnline, onBookPhysical }: TrainerCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img 
            src={trainer.image} 
            alt={trainer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <CardTitle className="text-xl">{trainer.name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {trainer.location}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{trainer.rating}</span>
              <span className="text-sm text-muted-foreground">({trainer.experience})</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{trainer.bio}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-1">
              {trainer.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Key Achievements</h4>
            <ul className="text-sm space-y-1">
              {trainer.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Availability</span>
            </div>
            <p className="text-sm text-muted-foreground">{trainer.availability}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="w-full grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">${trainer.onlineRate}/hr</span>
            </div>
            <p className="text-xs text-muted-foreground">Online Session</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">${trainer.physicalRate}/hr</span>
            </div>
            <p className="text-xs text-muted-foreground">In-Person Session</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onBookOnline(trainer.id)}
            className="text-xs"
          >
            Book Online
          </Button>
          <Button 
            size="sm" 
            onClick={() => onBookPhysical(trainer.id)}
            className="text-xs"
          >
            Book In-Person
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;
