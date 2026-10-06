import { useState } from "react";
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
            <StatCard label="Total revenue" value="$48,294" change="12.8%" detail="vs. $42,812 last month" icon="chart" tone="purple" />
            <StatCard label="Total orders" value="1,284" change="8.2%" detail="vs. 1,186 last month" icon="box" tone="teal" />
            <StatCard label="New customers" value="426" change="4.6%" detail="vs. 407 last month" icon="users" tone="orange" />
            <StatCard label="Avg. order value" value="$37.61" change="2.4%" detail="vs. $36.73 last month" icon="arrow" tone="blue" />
          </section>

          <section className="charts-grid" aria-label="Sales analytics">
            <article className="panel revenue-panel">
              <div className="panel-heading">
                <div><h2>Revenue over time</h2><p>Track your store’s revenue and targets</p></div>
                <button type="button" className="select-button">This year <span>⌄</span></button>
              </div>
              <div className="chart-summary"><strong>$48,294</strong><span className="change-pill positive">↑ 12.8%</span><small>vs. last year</small></div>
              <div className="chart-key"><span><i className="key-dot revenue-key" />Revenue</span><span><i className="key-dot target-key" />Target</span></div>
              <RevenueChart />
            </article>

            <article className="panel channel-panel">
              <div className="panel-heading">
                <div><h2>Sales by channel</h2><p>Where your customers find you</p></div>
                <button type="button" className="more-button" aria-label="More channel options">···</button>
              </div>
              <ChannelChart />
              <div className="channel-footnote"><span className="footnote-arrow">↗</span><span><strong>Direct traffic is up 8%</strong><br />compared to last month</span></div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel product-panel">
              <div className="panel-heading">
                <div><h2>Top products</h2><p>Sales volume by product this week</p></div>
                <button type="button" className="select-button">This week <span>⌄</span></button>
              </div>
              <ProductChart />
            </article>
            <article className="insight-card">
              <span className="insight-orb">✦</span>
              <p className="eyebrow">WEEKLY INSIGHT</p>
              <h2>You’re on a roll!</h2>
              <p className="insight-copy">Your revenue is up <strong>12.8%</strong> this month. Keep it up — you’re trending ahead of your October goal.</p>
              <div className="goal-row"><span>Monthly goal</span><strong>$48,294 <small>/ $60,000</small></strong></div>
              <div className="progress-track"><span /></div>
              <div className="progress-footer"><span>80.5% of goal</span><span>12 days left</span></div>
              <button type="button" className="insight-link">View detailed report <span>→</span></button>
            </article>
          </section>

          <section className="panel orders-panel">
            <div className="panel-heading orders-heading">
              <div><h2>Recent orders</h2><p>You’ve received 1,284 orders this month</p></div>
              <button type="button" className="view-all-button">View all orders <span>→</span></button>
            </div>
            <OrdersTable />
          </section>
          <footer className="page-footer"><span>© 2024 Selly Inc.</span><span>Made for growing businesses <b>♥</b></span></footer>
        </div>
      </main>
      {mobileMenuOpen && <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />}
    </div>
  );
}
