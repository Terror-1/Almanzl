import { Search, ShoppingBag, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 md:px-10 py-4 flex items-center justify-between font-poppins">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-semibold tracking-wide cursor-pointer">
          almanzl
        </h1>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">Shop</li>
          <li className="hover:text-gray-300 cursor-pointer">About us</li>
          <li className="hover:text-gray-300 cursor-pointer">Blog</li>
        </ul>
      </div>

      <div className="hidden md:flex flex-1 justify-center mx-8">
        <div className="flex items-center w-full max-w-lg bg-gray-800 rounded-lg px-4 py-2">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search in almanzl..."
            className="bg-transparent text-sm text-white outline-none placeholder-gray-400 w-full px-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Menu className="w-6 h-6 cursor-pointer hover:text-gray-300" />
      </div>
    </nav>
  );
}
