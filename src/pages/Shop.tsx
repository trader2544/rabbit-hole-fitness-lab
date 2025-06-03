
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star, Package, Truck, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Premium Resistance Bands Set",
    price: 49.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 124,
    category: "Equipment",
    description: "Professional-grade resistance bands with multiple resistance levels"
  },
  {
    id: 2,
    name: "Whey Protein Isolate",
    price: 39.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 287,
    category: "Supplements",
    description: "Premium whey protein isolate for muscle recovery and growth"
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 156,
    category: "Technology",
    description: "Advanced fitness tracking with heart rate and sleep monitoring"
  },
  {
    id: 4,
    name: "Adjustable Dumbbells",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    category: "Equipment",
    description: "Space-saving adjustable dumbbells with quick-change mechanism"
  },
  {
    id: 5,
    name: "Pre-Workout Formula",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 203,
    category: "Supplements",
    description: "Clean energy and focus for intense training sessions"
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 167,
    category: "Equipment",
    description: "Premium non-slip yoga mat with superior cushioning"
  }
];

const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Equipment", "Supplements", "Technology"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    onClick={() => {/* Navigate to checkout */}}
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
              {filteredProducts.map((product) => {
                const cartItem = cart.find(item => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                
                return (
                  <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white rounded-none">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
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
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
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
