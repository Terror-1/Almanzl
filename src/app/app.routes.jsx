import { Routes, Route } from "react-router-dom";

// Admin Dashboard Pages
import DashboardLayout from "../pages/admin-dashboard/components/layout/DashboardLayout";
import Products from "../pages/admin-dashboard/Products";
import Orders from "../pages/admin-dashboard/Orders";
import Dashboard from "../pages/admin-dashboard/Dashboard";
import Categories from "../pages/admin-dashboard/Categories";
import AddCategory from "../pages/admin-dashboard/AddCategory";
import AddProduct from "../pages/admin-dashboard/AddProduct";
import UsersTable from "../pages/admin-dashboard/components/tables/Users";
import MainLayout from "./Layout/MainLayout";
import NotFound from "../components/NotFound";
import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";
import Checkout from "../pages/checkout/Checkout";
import Cart from "../pages/cart/Cart";
import SuccessPayment from "../pages/checkout/SuccessPayment";
import CancelPayment from "../pages/checkout/CancelPayment";
import SucessCashPayment from "../pages/checkout/SuccessCashPayment";
import ProductProvider from "../pages/productDetails/context/product/ProductProvider";
import HomePage from "../pages/HomePage";
import Login from "../pages/authentication/pages/Login";
import Signup from "../pages/authentication/pages/Signup";
import ForgotPassword from "../pages/authentication/pages/ForgotPassword";
import ResetPassword from "../pages/authentication/pages/ResetPassword";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<h1>products</h1>} />
        <Route
          path="/products/:id"
          element={
            <ProductProvider>
              <ProductDetailsPage />
            </ProductProvider>
          }
        />
        <Route path="/contact" element={<h1>contact</h1>} />
        <Route path="/about" element={<h1>about</h1>} />
        <Route path="/profile" element={<h1>profile</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/orders" element={<h1>orders</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<SuccessPayment />} />
        <Route path="/payment-success-cash" element={<SucessCashPayment />} />
        <Route path="/payment-cancel" element={<CancelPayment />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

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

      <Route path="*" element={<NotFound></NotFound>} />
    </Routes>
  );
}

export default AppRoutes;
