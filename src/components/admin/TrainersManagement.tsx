
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, Save, X, Upload } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  hourly_rate: number;
  experience: string;
  image_url: string;
  description: string;
  certifications: string[];
  availability: string;
  created_at?: string;
  updated_at?: string;
}

const TrainersManagement = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Trainer>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTrainers(data || []);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (trainer: Trainer) => {
    setIsEditing(trainer.id);
    setEditForm({
      ...trainer,
      certifications: trainer.certifications
    });
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!editForm.name || !editForm.specialty || !editForm.location || !editForm.experience) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    let imageUrl = editForm.image_url || "";

    // Upload image if file is selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('trainer-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast({ title: "Image Upload Error", description: uploadError.message, variant: "destructive" });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('trainer-images')
        .getPublicUrl(filePath);
      
      imageUrl = publicUrl;
    }

    if (isAdding) {
      const { error: insertError } = await supabase
        .from('trainers')
        .insert([{
          name: editForm.name,
          specialty: editForm.specialty,
          location: editForm.location,
          rating: editForm.rating || 4.5,
          reviews: editForm.reviews || 0,
          hourly_rate: editForm.hourly_rate || 25,
          experience: editForm.experience,
          image_url: imageUrl,
          description: editForm.description || "",
          certifications: editForm.certifications || [],
          availability: editForm.availability || "Available"
        }]);

      if (insertError) {
        toast({ title: "Error", description: insertError.message, variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Trainer added successfully!" });
      setIsAdding(false);
    } else if (isEditing) {
      const updateData: any = {
        name: editForm.name,
        specialty: editForm.specialty,
        location: editForm.location,
        rating: editForm.rating,
        reviews: editForm.reviews,
        hourly_rate: editForm.hourly_rate,
        experience: editForm.experience,
        description: editForm.description,
        certifications: editForm.certifications,
        availability: editForm.availability
      };

      if (imageUrl) {
        updateData.image_url = imageUrl;
      }

      const { error: updateError } = await supabase
        .from('trainers')
        .update(updateData)
        .eq('id', isEditing);

      if (updateError) {
        toast({ title: "Error", description: updateError.message, variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Trainer updated successfully!" });
      setIsEditing(null);
    }

    setEditForm({});
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchTrainers();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({});
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (trainer: Trainer) => {
    if (!confirm("Are you sure you want to delete this trainer? This action cannot be undone.")) {
      return;
    }

    // Delete image from storage if exists
    if (trainer.image_url) {
      try {
        const url = new URL(trainer.image_url);
        const path = url.pathname.split('/trainer-images/')[1];
        if (path) {
          await supabase.storage.from('trainer-images').remove([path]);
        }
      } catch (e) {
        console.error("Error parsing or deleting image from storage", e);
      }
    }

    const { error } = await supabase
      .from('trainers')
      .delete()
      .eq('id', trainer.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Trainer deleted successfully!" });
      fetchTrainers();
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditForm({
      name: "",
      specialty: "",
      location: "",
      rating: 4.5,
      reviews: 0,
      hourly_rate: 25,
      experience: "",
      image_url: "",
      description: "",
      certifications: [],
      availability: "Available"
    });
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
                  value={editForm.hourly_rate || ""}
                  onChange={(e) => setEditForm({...editForm, hourly_rate: parseInt(e.target.value)})}
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
              <Label htmlFor="image">Trainer Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </div>
              {imageFile && <p className="text-sm text-gray-500 mt-2">Selected: {imageFile.name}</p>}
              {editForm.image_url && !imageFile && (
                <div className="mt-2">
                  <img src={editForm.image_url} alt="Current trainer" className="w-16 h-16 object-cover rounded" />
                  <p className="text-sm text-gray-500">Current image</p>
                </div>
              )}
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
                  src={trainer.image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                  alt={trainer.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{trainer.name}</h3>
                      <p className="text-gray-600">{trainer.specialty}</p>
                      <p className="text-sm text-gray-500">
                        {trainer.location} • {trainer.experience} • ${trainer.hourly_rate}/hr
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{trainer.description}</p>
                      <p className="text-sm text-gray-500">Rating: {trainer.rating} ({trainer.reviews} reviews)</p>
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
                        onClick={() => handleDelete(trainer)}
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
