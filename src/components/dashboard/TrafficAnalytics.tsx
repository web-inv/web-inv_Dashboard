import { useState } from "react";
import { Users, Globe, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const timeRanges = ["Daily", "Weekly", "Monthly"];

// Analytics data for each time range
const analyticsData = {
  Daily: {
    liveVisitors: 312,
    trafficSources: [
      { name: "Organic Search", value: 48, color: "hsl(330, 100%, 45%)" },
      { name: "Direct", value: 22, color: "hsl(280, 100%, 50%)" },
      { name: "Social Media", value: 20, color: "hsl(200, 100%, 50%)" },
      { name: "Referral", value: 10, color: "hsl(160, 100%, 40%)" },
    ],
    topPages: [
      { page: "/pricing", views: 987, engagement: 75 },
      { page: "/features", views: 765, engagement: 62 },
      { page: "/blog/ai-trends", views: 654, engagement: 80 },
      { page: "/about", views: 432, engagement: 50 },
    ],
  },
  Weekly: {
    liveVisitors: 1247,
    trafficSources: [
      { name: "Organic Search", value: 42, color: "hsl(330, 100%, 45%)" },
      { name: "Direct", value: 28, color: "hsl(280, 100%, 50%)" },
      { name: "Social Media", value: 18, color: "hsl(200, 100%, 50%)" },
      { name: "Referral", value: 12, color: "hsl(160, 100%, 40%)" },
    ],
    topPages: [
      { page: "/pricing", views: 2847, engagement: 89 },
      { page: "/features", views: 2156, engagement: 76 },
      { page: "/blog/ai-trends", views: 1923, engagement: 92 },
      { page: "/about", views: 1456, engagement: 68 },
    ],
  },
  Monthly: {
    liveVisitors: 4892,
    trafficSources: [
      { name: "Organic Search", value: 55, color: "hsl(330, 100%, 45%)" },
      { name: "Direct", value: 18, color: "hsl(280, 100%, 50%)" },
      { name: "Social Media", value: 15, color: "hsl(200, 100%, 50%)" },
      { name: "Referral", value: 12, color: "hsl(160, 100%, 40%)" },
    ],
    topPages: [
      { page: "/pricing", views: 8234, engagement: 88 },
      { page: "/features", views: 7123, engagement: 79 },
      { page: "/blog/ai-trends", views: 6542, engagement: 91 },
      { page: "/about", views: 4891, engagement: 70 },
    ],
  },
};

export function TrafficAnalytics() {
  const [activeRange, setActiveRange] = useState("Weekly");

  // Get current data based on active range
  const { liveVisitors, trafficSources, topPages } = analyticsData[activeRange];

  return (
    <div className="glass-panel p-4 sm:p-6 hover-lift">
      {/* Header with Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="font-display font-semibold text-base sm:text-lg">
          Traffic & Engagement
        </h3>
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30 self-start sm:self-auto">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-all ${
                activeRange === range
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Live Visitors */}
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/20 to-chart-2/20 border border-primary/30 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 rounded-xl bg-primary/30">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">Real-time Visitors</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-display font-bold">
              {liveVisitors.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs text-chart-4">
              <span className="w-2 h-2 rounded-full bg-chart-4 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Traffic Sources Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Traffic Sources
          </p>
          <div className="h-32 sm:h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive
                  animationDuration={600}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {trafficSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ background: source.color }}
                />
                <span className="text-xs sm:text-sm">{source.name}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{source.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          Top Pages by Engagement
        </p>
        <div className="space-y-2 sm:space-y-3">
          {topPages.map((page, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-2.5 sm:p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium truncate">{page.page}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 ml-5 sm:ml-0">
                <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {page.views.toLocaleString()}
                </div>
                <div className="w-12 sm:w-16 h-1 sm:h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2"
                    style={{ width: `${page.engagement}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium w-7 sm:w-8">{page.engagement}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
