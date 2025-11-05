import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerAuth } from "../../features/auth/authSlice.js";
import axios from "axios";

const SellerLogin = () => {
  const { navigate, toast } = useContext(AppContext);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const dispatch = useDispatch();

  const [state, setState] = useState("login");
  const [hidePassword, setHidePassword] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const registerSeller = async () => {
    const data = {
      storeName,
      email,
      password,
      phoneNumber,
      address,
    };
    try {
      const response = await axios.post("/api/v1/sellers/register", data);
      if (response.status === 201) {
        toast.success(response.data.message);
        await dispatch(fetchSellerAuth());
        navigate("/seller");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const loginSeller = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post("/api/v1/sellers/login", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        await dispatch(fetchSellerAuth());
        navigate("/seller");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (state === "register") {
      registerSeller();
    } else {
      loginSeller();
    }
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm to-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-emerald-600">Seller</span>{" "}
            {state === "register" ? " Register" : " Login"}
          </p>

          {state === "register" && (
            <div className="w-full">
              <p>StoreName</p>
              <input
                onChange={(e) => setStoreName(e.target.value)}
                name="storeName"
                value={storeName}
                placeholder="Enter Store Name"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                type="text"
                required
              />
            </div>
          )}
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
          {state === "register" && (
            <>
              <div className="w-full">
                <p>Phone Number</p>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="Enter Phone Number"
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                  type="text"
                  required
                />
              </div>
              <p className="mx-auto">Address Details:</p>
              <div className="w-full grid sm:grid-cols-2 gap-2">
                <div>
                  <p>Street</p>
                  <input
                    onChange={handleAddressChange}
                    name="street"
                    value={address.street}
                    placeholder="Enter Street"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>City</p>
                  <input
                    onChange={handleAddressChange}
                    name="city"
                    value={address.city}
                    placeholder="Enter City"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="w-full grid sm:grid-cols-2 gap-2">
                <div>
                  <p>State</p>
                  <input
                    onChange={handleAddressChange}
                    name="state"
                    value={address.state}
                    placeholder="Enter State"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <p>zipCode</p>
                  <input
                    onChange={handleAddressChange}
                    name="zipCode"
                    value={address.zipCode}
                    placeholder="Enter zipCode"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <p>Country</p>
                <input
                  onChange={handleAddressChange}
                  name="country"
                  value={address.country}
                  placeholder="Enter Country"
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-emerald-600"
                  type="text"
                  required
                />
              </div>
            </>
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
          <button className="bg-emerald-600 text-white w-full py-2 rounded-md cursor-pointer">
            {state === "register" ? "Register" : "Login"}
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
