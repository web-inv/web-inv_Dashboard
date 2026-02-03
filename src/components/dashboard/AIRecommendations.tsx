import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    priority: "high",
    category: "SEO",
    title: "Add meta descriptions to 12 pages",
    description: "Improve click-through rates by adding compelling meta descriptions",
    impact: "+15% CTR",
  },
  {
    priority: "high",
    category: "Performance",
    title: "Optimize hero images",
    description: "Compress 8 images to reduce load time by 2.3s",
    impact: "+8 Speed Score",
  },
  {
    priority: "medium",
    category: "UX",
    title: "Add sticky navigation",
    description: "Keep navigation accessible for better user engagement",
    impact: "+12% Engagement",
  },
  {
    priority: "medium",
    category: "Conversion",
    title: "Improve CTA visibility",
    description: "Increase button contrast on pricing page",
    impact: "+5% Conversion",
  },
  {
    priority: "low",
    category: "Accessibility",
    title: "Add alt text to 23 images",
    description: "Improve accessibility and SEO with descriptive alt text",
    impact: "+3 A11y Score",
  },
];

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    case "medium":
      return <AlertTriangle className="w-4 h-4 text-chart-5" />;
    default:
      return <Info className="w-4 h-4 text-chart-3" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive/20 border-destructive/30 text-destructive";
    case "medium":
      return "bg-chart-5/20 border-chart-5/30 text-chart-5";
    default:
      return "bg-chart-3/20 border-chart-3/30 text-chart-3";
  }
};

export function AIRecommendations() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAutoOptimizeAll = async () => {
    setIsOptimizing(true);
    setCompleted(false);

    // 🔥 Simulate AI optimization process (replace with API call)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsOptimizing(false);
    setCompleted(true);

    console.log("All optimizations applied successfully 🚀");
  };

  return (
    <div className="glass-panel p-4 sm:p-6 hover-lift">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">
              AI Recommendations
            </h3>
            <p className="text-sm text-muted-foreground">
              {recommendations.length} optimization opportunities
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl bg-muted/10 border border-transparent hover:border-primary/30 hover:bg-muted/20 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {getPriorityIcon(rec.priority)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{rec.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityColor(
                        rec.priority
                      )}`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-chart-4 bg-chart-4/20 px-2 py-1 rounded-full">
                  {rec.impact}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        size="sm"
        className="w-full mt-6 gap-2"
        onClick={handleAutoOptimizeAll}
        disabled={isOptimizing}
      >
        {isOptimizing ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Optimizing...
          </>
        ) : completed ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Optimization Complete
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Auto-Optimize All
          </>
        )}
      </Button>
    </div>
  );
}
