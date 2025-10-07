import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { UserPayload, LoginFormInputs } from "@/types/auth/auth.type";
import { API_URL } from "@/lib/configs";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    login: builder.mutation<{ user: UserPayload }, LoginFormInputs>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    getMe: builder.query<{ user: UserPayload | null }, void>({
      query: () => "/auth/me",
      providesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } =
  authApi;
