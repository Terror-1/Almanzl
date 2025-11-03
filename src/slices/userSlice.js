import { apiSlice } from "./apiSlice";
import { USERS } from "../utils/constants";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `${USERS}/get-all-users?page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),

    getUserProfile: builder.query({
      query: () => `${USERS}`,
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserProfileQuery,
  useDeleteUserMutation,
} = userApiSlice;
