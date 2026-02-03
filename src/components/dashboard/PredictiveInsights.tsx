import { Brain, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const forecastData = [
  { month: "Jan", actual: 12000, predicted: null },
  { month: "Feb", actual: 14500, predicted: null },
  { month: "Mar", actual: 13800, predicted: null },
  { month: "Apr", actual: 16200, predicted: null },
  { month: "May", actual: 18900, predicted: null },
  { month: "Jun", actual: 21000, predicted: 21000 },
  { month: "Jul", actual: null, predicted: 24500 },
  { month: "Aug", actual: null, predicted: 28000 },
  { month: "Sep", actual: null, predicted: 31500 },
];

const predictions = [
  {
    icon: Users,
    label: "Traffic Growth",
    current: "21K",
    predicted: "31.5K",
    growth: "+50%",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: ShoppingCart,
    label: "Conversion Rate",
    current: "3.2%",
    predicted: "4.8%",
    growth: "+50%",
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
  },
];

export function PredictiveInsights() {
  return (
    <div className="glass-panel p-4 sm:p-6 hover-lift">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 rounded-xl bg-chart-2/20">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-chart-2" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-base sm:text-lg">Predictive Insights</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">AI-driven 3-month forecast</p>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="h-36 sm:h-48 mb-4 sm:mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              tickFormatter={(value) => `${value / 1000}K`}
              width={35}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "white" }}
              formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`, ""]}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(330, 100%, 45%)"
              strokeWidth={2}
              dot={{ fill: "hsl(330, 100%, 45%)", strokeWidth: 0, r: 3 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(280, 100%, 50%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(280, 100%, 50%)", strokeWidth: 0, r: 3 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 sm:w-6 h-0.5 bg-primary rounded-full" />
          <span className="text-[10px] sm:text-xs text-muted-foreground">Actual</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 sm:w-6 h-0.5 bg-chart-2 rounded-full" style={{ background: "repeating-linear-gradient(90deg, hsl(280, 100%, 50%) 0, hsl(280, 100%, 50%) 4px, transparent 4px, transparent 8px)" }} />
          <span className="text-[10px] sm:text-xs text-muted-foreground">Predicted</span>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {predictions.map((pred, index) => (
          <div key={index} className="p-3 sm:p-4 rounded-xl bg-muted/20">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${pred.bgColor}`}>
                <pred.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${pred.color}`} />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">{pred.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Current</p>
                <p className="text-base sm:text-lg font-semibold">{pred.current}</p>
              </div>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-chart-4" />
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Predicted</p>
                <p className="text-base sm:text-lg font-semibold">{pred.predicted}</p>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[10px] sm:text-xs font-medium text-chart-4 bg-chart-4/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {pred.growth} in 3 months
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
