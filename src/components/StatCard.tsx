import { Icon } from "./Icon";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  detail: string;
  icon: "chart" | "box" | "users" | "arrow";
  tone: "purple" | "teal" | "orange" | "blue";
  positive?: boolean;
}

export function StatCard({ label, value, change, detail, icon, tone, positive = true }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon name={icon} /></div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row">
        <h2>{value}</h2>
        <span className={`change-pill ${positive ? "positive" : "negative"}`}>
          {positive ? "↑" : "↓"} {change}
        </span>
      </div>
      <p className="stat-detail">{detail}</p>
    </article>
  );
}
