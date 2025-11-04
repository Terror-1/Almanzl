import "./App.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./app.routes";
import { AuthProvider } from "../pages/authentication/context/AuthProvider";
import { SearchProvider } from "../context/search/SearchContext";
import { ProductsProvider } from "../context/product/ProductContext";

function App() {
    return (
        <Router>
            <AuthProvider>
                <SearchProvider>
                    <ProductsProvider>
                        <ToastContainer position="top-right" autoClose={3000} />
                        <AppRoutes />
                    </ProductsProvider>
                </SearchProvider>
            </AuthProvider>
        </Router>
    );
}
export default App;