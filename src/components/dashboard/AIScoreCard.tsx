import { TrendingUp, Zap, Search, Smile, Target } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const trendData = [
  { value: 72 }, { value: 75 }, { value: 73 }, { value: 78 }, 
  { value: 82 }, { value: 85 }, { value: 87 },
];

const metrics = [
  { icon: Zap, label: "Page Speed", value: 92, color: "text-chart-4" },
  { icon: Search, label: "SEO Score", value: 88, color: "text-chart-2" },
  { icon: Smile, label: "UX Score", value: 84, color: "text-chart-3" },
  { icon: Target, label: "Conversion", value: 79, color: "text-primary" },
];

export function AIScoreCard() {
  const score = 87;

  return (
    <div className="glass-panel-glow p-4 sm:p-6 hover-lift">
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">AI Performance Score</h3>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-3xl sm:text-5xl font-display font-bold gradient-text">{score}</span>
            <span className="text-muted-foreground text-sm">/100</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-chart-4/20 text-chart-4 text-xs font-medium">
          <TrendingUp className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          +12%
        </div>
      </div>

      {/* Score Ring */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${score * 2.64} 264`}
            className="drop-shadow-[0_0_10px_rgba(230,0,122,0.5)]"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(330, 100%, 45%)" />
              <stop offset="100%" stopColor="hsl(280, 100%, 50%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-display font-bold">{score}</span>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="mb-4 sm:mb-6">
        <p className="text-xs text-muted-foreground mb-2">Last 7 days trend</p>
        <div className="h-12 sm:h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(330, 100%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(330, 100%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(330, 100%, 45%)"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {metrics.map((metric, index) => (
          <div key={index} className="p-2 sm:p-3 rounded-xl bg-muted/20">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <metric.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${metric.color}`} />
              <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{metric.label}</span>
            </div>
            <span className="text-base sm:text-lg font-semibold">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
