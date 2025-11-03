import { Outlet, useLocation } from "react-router-dom";
import SubNav from "../../components/SubNav";
import HomeNav from "../../components/HomeNav";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {isHomePage ? <HomeNav /> : <Navbar />}

      {!isHomePage && <SubNav />}

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
