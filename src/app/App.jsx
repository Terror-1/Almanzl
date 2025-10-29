import "./App.css";
import Navbar from "../components/Navbar";
import SubNav from "../components/SubNav";
import Checkout from "../pages/checkout";

function App() {
  const orderData = {
    userId: "671fbd8f92ac7b4a1b2c2222",
    orderItems: [
      {
        productId: "671fbf2d92ac7b4a1b2c9999",
        name: "T-shirt",
        price: 25,
        quantity: 2,
      },
      {
        productId: "671fbf3e92ac7b4a1b2c8888",
        name: "Shoes",
        price: 50,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "Cairo",
      postalCode: "12345",
      country: "Egypt",
      phoneNumber: "01012345678",
    },
    itemsPrice: 100,
    shippingPrice: 20,
    discountAmount: 0,
  };

  return (
    <>
      <Navbar />
      <SubNav />
      <Checkout orderData={orderData} />
    </>
  );
}

export default App;
