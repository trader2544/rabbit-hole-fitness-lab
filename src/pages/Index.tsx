
import Hero from "@/components/home/Hero";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import ContentPreview from "@/components/home/ContentPreview";
import ToolsPreview from "@/components/home/ToolsPreview";
import TrainersPreview from "@/components/trainers/TrainersPreview";
import CTA from "@/components/home/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesGrid />
      <ContentPreview />
      <ToolsPreview />
      <TrainersPreview />
      <CTA />
    </div>
  );
};

export default Index;
