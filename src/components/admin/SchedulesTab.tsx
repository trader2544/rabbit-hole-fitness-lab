
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Calendar, Clock, Users, Video } from "lucide-react";

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
  is_premium_only: boolean;
  status: string;
  created_at: string;
}

export default function SchedulesTab() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule_type: 'meeting',
    date: '',
    time: '',
    duration: 60,
    max_participants: 1,
    meeting_link: '',
    location: '',
    is_premium_only: true
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('admin_schedules')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data || []);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('admin_schedules')
      .insert({
        ...formData,
        created_by: user.id
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Schedule created successfully!"
      });
      setFormData({
        title: '',
        description: '',
        schedule_type: 'meeting',
        date: '',
        time: '',
        duration: 60,
        max_participants: 1,
        meeting_link: '',
        location: '',
        is_premium_only: true
      });
      setIsCreating(false);
      fetchSchedules();
    }
  };

  const updateScheduleStatus = async (scheduleId: string, status: string) => {
    const { error } = await supabase
      .from('admin_schedules')
      .update({ status })
      .eq('id', scheduleId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Schedule status updated!"
      });
      fetchSchedules();
    }
  };

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
      case 'scheduled': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Premium User Schedules</h2>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="rounded-none bg-gray-900 hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {isCreating && (
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Create New Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="rounded-none border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select value={formData.schedule_type} onValueChange={(value) => setFormData({...formData, schedule_type: value})}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="checkup">Checkup</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="rounded-none border-gray-200"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                    className="rounded-none border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                    className="rounded-none border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    required
                    className="rounded-none border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Participants</label>
                  <Input
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({...formData, max_participants: parseInt(e.target.value)})}
                    required
                    className="rounded-none border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meeting Link</label>
                  <Input
                    value={formData.meeting_link}
                    onChange={(e) => setFormData({...formData, meeting_link: e.target.value})}
                    placeholder="https://zoom.us/j/..."
                    className="rounded-none border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Office, Gym, etc."
                    className="rounded-none border-gray-200"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="rounded-none bg-gray-900 hover:bg-gray-800">
                  Create Schedule
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                  className="rounded-none border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>All Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{schedule.title}</p>
                      {schedule.description && (
                        <p className="text-sm text-gray-500">{schedule.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(schedule.schedule_type)} className="capitalize">
                      {schedule.schedule_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(schedule.date).toLocaleDateString()}
                      <Clock className="h-4 w-4 ml-2" />
                      {schedule.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {schedule.current_participants}/{schedule.max_participants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(schedule.status)} className="capitalize">
                      {schedule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={schedule.status} 
                      onValueChange={(value) => updateScheduleStatus(schedule.id, value)}
                    >
                      <SelectTrigger className="w-32 rounded-none border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
