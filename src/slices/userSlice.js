import { apiSlice } from "./apiSlice";
import { USERS } from "../utils/constants";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS}/logout`,
        method: "POST",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `${USERS}/get-all-users?page=${page}&limit=${limit}`,
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
