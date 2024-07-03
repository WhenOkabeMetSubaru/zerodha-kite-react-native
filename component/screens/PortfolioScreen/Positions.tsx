import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo'
import { CircleSpecial } from '../../extra/circleSpecial';
import { useGetAllPositionOrdersByUserQuery, useSubscribeOrderToMultipleStocksQuery } from '../../../features/slices/orderSlice';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { ORDER_WITH_STOCK } from '../../../app/types/order';
import { handleStockPriceInfo, handleStockPriceInfoPortfolio, STOCK_PRICE_FUNCTION_RETURN_TYPE } from '../../common/stockPriceInfo';
import { handleCurrencyIndianToInteger } from '../../common/priceFunctions/currencyConverter';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { STOCK } from '../../../app/types/stock';
import ItemBottomSheetCustom from '../../common/ItemBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { useGetUserHoldingDataQuery, useSubscribeHoldingToMultipleStocksQuery } from '../../../features/slices/holdingSlice';

const Positions = ({ scrollOffsetY, showStatus }: { scrollOffsetY?: any, showStatus?: any }) => {

    const holdingSocketDetails = useSubscribeHoldingToMultipleStocksQuery({},
        {
            refetchOnMountOrArgChange:true,
        }
    );
    

    const navigation = useNavigation<any>();

    

    //ref
    const bottomSheetRef = useRef<BottomSheetModal>(null);



    //states
    const [stockData, setStockData] = useState<STOCK>();
    const [stockPriceInfo, setStockPriceInfo] = useState<STOCK_PRICE_FUNCTION_RETURN_TYPE>();

    const [refreshing, setRefreshing] = useState(false);

    const [displayPrice, setDisplayPrice] = useState({ item_total_amount_fixed: 0, current_item_amount_live: 0 });


    const scrollHandler = useAnimatedScrollHandler((event) => {

        scrollOffsetY.value = event.contentOffset.y;

    });

    useEffect(() => {

        if (holdingSocketDetails?.data?.data) {
            let tempData = holdingSocketDetails?.data?.data;
            let temp = { item_total_amount_fixed: 0, current_item_amount_live: 0 };

            for (let i = 0; i < tempData?.length; i++) {

                let data = tempData[i]

                temp.item_total_amount_fixed += data?.total_amount;

                temp.current_item_amount_live = temp.current_item_amount_live + (parseFloat(data?.item?.current_price?.replace(/,/g, "")) * data?.quantity);
            }
            setDisplayPrice(temp);

        }

    }, [holdingSocketDetails?.data?.data])

    const handlePresentModalPress = useCallback((item: STOCK) => {
        setStockData(item);
        let result = handleStockPriceInfo({ previous_day_close_price: item.previous_close, current_price: item.current_price });
        setStockPriceInfo(result);
        bottomSheetRef.current?.present();
    }, []);

    const handleItemAdd = () => {

        bottomSheetRef?.current?.close(); navigation.navigate("BuyScreen", { _id: stockData?._id });
    }

    const handleItemSell = () => {
        bottomSheetRef.current?.close(); navigation.navigate("SellScreen", { _id: stockData?._id });
    }



    return (
        <Animated.ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                setRefreshing(true);
              
                holdingSocketDetails.refetch();
                setRefreshing(false);
            }} />}
            style={{ flex: 1, backgroundColor: 'white' }}
            scrollEventThrottle={20}
            onScroll={scrollHandler} showsVerticalScrollIndicator={false} >

           

           {
            holdingSocketDetails?.data?.data?.length>0 && 
                <View style={{ height: 120, backgroundColor: "#e7e7e7", position: 'relative' }}>
                    <View style={{ backgroundColor: '#e7e7e7', height: 60 }}>

                    </View>
                    <View style={{ backgroundColor: "white", height: 60 }}>

                    </View>
                    <PortfolioPriceChangeComponent temp={displayPrice} showStatus={showStatus} />


                </View>
           }

            <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', columnGap: 15 }}>
                    <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                    <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                </View>
                <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center' }}>
                    <CircleSpecial />
                    <Text style={{ fontSize: 12, color: "#0484f7" }}>
                        Analytics
                    </Text>
                </View>
            </View>

            <FlatList
                data={holdingSocketDetails?.data?.data}
                scrollEnabled={false}
                renderItem={({ item, index }) => {

                    return (
                        <PortfolioScreenPositionDetails onPress={() => {
                            handlePresentModalPress(item.item);
                        }} orderInfo={item} />
                    )
                }}
            />

            <ItemBottomSheetCustom ref={bottomSheetRef} main_blue_btn_cb={handleItemAdd} main_red_btn_cb={handleItemSell} main_blue_btn_name='ADD' setStockData={setStockData} stockData={stockData} setStockPriceInfo={setStockPriceInfo} stockPriceInfo={stockPriceInfo} />



        </Animated.ScrollView>
    )
}

export default Positions

const styles = StyleSheet.create({})

const PortfolioPriceChangeComponent = ({ temp, showStatus }: { temp: any, showStatus: any }) => {

    const handlePriceInfo = useCallback(() => {
        return handleStockPriceInfoPortfolio({ previous_day_close_price: temp.item_total_amount_fixed?.toFixed(2), current_price: temp.current_item_amount_live?.toFixed(2) });
    }, [temp])

    const priceInfo = handlePriceInfo()

    return (
        <View style={{ height: 90, position: "absolute", rowGap: 5, backgroundColor: "white", bottom: 15, left: 20, right: 20, borderRadius: 4, elevation: showStatus == true ? 0 : 4, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ opacity: 0.35, fontSize: 15 }}>Total P&L</Text>
            <Text style={{ fontSize: 20, color: priceInfo.text_color }}>{priceInfo.price_symbol}{priceInfo.difference_in_price}</Text>

        </View>
    )
}

const PortfolioScreenPositionDetails = ({ orderInfo, onPress }: { orderInfo: any, onPress: any }) => {

    const handleStockPrice = useCallback(() => {
        return handleStockPriceInfoPortfolio({ previous_day_close_price: orderInfo.average_price, current_price: orderInfo?.item?.current_price?.replace(/,/g, "") })
    }, [orderInfo])

    let priceInfo = handleStockPrice();


    return (

        <Pressable onPress={onPress} style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', columnGap: 5 }}>
                    <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
                        <Text style={{ opacity: 0.35, fontSize: 12 }}>Qty.</Text>
                        <Text style={{ color: "#0484f7", fontSize: 12 }}>{orderInfo.quantity}</Text>
                    </View>
                    <Text>•</Text>
                    <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
                        <Text style={{ opacity: 0.35, fontSize: 12 }}>Avg.</Text>
                        <Text style={{ fontSize: 12 }}>{orderInfo?.average_price?.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2e7c5', paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2 }}>
                    <Text style={{ fontSize: 11 }}>MIS</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>{orderInfo.item?.name?.toUpperCase()}</Text>
                <Text style={{ fontSize: 14, color: priceInfo?.text_color }}>
                    {priceInfo?.price_symbol}{(handleCurrencyIndianToInteger(priceInfo.difference_in_price) * orderInfo?.quantity).toFixed(2)}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: "space-between", alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, opacity: 0.35 }}>NFO</Text>

                </View>

                <View style={{ flexDirection: 'row', columnGap: 3 }}>
                    <Text style={{ fontSize: 12, opacity: 0.35 }}>LTP</Text>
                    <Text style={{ fontSize: 11 }}>{orderInfo.item.current_price}</Text>
                   

                </View>

            </View>

        </Pressable>


    )
}


