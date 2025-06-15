
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Trainers from "./pages/Trainers";
import Fitness from "./pages/Fitness";
import MensWeightlifting from "./pages/MensWeightlifting";
import WomensTraining from "./pages/WomensTraining";
import Nutrition from "./pages/Nutrition";
import SteroidEducation from "./pages/SteroidEducation";
import Biology from "./pages/Biology";
import Education from "./pages/Education";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Resources from "./pages/Resources";
import Tools from "./pages/Tools";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Blogs from "./pages/Blogs";
import PremiumDashboard from "./pages/PremiumDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/fitness/mens-weightlifting" element={<MensWeightlifting />} />
              <Route path="/fitness/womens-training" element={<WomensTraining />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/nutrition/steroid-education" element={<SteroidEducation />} />
              <Route path="/nutrition/biology" element={<Biology />} />
              <Route path="/education" element={<Education />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/premium" element={<PremiumDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
