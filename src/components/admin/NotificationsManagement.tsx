
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Users, User } from 'lucide-react';

const NotificationsManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    message: '',
    type: 'info'
  });
  const [sending, setSending] = useState(false);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .order('full_name');
    
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendNotification = async () => {
    if (!formData.title || !formData.message) {
      toast({
        title: "Error",
        description: "Title and message are required",
        variant: "destructive"
      });
      return;
    }

    setSending(true);

    try {
      if (formData.recipient === 'all') {
        // Send to all users
        const notifications = users.map(user => ({
          user_id: user.id,
          title: formData.title,
          message: formData.message,
          type: formData.type
        }));

        const { error } = await supabase
          .from('notifications')
          .insert(notifications);

        if (error) throw error;

        toast({
          title: "Success",
          description: `Notification sent to ${users.length} users`
        });
      } else {
        // Send to specific user
        const { error } = await supabase
          .from('notifications')
          .insert({
            user_id: formData.recipient,
            title: formData.title,
            message: formData.message,
            type: formData.type
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Notification sent successfully"
        });
      }

      // Reset form
      setFormData({
        recipient: '',
        title: '',
        message: '',
        type: 'info'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Notification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Recipient</label>
          <Select value={formData.recipient} onValueChange={(value) => setFormData(prev => ({ ...prev, recipient: value }))}>
            <SelectTrigger className="rounded-none border-gray-200">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All Users
                </div>
              </SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.full_name || user.email}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger className="rounded-none border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Notification title"
            className="rounded-none border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Notification message"
            rows={4}
            className="rounded-none border-gray-200"
          />
        </div>

        <Button
          onClick={sendNotification}
          disabled={sending || !formData.recipient || !formData.title || !formData.message}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-none"
        >
          <Send className="h-4 w-4 mr-2" />
          {sending ? 'Sending...' : 'Send Notification'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsManagement;
