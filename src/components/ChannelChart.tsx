import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Channel } from "../api";

export function ChannelChart({ data, visitors }: { data: Channel[]; visitors: string }) {
  return (
    <div className="channel-chart-layout">
      <div className="chart-wrap channel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="66%"
              outerRadius="92%"
              paddingAngle={4}
              stroke="none"
            >
              {data.map((channel) => <Cell key={channel.name} fill={channel.color} />)}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}%`, "Traffic share"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-total"><strong>{visitors}</strong><span>visitors</span></div>
      </div>
      <div className="channel-legend">
        {data.map((channel) => (
          <div className="legend-row" key={channel.name}>
            <span className="legend-label"><i style={{ background: channel.color }} />{channel.name}</span>
            <strong>{channel.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
