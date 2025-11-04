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
import ProductProvider from "../pages/productDetails/context/product/ProductProvider";
import AllProducts from "../components/AllProducts";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/products" element={<AllProducts />} />
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
        <Route path="/signin" element={<h1>signin</h1>} />
        <Route path="/signup" element={<h1>signup</h1>} />
        <Route path="/orders" element={<h1>orders</h1>} />
        <Route path="/cart" element={<h1>cart</h1>} />
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
