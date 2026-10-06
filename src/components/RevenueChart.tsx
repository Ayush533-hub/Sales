import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData } from "../data";

const currency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export function RevenueChart() {
  return (
    <div className="chart-wrap revenue-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7667ed" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7667ed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#edf0f5" strokeDasharray="4 5" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9298a8", fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9298a8", fontSize: 12 }}
            tickFormatter={(value: number) => `$${value / 1000}k`}
            width={42}
          />
          <Tooltip
            contentStyle={{ border: "1px solid #eceef4", borderRadius: 12, boxShadow: "0 8px 28px #21284712" }}
            formatter={(value: number, name: string) => [currency(value), name === "revenue" ? "Revenue" : "Target"]}
          />
          <Area type="monotone" dataKey="target" stroke="#c5c9d5" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
          <Area type="monotone" dataKey="revenue" stroke="#7667ed" strokeWidth={3} fill="url(#revenueFill)" activeDot={{ r: 5, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
