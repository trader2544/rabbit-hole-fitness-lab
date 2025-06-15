import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, CreditCard, Package, Truck, CheckCircle } from "lucide-react";

const OrderConfirmation = ({ order, navigate }: { order: any, navigate: ReturnType<typeof useNavigate>}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center py-16 px-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900">Thank you for your order!</h1>
        <p className="text-gray-600 mt-2">Your order #{order.id.slice(0, 8)} has been placed successfully.</p>
        <p className="text-gray-600">You will receive an email confirmation shortly.</p>

        <Card className="mt-8 text-left max-w-lg mx-auto border-gray-200">
          <CardHeader>
            <CardTitle className="font-light">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.products.image_url} alt={item.products.name} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.products.name}</p>
                    <p className="text-sm text-gray-600">${item.price} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate('/shop')} className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 rounded-none py-6 px-8">Continue Shopping</Button>
            <Button variant="outline" onClick={() => navigate('/profile?tab=orders')} className="w-full sm:w-auto rounded-none py-6 px-8 border-gray-200">View My Orders</Button>
        </div>
      </div>
    </div>
  );
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    full_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone: ""
  });
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const cartData = searchParams.get('cart');
  const totalAmount = searchParams.get('total');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (cartData) {
      try {
        const items = JSON.parse(decodeURIComponent(cartData));
        setCartItems(items);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        navigate('/shop');
      }
    } else {
      navigate('/shop');
    }
  }, [user, cartData, navigate]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || cartItems.length === 0) return;

    setLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: parseFloat(totalAmount || '0'),
          status: 'pending',
          shipping_address: shippingInfo
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const { data: fullOrder, error: fetchError } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', order.id)
        .single();
      
      if (fetchError) throw fetchError;

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been placed.`
      });

      setCompletedOrder(fullOrder);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to place order",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  if (completedOrder) {
    return <OrderConfirmation order={completedOrder} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="font-light flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="font-light flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={shippingInfo.full_name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, full_name: e.target.value })}
                    required
                    className="rounded-none border-gray-200"
                  />
                  
                  <Input
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                    className="rounded-none border-gray-200"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                      className="rounded-none border-gray-200"
                    />
                    <Input
                      placeholder="State"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                      className="rounded-none border-gray-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="ZIP Code"
                      value={shippingInfo.zip_code}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip_code: e.target.value })}
                      required
                      className="rounded-none border-gray-200"
                    />
                    <Input
                      placeholder="Phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                      className="rounded-none border-gray-200"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-gray-50 p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span className="font-medium">Payment Method</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Payment processing will be handled securely. This is a demo checkout.
                      </p>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-6"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
