
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  metadata: any;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
}

export default function ActivityLogsTab() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivityLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activity_logs')
      .select(`
        *,
        profiles!inner(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching activity logs:', error);
    } else {
      setActivityLogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const getActivityTypeColor = (type: string) => {
    if (type.includes('created')) return 'default';
    if (type.includes('updated')) return 'secondary';
    if (type.includes('deleted')) return 'destructive';
    return 'outline';
  };

  if (loading) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Loading activity logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Activity Logs</h2>
        <Button variant="outline" size="sm" onClick={fetchActivityLogs} className="rounded-none border-gray-200">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Recent User Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.profiles?.full_name || 'Unknown User'}</p>
                      <p className="text-sm text-gray-500">{log.profiles?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActivityTypeColor(log.activity_type)} className="capitalize">
                      {log.activity_type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
