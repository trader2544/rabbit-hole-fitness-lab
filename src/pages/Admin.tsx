
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Package, Calendar, Settings, Plus, Edit, Trash2 } from "lucide-react";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "",
    image_url: ""
  });

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchBookings();
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles(full_name, email),
        order_items(
          *,
          products(name)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profiles(full_name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (data) setBookings(data);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setUsers(data);
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('products')
      .insert([{
        ...newProduct,
        price: parseFloat(newProduct.price),
        original_price: parseFloat(newProduct.original_price)
      }]);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully!"
      });
      setNewProduct({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "",
        image_url: ""
      });
      fetchProducts();
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Order status updated!"
      });
      fetchOrders();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="border border-gray-200">
          <CardContent className="p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 rounded-none">
              <TabsTrigger value="products" className="rounded-none">
                <Package className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-none">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="bookings" className="rounded-none">
                <Calendar className="mr-2 h-4 w-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-none">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="font-light flex items-center">
                      <Plus className="mr-2 h-5 w-5" />
                      Add New Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={addProduct} className="space-y-4">
                      <Input
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                        className="rounded-none border-gray-200"
                      />
                      <Textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="rounded-none border-gray-200"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                          className="rounded-none border-gray-200"
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Original Price"
                          value={newProduct.original_price}
                          onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })}
                          className="rounded-none border-gray-200"
                        />
                      </div>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Equipment">Equipment</SelectItem>
                          <SelectItem value="Supplements">Supplements</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Image URL"
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        className="rounded-none border-gray-200"
                      />
                      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-none">
                        Add Product
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="font-light">Existing Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {products.map((product: any) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="rounded-none">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-none text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">{order.profiles?.full_name} ({order.profiles?.email})</p>
                          <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total_amount}</p>
                          <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-32 rounded-none border-gray-200">
                              <SelectValue placeholder={order.status} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.order_items?.map((item: any) => (
                          <div key={item.id} className="text-sm text-gray-600">
                            {item.products?.name} × {item.quantity} - ${item.price}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookings">
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
            </TabsContent>

            <TabsContent value="users">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: any) => (
                  <Card key={user.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="font-semibold">{user.full_name || "No name"}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
