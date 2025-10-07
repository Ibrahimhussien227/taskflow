"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetMeQuery = exports.useLogoutMutation = exports.useLoginMutation = exports.authApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const configs_1 = require("@/lib/configs");
exports.authApi = (0, react_1.createApi)({
    reducerPath: "authApi",
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: configs_1.API_URL,
        credentials: "include",
    }),
    tagTypes: ["Me"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Me"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Me"],
        }),
        getMe: builder.query({
            query: () => "/auth/me",
            providesTags: ["Me"],
        }),
    }),
});
exports.useLoginMutation = exports.authApi.useLoginMutation, exports.useLogoutMutation = exports.authApi.useLogoutMutation, exports.useGetMeQuery = exports.authApi.useGetMeQuery;
