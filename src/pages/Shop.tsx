
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star, Package, Truck, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Shop = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Equipment", "Supplements", "Technology"];

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false });

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((product: any) => product.category === selectedCategory);

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find((item: any) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter((item: any) => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total: number, item: any) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const cartData = encodeURIComponent(JSON.stringify(cart));
    const total = getTotalPrice().toFixed(2);
    navigate(`/checkout?cart=${cartData}&total=${total}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Premium Fitness Equipment
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
              Elevate Your
              <br />
              <span className="font-semibold">Training Arsenal</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Curated selection of premium fitness equipment, supplements, and technology to maximize your performance and results.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter & Cart Summary */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-none ${selectedCategory === category ? 'bg-black text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              {cart.length > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {getTotalItems()} items • ${getTotalPrice().toFixed(2)}
                  </div>
                  <Button 
                    className="bg-black text-white hover:bg-gray-800 rounded-none"
                    onClick={handleCheckout}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => {
                const cartItem = cart.find((item: any) => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                
                return (
                  <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {product.original_price && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white rounded-none">
                          {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs rounded-none">{product.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-xs">{product.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className="text-base font-semibold leading-tight">{product.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-semibold">${product.price}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      {quantity === 0 ? (
                        <Button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-black text-white hover:bg-gray-800 rounded-none"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="w-full flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="border-gray-200 rounded-none"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="border-gray-200 rounded-none"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Truck className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
                <p className="text-sm text-gray-600">Free delivery on orders over $75</p>
              </div>
              <div>
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">30-day money-back guarantee</p>
              </div>
              <div>
                <Package className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Expert Curated</h4>
                <p className="text-sm text-gray-600">Products tested by professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
