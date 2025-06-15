
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function OrdersTab({ orders, fetchOrders }) {
  const { toast } = useToast();

  console.log("OrdersTab props", orders);

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

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center text-gray-500">
          No orders found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <Card key={order.id} className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">Order #{order.id?.slice(0, 8) || "?"}</p>
                <p className="text-sm text-gray-600">
                  {order.customer_name || order.profiles?.full_name || "?"} ({order.customer_email || order.profiles?.email || "?"})
                </p>
                {order.customer_phone && <p className="text-sm text-gray-600">{order.customer_phone}</p>}
                <p className="text-sm text-gray-600">{order.created_at ? new Date(order.created_at).toLocaleDateString() : "?"}</p>
                {order.delivery_address && typeof order.delivery_address === "object" && (
                  <div className="text-xs text-gray-500 mt-2">
                    <p className="font-medium">Delivery Address:</p>
                    <p>{order.delivery_address.street}</p>
                    <p>{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zip}</p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total_amount || "0.00"}</p>
                <Select defaultValue={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                  <SelectTrigger className="w-32 rounded-none border-gray-200 mt-2">
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
            <div className="space-y-2 border-t border-gray-100 pt-4 mt-4">
              {(Array.isArray(order.order_items) ? order.order_items : []).map((item: any) => (
                <div key={item.id || Math.random()} className="text-sm text-gray-600 flex justify-between">
                  <span>{item.products?.name || "Unknown Product"} × {item.quantity}</span>
                  <span>${item.price !== undefined ? Number(item.price).toFixed(2) : "0.00"}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
