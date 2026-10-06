export interface Stat {
  label: string;
  value: string;
  change: string;
  detail: string;
  icon: "chart" | "box" | "users" | "arrow";
  tone: "purple" | "teal" | "orange" | "blue";
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
}

export interface Channel {
  name: string;
  value: number;
  color: string;
}

export interface ProductPoint {
  name: string;
  headphones: number;
  speakers: number;
  watches: number;
}

export interface Order {
  id: string;
  customer: string;
  initials: string;
  product: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
}

export interface DashboardData {
  stats: Stat[];
  revenue: {
    summary: string;
    change: string;
    series: RevenuePoint[];
  };
  channels: {
    visitors: string;
    insight: string;
    data: Channel[];
  };
  products: ProductPoint[];
  insight: {
    revenueChange: string;
    revenue: string;
    goal: string;
    progress: number;
    daysLeft: number;
  };
  orders: {
    count: string;
    recent: Order[];
  };
}

const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${apiBaseUrl}/api/dashboard`);
  if (!response.ok) {
    throw new Error(`Dashboard API returned ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<DashboardData>;
}
