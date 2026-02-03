import { Download, Eye, Star, Layout, ShoppingBag, Briefcase, Camera, Utensils, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  rating: number;
  downloads: number;
  sections: TemplateSection[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface TemplateSection {
  id: string;
  name: string;
  type: string;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    items?: Array<{ title: string; description: string; icon?: string }>;
  };
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Business": Briefcase,
  "E-commerce": ShoppingBag,
  "Portfolio": Camera,
  "Restaurant": Utensils,
  "Fitness": Dumbbell,
  "Landing Page": Layout,
};

export const templates: Template[] = [
  {
    id: "startup-modern",
    name: "Startup Modern",
    category: "Business",
    thumbnail: "/IMG/sb.jpg", // replace with your image path
    description: "Clean, modern template for tech startups",
    rating: 4.9,
    downloads: 2547,
    colors: { primary: "#667eea", secondary: "#764ba2", accent: "#f093fb" },
    sections: [
      { id: "hero-1", name: "Hero Section", type: "hero", content: { title: "Build Something Amazing", subtitle: "The all-in-one platform for modern businesses", buttonText: "Start Free Trial" } },
      { id: "features-1", name: "Features Grid", type: "features", content: { title: "Why Choose Us", description: "Powerful features to grow your business", items: [{ title: "Fast Performance", description: "Lightning-fast load times" }, { title: "Secure Platform", description: "Enterprise-grade security" }, { title: "24/7 Support", description: "Always here to help" }] } },
      { id: "pricing-1", name: "Pricing Plans", type: "pricing", content: { title: "Simple Pricing", subtitle: "No hidden fees, cancel anytime" } },
      { id: "cta-1", name: "Call to Action", type: "cta", content: { title: "Ready to Get Started?", buttonText: "Sign Up Now" } }
    ]
  },
  {
    id: "ecommerce-minimal",
    name: "Shop Minimal",
    category: "E-commerce",
    thumbnail: "/IMG/sm.jpg",
    description: "Minimalist e-commerce template",
    rating: 4.8,
    downloads: 3891,
    colors: { primary: "#f5af19", secondary: "#f12711", accent: "#ff6b6b" },
    sections: [
      { id: "hero-2", name: "Hero Banner", type: "hero", content: { title: "New Collection 2024", subtitle: "Discover our latest arrivals", buttonText: "Shop Now" } },
      { id: "products-1", name: "Featured Products", type: "gallery", content: { title: "Bestsellers", items: [{ title: "Product 1", description: "$99.00" }, { title: "Product 2", description: "$149.00" }, { title: "Product 3", description: "$79.00" }] } },
      { id: "testimonials-2", name: "Customer Reviews", type: "testimonials", content: { title: "What Our Customers Say" } },
      { id: "footer-2", name: "Foośer", type: "footer", content: { description: "Free shipping on orders over $50" } }
    ]
  },
  {
    id: "portfolio-creative",
    name: "Creative Portfolio",
    category: "Portfolio",
    thumbnail: "/IMG/cp.jpg",
    description: "Showcase your creative work beautifully",
    rating: 4.7,
    downloads: 1823,
    colors: { primary: "#11998e", secondary: "#38ef7d", accent: "#00d9ff" },
    sections: [
      { id: "hero-3", name: "Introduction", type: "hero", content: { title: "Hello, I'm a Designer", subtitle: "Creating beautiful digital experiences", buttonText: "View My Work" } },
      { id: "gallery-3", name: "Project Gallery", type: "gallery", content: { title: "Selected Works", items: [{ title: "Brand Identity", description: "Logo & Visual Design" }, { title: "Web Design", description: "UI/UX Projects" }, { title: "Mobile Apps", description: "iOS & Android" }] } },
      { id: "about-3", name: "About Me", type: "text", content: { title: "About", description: "Passionate designer with 10+ years of experience" } },
      { id: "contact-3", name: "Contact", type: "cta", content: { title: "Let's Work Together", buttonText: "Get in Touch" } }
    ]
  },
  {
    id: "restaurant-elegant",
    name: "Fine Dining",
    category: "Restaurant",
    thumbnail: "/IMG/fd.jpg",
    description: "Elegant template for restaurants",
    rating: 4.9,
    downloads: 1456,
    colors: { primary: "#232526", secondary: "#414345", accent: "#d4af37" },
    sections: [
      { id: "hero-4", name: "Welcome", type: "hero", content: { title: "A Culinary Experience", subtitle: "Fine dining in the heart of the city", buttonText: "Reserve a Table" } },
      { id: "menu-4", name: "Menu Highlights", type: "features", content: { title: "Our Menu", items: [{ title: "Appetizers", description: "Start your journey" }, { title: "Main Course", description: "Signature dishes" }, { title: "Desserts", description: "Sweet endings" }] } },
      { id: "gallery-4", name: "Gallery", type: "gallery", content: { title: "Our Restaurant" } },
      { id: "contact-4", name: "Reservations", type: "cta", content: { title: "Make a Reservation", buttonText: "Book Now" } }
    ]
  },
  {
    id: "fitness-energy",
    name: "Fitness Pro",
    category: "Fitness",
    thumbnail: "/IMG/fp.jpg",
    description: "High-energy fitness template",
    rating: 4.6,
    downloads: 2134,
    colors: { primary: "#ff416c", secondary: "#ff4b2b", accent: "#ffeb3b" },
    sections: [
      { id: "hero-5", name: "Hero", type: "hero", content: { title: "Transform Your Body", subtitle: "Join the ultimate fitness experience", buttonText: "Start Training" } },
      { id: "programs-5", name: "Programs", type: "features", content: { title: "Our Programs", items: [{ title: "Strength Training", description: "Build muscle" }, { title: "HIIT Workouts", description: "Burn calories" }, { title: "Yoga Classes", description: "Find balance" }] } },
      { id: "trainers-5", name: "Trainers", type: "testimonials", content: { title: "Meet Our Trainers" } },
      { id: "pricing-5", name: "Membership", type: "pricing", content: { title: "Membership Plans", subtitle: "Choose your fitness journey" } }
    ]
  },
  {
    id: "landing-saas",
    name: "SaaS Landing",
    category: "Landing Page",
    thumbnail: "/IMG/sl.jpg",
    description: "Convert visitors into customers",
    rating: 4.8,
    downloads: 4521,
    colors: { primary: "#4facfe", secondary: "#00f2fe", accent: "#a855f7" },
    sections: [
      { id: "hero-6", name: "Hero", type: "hero", content: { title: "Supercharge Your Workflow", subtitle: "The smart way to manage your projects", buttonText: "Try for Free" } },
      { id: "features-6", name: "Features", type: "features", content: { title: "Everything You Need", items: [{ title: "Automation", description: "Save time with smart workflows" }, { title: "Analytics", description: "Data-driven insights" }, { title: "Integrations", description: "Connect your tools" }] } },
      { id: "social-6", name: "Social Proof", type: "testimonials", content: { title: "Trusted by 10,000+ Teams" } },
      { id: "pricing-6", name: "Pricing", type: "pricing", content: { title: "Plans That Scale", subtitle: "Start free, upgrade when ready" } },
      { id: "cta-6", name: "CTA", type: "cta", content: { title: "Start Your Free Trial Today", buttonText: "Get Started" } }
    ]
  }
];

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
}

export function TemplateLibrary({ onSelectTemplate, onPreviewTemplate }: TemplateLibraryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Template Library</h3>
        <Badge variant="secondary" className="text-xs">
          {templates.length} Templates
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => {
          const CategoryIcon = categoryIcons[template.category] || Layout;
          
          return (
            <div 
              key={template.id}
              className="glass-panel overflow-hidden group hover:border-primary/30 transition-all"
            >
              {/* Thumbnail */}
              <div 
                className="h-32 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${template.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/50 text-white border-0 gap-1.5">
                    <CategoryIcon className="w-3 h-3" />
                    {template.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="glass"
                    className="h-8 px-3 text-xs"
                    onClick={() => onPreviewTemplate(template)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-chart-5 text-chart-5" />
                      {template.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {template.downloads.toLocaleString()}
                    </span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="primary"
                    className="h-7 text-xs px-3"
                    onClick={() => onSelectTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
