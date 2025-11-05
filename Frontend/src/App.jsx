import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import Order from "./pages/Order";
import SellerLogin from "./components/seller/SellerLogin";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/seller/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import SellersList from "./pages/admin/SellersList";
import AddCategory from "./pages/admin/AddCategory";
import CategoryList from "./pages/admin/CategoryList";
import OrdersList from "./pages/admin/OrdersList";
import EditCategory from "./pages/admin/EditCategory";
import EditProduct from "./pages/seller/EditProduct";
import EditProductDetails from "./pages/seller/EditProductDetails";
import EditProjectImages from "./pages/seller/EditProjectImages";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import EditSellerDetails from "./pages/seller/EditSellerDetails";
import ChangePassword from "./pages/seller/ChangePassword";
import UserProfile from "./pages/UserProfile";
import Addresses from "./pages/Addresses";
import EditUserDetails from "./pages/EditUserDetails";
import ChangeUserPassword from "./pages/ChangeUserPassword";
import EditAddressDetails from "./pages/EditAddressDetails";
import ViewSeller from "./pages/ViewSeller";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const isAdminPath = useLocation().pathname.includes("admin");

  const showUserLogin = useSelector((state) => state.ui.showUserLogin);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <div className=" min-h-screen text-gray-700 bg-white">
      {isSellerPath || isAdminPath ? null : <Navbar />}
      {showUserLogin && <Login />}

      <Toaster />

      <div
        className={`${
          isSellerPath || isAdminPath ? "" : "px-6 md-px-16 lg:px-24 xl:px-32"
        } `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view/:sellerId" element={<ViewSeller />} />
          <Route
            path="/address"
            element={
              <ProtectedRoute>
                <AddAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-account"
            element={
              <ProtectedRoute>
                <EditUserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangeUserPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addresses/edit/:addressId"
            element={
              <ProtectedRoute>
                <EditAddressDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller"
            element={isSeller ? <SellerDashboard /> : <SellerLogin />}
          >
            <Route
              index
              element={isSeller ? <ProfilePage /> : <SellerLogin />}
            />
            <Route path="edit-seller" element={<EditSellerDetails />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="product-list/:productId" element={<EditProduct />} />
            <Route
              path="product-list/:productId/details"
              element={<EditProductDetails />}
            />
            <Route
              path="product-list/:productId/images"
              element={<EditProjectImages />}
            />
          </Route>
          <Route
            path="/admin"
            element={isAdmin ? <AdminLayout /> : <AdminLogin />}
          >
            <Route index element={isAdmin ? <SellersList /> : <AdminLogin />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="categories/:categoryId" element={<EditCategory />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {isSellerPath || isAdminPath ? null : <Footer />}
    </div>
  );
};

export default App;
