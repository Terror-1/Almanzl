import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import DashboardLayout from "../pages/admin-dashboard/components/layout/DashboardLayout";
import HomePage from "../pages/HomePage";
import AllProducts from "../components/AllProducts";
import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";
import ProductProvider from "../pages/productDetails/context/product/ProductProvider";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import SuccessPayment from "../pages/checkout/SuccessPayment";
import CancelPayment from "../pages/checkout/CancelPayment";
import SucessCashPayment from "../pages/checkout/SuccessCashPayment";
import Profile from "../pages/ProfilePage";
import Contact from "../pages/Contact/contact";
import AboutUs from "../pages/aboutUs/aboutUs";
import Login from "../pages/authentication/pages/Login";
import Signup from "../pages/authentication/pages/Signup";
import ForgotPassword from "../pages/authentication/pages/ForgotPassword";
import ResetPassword from "../pages/authentication/pages/ResetPassword";
import CategoryPage from "../pages/CategoryPage";

import NotFound from "../components/NotFound";
import UnAuthorized from "../components/UnAuthorized";
import ProtectedRoutes from "./ProtectedRoutes";

import Dashboard from "../pages/admin-dashboard/Dashboard";
import Products from "../pages/admin-dashboard/Products";
import Orders from "../pages/admin-dashboard/Orders";
import Categories from "../pages/admin-dashboard/Categories";
import AddCategory from "../pages/admin-dashboard/AddCategory";
import AddProduct from "../pages/admin-dashboard/AddProduct";
import UsersTable from "../pages/admin-dashboard/components/tables/Users";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route
          path="/products/:id"
          element={
            <ProductProvider>
              <ProductDetailsPage />
            </ProductProvider>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/orders" element={<h1>orders</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<SuccessPayment />} />
        <Route path="/payment-success-cash" element={<SucessCashPayment />} />
        <Route path="/payment-cancel" element={<CancelPayment />} />

        {/* User routes */}
        <Route element={<ProtectedRoutes userOnly />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoutes adminOnly />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="add" element={<AddCategory />} />
          </Route>
          <Route path="users" element={<UsersTable />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
