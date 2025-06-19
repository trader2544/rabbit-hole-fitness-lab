
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star, Package, Truck, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const Shop = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
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
          <Package className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'} animate-spin`} />
          <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center bg-gray-100 rounded-full ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-8'}`}>
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Premium Fitness Equipment
            </div>
            
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-light ${isMobile ? 'mb-3' : 'mb-6'} text-gray-900 leading-tight`}>
              Elevate Your
              <br />
              <span className="font-semibold">Training Arsenal</span>
            </h1>
            
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} text-gray-600 ${isMobile ? 'mb-6' : 'mb-12'} max-w-2xl mx-auto leading-relaxed`}>
              {isMobile ? 'Premium equipment & supplements for peak performance' : 'Curated selection of premium fitness equipment, supplements, and technology to maximize your performance and results.'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter & Cart Summary */}
      <section className={`${isMobile ? 'pb-4' : 'pb-8'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col md:flex-row justify-between items-center'} ${isMobile ? 'mb-4' : 'mb-8'}`}>
              <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'flex-wrap gap-4'} ${isMobile ? '' : 'mb-4 md:mb-0'}`}>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size={isMobile ? "sm" : "default"}
                    className={`rounded-none ${isMobile ? 'text-xs' : ''} ${selectedCategory === category ? 'bg-black text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              {cart.length > 0 && (
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'space-x-4'}`}>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                    {getTotalItems()} items • ${getTotalPrice().toFixed(2)}
                  </div>
                  <Button 
                    className={`bg-black text-white hover:bg-gray-800 rounded-none ${isMobile ? 'text-xs px-3 py-1' : ''}`}
                    onClick={handleCheckout}
                    size={isMobile ? "sm" : "default"}
                  >
                    <ShoppingCart className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={`${isMobile ? 'pb-8' : 'pb-16'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
              {filteredProducts.map((product: any) => {
                const cartItem = cart.find((item: any) => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                
                return (
                  <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]'} overflow-hidden`}>
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {product.original_price && (
                        <Badge className={`absolute top-2 left-2 bg-red-500 text-white rounded-none ${isMobile ? 'text-xs' : ''}`}>
                          {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className={`${isMobile ? 'pb-2 p-3' : 'pb-3'}`}>
                      <div className={`flex items-center justify-between ${isMobile ? 'mb-1' : 'mb-2'}`}>
                        <Badge variant="outline" className={`${isMobile ? 'text-xs' : 'text-xs'} rounded-none`}>{product.category}</Badge>
                        <div className="flex items-center">
                          <Star className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3'} text-yellow-500 fill-current mr-1`} />
                          <span className={`${isMobile ? 'text-xs' : 'text-xs'}`}>{product.rating}</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 ml-1`}>({product.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold leading-tight`}>{product.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className={`pt-0 ${isMobile ? 'px-3' : ''}`}>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 ${isMobile ? 'mb-2' : 'mb-4'}`}>{product.description}</p>
                      <div className={`flex items-center space-x-2 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>${product.price}</span>
                        {product.original_price && (
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 line-through`}>${product.original_price}</span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className={`pt-0 ${isMobile ? 'px-3 pb-3' : ''}`}>
                      {quantity === 0 ? (
                        <Button 
                          onClick={() => addToCart(product)}
                          className={`w-full bg-black text-white hover:bg-gray-800 rounded-none ${isMobile ? 'text-xs h-8' : ''}`}
                          size={isMobile ? "sm" : "default"}
                        >
                          <ShoppingCart className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="w-full flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className={`border-gray-200 rounded-none ${isMobile ? 'h-6 w-6 p-0' : ''}`}
                          >
                            <Minus className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                          </Button>
                          <span className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className={`border-gray-200 rounded-none ${isMobile ? 'h-6 w-6 p-0' : ''}`}
                          >
                            <Plus className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
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
      <section className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-8'} text-center`}>
              <div>
                <Truck className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Free Shipping</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Free delivery on orders over $75</p>
              </div>
              <div>
                <Shield className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Quality Guarantee</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>30-day money-back guarantee</p>
              </div>
              <div>
                <Package className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-4'}`} />
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Expert Curated</h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Products tested by professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
