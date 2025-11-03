import { apiSlice } from "./apiSlice";
import { CATEGORIES } from "../utils/constants";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `${CATEGORIES}?page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query({
      query: (id) => `${CATEGORIES}/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORIES}`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${CATEGORIES}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        "Category",
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
