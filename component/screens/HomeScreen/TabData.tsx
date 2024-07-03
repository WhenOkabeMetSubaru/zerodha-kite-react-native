import { FlatList, Pressable, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import FeatureIcon from "react-native-vector-icons/Feather"
import EntypeIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useGetAllStocksByWatchListQuery } from '../../../features/slices/userApiSlice';
import { WATCHLIST } from '../../../app/types/user';
import { STOCK } from '../../../app/types/stock';
import { handleStockPriceInfo, STOCK_PRICE_FUNCTION_RETURN_TYPE } from '../../common/stockPriceInfo';
import { useSocketProviderFinal } from '../../../app/provider/socketProvider';
import { io } from 'socket.io-client';
import { EXTRAINFO_CONSTANTS } from '../../../app/constants/extraInfo';
import { useSubscribeMultipleStocksQuery } from '../../../features/slices/stockApiSlice';

const TabDataWatchListHome = ({ scrollOffsetY, showStatus, setShowStatus, watchListId }: { scrollOffsetY?: any, showStatus?: boolean, setShowStatus?: any, watchListId?: string }) => {


    const watchListStockData = useGetAllStocksByWatchListQuery({ watchId: watchListId });

    const watchListData: WATCHLIST = watchListStockData?.data?.data || {};

    const socketQueryInfo = useSubscribeMultipleStocksQuery({watchId:watchListId,stockIds:watchListData?.stocks?.map((item)=>item._id)});


    //state

    const [stockData, setStockData] = useState<STOCK>();
    const [refreshing, setRefreshing] = useState(false);
    // const socketServiceProvider = useSocketProviderFinal();
    const [multiStockList, setMultiStockList] = useState<STOCK[]>();





    const ItemDataBottomSheetRef = useRef<BottomSheetModal>(null);
    const [showOrderListDepth, setShowOrderListDepth] = useState(false);
    const [stockPriceInfo, setStockPriceInfo] = useState<STOCK_PRICE_FUNCTION_RETURN_TYPE>();

    const navigation = useNavigation<any>();


    //stock Data
    useEffect(() => {

        if (watchListStockData?.isLoading == false) {
            if (watchListStockData?.data?.data?.stocks) {
                const tempData: WATCHLIST = watchListStockData?.data?.data || {};
               
                setMultiStockList(tempData.stocks);
            }
        }

    }, [watchListStockData.isLoading])



    //socket

    let socket:any;

    // useEffect(() => {

       
    //     if(watchListStockData?.data?.data){
    //         socket = io(EXTRAINFO_CONSTANTS.SOCKET_SERVER_LINK_LOCAL,
    //             {
    //                 multiplex: false,
    //                 transports: ["websocket"]
    //             }
    //         );

    //         let stocksInfo: any = watchListStockData?.data?.data?.stocks?.map((item: STOCK) => { return { _id: item._id, name: item.name } });
    //         if (stocksInfo?.length < 1) {
    //             watchListStockData.refetch();
    //             stocksInfo = watchListStockData?.data?.data?.stocks?.map((item: any) => { return { _id: item._id, name: item.name } });
    //         }
    //         socket.emit("subscribeClientToMultipleStock", stocksInfo)


    //         let intervalId: any;
    //         socket.on('connect', () => {
    //             intervalId = setInterval(() => {
    //                 socket.emit('ping'); // Send a ping event to the server every 5 seconds
    //             }, 5000);

    //             socket.on('pong', () => {
    //                 console.log('Received pong from server!');
                   
    //             });


    //             socket.on("multiplestockdata", async (data: any) => {
                    
                   
    //                 // let temp = multiStockList?.map((stock: STOCK) => {
    //                 //     let matchedItem = data?.find((item: any) => item._id == stock?._id);

                    

    //                 setMultiStockList(data);
    //             })
    //         });



    //         return () => {
    //             socket.off('multipleStockData');
    //             socket.off('pong')
    //             clearInterval(intervalId);
    //         }
    //     }

    // }, [watchListStockData.isLoading])

    useEffect(()=>{

    },[multiStockList])



    const updateStockData = useCallback((stockData:any)=>{
        
        if(!multiStockList) return;

       

        // multiStockList?.forEach((item,index)=>{

        //     let stockItem = stockData?.find((tempData:any)=>tempData?._id == item?._id);
         
        //     if(stockItem){
                
        //         temp[index].current_price = "";
        //         temp[index].current_price = stockItem?.current_price;
        //         console.log("positive",temp[index],stockItem?.current_price)
        //     }
        // })

        let temp = multiStockList?.map((stock:STOCK)=>{
            let matchedItem = stockData?.find((item:any)=>item._id==stock?._id);

            if(matchedItem){
                console.log('easy')
                return {
                    ...stock,
                    current_price:matchedItem.current_price
                }
            }
            return stock;
        })

        console.log("Finally",temp)
       
       
        setMultiStockList(temp);

    },[])

    const ItemDataBottomSheetSnappoints = useMemo(() => ["25%", "30%", "40%", "50%", "75%", "90%"], []);

    const handlePresentModalPress = useCallback((item: STOCK) => {
        setStockData(item);
        let result = handleStockPriceInfo({ previous_day_close_price: item.previous_close, current_price: item.current_price });
        setStockPriceInfo(result);
        ItemDataBottomSheetRef.current?.present();
    }, []);

    const scrollHandler = useAnimatedScrollHandler((event) => {

        scrollOffsetY.value = event.contentOffset.y;

    });

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}

            />
        ),
        []
    );

    const handleBottomSheetStockData: any = ({ previous_close, current_price }: { previous_close: any, current_price: any }) => {
        handleStockPriceInfo({ previous_day_close_price: previous_close, current_price });
    }
    return (
        <>
            <Animated.ScrollView
                nestedScrollEnabled={true}
                style={{ backgroundColor: 'white' }}
                scrollEventThrottle={10}
                onScroll={scrollHandler} showsVerticalScrollIndicator={false} >

                <View style={{ width: '100%', height: 80, position: "relative", backgroundColor: '#e7e7e7' }}>
                    <View style={{ width: '100%', height: 45, backgroundColor: '#e7e7e7' }} />
                    <View style={{ width: '100%', height: 35, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25 }} />
                    <View style={{ position: 'absolute', overflow: 'hidden', elevation: showStatus == true ? 0 : 1, shadowRadius: 10, padding: 5, left: 20, right: 20, alignItems: 'center', borderRadius: 5, top: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50 }}>
                        <View style={{ flexDirection: 'row', columnGap: 20, width: '60%' }}>
                            <FeatureIcon name="search" color={"gray"} style={{ marginLeft: 8 }} size={20} />
                            <Pressable onPress={() => navigation.navigate("StockSearchScreen", { _id: watchListStockData?.data?.data?._id })} style={{ width: '90%' }}><Text style={{ fontSize: 13, color: 'gray' }}>Search&nbsp; &&nbsp; add</Text></Pressable>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 13, color: 'gray' }}>{watchListData?.stocks?.length || 0}/100</Text>
                            <View style={{ width: 1, height: 20, borderColor: 'lightgray', borderLeftWidth: 0.5 }} />
                            <EntypeIcon name='sound-mix' color="#e7e7e7" size={20} />
                        </View>

                    </View>
                </View>


                {/* <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                    <View style={{ marginBottom: 10 }}>






                    </View>
                </View> */}

                <BottomSheetModal enableOverDrag={false} handleComponent={null} snapPoints={ItemDataBottomSheetSnappoints} backdropComponent={renderBackdrop} enablePanDownToClose={true} ref={ItemDataBottomSheetRef} animateOnMount={true} enableDynamicSizing={true}   >


                    <>
                        <View style={{ paddingLeft: 30, paddingRight: 10, borderBottomWidth: 0.8, paddingBottom: 12, paddingTop: 10, borderColor: '#e7e7e7' }}>
                            <Text style={{ fontSize: 20 }}>{stockData?.name?.toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 1 }}>
                                <Text style={{ fontSize: 12 }}>NSE</Text>
                                <Text style={{ color: stockPriceInfo?.text_color, fontSize: 12 }}>{stockData?.current_price}</Text>
                                <Text style={{ fontSize: 12 }}>{stockPriceInfo?.price_symbol}{stockPriceInfo?.difference_in_price} ({stockPriceInfo?.price_symbol}{stockPriceInfo?.percentage_difference}%)</Text>
                            </View>
                        </View>
                        <BottomSheetScrollView style={{ minHeight: 500, paddingTop: 10 }}>

                            <View style={{ paddingLeft: 30, paddingRight: 30, borderBottomWidth: 0.8, paddingTop: 25, paddingBottom: 24, borderColor: '#e7e7e7' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 10 }}>
                                    <Pressable style={{ width: '50%' }} onPress={() => { ItemDataBottomSheetRef.current?.close(); navigation.navigate("BuyScreen", { _id: stockData?._id }); }}>
                                        <View style={{ width: "100%", height: 55, backgroundColor: '#3a91f2', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>BUY</Text>
                                        </View>
                                    </Pressable>
                                    <Pressable style={{ width: '50%' }} onPress={() => { ItemDataBottomSheetRef.current?.close(); navigation.navigate("SellScreen"); }}>
                                        <View style={{ width: '100%', height: 55, backgroundColor: '#da494f', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>SELL</Text>
                                        </View>
                                    </Pressable>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 10, marginTop: 25 }}>

                                    <FeatureIcon color={"#2a8af4"} name="bar-chart-2" size={20} />
                                    <Text style={{ color: "#2a8af4" }}>View chart</Text>
                                    <FeatureIcon color="#2a8af4" name="arrow-right" size={20} />

                                </View>
                            </View>

                            <View style={{ paddingTop: 25, paddingBottom: 24, borderColor: '#e7e7e7', borderBottomWidth: 0.8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, }}>
                                    <View style={{ flexDirection: 'row', columnGap: 7 }}>
                                        <FeatureIcon name="bell" color="#2a8af4" size={20} />
                                        <Text style={{ color: "#2a8af4" }}>Create alert</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 7 }}>
                                        <MaterialCommunityIcon name="email-fast" color="#2a8af4" size={20} />
                                        <Text style={{ color: "#2a8af4" }}>Create GTT</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '20%' }}>Bid</Text>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '10%' }}>Orders</Text>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '18%', textAlign: 'right' }}>Qty</Text>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '20%', marginLeft: 8 }}>Offer</Text>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '10%' }}>Orders</Text>
                                    <Text style={{ fontSize: 11, color: '#c3c4c5', width: '18%', textAlign: 'right' }}>Qty</Text>
                                </View>
                                <StockOrderDetails />
                                <StockOrderDetails />
                                <StockOrderDetails />
                                <StockOrderDetails />
                                <StockOrderDetails />
                                {
                                    showOrderListDepth == true &&

                                    <>
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                        <StockOrderDetails />
                                    </>
                                }
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <TouchableWithoutFeedback onPress={() => { setShowOrderListDepth(!showOrderListDepth); }}>
                                        <Text style={{ color: '#2a8af4' }}>
                                            Show {showOrderListDepth == true ? 5 : 20} depth
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>




                            </View>

                            <View style={{ marginTop: 20, paddingLeft: 25, paddingRight: 25 }}>
                                <Text style={{ fontSize: 13, fontWeight: 600 }}>Day's range</Text>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 12, color: 'gray' }}>Low</Text>
                                            <Text style={{ marginTop: 5 }}>{stockData?.low}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 12, color: 'gray' }}>High</Text>
                                            <Text style={{ marginTop: 5 }}>{stockData?.high}</Text>
                                        </View>

                                    </View>
                                    <View style={{ backgroundColor: '#e7e7e7', height: 4, marginTop: 15 }}>

                                    </View>
                                </View>

                                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}>Open</Text>
                                        <Text style={{ marginTop: 5 }}>{stockData?.open}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}>Prev close</Text>
                                        <Text style={{ marginTop: 5 }}>{stockData?.previous_close}</Text>
                                    </View>

                                </View>

                            </View>

                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Volume</Text>
                                    <Text>{stockData?.volume}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Avg. trade price</Text>
                                    <Text>{stockData?.low}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Last traded quantity</Text>
                                    <Text>20</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Last traded at</Text>
                                    <Text>2024-06-03 15:59:57</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Lower circuit</Text>
                                    <Text>{stockData?.lc_limit}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>Upper circuit</Text>
                                    <Text>{stockData?.uc_limit}</Text>
                                </View>

                            </View>

                            <View style={{ marginTop: 25, paddingLeft: 25, paddingRight: 25, }}>
                                <Text style={{ fontWeight: 600 }}>
                                    Apps
                                </Text>
                                <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
                                <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcon name="dice-2-outline" color="#2a8af4" size={20} />
                                    <Text>Fundamentals</Text>
                                </View>
                                <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
                                <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcon name="lightning-bolt" color="darkblue" size={20} />
                                    <Text>Technicals</Text>
                                </View>
                                <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
                                <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcon name="briefcase-variant" color="darkorange" size={20} />
                                    <Text>Option Chain</Text>
                                </View>

                            </View>

                            <View style={{ marginTop: 35, paddingLeft: 25, paddingRight: 25, paddingBottom: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Pin to overview</Text>
                                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                                    <View style={{ width: 90, height: 35, borderWidth: 0.7, borderColor: "black", borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: "center", fontSize: 12 }}>Spot 1</Text>
                                    </View>
                                    <View style={{ width: 90, height: 35, borderWidth: 0.7, borderColor: "black", borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: "center", fontSize: 12 }}>Spot 2</Text>
                                    </View>
                                </View>
                            </View>


                        </BottomSheetScrollView>
                    </>


                </BottomSheetModal>

            

            <View style={{ height: '100%', backgroundColor: 'white' }}>
               
                <FlatList
                    data={socketQueryInfo?.data?.data?.stocks}
                    scrollEnabled={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                        setRefreshing(true);
                        watchListStockData.refetch();
                        setRefreshing(false);
                    }} />}
                    nestedScrollEnabled={true}
                    keyExtractor={(item)=>item._id}
                    extraData={multiStockList}
                    renderItem={({ item, index }) => {

                        let stockPriceInfo = handleStockPriceInfo({ previous_day_close_price: item.previous_close, current_price: item.current_price })

                        return (
                            <TouchableWithoutFeedback key={watchListData?._id + " " + item?._id + " " + index} onPress={() => handlePresentModalPress(item)}>
                                <View style={{ height: 80, backgroundColor: 'white', borderBottomWidth: 0.7, borderColor: 'lightgray', paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: 400, minWidth: 100 }}>{item?.name?.toUpperCase()}</Text>
                                        <Text style={{ color: stockPriceInfo.text_color }}>{item?.current_price}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: 'gray', minWidth: 100 }}>NSE</Text>
                                        <Text style={{ fontSize: 12 }}>{stockPriceInfo.price_symbol}{stockPriceInfo.difference_in_price} ({stockPriceInfo.price_symbol}{stockPriceInfo.percentage_difference}%)</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                   
                />
            </View>
            </Animated.ScrollView>

        </>
    )
}


export default TabDataWatchListHome

const styles = StyleSheet.create({})


export const StockOrderDetails = () => {

    return (<View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '20%' }}>3,002.30</Text>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '10%', textAlign: 'center' }}>1</Text>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '18%', textAlign: 'right' }}>4</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '20%', marginLeft: 8 }}>3,005.95</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '10%', textAlign: 'center' }}>3</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '18%', textAlign: 'right' }}>200</Text>
    </View>)
}

