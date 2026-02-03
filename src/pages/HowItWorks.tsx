import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Globe, 
  Sparkles, 
  BarChart3, 
  Zap, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Connect Your Website",
    description: "Simply enter your website URL and our AI will start analyzing your site instantly. No code changes needed.",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    step: 2,
    title: "AI Analysis",
    description: "Our advanced AI engine scans every aspect of your website - performance, SEO, UX, accessibility, and more.",
    icon: Sparkles,
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
  },
  {
    step: 3,
    title: "Get Insights",
    description: "Receive detailed reports with actionable recommendations prioritized by impact and ease of implementation.",
    icon: BarChart3,
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
  {
    step: 4,
    title: "Optimize & Grow",
    description: "Apply AI-powered optimizations with one click and watch your website performance soar.",
    icon: Zap,
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
  },
];

const HowItWorks = () => {
  return (
    <DashboardLayout 
      title="How It Works" 
      subtitle="Get started in minutes and transform your website performance with AI"
    >
      {/* Steps */}
      <div className="relative mb-12">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-chart-2 via-chart-3 to-chart-4 opacity-30" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-panel p-6 relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center font-display font-bold text-sm">
                {step.step}
              </div>
              
              <div className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center mb-4 mt-2`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-24 w-6 h-6 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="glass-panel p-6">
        <h3 className="font-display font-semibold text-lg mb-4">Common Questions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { q: "How long does the analysis take?", a: "Initial analysis takes about 30 seconds. Deep analysis runs continuously." },
            { q: "Do I need to install anything?", a: "No installation required. Just enter your URL and we handle the rest." },
            { q: "Is my data secure?", a: "Yes, we use enterprise-grade encryption and never share your data." },
            { q: "Can I try it for free?", a: "Absolutely! Start with a free analysis and upgrade when ready." },
          ].map((faq, index) => (
            <div key={index} className="p-4 rounded-xl bg-muted/10">
              <p className="font-medium text-sm mb-1">{faq.q}</p>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HowItWorks;
