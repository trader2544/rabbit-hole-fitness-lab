
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Home, BookOpen, Calculator, Users, Crown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Services", path: "/trainers", icon: Users },
    { name: "Education", path: "/biology", icon: BookOpen },
    { name: "Tools", path: "/tools", icon: Calculator },
    { name: "Resources", path: "/resources", icon: Crown }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 hidden md:block">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <span className="font-light text-2xl text-gray-900">
              Rabbit Hole <span className="font-semibold">Fitness</span>
            </span>
          </NavLink>

          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-normal transition-colors ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black font-normal">
                Sign In
              </Button>
              <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-none px-6">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile App-like Navigation */}
      <div className="md:hidden">
        {/* Mobile Top Bar */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="px-4 py-3 flex justify-between items-center">
            <NavLink to="/" className="flex items-center">
              <span className="font-light text-lg text-gray-900">
                Rabbit Hole <span className="font-semibold">Fitness</span>
              </span>
            </NavLink>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="h-9 w-9">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="grid grid-cols-5 h-16">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `flex flex-col items-center justify-center space-y-1 ${
                  isActive ? "text-black" : "text-gray-500"
                }`
              }
            >
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium">Home</span>
            </NavLink>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center space-y-1 ${
                    isActive ? "text-black" : "text-gray-500"
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{link.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Full Screen Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 pt-16">
            <div className="px-6 py-8 space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Navigation</h3>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="flex items-center space-x-4 text-2xl font-light text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-6 w-6" />
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Account</h3>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-lg py-6 rounded-none border-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-start text-lg py-6 bg-black text-white hover:bg-gray-800 rounded-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Button>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="bg-gray-50 p-6 rounded-none">
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Access</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Join our exclusive community of high-performers
                  </p>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-none">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
