
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Biology from "./pages/Biology";
import Fitness from "./pages/Fitness";
import Nutrition from "./pages/Nutrition";
import Education from "./pages/Education";
import MensWeightlifting from "./pages/MensWeightlifting";
import WomensTraining from "./pages/WomensTraining";
import SteroidEducation from "./pages/SteroidEducation";
import Tools from "./pages/Tools";
import Trainers from "./pages/Trainers";
import Resources from "./pages/Resources";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education/mens-weightlifting" element={<MensWeightlifting />} />
              <Route path="/education/womens-training" element={<WomensTraining />} />
              <Route path="/education/steroid-education" element={<SteroidEducation />} />
              <Route path="/biology" element={<Biology />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/calculators" element={<Tools />} />
              <Route path="/tools/chat" element={<Tools />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/trainers/book/:id" element={<Trainers />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/shop" element={<Shop />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
