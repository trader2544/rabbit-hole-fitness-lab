import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Users, Package, Calendar, Settings, FileText, Star, Activity, Bell, Users as TrainerIcon } from "lucide-react";
import ProductsTab from "@/components/admin/ProductsTab";
import OrdersTab from "@/components/admin/OrdersTab";
import BookingsTab from "@/components/admin/BookingsTab";
import UsersTab from "@/components/admin/UsersTab";
import ResourcesTab from "@/components/admin/ResourcesTab";
import SubscriptionsTab from "@/components/admin/SubscriptionsTab";
import ActivityLogsTab from "@/components/admin/ActivityLogsTab";
import NotificationsManagement from "@/components/admin/NotificationsManagement";
import TrainersManagement from "@/components/admin/TrainersManagement";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const { isAdmin } = useAuth();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select(`*, profiles(full_name, email), order_items(*, products(name))`)
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const fetchBookings = async () => {
    // Note: Bookings table not yet implemented - set empty array
    setBookings([]);
  };

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setUsers(data);
  };
  
  const fetchResources = async () => {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setResources(data);
  };

  const fetchSubscriptions = async () => {
    // Note: Subscriptions table not yet implemented - set empty array
    setSubscriptions([]);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchBookings();
      fetchUsers();
      fetchResources();
      fetchSubscriptions();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="border border-gray-200">
          <CardContent className={`${isMobile ? 'p-4' : 'p-8'} text-center`}>
            <Settings className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-400 mx-auto mb-4`} />
            <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-4' : 'mb-8'}`}>Admin Dashboard</h1>

          <Tabs defaultValue="trainers" className={`${isMobile ? 'space-y-3' : 'space-y-6'}`}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-9'} rounded-none ${isMobile ? 'h-auto' : ''}`}>
              <TabsTrigger value="trainers" className={`rounded-none ${isMobile ? 'text-xs px-1 py-2' : ''}`}>
                <TrainerIcon className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                {!isMobile && "Trainers"}
              </TabsTrigger>
              <TabsTrigger value="products" className={`rounded-none ${isMobile ? 'text-xs px-1 py-2' : ''}`}>
                <Package className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                {!isMobile && "Products"}
              </TabsTrigger>
              <TabsTrigger value="orders" className={`rounded-none ${isMobile ? 'text-xs px-1 py-2' : ''}`}>
                <Package className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                {!isMobile && "Orders"}
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="bookings" className="rounded-none"><Calendar className="mr-2 h-4 w-4" />Bookings</TabsTrigger>
                  <TabsTrigger value="users" className="rounded-none"><Users className="mr-2 h-4 w-4" />Users</TabsTrigger>
                  <TabsTrigger value="resources" className="rounded-none"><FileText className="mr-2 h-4 w-4" />Resources</TabsTrigger>
                  <TabsTrigger value="subscriptions" className="rounded-none"><Star className="mr-2 h-4 w-4" />Subscriptions</TabsTrigger>
                  <TabsTrigger value="activity" className="rounded-none"><Activity className="mr-2 h-4 w-4" />Activity</TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-none"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="trainers"><TrainersManagement /></TabsContent>
            <TabsContent value="products"><ProductsTab products={products} fetchProducts={fetchProducts} /></TabsContent>
            <TabsContent value="orders"><OrdersTab orders={orders} fetchOrders={fetchOrders} /></TabsContent>
            <TabsContent value="bookings"><BookingsTab bookings={bookings} fetchBookings={fetchBookings} /></TabsContent>
            <TabsContent value="users"><UsersTab users={users} /></TabsContent>
            <TabsContent value="resources"><ResourcesTab resources={resources} fetchResources={fetchResources} /></TabsContent>
            <TabsContent value="subscriptions"><SubscriptionsTab subscriptions={subscriptions} fetchSubscriptions={fetchSubscriptions} /></TabsContent>
            <TabsContent value="activity"><ActivityLogsTab /></TabsContent>
            <TabsContent value="notifications"><NotificationsManagement /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
