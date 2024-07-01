
import apiSlice from "../api/api";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginUser: builder.mutation<any, any>({
            query: ({ email, password }) => ({
                url: '/auth/v1/signin',
                method: 'POST',
                body: {
                    email, password
                }
            })
        }),
        signup: builder.mutation({
            query: (userDetails) => ({ url: '/auth/v1/signup', method: 'POST', body: userDetails}),
        }),
        getUserByToken: builder.query<any, any>({
            query: () => ({
                url: '/api/v1/user/single',
                method: 'GET'
            }),
            keepUnusedDataFor: 10000
        }),

        getAllWatchListByUser: builder.query<any,void>({
            query: () => ({ url: '/api/v1/user/watchlist', method: 'GET' }), 
        }),
        addStockToWatchList: builder.mutation({
            query: ({watchId, stockId}) => ({
                url: `/api/v1/user/watchlist/${watchId}/add/stock/${stockId}`,
                method: 'POST',
            }),
        }),
        updateWatchListByID: builder.mutation({
            query: ({ watchId, data }) => ({
                url: `/api/v1/user/watchlist/update/`+watchId,
                method: 'PUT',
                body:JSON.stringify(data)
            }),
        }),
        deleteStockFromWatchList: builder.mutation({
            query: ({watchId, stockId}) => ({
                url: `/api/v1/user/watchlist/${watchId}/delete/stock/${stockId}`,
                method: 'POST',
            }),
        }),
        getAllStocksByWatchList: builder.query({
            query: ({watchId}) => ({
                url: `/api/v1/stocks/watchlist/${watchId}`,
                method: 'GET', 
            }),
        }),
        getWatchListByID:builder.query({
            query:({watchId})=>({
                url:`api/v1/user/watchlist/${watchId}/single`,
                method:'GET'
            })
        }),
        checkTokenValidity:builder.query({
            query:()=>({
                url:"api/v1/user/token/check",
                method:"GET"
            })
        })
    })
})


export const { useLoginUserMutation, useGetUserByTokenQuery,useSignupMutation,useUpdateWatchListByIDMutation,
    useAddStockToWatchListMutation,useGetWatchListByIDQuery,useCheckTokenValidityQuery,useLazyCheckTokenValidityQuery,
    useDeleteStockFromWatchListMutation,useGetAllWatchListByUserQuery,useGetAllStocksByWatchListQuery, util: { getRunningQueryThunk, getRunningQueriesThunk } } = userApiSlice;

export const { getUserByToken } = userApiSlice.endpoints;

export const selectUserDetails = userApiSlice.endpoints.getUserByToken.select({});