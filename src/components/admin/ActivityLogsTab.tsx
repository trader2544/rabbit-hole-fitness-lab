
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  metadata: any;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
}

const ActivityLogsTab = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    
    // First fetch activity logs
    let query = supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.ilike('activity_type', `%${filter}%`);
    }

    const { data: logsData, error: logsError } = await query;

    if (logsError) {
      console.error('Error fetching activity logs:', logsError);
      setLoading(false);
      return;
    }

    // Get unique user IDs from logs
    const userIds = [...new Set(logsData?.map(log => log.user_id).filter(Boolean) || [])];
    
    // Fetch profiles for these users
    if (userIds.length > 0) {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      if (!profilesError && profilesData) {
        setProfiles(profilesData);
      }
    }

    setLogs(logsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const getActivityBadge = (activityType: string) => {
    if (activityType.includes('booking')) return 'bg-blue-100 text-blue-800';
    if (activityType.includes('order')) return 'bg-green-100 text-green-800';
    if (activityType.includes('subscription')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getUserProfile = (userId: string) => {
    return profiles.find(profile => profile.id === userId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 rounded-none border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="booking">Bookings</SelectItem>
              <SelectItem value="order">Orders</SelectItem>
              <SelectItem value="subscription">Subscriptions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-3">
        {logs.map((log) => {
          const userProfile = getUserProfile(log.user_id);
          return (
            <Card key={log.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getActivityBadge(log.activity_type)}>
                        {log.activity_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-medium">{log.description}</p>
                    <p className="text-sm text-gray-600">
                      User: {userProfile?.full_name || 'Unknown'} ({userProfile?.email || 'No email'})
                    </p>
                    {log.metadata && (
                      <details className="mt-2">
                        <summary className="text-sm text-gray-500 cursor-pointer">
                          <Eye className="inline h-3 w-3 mr-1" />
                          View Details
                        </summary>
                        <pre className="text-xs bg-gray-50 p-2 mt-1 rounded overflow-auto">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {logs.length === 0 && !loading && (
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center text-gray-500">
              No activity logs found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ActivityLogsTab;
