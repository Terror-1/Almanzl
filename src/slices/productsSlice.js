import { apiSlice } from "./apiSlice";
import { PRODUCTS } from "../utils/constants";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, keyword = "" } = {}) => {
        let url = `${PRODUCTS}?page=${page}&limit=${limit}`;
        if (keyword) url += `&keyword=${keyword}`;
        return { url, method: "GET" };
      },
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: (productData) => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
          if (key === "images") {
            value.forEach((file) => formData.append("images", file));
          } else {
            formData.append(key, value);
          }
        });

        return {
          url: `${PRODUCTS}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
          if (key === "images") {
            value.forEach((file) => formData.append("images", file));
          } else {
            formData.append(key, value);
          }
        });

        return {
          url: `${PRODUCTS}/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    searchProducts: builder.query({
      query: (query) => ({
        url: `${PRODUCTS}/search/${query}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `${PRODUCTS}/category/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = productApiSlice;
