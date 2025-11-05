import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { MdError, MdEdit, MdDelete } from "react-icons/md";
import sellerApi from "../../api/sellerApi";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { toast, navigate } = useContext(AppContext);
  const sellerData = useSelector((state) => state.auth.sellerData);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await sellerApi.get("/sellers/me/products");
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await sellerApi.delete(`/products/${productId}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchProducts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sellerData?.status === "Pending") {
    return (
      <div className="flex h-[95vh] items-center justify-center w-full">
        <div className="flex items-center justify-between max-w-2/4 w-full bg-red-600/20 text-red-600 px-3 py-1 rounded-sm">
          <div className="flex items-center">
            <MdError className="text-6xl md:text-4xl" />
            <p className="text-base md:text-xl ml-2">
              Your account is under review. You will be notified upon approval.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sellerData?.status === "Rejected") {
    return (
      <div className="flex h-[95vh] items-center justify-center w-full">
        <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded-sm">
          <div className="flex items-center">
            <MdError className="text-6xl md:text-4xl" />
            <p className="text-base md:text-xl ml-2">
              Your account application was not approved. Please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return products.length > 0 ? (
    <div className=" no-scrollbar flex-1 h-[95vh] overflow-y-scroll  flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category.name}</td>
                  <td className="px-4 py-3 max-md:hidden">
                    ₹{product.offerPrice || product.price}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-around text-xl">
                      <MdEdit
                        onClick={() =>
                          navigate(`/seller/product-list/${product._id}`)
                        }
                        className="text-emerald-600 cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-[95vh] items-center justify-center w-full">
      <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded-sm">
        <div className="flex items-center">
          <MdError className="text-xl md:text-2xl" />
          <p className="text-sm md:text-base ml-2">
            Oops! You have not uploaded products yet
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
