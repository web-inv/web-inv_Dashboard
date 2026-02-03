import { MousePointer } from "lucide-react";

const heatmapData = [
  [0.2, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6],
  [0.3, 0.4, 0.6, 0.8, 1.0, 0.9, 0.7],
  [0.4, 0.5, 0.7, 0.9, 0.8, 0.7, 0.5],
  [0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3],
  [0.2, 0.3, 0.4, 0.4, 0.4, 0.3, 0.2],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["9AM", "12PM", "3PM", "6PM", "9PM"];

export function EngagementHeatmap() {
  const getColor = (value: number) => {
    if (value >= 0.9) return "bg-primary";
    if (value >= 0.7) return "bg-primary/70";
    if (value >= 0.5) return "bg-primary/50";
    if (value >= 0.3) return "bg-primary/30";
    return "bg-primary/10";
  };

  return (
    <div className="glass-panel p-4 sm:p-6 hover-lift">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 rounded-xl bg-primary/20">
          <MousePointer className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-base sm:text-lg">Engagement Heatmap</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Peak activity times</p>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-[280px]">
          {/* Days Header */}
          <div className="flex gap-0.5 sm:gap-1 mb-1 pl-10 sm:pl-12">
            {days.map((day) => (
              <div key={day} className="flex-1 text-center text-[10px] sm:text-xs text-muted-foreground">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
          </div>

          {/* Heatmap Rows */}
          <div className="space-y-0.5 sm:space-y-1">
            {heatmapData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-0.5 sm:gap-1">
                <div className="w-9 sm:w-10 text-[10px] sm:text-xs text-muted-foreground text-right pr-1.5 sm:pr-2">
                  {hours[rowIndex]}
                </div>
                <div className="flex-1 flex gap-0.5 sm:gap-1">
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className={`flex-1 h-6 sm:h-8 rounded-md ${getColor(value)} transition-all hover:scale-105 cursor-pointer`}
                      title={`${days[colIndex]} ${hours[rowIndex]}: ${Math.round(value * 100)}% engagement`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Low</span>
            <div className="flex gap-0.5 sm:gap-1">
              <div className="w-4 sm:w-6 h-2 sm:h-3 rounded bg-primary/10" />
              <div className="w-4 sm:w-6 h-2 sm:h-3 rounded bg-primary/30" />
              <div className="w-4 sm:w-6 h-2 sm:h-3 rounded bg-primary/50" />
              <div className="w-4 sm:w-6 h-2 sm:h-3 rounded bg-primary/70" />
              <div className="w-4 sm:w-6 h-2 sm:h-3 rounded bg-primary" />
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
