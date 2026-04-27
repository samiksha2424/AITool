import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import "./ForecastChart.css";

function dayLabel(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short" });
}

function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  const sym = unit === "celsius" ? "°C" : "°F";
  return (
    <div className="chart-tooltip">
      <p className="tooltip-day">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {Math.round(p.value)}{sym}
        </p>
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="forecast-card skeleton">
      <div className="sk-line sk-heading" />
      <div className="sk-line sk-chart" />
    </div>
  );
}

export default function ForecastChart({ forecast, unit, loading, error }) {
  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="forecast-card error-card">
        <p>Could not load forecast data.</p>
      </div>
    );
  }

  const chartData = forecast.map((d) => ({
    day: dayLabel(d.date),
    Max: Math.round(d.max),
    Min: Math.round(d.min),
  }));

  const sym = unit === "celsius" ? "°C" : "°F";

  return (
    <div className="forecast-card">
      <h2 className="forecast-title">7-Day Forecast</h2>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="maxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="minGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 13 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}${sym}`} />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "0.85rem", paddingTop: "0.5rem" }} />
          <Area
            type="monotone"
            dataKey="Max"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#maxGrad)"
            dot={{ fill: "#f97316", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Min"
            stroke="#38bdf8"
            strokeWidth={2}
            fill="url(#minGrad)"
            dot={{ fill: "#38bdf8", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
