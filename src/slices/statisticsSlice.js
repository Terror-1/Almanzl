import { apiSlice } from "./apiSlice";
import { STATISTICS } from "../utils/constants";
export const statisticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => `${STATISTICS}/overview`,
      providesTags: ["Statistics"],
    }),
    getSalesPerformance: builder.query({
      query: () => `${STATISTICS}/sales-performance`,
      providesTags: ["Statistics"],
    }),
    getTopProducts: builder.query({
      query: () => `${STATISTICS}/top-products`,
      providesTags: ["Statistics"],
    }),
    getSalesByCategory: builder.query({
      query: () => `${STATISTICS}/sales-by-category`,
      providesTags: ["Statistics"],
    }),

    getSalesByGovernorate: builder.query({
      query: () => `${STATISTICS}/sales-by-governorate`,
      providesTags: ["Statistics"],
    }),

    getOrdersStatus: builder.query({
      query: () => `${STATISTICS}/orders-status`,
      providesTags: ["Statistics"],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetSalesPerformanceQuery,
  useGetTopProductsQuery,
  useGetSalesByCategoryQuery,
  useGetSalesByGovernorateQuery,
  useGetOrdersStatusQuery,
} = statisticsApiSlice;
