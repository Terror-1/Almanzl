import { createContext, useContext, useEffect, useState } from "react";
import { SearchContext } from "../search/SearchContext";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, useSearchParams } from "react-router-dom";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const { query } = useContext(SearchContext);
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(
        () => parseInt(searchParams.get("page")) || 1
    );
    const [limit, setLimit] = useState(
        () => parseInt(searchParams.get("limit")) || 12
    );

    const [category, setCategory] = useState(
        () => searchParams.get("category") || ""
    );
    const [priceRange, setPriceRange] = useState({
        min: parseInt(searchParams.get("price[gte]")) || 0,
        max: parseInt(searchParams.get("price[lte]")) || 10_000,
    });

    const location = useLocation();
    const isProductsPage = location.pathname.startsWith('/products');

    useEffect(() => {
        if (!isProductsPage) return;

        const params = {
            page: page.toString(),
            limit: limit.toString(),
        };

        if (category) params.category = category;
        if (priceRange.min > 0) params["price[gte]"] = priceRange.min.toString();
        if (priceRange.max < 10_000)
            params["price[lte]"] = priceRange.max.toString();

        const currentParams = Object.fromEntries(searchParams.entries());
        const paramsChanged =
            JSON.stringify(currentParams) !== JSON.stringify(params);

        if (paramsChanged) {
            setSearchParams(params);
        }
    }, [page, limit, category, priceRange]);

    let productsUrl = `/products?page=${page}&limit=${limit}`;
    if (query && query.trim()) productsUrl += `&name=${query}`;
    if (category) productsUrl += `&category=${category}`;
    if (priceRange.min > 0) productsUrl += `&price[gte]=${priceRange.min}`;
    if (priceRange.max < 10_000) productsUrl += `&price[lte]=${priceRange.max}`;

    const { data, loading, error } = useFetch(productsUrl);

    useEffect(() => {
        if (data) setProducts(data);
    }, [data]);

    useEffect(() => {
        if (query) setPage(1);
    }, [query]);

    useEffect(() => {
        setPage(1);
    }, [category, priceRange.min, priceRange.max]);

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
                error,
                page,
                setPage,
                limit,
                setLimit,
                category,
                setCategory,
                priceRange,
                setPriceRange,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};