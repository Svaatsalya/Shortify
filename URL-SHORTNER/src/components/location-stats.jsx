/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-xl
        bg-black/90
        border border-white/10
        px-4 py-2
        text-sm
        shadow-lg
      "
    >
      <p className="font-semibold text-white truncate">{label}</p>
      <p className="text-zinc-400">
        {payload[0].value} clicks
      </p>
    </div>
  );
};

export default function LocationStats({ stats = [] }) {
  if (!stats.length) {
    return (
      <div
        className="
          flex items-center justify-center
          h-[240px]
          text-zinc-400 text-sm
          rounded-xl
          border border-white/10
          bg-white/5
        "
      >
        No location data available yet
      </div>
    );
  }

  const cityCount = stats.reduce((acc, item) => {
    const city = item.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cities = Object.entries(cityCount)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="w-full h-[260px] sm:h-[320px]">
      <ResponsiveContainer>
        <LineChart
          data={cities}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.06)"
          />

          <XAxis
            dataKey="city"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="count"
            stroke="url(#locationGradient)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#38bdf8",
              strokeWidth: 2,
              stroke: "#0f172a",
            }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />

          {/* Gradient */}
          <defs>
            <linearGradient
              id="locationGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
