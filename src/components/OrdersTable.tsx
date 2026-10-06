import type { Order } from "../api";

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td>
                <span className="customer-cell">
                  <span className="avatar">{order.initials}</span>{order.customer}
                </span>
              </td>
              <td>{order.product}</td>
              <td>{order.date}</td>
              <td className="amount">{order.amount}</td>
              <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
