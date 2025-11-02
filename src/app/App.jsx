import "./App.css";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import ProductDetailsPage from "../pages/productDetails/ProductDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      <ProductDetailsPage />
      <SubNav />
    </>
  );
}
export default App;
