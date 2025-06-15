
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

export default function ResourcesTab({ resources, fetchResources }) {
  const { toast } = useToast();
  const [newResource, setNewResource] = useState({ title: "", description: "", category: "" });
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResourceFile(e.target.files[0]);
    }
  };

  const addResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceFile) {
      toast({ title: "Error", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }

    const fileExt = resourceFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('resources').upload(filePath, resourceFile);
    if (uploadError) {
      toast({ title: "File Upload Error", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('resources').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('resources').insert([{
      ...newResource,
      file_url: publicUrl,
      file_type: resourceFile.type,
    }]);

    if (insertError) {
      toast({ title: "Error", description: insertError.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Resource added successfully!" });
      setNewResource({ title: "", description: "", category: "" });
      setResourceFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
      fetchResources();
    }
  };
  
  const deleteResource = async (resource) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    if (resource.file_url) {
      try {
        const url = new URL(resource.file_url);
        const path = url.pathname.split('/resources/')[1];
        if (path) {
          await supabase.storage.from('resources').remove([path]);
        }
      } catch(e) { console.error(e); }
    }

    const { error } = await supabase.from('resources').delete().eq('id', resource.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Resource deleted." });
      fetchResources();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-gray-200">
        <CardHeader><CardTitle className="font-light flex items-center"><Plus className="mr-2 h-5 w-5" />Add New Resource</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={addResource} className="space-y-4">
            <Input placeholder="Resource Title" value={newResource.title} onChange={(e) => setNewResource({ ...newResource, title: e.target.value })} required className="rounded-none border-gray-200" />
            <Textarea placeholder="Description" value={newResource.description} onChange={(e) => setNewResource({ ...newResource, description: e.target.value })} className="rounded-none border-gray-200" />
            <Select value={newResource.category} onValueChange={(value) => setNewResource({ ...newResource, category: value })} required>
              <SelectTrigger className="rounded-none border-gray-200"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
              </SelectContent>
            </Select>
            <Input type="file" onChange={handleFileChange} ref={fileInputRef} required className="rounded-none border-gray-200" />
            {resourceFile && <p className="text-sm text-gray-500 mt-2">Selected: {resourceFile.name}</p>}
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-none">Add Resource</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="border border-gray-200">
        <CardHeader><CardTitle className="font-light">Existing Resources</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {resources.map((resource: any) => (
              <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-gray-500" />
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-gray-600">{resource.category}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="rounded-none" disabled><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="rounded-none text-red-600" onClick={() => deleteResource(resource)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
