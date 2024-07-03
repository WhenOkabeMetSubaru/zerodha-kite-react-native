import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo'
import { CircleSpecial } from '../../extra/circleSpecial';
import { useGetUserHoldingDataQuery } from '../../../features/slices/holdingSlice';
import { HOLDING } from '../../../app/types/holding';
import { handleConvertNumberToIndianSystem, handleCurrencyIndianToInteger } from '../../common/priceFunctions/currencyConverter';
import { handleStockPriceInfoPortfolio } from '../../common/stockPriceInfo';
import { FlatList } from 'react-native-gesture-handler';

const Holdings = ({scrollOffsetY,showStatus}:{scrollOffsetY?:any,showStatus?:any}) => {

    const holdingDetails = useGetUserHoldingDataQuery({});

    const holdingData:HOLDING[] = holdingDetails?.data?.data;

    const [investingDetails,setInvestingDetails] = useState({total_invested_amount:0,total_current_amount:0});

    const scrollHandler = useAnimatedScrollHandler((event) => {

        scrollOffsetY.value = event.contentOffset.y;

    });

    useEffect(()=>{

        if(holdingDetails?.data?.data){
            let total_invested_amount = 0;
            let total_current_amount = 0;
            for(let i = 0;i<holdingData?.length;i++){
                total_invested_amount += +holdingData[i].total_amount;
                total_current_amount += +(handleCurrencyIndianToInteger(holdingData[i]?.item?.current_price) * holdingData[i].quantity)
            }
            setInvestingDetails({total_invested_amount,total_current_amount})
        }

    },[holdingDetails?.isLoading])

    const holdingPriceInfo = useCallback(()=>{
        
      return  handleStockPriceInfoPortfolio({previous_day_close_price:investingDetails.total_invested_amount,current_price:investingDetails.total_current_amount})
    },[investingDetails]);
    
    let profitAndLossInfo = holdingPriceInfo()

    const investedAmount = handleConvertNumberToIndianSystem({ digit: investingDetails.total_invested_amount })?.substring(1)?.trim();
    const currentAmount = handleConvertNumberToIndianSystem({ digit: investingDetails.total_current_amount })?.substring(1).trim();

  return (
      <View style={{ flex: 1 }}>
          <Animated.ScrollView
              style={{ flex: 1, backgroundColor: 'white' }}
              scrollEventThrottle={20}
              onScroll={scrollHandler} showsVerticalScrollIndicator={false} >

              <View style={{ height: 180, backgroundColor: "#e7e7e7", position: 'relative' }}>
                  <View style={{ backgroundColor: '#e7e7e7', height: 90 }}>

                  </View>
                  <View style={{ backgroundColor: "white", height: 90 }}>

                  </View>
                  <View style={{ height: 140, position: "absolute", backgroundColor: "white", bottom: 5, left: 20, right: 20, borderRadius: 4, elevation: showStatus == true ? 0 : 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                          <View style={{ width: '50%' }}>
                              <Text style={{ fontSize: 14, opacity: 0.4 }}>Invested</Text>
                              <Text style={{ fontSize: 18 }}>₹{investedAmount}</Text>
                          </View>
                          <View style={{ width: '50%' }}>
                              <Text style={{ fontSize: 14, opacity: 0.4 }}>Current</Text>
                              <Text style={{ fontSize: 18 }}>₹{currentAmount}</Text>
                          </View>
                      </View>

                      <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginLeft: 20, marginRight: 20, marginTop: 15 }} />

                      <View style={{ flexDirection: 'row', marginTop: 14, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between", alignItems: 'center' }}>
                          <Text style={{ fontSize: 18, opacity: 0.3, width: '50%' }}>P&L</Text>
                          <View style={{ flexDirection: 'row', columnGap: 5, width: '50%', alignItems: 'center' }}>
                              <Text style={{ fontSize: 18, color: profitAndLossInfo.text_color }}>{profitAndLossInfo?.price_symbol}{profitAndLossInfo.difference_in_price}</Text>
                              <Text style={{ fontSize: 14, color: profitAndLossInfo.text_color, marginTop: 2 }}>{profitAndLossInfo.price_symbol}{profitAndLossInfo.percentage_difference}%</Text>
                             
                          </View>
                      </View>

                  </View>
              </View>

              <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', columnGap: 15 }}>
                      <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                      <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                  </View>
                  <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center' }}>
                      <FeatherIcon name="users" size={15} color="#0484f7" />
                      <Text style={{ fontSize: 12, color: "#0484f7" }}>
                          Family
                      </Text>
                      <CircleSpecial />
                      <Text style={{ fontSize: 12, color: "#0484f7" }}>
                          Tradebook
                      </Text>
                  </View>
              </View>

                <FlatList
                scrollEnabled={false}
                data={holdingData}
                renderItem={({item,index})=>{
                    return <PortfolioScreenStockDetails holding={item} />
                }}
                />

              <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 100, flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                  <FeatherIcon name='lock' size={15} color={"#0484f7"} />
                  <Text style={{ color: "#0484f7" }}>Authorization</Text>
              </View>


          </Animated.ScrollView>
          <View style={{ borderTopWidth: 0.5, borderTopColor: '#e7e7e7', height: 40, backgroundColor: 'white', position: 'absolute', left: 0, right: 0, bottom: 0, paddingLeft: 20, paddingRight: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>
                  Day's P&L
              </Text>
              <View style={{ flexDirection: 'row', columnGap: 5, alignItems: "baseline" }}>
                  <Text style={{ fontSize: 14, color: 'green' }}>+1934.37</Text>
                  <Text style={{ fontSize: 11, color: 'green' }}>+1.63%</Text>
              </View>
          </View>
      </View>
  )
}

export default Holdings

const styles = StyleSheet.create({})


const PortfolioScreenStockDetails = ({holding}:{holding:HOLDING}) => {

    const handlePriceInfo = useCallback(()=>{
        return handleStockPriceInfoPortfolio({previous_day_close_price:handleCurrencyIndianToInteger(holding.item.previous_close),current_price:handleCurrencyIndianToInteger(holding.item.current_price)})
    },[holding])


    let itemPriceInfo  = handlePriceInfo();

    const handleItemCurrentValue = useCallback(() => {
        return handleStockPriceInfoPortfolio({ previous_day_close_price: holding.total_amount, current_price: +(handleCurrencyIndianToInteger(holding.item.current_price) * holding.quantity).toFixed(2)})
    }, [holding])

    let itemCurrentValue = handleItemCurrentValue();

    return (
        <View>
            <View style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', columnGap: 5 }}>
                        <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
                            <Text style={{ opacity: 0.35, fontSize: 12 }}>{holding.quantity}</Text>
                            <Text style={{ fontSize: 12 }}>Qty.</Text>
                        </View>
                        <Text>•</Text>
                        <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
                            <Text style={{ opacity: 0.35, fontSize: 12 }}>Avg.</Text>
                            <Text style={{ fontSize: 12 }}>{holding.average_price}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, color: itemCurrentValue.text_color }}>{itemCurrentValue.price_symbol}{itemCurrentValue.percentage_difference}%</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14 }}>{holding.item?.name?.toUpperCase()}</Text>
                    <Text style={{ fontSize: 14, color: itemPriceInfo.text_color }}>
                        {itemPriceInfo.price_symbol}{itemPriceInfo.difference_in_price}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: "space-between", alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, opacity: 0.35 }}>Invested</Text>
                        <Text style={{ fontSize: 12 }}>{holding?.total_amount?.toFixed(2)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', columnGap: 5 }}>
                        <Text style={{ fontSize: 13, opacity: 0.35 }}>LTP</Text>
                        <Text style={{ fontSize: 13 }}>{handleCurrencyIndianToInteger(holding?.item?.current_price)}</Text>
                        <Text style={{ color: itemPriceInfo.text_color, fontSize: 12 }}>({itemPriceInfo.price_symbol}{itemPriceInfo.percentage_difference}%)</Text>
                    </View>

                </View>

            </View>
        </View>

    )
}
