/* eslint-disable react-hooks/exhaustive-deps */
import { MdError } from "react-icons/md";
import { assets } from "../../assets/assets";
import { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import adminApi from "../../api/adminApi";

const OrdersList = () => {
  const { toast } = useContext(AppContext);
  const [allOrders, setAllOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await adminApi.get("/orders/admin");
      if (response.status === 200) {
        setAllOrders(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await adminApi.patch(`/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = filter
    ? allOrders.filter((order) => order.orderStatus === filter)
    : allOrders;

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Orders List ({filteredOrders.length})
          </h2>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 text-sm rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {filteredOrders.length > 0 ? (
          <Fragment>
            {/* Orders */}
            {filteredOrders.map((order) => (
              <Fragment key={order._id}>
                <div className="flex flex-col md:flex-row md:items-center md:flex-wrap justify-between gap-5 p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white">
                  {/* Product Info */}
                  <p className="text-xs text-gray-500 w-full">
                    ID: {order._id}
                  </p>
                  <div className="flex gap-5 max-w-80">
                    <img
                      className="w-12 h-12 rounded-md object-cover border"
                      src={
                        order.items[0]?.product?.images[0] || assets.box_icon
                      }
                      alt="boxIcon"
                    />
                    <div>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex flex-col">
                          <p className="font-medium text-gray-800">
                            {item.product.name}{" "}
                            <span className="text-emerald-600">
                              x {item.quantity}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Item Status: {item.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            Sold by: {item.seller?.storeName || "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="text-sm md:text-base text-gray-600">
                    <p className="font-medium text-gray-800">
                      {order.shippingAddress.recipientName || "Unknown User"}
                    </p>
                    <p>
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},
                    </p>
                    <p>
                      {order.shippingAddress.state},{" "}
                      {order.shippingAddress.zipCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p>{order.shippingAddress.recipientPhone || "Unknown"}</p>
                  </div>

                  {/* Amount */}
                  <p className="font-semibold text-lg text-gray-900 my-auto">
                    ₹{order.totalAmount}
                  </p>

                  {/* Payment Info */}
                  <div className="flex flex-col text-sm text-gray-600">
                    <p>
                      Method:{" "}
                      <span className="font-medium text-gray-800">
                        {order.paymentMethod}
                      </span>
                    </p>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      Payment:{" "}
                      <span
                        className={`font-medium ${
                          order.paymentStatus === "Paid"
                            ? "text-emerald-600"
                            : "text-orange-500"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </p>
                  </div>

                  {/* Status */}
                  <div className="w-full flex items-center gap-2 mt-2 md:mt-0">
                    <p className="font-medium text-gray-700">Status:</p>
                    {order.orderStatus === "Delivered" ||
                    order.orderStatus === "Cancelled" ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    ) : (
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </Fragment>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center gap-2 max-w-md bg-gray-100 text-gray-600 px-4 py-3 rounded-md">
              <MdError className="text-2xl text-gray-500" />
              <p className="text-sm md:text-base">
                No {filter.toLowerCase()} orders found on this platform.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
