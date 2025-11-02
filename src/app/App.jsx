import "./App.css";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";
import GetProductDetailsProvider from "../pages/productDetails/context/getProductDetails/GetProductDeatilsProvider";

function App() {
  return (
    <>
      <Navbar />
      <GetProductDetailsProvider>
        <ProductDetailsPage />
      </GetProductDetailsProvider>
      <SubNav />
    </>
  );
}
export default App;
