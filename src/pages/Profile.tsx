
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Package, Calendar, CreditCard } from "lucide-react";

interface Profile {
  full_name: string;
  avatar_url?: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({ full_name: "" });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
      fetchBookings();
      fetchSubscriptions();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, image_url)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }
  };

  const fetchBookings = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setBookings(data);
    }
  };

  const fetchSubscriptions = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSubscriptions(data);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
    }
    setLoading(false);
  };

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-light text-gray-900">My Profile</h1>
            <Button 
              onClick={signOut}
              variant="outline"
              className="border-gray-200 rounded-none"
            >
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 rounded-none">
              <TabsTrigger value="profile" className="rounded-none">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-none">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="bookings" className="rounded-none">
                <Calendar className="mr-2 h-4 w-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="rounded-none">
                <CreditCard className="mr-2 h-4 w-4" />
                Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="font-light">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={updateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="rounded-none border-gray-200 bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        className="rounded-none border-gray-200"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-black text-white hover:bg-gray-800 rounded-none"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <Card className="border border-gray-200">
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No orders yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order: any) => (
                    <Card key={order.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${order.total_amount}</p>
                            <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.order_items?.map((item: any) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <img 
                                src={item.products?.image_url} 
                                alt={item.products?.name}
                                className="w-12 h-12 object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">{item.products?.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <Card className="border border-gray-200">
                    <CardContent className="p-8 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No bookings yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking: any) => (
                    <Card key={booking.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{booking.trainer_name}</p>
                            <p className="text-sm text-gray-600">{booking.session_type}</p>
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
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="space-y-4">
                {subscriptions.length === 0 ? (
                  <Card className="border border-gray-200">
                    <CardContent className="p-8 text-center">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No active plans</p>
                    </CardContent>
                  </Card>
                ) : (
                  subscriptions.map((sub: any) => (
                    <Card key={sub.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{sub.plan_name}</p>
                            <p className="text-sm text-gray-600">
                              Started: {new Date(sub.start_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${sub.plan_price}/month</p>
                            <p className="text-sm text-gray-600 capitalize">{sub.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
