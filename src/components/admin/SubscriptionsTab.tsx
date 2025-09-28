
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionsTab({ subscriptions, fetchSubscriptions }) {
  const { toast } = useToast();

  const updateSubscriptionStatus = async (subscriptionId: string, status: string) => {
    // Note: Subscriptions table not yet implemented
    toast({
      title: "Not Implemented",
      description: "Subscriptions functionality is not yet implemented.",
      variant: "destructive"
    });
    return;
  };
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((sub: any) => (
          <TableRow key={sub.id}>
            <TableCell>{sub.profiles?.full_name || "N/A"}</TableCell>
            <TableCell>{sub.profiles?.email}</TableCell>
            <TableCell>{sub.plan_name}</TableCell>
            <TableCell>${sub.plan_price}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(sub.status)} className="capitalize">{sub.status}</Badge>
            </TableCell>
            <TableCell>{new Date(sub.start_date).toLocaleDateString()}</TableCell>
            <TableCell>{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'N/A'}</TableCell>
            <TableCell>
              <Select defaultValue={sub.status} onValueChange={(value) => updateSubscriptionStatus(sub.id, value)}>
                <SelectTrigger className="w-32 rounded-none border-gray-200">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
