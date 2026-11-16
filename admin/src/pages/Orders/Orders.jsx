import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/placeorder/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error while fetching orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching orders");
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/placeorder/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating order status");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchAllOrders, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchAllOrders]);

  return (
    <div className="mx-auto w-full max-w-6xl text-[#667085]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[tomato]">Operations</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#243047]">Paid orders</h1>
          <p className="mt-2 text-sm text-[#8b94a7]">Review payment details and keep customers updated.</p>
        </div>
        <div className="rounded-2xl bg-white px-5 py-3 shadow-[0_6px_22px_rgba(36,48,71,0.06)]">
          <p className="text-xs text-[#8b94a7]">Confirmed orders</p>
          <p className="text-2xl font-semibold text-[#243047]">{orders.length}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d9deea] bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-[#243047]">No paid orders yet</p>
            <p className="mt-2 text-sm text-[#8b94a7]">Confirmed customer orders will appear here.</p>
          </div>
        )}
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-2xl border border-[#e8ebf2] bg-white p-5 shadow-[0_6px_22px_rgba(36,48,71,0.05)] sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#edf0f5] pb-5">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#fff0ed]">
                  <img className="w-7" src={assets.parcel_icon} alt="Order" />
                </div>
                <div>
                  <p className="font-semibold text-[#243047]">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="mt-1 text-xs text-[#8b94a7]">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-[#168451]">
                Payment confirmed
              </span>
            </div>
            <div className="grid gap-6 py-5 lg:grid-cols-[1.2fr_1fr_1fr]">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#9aa3b5]">Customer</p>
                <p className="font-semibold text-[#243047]">{order.address.firstName} {order.address.lastName}</p>
                <p className="mt-1 text-sm">{order.address.email}</p>
                <p className="mt-1 text-sm">{order.address.phone}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#9aa3b5]">Delivery address</p>
                <p className="text-sm">{order.address.street}, {order.address.city}</p>
                <p className="mt-1 text-sm">{order.address.state}, {order.address.country} - {order.address.zipcode}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#9aa3b5]">Payment summary</p>
                <p className="text-xl font-semibold text-[#243047]">₹{order.amount}</p>
                <p className="mt-1 text-sm">{order.items.length} item group(s)</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#edf0f5] pt-5">
              <p className="max-w-2xl text-sm text-[#667085]">
                {order.items.map((item, index) =>
                  `${item.name} x ${item.quantity}${index === order.items.length - 1 ? "" : ", "}`
                )}
              </p>
              <label className="flex items-center gap-3 text-sm font-semibold text-[#243047]">
                Delivery status
                <select
                  className="rounded-lg border border-[#d9deea] bg-white px-3 py-2 font-normal outline-none focus:border-[tomato]"
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
