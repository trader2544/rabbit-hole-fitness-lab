
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: string;
  image: string;
  description: string;
  certifications: string[];
  availability: string;
}

const TrainersManagement = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: "1",
      name: "Patrick Kamande",
      specialty: "Calisthenics & Strength Training",
      location: "Nairobi",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 25,
      experience: "5+ years",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Specialized in calisthenics and functional movement patterns",
      certifications: ["NASM-CPT", "Calisthenics Level 3"],
      availability: "Mon-Fri 6AM-8PM"
    },
    {
      id: "2", 
      name: "Dennis Kabiru",
      specialty: "Powerlifting & Muscle Building",
      location: "Kiambu",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 30,
      experience: "7+ years",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "National powerlifting champion with expertise in strength building",
      certifications: ["CSCS", "Powerlifting Coach"],
      availability: "Tue-Sat 7AM-6PM"
    }
  ]);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Trainer>>({});
  const { toast } = useToast();

  const handleEdit = (trainer: Trainer) => {
    setIsEditing(trainer.id);
    setEditForm({
      ...trainer,
      certifications: trainer.certifications
    });
  };

  const handleSave = () => {
    if (isAdding) {
      const newTrainer: Trainer = {
        id: Date.now().toString(),
        name: editForm.name || "",
        specialty: editForm.specialty || "",
        location: editForm.location || "",
        rating: editForm.rating || 4.5,
        reviews: editForm.reviews || 0,
        hourlyRate: editForm.hourlyRate || 25,
        experience: editForm.experience || "",
        image: editForm.image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        description: editForm.description || "",
        certifications: editForm.certifications || [],
        availability: editForm.availability || ""
      };
      setTrainers([...trainers, newTrainer]);
      setIsAdding(false);
      toast({
        title: "Success",
        description: "Trainer added successfully",
      });
    } else if (isEditing) {
      setTrainers(trainers.map(t => 
        t.id === isEditing ? { ...t, ...editForm } as Trainer : t
      ));
      setIsEditing(null);
      toast({
        title: "Success",
        description: "Trainer updated successfully",
      });
    }
    setEditForm({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({});
  };

  const handleDelete = (trainerId: string) => {
    setTrainers(trainers.filter(t => t.id !== trainerId));
    toast({
      title: "Success",
      description: "Trainer deleted successfully",
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditForm({
      name: "",
      specialty: "",
      location: "",
      rating: 4.5,
      reviews: 0,
      hourlyRate: 25,
      experience: "",
      image: "",
      description: "",
      certifications: [],
      availability: ""
    });
  };

  const isFormDisabled = Boolean(isAdding || isEditing);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Trainers Management</h2>
        <Button onClick={handleAddNew} disabled={isFormDisabled}>
          <Plus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Trainer" : "Edit Trainer"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  value={editForm.specialty || ""}
                  onChange={(e) => setEditForm({...editForm, specialty: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editForm.location || ""}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={editForm.experience || ""}
                  onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={editForm.hourlyRate || ""}
                  onChange={(e) => setEditForm({...editForm, hourlyRate: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={editForm.rating || ""}
                  onChange={(e) => setEditForm({...editForm, rating: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={editForm.image || ""}
                onChange={(e) => setEditForm({...editForm, image: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description || ""}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={editForm.availability || ""}
                onChange={(e) => setEditForm({...editForm, availability: e.target.value})}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {trainers.map((trainer) => (
          <Card key={trainer.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{trainer.name}</h3>
                      <p className="text-gray-600">{trainer.specialty}</p>
                      <p className="text-sm text-gray-500">
                        {trainer.location} • {trainer.experience} • ${trainer.hourlyRate}/hr
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{trainer.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(trainer)}
                        disabled={isFormDisabled}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(trainer.id)}
                        disabled={isFormDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainersManagement;
