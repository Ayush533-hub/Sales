# Selly Sales Dashboard

A responsive sales analytics dashboard built with React, TypeScript, Vite, and Recharts. The Vite frontend loads dashboard data from an Express API. Both services use illustrative sample data; no database or real sales integrations are configured.

## Features

- Responsive dashboard layout with collapsible mobile navigation
- KPI cards for revenue, orders, new customers, and average order value
- Revenue and target area chart, traffic-channel donut chart, and product sales bar chart
- Recent orders table and weekly goal insight
- Express API with a health check and configurable CORS allowlist

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Local setup

Install the frontend dependencies from the repository root and the API dependencies from its folder:

```sh
npm install
npm --prefix backend install
```

Start the API and frontend in separate terminals:

```sh
npm run dev:api
```

```sh
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the API at `http://localhost:3001`. To check the API directly, visit `http://localhost:3001/health`.

## Deploy the frontend to Vercel

1. Push this repository to GitHub and import it into Vercel. Use the repository root as the project root; Vercel uses `npm run build` as the build command and `dist` as the output directory for Vite. The build script calls both CLIs through Node directly.
2. Deploy once to get the frontend's production domain, for example `https://your-sales-dashboard.vercel.app`. The API will not load until the Render service is configured in the next steps.

## Deploy the API to Render

1. Create a **Blueprint** on Render for the same GitHub repository. Render reads `render.yaml`, which configures the web service root as `backend`, its start command, and `/health` health check.
2. When prompted for `CORS_ORIGIN`, enter the production Vercel origin from the previous step, without a trailing slash. For more than one allowed frontend origin, separate origins with commas.
3. Deploy the service and verify its health check at `https://<your-render-service>.onrender.com/health`. The dashboard endpoint is `/api/dashboard`.

## Connect Vercel to Render

1. In Vercel project settings, add `VITE_API_URL` with the Render service origin, for example `https://your-sales-dashboard-api.onrender.com` (no trailing slash).
2. Redeploy the Vercel frontend so the new build includes the API URL.

The Vercel production domain must match an origin in Render's `CORS_ORIGIN` setting. If either production URL changes, update the corresponding environment variable and redeploy/restart the affected service.

## Production build

Build the frontend:

```sh
npm run build
```

Preview the production frontend locally:

```sh
npm run preview
```

## API

- `GET /health` — service health status
- `GET /api/dashboard` — KPI, chart, insight, and recent-order data

Sample response data is maintained in `backend/data.js`. The frontend API request and response types are in `src/api.ts`; API connection errors are shown on the dashboard with a retry action.

## Project structure

```text
backend/
  data.js
  server.js
  package.json
render.yaml
src/
  components/
  api.ts
  App.tsx
  main.tsx
  styles.css
```
