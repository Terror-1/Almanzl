import "./App.css";
// import Navbar from "../components/Navbar";
import DashboardLayout from "../pages/admin-dashboard/components/layout/DashboardLayout";
// import SubNav from "../components/SubNav";
// import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";
import Products from "../pages/admin-dashboard/Products";
// import Dashboard from "../pages/admin-dashboard/Dashboard";
// import Categories from "../pages/admin-dashboard/Categories";
// import AddCategory from "../pages/admin-dashboard/AddCategory";
// import AddProduct from "../pages/admin-dashboard/AddProduct";
// import UsersTable from "../pages/admin-dashboard/components/tables/Users";
import Orders from "../pages/admin-dashboard/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <DashboardLayout>
        <Orders />
      </DashboardLayout>
    </>
  );
}
export default App;
