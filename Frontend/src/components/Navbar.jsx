import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import userApi from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../features/auth/authSlice";
import { selectCartCount } from "../features/cart/cartSlice";
import { setSearchQuery, setShowUserLogin } from "../features/ui/uiSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { navigate, toast } = useContext(AppContext);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const getCartCount = useSelector(selectCartCount);
  const searchQuery = useSelector((state) => state.ui.searchQuery);

  const logout = async () => {
    try {
      const response = await userApi.post("/users/logout");
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(clearUserData());
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  // const onSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.length > 0) {
  //     navigate("/products");
  //   }
  // };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink onClick={() => setOpen(false)} to="/">
        <div className="flex items-center">
          <img className="h-7 md:h-11" src="/images/image.png" alt="logo" />
          <h1 className="text-xl md:text-2xl font-bold text-green-900">
            <span className="text-green-600">Fresh</span>Cart
          </h1>
        </div>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <form
          // onSubmit={onSearchSubmit}
          className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full"
        >
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            value={searchQuery}
          />
          <IoSearchOutline className="text-lg text-gray-500" />
        </form>

        <div
          onClick={() => {
            setOpen(false);
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <FiShoppingCart className="text-xl text-emerald-600 opacity-75" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-emerald-600 w-[18px] h-[18px] rounded-full">
            {getCartCount}
          </button>
        </div>

        {!userData ? (
          <button
            onClick={() => {
              dispatch(setShowUserLogin(true));
            }}
            className="cursor-pointer px-8 py-2 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <img
              src={userData?.avatar}
              className="w-8 rounded-full h-8 object-cover"
              alt="profile"
            />
            <ul className="hidden group-hover:block absolute top-8 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("/account")}
                className="p-1.5 pl-3 hover:bg-emerald-600/10 cursor-pointer"
              >
                My Profile
              </li>
              <li
                onClick={() => navigate("/addresses")}
                className="p-1.5 pl-3 hover:bg-emerald-600/10 cursor-pointer"
              >
                Address Book
              </li>
              <li
                onClick={() => navigate("/orders")}
                className="p-1.5 pl-3 hover:bg-emerald-600/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-emerald-600/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-6 items-center sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <FiShoppingCart className="text-xl text-emerald-600 opacity-75" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-emerald-600 w-[18px] h-[18px] rounded-full">
            {getCartCount}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=" cursor-pointer"
        >
          {/* Menu Icons*/}
          <RiMenu3Line className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <NavLink to="/" className="block" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className="block"
          onClick={() => setOpen(false)}
        >
          All Products
        </NavLink>
        {userData && (
          <>
            <NavLink
              to="/account"
              className="block"
              onClick={() => setOpen(false)}
            >
              My Profile
            </NavLink>
            <NavLink
              to="/orders"
              className="block"
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
            <NavLink
              to="/addresses"
              className="block"
              onClick={() => setOpen(false)}
            >
              Address Book
            </NavLink>
          </>
        )}
        <NavLink to="/contact" className="block" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
        {!userData ? (
          <button
            onClick={() => {
              setOpen(false);
              dispatch(setShowUserLogin(true));
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
