import { useEffect, useState } from "react";
import { fetchDashboardData } from "../api";
import type { DashboardData } from "../api";
import { ChannelChart } from "./ChannelChart";
import { Icon } from "./Icon";
import { OrdersTable } from "./OrdersTable";
import { ProductChart } from "./ProductChart";
import { RevenueChart } from "./RevenueChart";
import { StatCard } from "./StatCard";

const navigation = [
  { label: "Overview", icon: "grid" as const, active: true },
  { label: "Analytics", icon: "chart" as const },
  { label: "Products", icon: "box" as const },
  { label: "Customers", icon: "users" as const },
];

export function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    fetchDashboardData()
      .then((data) => {
        if (isCurrentRequest) {
          setDashboard(data);
          setLoadError(null);
        }
      })
      .catch((error: unknown) => {
        if (isCurrentRequest) {
          setLoadError(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [retry]);

  if (!dashboard) {
    return (
      <main className="api-state" aria-live="polite">
        <div>
          <span className="brand-mark"><span /><span /><span /></span>
          <h1>{loadError ? "Could not load dashboard" : "Loading dashboard…"}</h1>
          <p>{loadError || "Connecting to the sales API."}</p>
          {loadError && <button type="button" className="button button-primary" onClick={() => setRetry((attempt) => attempt + 1)}>Try again</button>}
        </div>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <a className="brand" href="#" aria-label="Selly home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>selly<span className="brand-period">.</span></span>
        </a>
        <div className="workspace-switcher">
          <div className="workspace-logo">S</div>
          <div><strong>Studio North</strong><span>Workspace</span></div>
          <span className="switch-chevron">⌄</span>
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a className={`nav-item ${item.active ? "active" : ""}`} href="#" key={item.label}>
              <Icon name={item.icon} /><span>{item.label}</span>
              {item.label === "Products" && <span className="nav-count">12</span>}
            </a>
          ))}
        </nav>
        <p className="nav-caption tools-caption">TOOLS</p>
        <nav className="main-nav" aria-label="Tools">
          <a className="nav-item" href="#"><Icon name="settings" /><span>Settings</span></a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-sparkle">✳</span>
            <strong>Need a hand?</strong>
            <p>Our team is here to help you grow.</p>
            <button type="button">Visit help center <span>↗</span></button>
          </div>
          <button type="button" className="profile">
            <span className="profile-avatar">JD</span>
            <span className="profile-copy"><strong>Jordan Davis</strong><small>jordan@studionorth.co</small></span>
            <span className="profile-dots">···</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu-button" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">
            <Icon name="menu" />
          </button>
          <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Overview</strong></div>
          <div className="topbar-actions">
            <button className="icon-button search-button" type="button" aria-label="Search"><Icon name="search" /></button>
            <button className="icon-button notification-button" type="button" aria-label="Notifications"><Icon name="bell" /><i /></button>
            <span className="topbar-divider" />
            <span className="topbar-date">Tuesday, October 29</span>
            <span className="mini-avatar">JD</span>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">YOUR BUSINESS AT A GLANCE</p>
              <h1>Good morning, Jordan <span className="wave">✦</span></h1>
              <p className="heading-subtitle">Here’s what’s happening with your store today.</p>
            </div>
            <div className="heading-actions">
              <button type="button" className="button button-secondary"><Icon name="calendar" /> Oct 1 – Oct 31, 2024 <span className="button-chevron">⌄</span></button>
              <button type="button" className="button button-primary"><Icon name="download" /> Export report</button>
            </div>
          </section>

          <section className="stats-grid" aria-label="Key performance indicators">
            {dashboard.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </section>

          <section className="charts-grid" aria-label="Sales analytics">
            <article className="panel revenue-panel">
              <div className="panel-heading">
                <div><h2>Revenue over time</h2><p>Track your store’s revenue and targets</p></div>
                <button type="button" className="select-button">This year <span>⌄</span></button>
              </div>
              <div className="chart-summary"><strong>{dashboard.revenue.summary}</strong><span className="change-pill positive">↑ {dashboard.revenue.change}</span><small>vs. last year</small></div>
              <div className="chart-key"><span><i className="key-dot revenue-key" />Revenue</span><span><i className="key-dot target-key" />Target</span></div>
              <RevenueChart data={dashboard.revenue.series} />
            </article>

            <article className="panel channel-panel">
              <div className="panel-heading">
                <div><h2>Sales by channel</h2><p>Where your customers find you</p></div>
                <button type="button" className="more-button" aria-label="More channel options">···</button>
              </div>
              <ChannelChart data={dashboard.channels.data} visitors={dashboard.channels.visitors} />
              <div className="channel-footnote"><span className="footnote-arrow">↗</span><span><strong>{dashboard.channels.insight}</strong><br />compared to last month</span></div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel product-panel">
              <div className="panel-heading">
                <div><h2>Top products</h2><p>Sales volume by product this week</p></div>
                <button type="button" className="select-button">This week <span>⌄</span></button>
              </div>
              <ProductChart data={dashboard.products} />
            </article>
            <article className="insight-card">
              <span className="insight-orb">✦</span>
              <p className="eyebrow">WEEKLY INSIGHT</p>
              <h2>You’re on a roll!</h2>
              <p className="insight-copy">Your revenue is up <strong>{dashboard.insight.revenueChange}</strong> this month. Keep it up — you’re trending ahead of your October goal.</p>
              <div className="goal-row"><span>Monthly goal</span><strong>{dashboard.insight.revenue} <small>/ {dashboard.insight.goal}</small></strong></div>
              <div className="progress-track"><span style={{ width: `${dashboard.insight.progress}%` }} /></div>
              <div className="progress-footer"><span>{dashboard.insight.progress}% of goal</span><span>{dashboard.insight.daysLeft} days left</span></div>
              <button type="button" className="insight-link">View detailed report <span>→</span></button>
            </article>
          </section>

          <section className="panel orders-panel">
            <div className="panel-heading orders-heading">
              <div><h2>Recent orders</h2><p>You’ve received {dashboard.orders.count} orders this month</p></div>
              <button type="button" className="view-all-button">View all orders <span>→</span></button>
            </div>
            <OrdersTable orders={dashboard.orders.recent} />
          </section>
          <footer className="page-footer"><span>© 2024 Selly Inc.</span><span>Made for growing businesses <b>♥</b></span></footer>
        </div>
      </main>
      {mobileMenuOpen && <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />}
    </div>
  );
}
