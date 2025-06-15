
import { Card, CardContent } from "@/components/ui/card";

export default function BookingsTab({ bookings }) {
  return (
    <div className="space-y-4">
      {bookings.map((booking: any) => (
        <Card key={booking.id} className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{booking.trainer_name} - {booking.session_type}</p>
                <p className="text-sm text-gray-600">{booking.profiles?.full_name} ({booking.profiles?.email})</p>
                <p className="text-sm text-gray-600">
                  {new Date(booking.session_date).toLocaleDateString()} at {booking.session_time}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${booking.total_cost}</p>
                <p className="text-sm text-gray-600 capitalize">{booking.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
