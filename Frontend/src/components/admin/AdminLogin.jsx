/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminAuth } from "../../features/auth/authSlice";
import axios from "axios";

const AdminLogin = () => {
  const { toast, navigate } = useContext(AppContext);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginAdmin = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post("/api/v1/admin/login", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        await dispatch(fetchAdminAuth());
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    LoginAdmin();
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center text-sm to-gray-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-emerald-600">Admin </span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            placeholder="Enter Email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
            type="text"
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
        <button className="bg-emerald-600 text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </div>
    </form>
  );
};

export default AdminLogin;
