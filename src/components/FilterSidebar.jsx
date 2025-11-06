import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/product/ProductContext";
import axios from "@/lib/axios";

const FilterSidebar = () => {
    const [categories, setCategories] = useState([]);

    const [localPriceRange, setLocalPriceRange] = useState({
        min: 0,
        max: 10_000,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("/categories");
            setCategories(res?.data?.data);
        };

        fetchCategories();
    }, []);

    const { category, setCategory, priceRange, setPriceRange, setQuery } =
        useContext(ProductsContext);

    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setLocalPriceRange((prev) => ({ ...prev, [name]: Number(value) * 1 || 0 }));
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                localPriceRange.min !== priceRange.min ||
                localPriceRange.max !== priceRange.max
            ) {
                setPriceRange(localPriceRange);
            }
        }, 2000); 
        
        
        return () => clearTimeout(timer);
    }, [localPriceRange]);

    const handleClearFilters = () => {
        setQuery("");
        setCategory("");
        setPriceRange({ min: 0, max: 10_000 });
    };

    const chooseCategory = (e, id) => {
        setCategory(id);
    };

    return (
        <div className="w-full sm:w-64 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                    onClick={handleClearFilters}
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Clear All
                </button>
            </div>

            <h4 className="text-md font-semibold mb-3">Category</h4>
            <ul className="space-y-2 mb-6">
                {categories.map((cat) => (
                    <li key={cat._id}>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={cat._id}
                                checked={category === cat._id}
                                onChange={() => chooseCategory(event, cat._id)}
                                className="cursor-pointer"
                            />
                            <span className="text-sm">{cat.name}</span>
                        </label>
                    </li>
                ))}
                {category && (
                    <li>
                        <button
                            onClick={() => setCategory("")}
                            className="text-sm text-blue-500 hover:text-blue-600"
                        >
                            Clear Category
                        </button>
                    </li>
                )}
            </ul>

            <h4 className="text-md font-semibold mb-3">Price Range</h4>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="text-sm text-gray-700 block mb-1">Min Price</label>
                    <input
                        type="number"
                        name="min"
                        value={localPriceRange.min}
                        onChange={handlePriceChange}
                        placeholder="0"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-700 block mb-1">Max Price</label>
                    <input
                        type="number"
                        name="max"
                        value={localPriceRange.max}
                        onChange={handlePriceChange}
                        placeholder="10000"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    ${localPriceRange.min} - ${localPriceRange.max}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
