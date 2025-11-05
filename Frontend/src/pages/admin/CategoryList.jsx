/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit, MdError } from "react-icons/md";
import adminApi from "../../api/adminApi";
import { AppContext } from "../../context/AppContext";

const CategoryList = () => {
  const { toast, navigate } = useContext(AppContext);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await adminApi.get("/categories");
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await adminApi.delete(`/categories/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories.length > 0 ? (
    <div className=" no-scrollbar flex-1 h-[95vh] overflow-y-scroll  flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Categories</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Image</th>
                <th className="px-4 py-3 font-semibold truncate">Name</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Background Color
                </th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={category.image}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3 max-md:hidden">
                    <div
                      className="w-8 h-8 ml-8"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-around text-xl">
                      <MdEdit
                        onClick={() =>
                          navigate(`/admin/categories/${category._id}`)
                        }
                        className="text-emerald-600 cursor-pointer"
                      />
                      <MdDelete
                        onClick={() => handleDeleteCategory(category._id)}
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
            Oops! There is no category to show
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
