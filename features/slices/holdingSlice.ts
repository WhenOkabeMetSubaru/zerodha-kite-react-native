import { io } from "socket.io-client";
import apiSlice from "../api/api";
import { EXTRAINFO_CONSTANTS } from "../../app/constants/extraInfo";
import { STOCK } from "../../app/types/stock";

const createSocket = async () => {
    let socket = await io(EXTRAINFO_CONSTANTS.SOCKET_SERVER_LINK_LOCAL,
        {
            transports: ['websocket'],
            reconnection:true
        }
    )
    return socket;
}

export const holdingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewHolding: builder.mutation({
            query: (holdingData) => ({
                url: '/api/v1/holdings/add/new',
                method: 'POST',
                body: holdingData,
            }),
        }),
        getAllHoldings: builder.query({
            query: () => '/api/v1/holdings/data/all',
        }),
        getHoldingById: builder.query({
            query: (holdingId) => `/api/v1/holdings/${holdingId}`,
        }),
        getUserHoldingData: builder.query({
            query: () => '/api/v1/holdings/user/bought',
        }),
        updateHolding: builder.mutation({
            query: (updateHoldingData) => ({
                url: `/api/v1/holdings/${updateHoldingData._id}`,
                method: 'PUT',
                body: updateHoldingData,
            }),
        }),
        deleteHolding: builder.mutation({
            query: (holdingId) => ({
                url: `/api/v1/holdings/${holdingId}`,
                method: 'DELETE',
            }),
        }),
        subscribeHoldingToMultipleStocks: builder.query({

            query: () => ({
                url: `/api/v1/holdings/user/bought`,
                method: 'GET',
            }),

            onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {

                const socket = createSocket();

                try {

                    let { data } = await cacheDataLoaded;


                    const stockIds = data?.data?.map((holdingItem: any) => holdingItem?.item?._id);


                    (await socket).emit('subscribeClientToMultipleStock', stockIds);

                    (await socket).on('multiplestockdata', (data) => {

                        updateCachedData((draft) => {

                            // draft.data.stocks = draft?.data?.stocks.map((stock: any) => {
                            //     const existingStock = data.find((cachedStock: any) => cachedStock?._id === stock._id)
                            //     return existingStock ? { ...stock, current_price: existingStock.current_price } : stock;
                            // })



                            draft.data = draft?.data?.map((item: any) => {
                                const existingItem = data.find((cachedStock: any) => cachedStock?._id === item?.item?._id);
                                return existingItem ? { ...item, item: { ...item.item, current_price: existingItem.current_price } } : item
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
        })
    }),
});

export const {
    useAddNewHoldingMutation,
    useGetAllHoldingsQuery,
    useGetHoldingByIdQuery,
    useGetUserHoldingDataQuery,
    useUpdateHoldingMutation,
    useDeleteHoldingMutation,
    useSubscribeHoldingToMultipleStocksQuery
} = holdingApiSlice;


