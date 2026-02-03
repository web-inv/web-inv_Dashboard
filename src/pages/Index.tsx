// Dashboard Overview Page
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AIScoreCard } from "@/components/dashboard/AIScoreCard";
import { TrafficAnalytics } from "@/components/dashboard/TrafficAnalytics";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { PredictiveInsights } from "@/components/dashboard/PredictiveInsights";
import { WebsiteBuilder } from "@/components/dashboard/WebsiteBuilder";
import { EngagementHeatmap } from "@/components/dashboard/EngagementHeatmap";

const Index = () => {
  return (
    <DashboardLayout 
      title="Dashboard Overview" 
      subtitle="AI-powered insights for your website performance"
    >
      {/* Dashboard Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* AI Score Card */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <AIScoreCard />
        </div>
        
        {/* Traffic Analytics */}
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <TrafficAnalytics />
        </div>
        
        {/* Website Builder */}
        <div className="animate-fade-in md:col-span-2 lg:col-span-1" style={{ animationDelay: "0.2s" }}>
          <WebsiteBuilder />
        </div>
        
        {/* Engagement Heatmap */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <EngagementHeatmap />
        </div>
        
        {/* Predictive Insights */}
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <PredictiveInsights />
        </div>
        
        {/* AI Recommendations */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <AIRecommendations />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
