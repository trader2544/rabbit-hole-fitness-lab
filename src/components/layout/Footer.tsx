
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-montserrat text-lg font-bold">Rabbit Hole Fitness Lab</h3>
            <p className="text-sm text-muted-foreground">
              Deep dive into the science of fitness, calisthenics, and nutrition with interactive tools and resources.
            </p>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-sm hover:text-primary transition-colors">Home</NavLink></li>
              <li><NavLink to="/biology" className="text-sm hover:text-primary transition-colors">Biology</NavLink></li>
              <li><NavLink to="/fitness" className="text-sm hover:text-primary transition-colors">Fitness</NavLink></li>
              <li><NavLink to="/nutrition" className="text-sm hover:text-primary transition-colors">Nutrition</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><NavLink to="/tools" className="text-sm hover:text-primary transition-colors">Tools</NavLink></li>
              <li><NavLink to="/resources" className="text-sm hover:text-primary transition-colors">Free Resources</NavLink></li>
              <li><NavLink to="/resources#premium" className="text-sm hover:text-primary transition-colors">Premium Courses</NavLink></li>
              <li><NavLink to="/faq" className="text-sm hover:text-primary transition-colors">FAQ</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Connect</h4>
            <p className="text-sm mb-2">Join our newsletter for weekly tips and updates.</p>
            <div className="flex space-x-2 mt-4">
              <input type="email" placeholder="Your email" className="px-3 py-2 rounded text-sm bg-background border border-input flex-grow" />
              <button className="px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rabbit Hole Fitness Lab. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
