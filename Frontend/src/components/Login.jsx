import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addAndUpdateCart } from "../features/cart/cartSlice";
import { fetchUserAuth } from "../features/auth/authSlice";
import { setShowUserLogin } from "../features/ui/uiSlice";
import { selectAllProducts } from "../features/products/productSlice";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("login");
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { toast } = useContext(AppContext);

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const setLocalCartToDB = async () => {
    const localCart = JSON.parse(localStorage.getItem("cartItems"));
    if (localCart && localCart.length > 0) {
      toast.loading("Merging your guest cart");
      for (const item of localCart) {
        const fullProduct = products.find((p) => p._id === item.id);
        if (fullProduct) {
          await dispatch(
            addAndUpdateCart({ product: fullProduct, quantity: item.quantity })
          );
        }
      }
      localStorage.removeItem("cartItems");
      toast.dismiss();
      toast.success("Cart merged successfully");
    }
  };

  const registerUser = async () => {
    const data = {
      name,
      email,
      password,
      phoneNumber,
    };
    try {
      const response = await axios.post("/api/v1/users/register", data);
      if (response.status === 201) {
        toast.success(response.data.message);
        await dispatch(fetchUserAuth());
        await setLocalCartToDB();
        dispatch(setShowUserLogin(false));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
      );
    }
  };
  const loginUser = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post("/api/v1/users/login", data);
      if (response.status === 200) {
        await dispatch(fetchUserAuth());
        await setLocalCartToDB();
        dispatch(setShowUserLogin(false));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed. Please try again."
      );
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "register") await registerUser();
    else await loginUser();
  };

  return (
    <div
      onClick={() => {
        dispatch(setShowUserLogin(false));
      }}
      className=" w-full fixed top-0 bottom-0 left-0 rigth-0 z-30 flex justify-center item-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-emerald-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <div className="flex items-center justify-between border border-gray-200 rounded w-full p-2 mt-1 cursor-text transition-all focus-within:border-emerald-600 focus-within:ring-1">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="border-none outline-none flex-1 bg-transparent"
              type={hidePassword ? "password" : "text"}
              required
            />
            {hidePassword ? (
              <FaRegEye
                className="text-lg cursor-pointer text-gray-500"
                onClick={() => setHidePassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                className="text-lg cursor-pointer text-gray-500"
                onClick={() => setHidePassword(true)}
              />
            )}
          </div>
        </div>
        {state === "register" && (
          <div className="w-full">
            <p>Phone Number</p>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="Enter your phone number"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
              type="text"
              required
            />
          </div>
        )}
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-emerald-600 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-emerald-600 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-emerald-600 hover:bg-emerald-700 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
