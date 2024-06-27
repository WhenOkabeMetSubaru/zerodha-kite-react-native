import apiSlice from "../api/api";


export const stockApiSlice = apiSlice.injectEndpoints({ //  // No base URL needed now
    endpoints: (builder) => ({
        getAllStocks: builder.query({
            query: () => ({ url: '/api/v1/stocks/all', method: 'GET' }), // Adjusted path
        }),
        getStockByID: builder.query({
            query: ({ stockId }) => ({ url: `/api/v1/stocks/${stockId}`, method: 'GET' }),
        }),
       
        addNewStock: builder.mutation({
            query: ({ data }) => ({ url: '/api/v1/stocks/add', method: 'POST', body: data }), // Adjusted path
        }),
        updateStockByID: builder.mutation({
            query: ({ data, stockId }) => ({ url: `/api/v1/stocks/${stockId}/update`, method: 'PUT', body: data }), // Adjusted path
        }),
        deleteStockByID: builder.mutation({
            query: ({ stockId }) => ({ url: `/api/v1/stocks/${stockId}/delete`, method: 'DELETE' }), // Adjusted path
        }),
        getSearchStockByName: builder.query({ // Adjust path if needed
            query: ({ stockName }) => ({
                url: `/api/v1/stocks/search/new`,
                params:{name:stockName},
                method: 'GET'
            }), // Assuming search by name
        }),
    }),
});

export const {
    useGetAllStocksQuery,
    useGetStockByIDQuery,
    useAddNewStockMutation,
    useUpdateStockByIDMutation,
    useDeleteStockByIDMutation,
    useGetSearchStockByNameQuery,
    useLazyGetSearchStockByNameQuery
} = stockApiSlice;

