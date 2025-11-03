import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-gray-200 py-12" style={{ background: "#2B2B2B" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">MyShop</h3>
          <p className="text-gray-400">
            Your one-stop shop for quality products. We bring you the best
            selections every week.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-white transition">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-white transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-white transition">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-white transition">
              <Facebook />
            </Link>
            <Link to="#" className="hover:text-white transition">
              <Twitter />
            </Link>
            <Link to="#" className="hover:text-white transition">
              <Instagram />
            </Link>
            <Link to="#" className="hover:text-white transition">
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
