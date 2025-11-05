import { Search, ShoppingBag, Menu } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/authentication/context/AuthContext";
import { CartContext } from "../pages/cart/context/CartContext";
import SearchContext from "../context/search/SearchContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useContext(AuthContext);
  const { query, setQuery } = useContext(SearchContext);

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

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="w-full bg-black text-white px-6 md:px-10 py-4 flex items-center justify-between font-poppins">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-semibold tracking-wide cursor-pointer hover:text-yellow-400">
          <Link to="/">almanzl</Link>
        </h1>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="products">Shop</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="about">About us</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex flex-1 justify-center mx-8">
        <div className="flex items-center w-full max-w-lg bg-gray-800 rounded-lg px-4 py-2">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search in almanzl..."
            className="bg-transparent text-sm text-white outline-none placeholder-gray-400 w-full px-2"
            onChange={handleSearch}
            value={query}
          />
        </div>
      </div>

      <div className="flex items-center gap-6 relative" ref={menuRef}>
        <div
          className="flex flex-col text-sm hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
          onClick={() => user && navigate("/profile")}
        >
          <span className="text-gray-400 text-xs">Hello,</span>
          {user ? (
            <span className="font-semibold">{user.name}</span>
          ) : (
            <Link to="/login" className="font-semibold">
              Sign In
            </Link>
          )}
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingBag className="w-5 h-5 hover:text-hover" />
          {totalItems > 0 && (
            <span className="text-sm font-semibold text-hover">
              {totalItems}
            </span>
          )}
        </div>

        {user && (
          <div className="relative">
            <Menu
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-6 h-6 cursor-pointer hover:text-yellow-400"
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
