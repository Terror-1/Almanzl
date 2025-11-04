import { Search, ShoppingBag, Menu } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/authentication/context/AuthContext";

export default function HomeNav() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 flex items-center justify-between px-8 py-6 text-white font-poppins transition-all duration-500">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-semibold tracking-wide cursor-pointer hover:text-yellow-400">
          <Link to="/">almanzl</Link>
        </h1>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/products">Shop</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/about">About us</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Search Bar (centered on desktop) */}
      <div className="hidden md:flex flex-1 justify-center mx-8">
        <div className="flex items-center w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
          <Search className="w-4 h-4 text-gray-200" />
          <input
            type="text"
            placeholder="Search in almanzl..."
            className="bg-transparent text-sm text-white outline-none placeholder-gray-300 w-full px-2"
          />
        </div>
      </div>

      {/* User + Cart + Menu */}
      <div className="flex items-center gap-6 relative" ref={menuRef}>
        <div
          className="flex flex-col text-sm hover:text-yellow-400 transition cursor-pointer"
          onClick={() => user && navigate("/profile")}
        >
          <span className="text-gray-300 text-xs">Hello,</span>
          {user ? (
            <span className="font-semibold">{user.name}</span>
          ) : (
            <Link to="/login" className="font-semibold">
              Sign In
            </Link>
          )}
        </div>

        <ShoppingBag
          onClick={() => navigate("/cart")}
          className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition"
        />

        {user && (
          <div className="relative">
            <Menu
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition"
            />

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-yellow-400 text-sm"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-yellow-400 text-sm"
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className="block px-4 py-2 hover:bg-yellow-400 text-sm"
                >
                  Cart
                </Link>
                <Link
                  to="/login"
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-yellow-400 text-sm text-red-500 cursor-pointer"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
