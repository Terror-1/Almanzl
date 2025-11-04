import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "Order", "Category", "User"],
  endpoints: (builder) => ({}),
});
