import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProductPoint } from "../api";

export function ProductChart({ data }: { data: ProductPoint[] }) {
  return (
    <>
      <div className="product-legend">
        <span><i className="legend-dot headphones" />Headphones</span>
        <span><i className="legend-dot speakers" />Speakers</span>
        <span><i className="legend-dot watches" />Watches</span>
      </div>
      <div className="chart-wrap product-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={5} margin={{ top: 14, right: 4, left: -18, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#edf0f5" strokeDasharray="4 5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9298a8", fontSize: 12 }} dy={9} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9298a8", fontSize: 12 }} />
            <Tooltip contentStyle={{ border: "1px solid #eceef4", borderRadius: 12 }} />
            <Bar dataKey="headphones" name="Headphones" fill="#7667ed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="speakers" name="Speakers" fill="#26b8a5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="watches" name="Watches" fill="#f4ad55" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
