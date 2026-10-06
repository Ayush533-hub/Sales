# Selly Sales Dashboard

A responsive sales analytics dashboard built with React, TypeScript, Vite, and Recharts. The dashboard page combines reusable interface components with example sales data to present a store's performance at a glance.

## Features

- Responsive dashboard layout with collapsible mobile navigation
- KPI cards for revenue, orders, new customers, and average order value
- Revenue and target area chart
- Traffic-channel donut chart
- Product sales grouped bar chart
- Recent orders table with customer and payment status
- Weekly goal insight card

All displayed figures are illustrative sample data stored in `src/data.ts`. The page is currently front-end only; the controls are presentational and are not connected to a backend.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Project structure

```text
src/
  components/
    ChannelChart.tsx
    DashboardPage.tsx
    Icon.tsx
    OrdersTable.tsx
    ProductChart.tsx
    RevenueChart.tsx
    StatCard.tsx
  App.tsx
  data.ts
  main.tsx
  styles.css
```

Chart datasets and order examples can be edited in `src/data.ts`. Individual chart and dashboard elements are kept as reusable components in `src/components/`.
