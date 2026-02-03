import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Brain, 
  BarChart3, 
  Shield, 
  Globe,
  Layers,
  Target,
  Lightbulb,
  TrendingUp,
  Check
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our advanced AI analyzes your website's performance, UX, and SEO in real-time",
    highlights: ["Smart recommendations", "Auto-optimization", "Continuous learning"],
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into traffic, engagement, and conversion metrics",
    highlights: ["Real-time tracking", "Custom reports", "Trend analysis"],
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Automatically optimize page speed, images, and code for peak performance",
    highlights: ["Speed scoring", "Image compression", "Code minification"],
    color: "text-chart-5",
    bgColor: "bg-chart-5/20",
  },
  {
    icon: Target,
    title: "Conversion Tracking",
    description: "Track and optimize your conversion funnel with AI-driven insights",
    highlights: ["Funnel analysis", "A/B testing", "Goal tracking"],
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
  },
  {
    icon: Globe,
    title: "SEO Intelligence",
    description: "Comprehensive SEO analysis and optimization recommendations",
    highlights: ["Keyword tracking", "Meta optimization", "Link analysis"],
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
  {
    icon: Lightbulb,
    title: "Predictive Insights",
    description: "AI-powered forecasting to predict future performance trends",
    highlights: ["Traffic forecasting", "Revenue predictions", "Trend detection"],
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
];

const Features = () => {
  return (
    <DashboardLayout 
      title="Platform Features" 
      subtitle="Discover the powerful tools that make web-inv.com your ultimate website optimization platform"
    >
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-panel p-6 hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
            <ul className="space-y-2">
              {feature.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <Check className={`w-4 h-4 ${feature.color}`} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      
      
    </DashboardLayout>
  );
};

export default Features;
