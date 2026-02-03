import { Template, TemplateSection } from "@/components/builder/TemplateLibrary";

function generateSectionHTML(section: TemplateSection, template: Template): string {
  const { content, type } = section;
  
  switch (type) {
    case "hero":
      return `
    <section class="hero" style="background: ${template.thumbnail}; padding: 80px 20px; text-align: center; color: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h1 style="font-size: 3rem; margin-bottom: 20px;">${content.title || "Welcome"}</h1>
        ${content.subtitle ? `<p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 30px;">${content.subtitle}</p>` : ""}
        ${content.buttonText ? `<a href="#" class="btn" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; display: inline-block; backdrop-filter: blur(10px);">${content.buttonText}</a>` : ""}
      </div>
    </section>`;
      
    case "features":
      const featuresItems = content.items?.map(item => `
          <div class="feature-card" style="background: #f8f9fa; padding: 24px; border-radius: 12px; text-align: center;">
            <h3 style="margin-bottom: 10px;">${item.title}</h3>
            <p style="color: #666;">${item.description}</p>
          </div>`).join("") || "";
      
      return `
    <section class="features" style="padding: 80px 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 40px;">${content.title || "Features"}</h2>
        ${content.description ? `<p style="text-align: center; color: #666; margin-bottom: 40px;">${content.description}</p>` : ""}
        <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
          ${featuresItems}
        </div>
      </div>
    </section>`;
      
    case "gallery":
      const galleryItems = (content.items || [1, 2, 3]).map((item, i) => `
          <div class="gallery-item" style="aspect-ratio: 1; background: #e9ecef; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: #666;">${typeof item === "object" ? item.title : `Image ${i + 1}`}</span>
          </div>`).join("");
      
      return `
    <section class="gallery" style="padding: 80px 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 40px;">${content.title || "Gallery"}</h2>
        <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          ${galleryItems}
        </div>
      </div>
    </section>`;
      
    case "testimonials":
      return `
    <section class="testimonials" style="padding: 80px 20px; background: #f8f9fa;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 40px;">${content.title || "Testimonials"}</h2>
        <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <div class="testimonial-card" style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-style: italic; color: #666; margin-bottom: 16px;">"Great product! Highly recommended."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background: #e9ecef; border-radius: 50%;"></div>
              <div>
                <p style="font-weight: 600; margin: 0;">Customer Name</p>
                <p style="font-size: 0.875rem; color: #666; margin: 0;">Verified Buyer</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card" style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-style: italic; color: #666; margin-bottom: 16px;">"Amazing service and support!"</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background: #e9ecef; border-radius: 50%;"></div>
              <div>
                <p style="font-weight: 600; margin: 0;">Another Customer</p>
                <p style="font-size: 0.875rem; color: #666; margin: 0;">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
      
    case "pricing":
      return `
    <section class="pricing" style="padding: 80px 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 10px;">${content.title || "Pricing"}</h2>
        ${content.subtitle ? `<p style="text-align: center; color: #666; margin-bottom: 40px;">${content.subtitle}</p>` : ""}
        <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto;">
          <div class="pricing-card" style="background: #f8f9fa; padding: 32px; border-radius: 12px; text-align: center;">
            <h3>Basic</h3>
            <p style="font-size: 2.5rem; font-weight: bold; margin: 16px 0;">$29<span style="font-size: 1rem; color: #666;">/mo</span></p>
            <a href="#" style="display: block; background: #333; color: white; padding: 12px; border-radius: 8px; text-decoration: none;">Choose Basic</a>
          </div>
          <div class="pricing-card featured" style="background: ${template.colors.primary}; color: white; padding: 32px; border-radius: 12px; text-align: center; transform: scale(1.05);">
            <h3>Pro</h3>
            <p style="font-size: 2.5rem; font-weight: bold; margin: 16px 0;">$59<span style="font-size: 1rem; opacity: 0.8;">/mo</span></p>
            <a href="#" style="display: block; background: white; color: ${template.colors.primary}; padding: 12px; border-radius: 8px; text-decoration: none;">Choose Pro</a>
          </div>
          <div class="pricing-card" style="background: #f8f9fa; padding: 32px; border-radius: 12px; text-align: center;">
            <h3>Enterprise</h3>
            <p style="font-size: 2.5rem; font-weight: bold; margin: 16px 0;">$99<span style="font-size: 1rem; color: #666;">/mo</span></p>
            <a href="#" style="display: block; background: #333; color: white; padding: 12px; border-radius: 8px; text-decoration: none;">Choose Enterprise</a>
          </div>
        </div>
      </div>
    </section>`;
      
    case "cta":
      return `
    <section class="cta" style="padding: 80px 20px; background: ${template.thumbnail}; text-align: center; color: white;">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2rem; margin-bottom: 24px;">${content.title || "Get Started Today"}</h2>
        ${content.buttonText ? `<a href="#" class="btn" style="background: white; color: #333; padding: 14px 40px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600;">${content.buttonText}</a>` : ""}
      </div>
    </section>`;
      
    case "text":
      return `
    <section class="text-block" style="padding: 80px 20px;">
      <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 20px;">${content.title || "About Us"}</h2>
        ${content.description ? `<p style="color: #666; line-height: 1.8;">${content.description}</p>` : ""}
      </div>
    </section>`;
      
    case "footer":
      return `
    <footer style="padding: 40px 20px; background: #1a1a1a; color: white; text-align: center;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <p style="margin: 0; opacity: 0.7;">${content.description || "© 2024 Your Company. All rights reserved."}</p>
      </div>
    </footer>`;
      
    default:
      return `
    <section style="padding: 60px 20px; text-align: center;">
      <p>${section.name}</p>
    </section>`;
  }
}

export function generateTemplateHTML(template: Template): string {
  const sectionsHTML = template.sections
    .map(section => generateSectionHTML(section, template))
    .join("\n");
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${template.description}">
  <title>${template.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    h1, h2, h3 {
      line-height: 1.2;
    }
    .btn:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem !important; }
      .features-grid, .gallery-grid, .testimonials-grid, .pricing-grid {
        grid-template-columns: 1fr !important;
      }
      .pricing-card.featured { transform: none !important; }
    }
  </style>
</head>
<body>
${sectionsHTML}
</body>
</html>`;
}

export function downloadTemplate(template: Template): void {
  const html = generateTemplateHTML(template);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `${template.id}-template.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCurrentBuilder(sections: Array<{
  id: string;
  name: string;
  type: string;
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
  };
}>): void {
  const mockTemplate: Template = {
    id: "custom-website",
    name: "My Custom Website",
    category: "Custom",
    thumbnail: "linear-gradient(135deg, hsl(330 100% 45%), hsl(280 100% 50%))",
    description: "Custom built website",
    rating: 5,
    downloads: 0,
    colors: { primary: "#e6007a", secondary: "#8b00e6", accent: "#ff00ff" },
    sections: sections.map(s => ({
      ...s,
      content: s.content || {}
    })) as Template["sections"]
  };
  
  downloadTemplate(mockTemplate);
}
