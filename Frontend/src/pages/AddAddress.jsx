import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import userApi from "../api/userApi";
import { AppContext } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserLogin } from "../features/ui/uiSlice";

// Custom input field component used for address form fields
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-emerald-600 transition"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

/**
 * AddAddress Page Component
 * Allows registered users to add a new shipping address to their account.
 * Handles form state, verification of user authentication status,
 * and calling the user address creation API endpoint.
 */
const AddAddress = () => {
  const { toast, navigate } = useContext(AppContext);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // Local state to store new address form details
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    addressType: "",
    isDefault: false,
  });

  // Handle updates to address fields (including checkboxes)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: checked,
      }));
    } else {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    }
  };

  // Submit the form and dispatch details to the backend API
  const onSumbitHandler = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated before allowing address creation
    if (!userData) {
      toast.error("You must be logged in to save address");
      navigate("/");
      scrollTo(0, 0);
      dispatch(setShowUserLogin(true));
      return;
    }

    // Ensure address type is selected
    if (address.addressType === "") {
      toast.error("Please select addressType");
      return;
    }

    // Format the address payload for backend consumption
    const data = {
      recipientName: address.firstName + " " + address.lastName,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      recipientPhone: address.phone,
      addressType: address.addressType,
      isDefault: address.isDefault,
    };
    try {
      const response = await userApi.post("/addresses", data);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/addresses");
        scrollTo(0, 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save address details"
      );
    }
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping{" "}
        <span className="font-semibold text-emerald-600">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 ">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSumbitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-6">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipCode"
                type="text"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />
            <select
              className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-emerald-600 transition"
              value={address.addressType}
              onChange={handleChange}
              name="addressType"
            >
              <option value="">Select your Address Type</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
            <div className="w-full flex items-center justify-start gap-2">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={address.isDefault}
                onChange={handleChange}
              />
              <label htmlFor="isDefault">Is this is your default address</label>
            </div>
            <button className="w-full mt-6 bg-emerald-600 text-white py-3 hover:bg-emerald-700 transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
