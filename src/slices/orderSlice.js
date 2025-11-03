import { apiSlice } from "./apiSlice";
import { ORDERS } from "../utils/constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 5 } = {}) =>
        `${ORDERS}/get-paginated-orders/?page=${page}&limit=${limit}`,
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDERS}/${id}`,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${ORDERS}/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderPaidStatus: builder.mutation({
      query: (id) => ({
        url: `${ORDERS}/${id}/pay`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useUpdateOrderPaidStatusMutation,
} = ordersApiSlice;
