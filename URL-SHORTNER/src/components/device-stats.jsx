/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#60a5fa", // blue
  "#22d3ee", // cyan
  "#34d399", // teal
  "#fbbf24", // yellow
  "#a78bfa", // purple
];

const CustomTooltip = ({ active, payload }) => {
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
      <p className="font-semibold capitalize text-white">
        {payload[0].name}
      </p>
      <p className="text-zinc-400">
        {payload[0].value} clicks
      </p>
    </div>
  );
};

export default function DeviceStats({ stats = [] }) {
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
        No device data available yet
      </div>
    );
  }

  const deviceCount = stats.reduce((acc, item) => {
    const device = item.device || "unknown";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(deviceCount).map((device) => ({
    name: device,
    value: deviceCount[device],
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={4}
            cornerRadius={8}
            isAnimationActive
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-zinc-300 capitalize text-sm">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER LABEL */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          flex flex-col
          items-center justify-center
        "
      >
        <p className="text-sm text-zinc-400">Total</p>
        <p className="text-2xl font-extrabold text-white">
          {total}
        </p>
      </div>
    </div>
  );
}
