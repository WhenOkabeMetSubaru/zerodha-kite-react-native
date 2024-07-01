import apiSlice from "../api/api";


export const orderApiSlice = apiSlice.injectEndpoints({ // No base URL needed now
    endpoints: (builder) => ({
        getAllOrdersByUser: builder.query({
            query: () => ({ url: '/api/v1/orders/user', method: 'GET' }), // Adjusted path
            // Add user ID or other logic for user-specific retrieval if needed
        }),
        getAllHoldingOrdersByUser: builder.query({
            query: () => ({ url: '/api/v1/orders/holding', method: 'GET' }), // Adjusted path
        }),
        getAllPositionOrdersByUser: builder.query({
            query: () => ({ url: '/api/v1/orders/positions', method: 'GET' }), // Adjusted path
        }),
        getOrderByID: builder.query({
            query: ({orderId}) => ({ url: `/api/v1/orders/${orderId}`, method: 'GET' }),
        }),
        addNewOrder: builder.mutation({
            query: ({data}) => ({ url: '/api/v1/orders', method: 'POST', body: data }), // Adjusted path
        }),
        updateOrderByID: builder.mutation({
            query: ({data, orderId}) => ({ url: `/api/v1/orders/${orderId}`, method: 'PUT', body: data }),
        }),
        deleteOrderByID: builder.mutation({
            query: ({orderId}) => ({ url: `/api/v1/orders/${orderId}`, method: 'DELETE' }),
        }),
        placeBuyOrder:builder.mutation({
            query:({orderDetails})=>({
                url:'/api/v1/order/add',
                method:"POST",
                body:JSON.stringify(orderDetails)
            })
        })
    }),
});

export const {
    useGetAllOrdersByUserQuery,
    useGetAllHoldingOrdersByUserQuery,
    useGetAllPositionOrdersByUserQuery,
    useGetOrderByIDQuery,
    useAddNewOrderMutation,
    useUpdateOrderByIDMutation,
    useDeleteOrderByIDMutation,
    usePlaceBuyOrderMutation
} = orderApiSlice;