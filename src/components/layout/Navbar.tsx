
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Services", path: "/trainers" },
    { name: "Education", path: "/biology" },
    { name: "Tools", path: "/tools" },
    { name: "Resources", path: "/resources" }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <span className="font-light text-2xl text-gray-900">
            Rabbit Hole <span className="font-semibold">Fitness</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block text-base font-normal ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-600"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="ghost" className="w-full justify-start text-gray-600 font-normal">
                Sign In
              </Button>
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
