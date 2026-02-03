import { X, Download, Check, Smartphone, Monitor, Tablet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Template } from "./TemplateLibrary";
import { useState } from "react";

interface TemplatePreviewProps {
  template: Template;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
  onDownload: (template: Template) => void;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export function TemplatePreview({ template, onClose, onUseTemplate, onDownload }: TemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  
  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-full";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel-glow w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-lg"
              style={{ background: template.thumbnail }}
            />
            <div>
              <h3 className="font-display font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.category} • {template.sections.length} sections</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/20">
              <button
                onClick={() => setViewMode("desktop")}
                className={`p-2 rounded-md transition-colors ${viewMode === "desktop" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("tablet")}
                className={`p-2 rounded-md transition-colors ${viewMode === "tablet" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`p-2 rounded-md transition-colors ${viewMode === "mobile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <Button variant="glass" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-6 bg-muted/5">
          <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
            {/* Browser Frame */}
            <div className="rounded-xl overflow-hidden bg-background border border-border shadow-2xl">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/20 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-chart-5/50" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/50" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/30 text-sm text-muted-foreground">
                    <span>🔒</span>
                    <span className="truncate">https://{template.id}.template.com</span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </div>
                </div>
              </div>
              
              {/* Page Content */}
              <div className="min-h-[400px]">
                {template.sections.map((section, index) => (
                  <div 
                    key={section.id}
                    className="border-b border-border/50 last:border-0"
                    style={{
                      background: index === 0 ? template.thumbnail : undefined
                    }}
                  >
                    <div className={`p-6 md:p-8 ${index === 0 ? "text-white min-h-[200px] flex flex-col justify-center" : ""}`}>
                      {section.type === "hero" && (
                        <div className="text-center space-y-4">
                          <h1 className={`text-2xl md:text-4xl font-display font-bold ${index === 0 ? "" : "text-foreground"}`}>
                            {section.content.title}
                          </h1>
                          {section.content.subtitle && (
                            <p className={`text-base md:text-lg ${index === 0 ? "text-white/80" : "text-muted-foreground"}`}>
                              {section.content.subtitle}
                            </p>
                          )}
                          {section.content.buttonText && (
                            <Button 
                              variant={index === 0 ? "glass" : "primary"}
                              className="mt-4"
                            >
                              {section.content.buttonText}
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {section.type === "features" && (
                        <div className="space-y-6">
                          <div className="text-center">
                            <h2 className="text-xl md:text-2xl font-display font-semibold">{section.content.title}</h2>
                            {section.content.description && (
                              <p className="text-muted-foreground mt-2">{section.content.description}</p>
                            )}
                          </div>
                          {section.content.items && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {section.content.items.map((item, i) => (
                                <div key={i} className="p-4 rounded-xl bg-muted/10 border border-border">
                                  <h3 className="font-medium">{item.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {section.type === "gallery" && (
                        <div className="space-y-6">
                          <h2 className="text-xl md:text-2xl font-display font-semibold text-center">{section.content.title}</h2>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {(section.content.items || [1, 2, 3]).map((item, i) => (
                              <div 
                                key={i} 
                                className="aspect-square rounded-xl bg-muted/20 border border-border flex items-center justify-center"
                              >
                                <span className="text-muted-foreground text-sm">
                                  {typeof item === "object" ? item.title : `Image ${i + 1}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {section.type === "testimonials" && (
                        <div className="space-y-6">
                          <h2 className="text-xl md:text-2xl font-display font-semibold text-center">{section.content.title}</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                              <div key={i} className="p-4 rounded-xl bg-muted/10 border border-border">
                                <p className="text-sm text-muted-foreground italic">"Great product! Highly recommended."</p>
                                <div className="flex items-center gap-2 mt-3">
                                  <div className="w-8 h-8 rounded-full bg-muted/30" />
                                  <div>
                                    <p className="text-sm font-medium">Customer {i}</p>
                                    <p className="text-xs text-muted-foreground">Verified Buyer</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {section.type === "pricing" && (
                        <div className="space-y-6">
                          <div className="text-center">
                            <h2 className="text-xl md:text-2xl font-display font-semibold">{section.content.title}</h2>
                            {section.content.subtitle && (
                              <p className="text-muted-foreground mt-2">{section.content.subtitle}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                              <div key={i} className={`p-4 rounded-xl border ${i === 1 ? "border-primary bg-primary/5" : "border-border bg-muted/10"}`}>
                                <h3 className="font-medium">{plan}</h3>
                                <p className="text-2xl font-bold mt-2">${(i + 1) * 29}<span className="text-sm text-muted-foreground">/mo</span></p>
                                <Button 
                                  variant={i === 1 ? "primary" : "secondary"} 
                                  size="sm" 
                                  className="w-full mt-4"
                                >
                                  Choose {plan}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {section.type === "cta" && (
                        <div className="text-center py-8 space-y-4">
                          <h2 className="text-xl md:text-2xl font-display font-semibold">{section.content.title}</h2>
                          {section.content.buttonText && (
                            <Button variant="primary" size="lg">
                              {section.content.buttonText}
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {section.type === "text" && (
                        <div className="max-w-2xl mx-auto text-center space-y-4">
                          <h2 className="text-xl md:text-2xl font-display font-semibold">{section.content.title}</h2>
                          {section.content.description && (
                            <p className="text-muted-foreground">{section.content.description}</p>
                          )}
                        </div>
                      )}
                      
                      {section.type === "footer" && (
                        <div className="text-center text-sm text-muted-foreground py-4 bg-muted/10 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6">
                          {section.content.description || "© 2024 Your Company. All rights reserved."}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/10">
          <div className="text-sm text-muted-foreground">
            <span className="text-chart-4">✓</span> Fully customizable • <span className="text-chart-4">✓</span> Mobile responsive • <span className="text-chart-4">✓</span> SEO optimized
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => onDownload(template)} className="gap-2">
              <Download className="w-4 h-4" />
              Download HTML
            </Button>
            <Button variant="primary" onClick={() => onUseTemplate(template)} className="gap-2">
              <Check className="w-4 h-4" />
              Use This Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
