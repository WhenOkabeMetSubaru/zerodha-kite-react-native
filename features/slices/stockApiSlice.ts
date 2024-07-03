import { io } from "socket.io-client";
import { EXTRAINFO_CONSTANTS } from "../../app/constants/extraInfo";
import apiSlice from "../api/api";

const createSocket = async () => {
    let socket = await io(EXTRAINFO_CONSTANTS.SOCKET_SERVER_LINK_LOCAL,
        {
            transports: ['websocket']
        }
    )
    return socket;
}
export const stockApiSlice = apiSlice.injectEndpoints({ //  // No base URL needed now
    endpoints: (builder) => ({
        getAllStocks: builder.query({
            query: () => ({ url: '/api/v1/stocks/all', method: 'GET' }), // Adjusted path
        }),
        getStockByID: builder.query({
            query: ({ stockId }) => ({ url: `/api/v1/stocks/single/${stockId}`, method: 'GET' }),
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
                params: { name: stockName },
                method: 'GET'
            }), // Assuming search by name
        }),
        subscribeMultipleStocks: builder.query({

            query: ({ watchId,stockIds }) => ({
                url: `/api/v1/stocks/watchlist/${watchId}`,
                method: 'GET',
            }),

            onCacheEntryAdded: async (arg, { updateCachedData, cacheEntryRemoved }) => {

                const socket = createSocket();

                try {
                    
                    (await socket).emit('subscribeClientToMultipleStock', arg.stockIds);

                    (await socket).on('multiplestockdata', (data) => {
                        
                        updateCachedData((draft) => {
                            
                            draft.data.stocks = draft?.data?.stocks.map((stock: any) => {
                                const existingStock = data.find((cachedStock: any) => cachedStock?._id === stock._id)
                                return existingStock ? { ...stock, current_price: existingStock.current_price } : stock;
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
        subscribeSingleStock: builder.query({

            query: ({ stockId }) => ({
                url: `/api/v1/stocks/single/${stockId}`,
                method: 'GET',
            }),

            onCacheEntryAdded: async (arg, { updateCachedData, cacheEntryRemoved }) => {

                const socket = createSocket();

                try {

                    (await socket).emit('subscribeClientToSingleStock', arg.stockId);

                    (await socket).on(`${arg.stockId}`, (data) => {

                        updateCachedData((draft) => {

                            
                            draft.data.current_price = data;




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
    useGetAllStocksQuery,
    useGetStockByIDQuery,
    useAddNewStockMutation,
    useUpdateStockByIDMutation,
    useDeleteStockByIDMutation,
    useGetSearchStockByNameQuery,
    useLazyGetSearchStockByNameQuery,
    useSubscribeMultipleStocksQuery,
    useSubscribeSingleStockQuery
} = stockApiSlice;

