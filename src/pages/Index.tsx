
import Hero from "@/components/home/Hero";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import ContentPreview from "@/components/home/ContentPreview";
import ToolsPreview from "@/components/home/ToolsPreview";
import TrainersPreview from "@/components/trainers/TrainersPreview";
import CTA from "@/components/home/CTA";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesGrid />
      <ContentPreview />
      <ToolsPreview />
      <TrainersPreview />
      {!isMobile && <CTA />}
    </div>
  );
};

export default Index;
