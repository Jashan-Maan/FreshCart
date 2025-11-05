/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { AppContext } from "../../context/AppContext";
import { MdVerified } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";

const SellersList = () => {
  const { toast } = useContext(AppContext);
  const [sellersData, setSellersData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [filteredSellers, setFiltereSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await adminApi.get("/sellers");
      if (response.status === 200) {
        setSellersData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const updateStatusCall = async (id, status, isVerified) => {
    const data = { status, isVerified };
    try {
      const response = await adminApi.patch(`/sellers/${id}/status`, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchSellers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (status === "") {
      setFiltereSellers(sellersData);
      return;
    }
    setFiltereSellers(sellersData.filter((seller) => seller.status === status));
  }, [status, sellersData]);

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-start justify-evenly gap-4 p-4 w-full h-[95vh]">
        <div className="w-full min-w-full flex items-center justify-between gap-2">
          <p
            className="text-2xl font-medium
        "
          >
            Sellers List
          </p>
          <select
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
            value={status}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        {filteredSellers.length === 0 && (
          <div>
            <p className="text-2xl font-medium">No Sellers Found</p>
          </div>
        )}

        {filteredSellers.map((seller) => (
          <div
            key={seller._id}
            className="bg-white rounded-2xl pb-4 overflow-hidden border border-gray-500/30 cursor-pointer"
          >
            <img
              className="w-64 h-52 object-cover object-top"
              src={seller.storeImage}
              alt="userImage2"
            />
            <div className="flex flex-col items-center">
              <p className="font-medium mt-3 flex items-center gap-1">
                {seller.storeName}
                {seller.isVerified && (
                  <MdVerified className="text-emerald-500" />
                )}
              </p>
              <p className="text-gray-500 text-sm">{seller.email}</p>
              <p className="text-gray-500 text-sm">{seller.phoneNumber}</p>

              {seller.status === "Approved" && (
                <button className="border text-sm cursor-pointer border-gray-500/30 w-4/5 px-4 py-2 rounded-full mt-5 text-emerald-600">
                  Approved
                </button>
              )}
              {seller.status === "Rejected" && (
                <button className="border text-sm cursor-pointer text-red-500 border-gray-500/30 w-4/5 px-4 py-2 rounded-full mt-5">
                  Rejected
                </button>
              )}
              {seller.status === "Pending" && (
                <div className="border text-sm text-gray-500 border-gray-500/30 w-4/5 px-4 py-2 rounded-full mt-5">
                  <div className="flex items-center justify-between text-base">
                    <p>Pending</p>
                    <div className="flex items-center justify-start gap-4">
                      <FaCheck
                        onClick={() =>
                          updateStatusCall(seller._id, "Approved", true)
                        }
                        className="text-emerald-600 cursor-pointer"
                      />
                      <FcCancel
                        onClick={() =>
                          updateStatusCall(seller._id, "Rejected", false)
                        }
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellersList;
