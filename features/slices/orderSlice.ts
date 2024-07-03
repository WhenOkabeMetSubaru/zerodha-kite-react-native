import { io } from "socket.io-client";
import apiSlice from "../api/api";
import { EXTRAINFO_CONSTANTS } from "../../app/constants/extraInfo";
import { STOCK } from "../../app/types/stock";

const createSocket = async () => {
    let socket = await io(EXTRAINFO_CONSTANTS.SOCKET_SERVER_LINK_LOCAL,
        {
            transports: ['websocket']
        }
    )
    return socket;
}

export const orderApiSlice = apiSlice.injectEndpoints({ 
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
                url:'/api/v1/orders/order/add/new',
                method:"POST",
                body:JSON.stringify(orderDetails)
            })
        }),
        subscribeOrderToMultipleStocks: builder.query({

            query: () => ({
                url: `/api/v1/orders/positions`,
                method: 'GET',
            }),

            onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded,cacheEntryRemoved }) => {

                const socket = createSocket();

                try {

                    let {data} = await cacheDataLoaded;

                    
                    const stockIds = data?.data?.map((orderItem:any)=>orderItem?.item?._id);
                    

                    (await socket).emit('subscribeClientToMultipleStock', stockIds);

                    (await socket).on('multiplestockdata', (data) => {

                        updateCachedData((draft) => {

                            // draft.data.stocks = draft?.data?.stocks.map((stock: any) => {
                            //     const existingStock = data.find((cachedStock: any) => cachedStock?._id === stock._id)
                            //     return existingStock ? { ...stock, current_price: existingStock.current_price } : stock;
                            // })

                            

                            draft.data  = draft?.data?.map((item:any)=>{
                                const existingItem = data.find((cachedStock:any)=>cachedStock?._id===item?.item?._id);
                                return existingItem ? {...item,item:{...item.item,current_price:existingItem.current_price}}:item
                            })


                        })

                    })


                } catch (error: any) {
                    console.log("Error creating socket ", error.message)
                } finally {
                    await cacheEntryRemoved;
                    (await socket).disconnect()
                }

            }
        }),
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
    usePlaceBuyOrderMutation,
    useSubscribeOrderToMultipleStocksQuery
} = orderApiSlice;