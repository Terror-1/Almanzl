import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Plus,
  List,
  Users,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Package,
  CreditCard,
} from "lucide-react";

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState();
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      type: "link",
    },
    {
      name: "Categories",
      icon: Folder,
      type: "dropdown",
      children: [
        {
          name: "All Categories",
          icon: List,
          path: "/admin/categories",
        },
        {
          name: "Add Category",
          icon: Plus,
          path: "/admin/categories/add",
        },
      ],
    },

    {
      name: "Products",
      icon: Package,
      type: "dropdown",
      children: [
        {
          name: "All Products",
          icon: List,
          path: "/admin/products",
        },
        {
          name: "Add Product",
          icon: Plus,
          path: "/admin/products/add",
        },
      ],
    },

    {
      name: "Orders",
      icon: CreditCard,
      path: "/admin/orders",
      type: "link",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
      type: "link",
    },
  ];

  const isActiveLink = (path) => {
    return activeLink === path;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const renderMenuItem = (item, index) => {
    if (item.type === "link") {
      const Icon = item.icon;
      return (
        <Link
          key={index}
          to={item.path}
          onClick={handleLinkClick}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActiveLink(item.path)
              ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Icon size={20} className="mr-3" />
          {item.name}
        </Link>
      );
    }

    if (item.type === "dropdown") {
      const Icon = item.icon;
      const isOpen =
        item.name === "Products" ? isProductsOpen : isCategoriesOpen;
      const setIsOpen =
        item.name === "Products" ? setIsProductsOpen : setIsCategoriesOpen;

      return (
        <div key={index} className="mb-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isOpen
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <Icon size={20} className="mr-3" />
              {item.name}
            </div>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {item.children.map((child, childIndex) => {
                const ChildIcon = child.icon;
                return (
                  <Link
                    key={childIndex}
                    to={child.path}
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActiveLink(child.path)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <ChildIcon size={16} className="mr-2" />
                    {child.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-64 h-full bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
};

export default Sidebar;
