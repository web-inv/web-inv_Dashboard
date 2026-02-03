import { useState } from "react";
import { Layers, Move, Sparkles, Zap, Eye, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // optional toast notifications

const sections = [
  { name: "Hero Section", status: "optimized", score: 95 },
  { name: "Features Grid", status: "needs-work", score: 72 },
  { name: "Testimonials", status: "optimized", score: 88 },
  { name: "Pricing Table", status: "critical", score: 54 },
  { name: "Footer", status: "optimized", score: 91 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "optimized":
      return "text-chart-4 bg-chart-4/20";
    case "needs-work":
      return "text-chart-5 bg-chart-5/20";
    case "critical":
      return "text-destructive bg-destructive/20";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export function WebsiteBuilder() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Handlers
  const handlePreview = () => {
    setIsPreviewOpen(true);
    console.log("Preview clicked");
    toast?.success("Preview opened!"); // optional
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    console.log("Optimize clicked");
    toast?.success("Optimization started!");
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast?.success("Website optimized successfully!");
    setIsOptimizing(false);
  };

  const handleMiniPreview = () => {
    console.log("Mini Preview clicked");
    toast?.info("Mini preview clicked!");
  };

  const handleCodeView = () => {
    console.log("Code view clicked");
    toast?.info("Code view clicked!");
  };

  return (
    <div className="glass-panel-glow p-4 sm:p-6 hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-xl bg-chart-3/20">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-chart-3" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base sm:text-lg">
              Live Website Builder
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              AI-assisted optimization
            </p>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={handleMiniPreview}
            className="p-1.5 sm:p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
          <button
            onClick={handleCodeView}
            className="p-1.5 sm:p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Preview Window */}
      <div className="relative mb-4 sm:mb-6 rounded-xl overflow-hidden bg-muted/10 border border-border">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border-b border-border">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/50" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-chart-5/50" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-chart-4/50" />
          </div>
          <div className="flex-1 mx-2 sm:mx-4">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-muted/30 text-[10px] sm:text-xs text-muted-foreground">
              <span>🔒</span>
              <span className="truncate">yourwebsite.com</span>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 h-36 sm:h-48 relative">
          {/* Mini Preview */}
          <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg overflow-hidden">
            <div className="h-10 sm:h-12 bg-muted/30 flex items-center px-3 sm:px-4 gap-3 sm:gap-4">
              <div className="w-12 sm:w-16 h-3 sm:h-4 bg-primary/30 rounded" />
              <div className="flex-1 flex justify-end gap-1 sm:gap-2">
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-muted/50 rounded" />
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-muted/50 rounded hidden sm:block" />
                <div className="w-8 sm:w-12 h-2 sm:h-3 bg-muted/50 rounded hidden sm:block" />
              </div>
            </div>
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="w-2/3 h-4 sm:h-6 bg-muted/30 rounded" />
              <div className="w-1/2 h-2 sm:h-3 bg-muted/20 rounded" />
              <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-14 sm:w-20 h-6 sm:h-8 bg-primary/50 rounded-lg" />
                <div className="w-14 sm:w-20 h-6 sm:h-8 bg-muted/30 rounded-lg" />
              </div>
            </div>
          </div>

          {/* AI Overlay */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 sm:p-2 rounded-lg bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            AI Active
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
          Drag & drop sections
        </p>
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 sm:p-3 rounded-xl bg-muted/10 border border-transparent hover:border-primary/30 cursor-grab transition-all group"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Move className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs sm:text-sm font-medium">{section.name}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${getStatusColor(
                  section.status
                )}`}
              >
                {section.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5 sm:gap-2 text-xs sm:text-sm"
          onClick={handlePreview}
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Preview
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="gap-1.5 sm:gap-2 text-xs sm:text-sm"
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {isOptimizing ? "Optimizing..." : "Optimize"}
        </Button>
      </div>
    </div>
  );
}
