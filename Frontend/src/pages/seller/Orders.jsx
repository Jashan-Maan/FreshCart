/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { MdError } from "react-icons/md";
import sellerApi from "../../api/sellerApi";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { toast } = useContext(AppContext);
  const sellerData = useSelector((state) => state.auth.sellerData);

  const [filter, setFilter] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await sellerApi.get("/sellers/me/orders");
      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      console.log(error);
    }
  };

  const handleStatusUpdate = async (orderId, productId, status) => {
    try {
      const response = await sellerApi.patch(
        `/orders/${orderId}/item/${productId}`,
        { status }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (sellerData?.status === "Pending") {
    return (
      <div className="flex h-[95vh] items-center justify-center w-full">
        <div className="flex items-center justify-center gap-3 max-w-2xl bg-yellow-100 text-yellow-700 px-4 py-3 rounded-md shadow-sm">
          <MdError className="text-4xl" />
          <p className="text-base md:text-lg font-medium text-center">
            Your account is under review. You will be notified upon approval.
          </p>
        </div>
      </div>
    );
  }

  if (sellerData?.status === "Rejected") {
    return (
      <div className="flex h-[95vh] items-center justify-center w-full">
        <div className="flex items-center justify-center gap-3 max-w-2xl bg-red-100 text-red-600 px-4 py-3 rounded-md shadow-sm">
          <MdError className="text-4xl" />
          <p className="text-base md:text-lg font-medium text-center">
            Your account application was not approved. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  const filteredOrders = filter
    ? orders.filter((order) =>
        order.items.some((item) => item.status === filter)
      )
    : orders;

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

        {/* Orders */}
        {filteredOrders.length > 0 ? (
          <Fragment>
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
              >
                {/* Product Info */}
                <div className="flex gap-5 max-w-80">
                  <img
                    className="w-12 h-12 rounded-md object-cover border"
                    src={assets.box_icon}
                    alt="boxIcon"
                  />
                  <div>
                    {order.items
                      .filter(
                        (item) =>
                          item.seller.toString() === sellerData?._id.toString()
                      )
                      .map((item, index) => (
                        <div key={index} className="flex flex-col mb-2">
                          <p className="font-medium text-gray-800">
                            {item.product.name}{" "}
                            <span className="text-emerald-600">
                              x {item.quantity}
                            </span>
                          </p>

                          {/* Item Status Dropdown */}
                          <div className="flex items-center gap-2 mt-1">
                            {item.status === "Delivered" ||
                            item.status === "Cancelled" ? (
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  item.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            ) : (
                              <select
                                value={item.status}
                                disabled={
                                  item.status === "Delivered" ||
                                  item.status === "Cancelled"
                                }
                                className="text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                onChange={(e) =>
                                  handleStatusUpdate(
                                    order._id,
                                    item.product._id,
                                    e.target.value
                                  )
                                }
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
                      ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="text-sm md:text-base text-gray-600">
                  <p className="font-medium text-gray-800">
                    {order.shippingAddress.recipientName || "Unknown User"}
                  </p>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    ,
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
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
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
              </div>
            ))}
          </Fragment>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center gap-2 max-w-md bg-gray-100 text-gray-600 px-4 py-3 rounded-md">
              <MdError className="text-2xl text-gray-500" />
              <p className="text-sm md:text-base font-medium">
                Oops! You have no orders yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
