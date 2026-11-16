import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContextDefinition";

const deliverySteps = ["Food Processing", "Out for delivery", "Delivered"];

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${url}/api/placeorder/userorders`,
        {},
        { headers: { token } }
      );

      if (!response.data.success) {
        setError(response.data.message || "Unable to load your orders.");
        return;
      }

      setOrders(response.data.data);
      setError("");
    } catch {
      setError("Unable to load your orders.");
    }
  }, [token, url]);

  useEffect(() => {
    if (!token) return undefined;

    const initialFetch = setTimeout(fetchOrders, 0);
    const refreshInterval = setInterval(fetchOrders, 3000);

    return () => {
      clearTimeout(initialFetch);
      clearInterval(refreshInterval);
    };
  }, [fetchOrders, token]);

  const getStepIndex = (status) => {
    const index = deliverySteps.indexOf(status);
    return index === -1 ? 0 : index;
  };

  if (error) {
    return <p className="mx-auto max-w-5xl py-20 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-1 py-12">
      {orders.length === 0 ? (
        <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-2xl bg-[#fafafa] px-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#fff0ed]">
            <img className="w-10 opacity-80" src={assets.parcel_icon} alt="" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-[#333]">No orders yet</h1>
          <p className="mt-2 text-[#777]">Your confirmed orders will appear here.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#333]">My Orders</h1>
              <p className="mt-2 text-[#777]">Follow every confirmed order from kitchen to doorstep.</p>
            </div>
            <span className="rounded-full bg-[#fff0ed] px-4 py-2 text-sm font-medium text-[tomato]">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {orders.map((order) => {
              const isTracking = selectedOrderId === order._id;
              const currentStep = getStepIndex(order.status);

              return (
                <article key={order._id} className="rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#f0f0f0] pb-5">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[#fff0ed]">
                        <img className="w-7" src={assets.parcel_icon} alt="" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-[#333]">Order #{order._id.slice(-8).toUpperCase()}</h2>
                        <p className="mt-1 text-sm text-[#888]">
                          {new Date(order.date).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#ecfdf3] px-3 py-1.5 text-xs font-semibold text-[#168451]">
                      Payment confirmed
                    </span>
                  </div>

                  <div className="grid gap-4 py-5 text-sm text-[#666] sm:grid-cols-[1fr_auto_auto] sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={`${order._id}-${item._id}`}
                            className="size-11 rounded-lg border-2 border-white object-cover"
                            src={`${url}/images/${item.image}`}
                            alt={item.name}
                          />
                        ))}
                      </div>
                      <p className="font-medium text-[#333]">
                        {order.items.map((item, index) => (
                          <span key={`${order._id}-${item._id}`}>
                            {item.name} × {item.quantity}{index < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                    <p>{order.items.length} item group(s)</p>
                    <p className="text-lg font-semibold text-[#333]">₹{order.amount}</p>
                  </div>

                  {isTracking && (
                    <div className="mb-5 rounded-xl bg-[#fafafa] px-4 py-5 sm:px-6">
                      <div className="mb-5 flex items-center justify-between">
                        <p className="font-semibold text-[#333]">Live delivery status</p>
                        <p className="text-sm font-medium text-[tomato]">{order.status}</p>
                      </div>
                      <div className="flex items-start">
                        {deliverySteps.map((step, index) => (
                          <div key={step} className="flex flex-1 items-start">
                            <div className="flex flex-1 flex-col items-center text-center">
                              <span className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${index <= currentStep ? "bg-[tomato] text-white" : "bg-[#e6e6e6] text-[#999]"}`}>
                                {index + 1}
                              </span>
                              <span className={`mt-2 text-xs ${index <= currentStep ? "font-semibold text-[#333]" : "text-[#999]"}`}>
                                {step}
                              </span>
                            </div>
                            {index < deliverySteps.length - 1 && (
                              <span className={`mt-4 h-0.5 flex-1 ${index < currentStep ? "bg-[tomato]" : "bg-[#e6e6e6]"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f0f0f0] pt-5">
                    <p className="text-sm text-[#777]">
                      {order.status === "Delivered" ? "Your order has been delivered." : "We are preparing your order."}
                    </p>
                    <button
                      type="button"
                      className="cursor-pointer rounded-lg bg-[tomato] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                      onClick={() => setSelectedOrderId(isTracking ? null : order._id)}
                      aria-expanded={isTracking}
                    >
                      {isTracking ? "Hide Tracking" : "Track Order"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default MyOrders;
