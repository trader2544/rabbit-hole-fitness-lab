
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { logActivity, sendNotification } from "@/components/activity/ActivityLogger";

export default function BookingsTab({ bookings, fetchBookings }) {
  const { toast } = useToast();

  console.log("BookingsTab props", bookings);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Booking status updated successfully!" });
      fetchBookings();
    }
  };

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center text-gray-500">
          No bookings found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
       <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={fetchBookings} className="rounded-none border-gray-200">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Bookings
        </Button>
      </div>
      {bookings.map((booking: any) => (
        <Card key={booking.id || Math.random()} className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{booking.trainers?.name || "Unknown Trainer"} - {booking.session_type || "Online Session"}</p>
                <p className="text-sm text-gray-600">{booking.profiles?.full_name || "Unknown User"} ({booking.profiles?.email || "No email"})</p>
                <p className="text-sm text-gray-600">
                  {booking.session_date ? new Date(booking.session_date).toLocaleDateString() : "No date"} - {booking.duration || 60} minutes
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${booking.total_cost || "0.00"}</p>
                <Select defaultValue={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                  <SelectTrigger className="w-36 rounded-none border-gray-200 mt-2">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
