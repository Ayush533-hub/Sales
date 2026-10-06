import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { channelData } from "../data";

export function ChannelChart() {
  return (
    <div className="channel-chart-layout">
      <div className="chart-wrap channel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channelData}
              dataKey="value"
              nameKey="name"
              innerRadius="66%"
              outerRadius="92%"
              paddingAngle={4}
              stroke="none"
            >
              {channelData.map((channel) => <Cell key={channel.name} fill={channel.color} />)}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}%`, "Traffic share"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-total"><strong>24.8k</strong><span>visitors</span></div>
      </div>
      <div className="channel-legend">
        {channelData.map((channel) => (
          <div className="legend-row" key={channel.name}>
            <span className="legend-label"><i style={{ background: channel.color }} />{channel.name}</span>
            <strong>{channel.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
