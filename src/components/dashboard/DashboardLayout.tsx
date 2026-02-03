import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  // Split title to find gradient part (after space)
  const titleParts = title.split(" ");
  const mainTitle = titleParts.slice(0, -1).join(" ");
  const gradientTitle = titleParts[titleParts.length - 1];

  return (
    <div className="min-h-screen bg-grid relative">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-chart-2/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="flex w-full relative z-10">
        <Sidebar />

        <div className="flex-1 flex flex-col min-h-screen w-full">
          <TopBar />

          <main className="flex-1 p-4 md:p-6">
            {/* Page Header */}
            <div className="mb-6 md:mb-8 mt-2 md:mt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-1 md:mb-2">
                {mainTitle} <span className="gradient-text">{gradientTitle}</span>
              </h1>
              {subtitle && (
                <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
