import { Bell, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function TopBar() {
  const { user } = useAuth();

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <header className="glass-panel sticky top-0 z-30 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
      {/* Spacer for sidebar toggle */}
      <div className="w-10 md:hidden" />

      {/* Welcome Text (Search Replacement) */}
      <div className="flex-1">
        <h1 className="text-base md:text-lg font-semibold tracking-tight">
          Welcome to <span className="text-primary">web-inv.com</span> 
        </h1>
       
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="primary" size="sm" className="sm:hidden p-2">
          <Plus className="w-4 h-4" />
        </Button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-muted/30 hover:bg-muted/40 transition">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-muted/30 transition">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
            <span className="text-sm font-medium">{initials}</span>
          </div>

          <span className="hidden lg:block text-sm font-medium max-w-[120px] truncate">
            {displayName}
          </span>

          <ChevronDown className="hidden lg:block w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
