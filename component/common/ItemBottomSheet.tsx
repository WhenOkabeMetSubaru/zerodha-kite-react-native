import { View, Text, Pressable } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { handleStockPriceInfo } from './stockPriceInfo';
import { STOCK } from '../../app/types/stock';
import FeatureIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ItemBottomSheetCustom = forwardRef(({ stockData, setStockData, stockPriceInfo, setStockPriceInfo,
    main_blue_btn_name="BUY",main_red_btn_name="SELL",main_blue_btn_cb,main_red_btn_cb
 }: { stockData: any, stockPriceInfo: any, setStockData: any, setStockPriceInfo: any,main_blue_btn_name?:string,main_red_btn_name?:string,main_blue_btn_cb:any,main_red_btn_cb:any }, ItemDataBottomSheetRef:any) => {

    
    const ItemDataBottomSheetSnappoints = useMemo(() => ["25%", "30%", "40%", "50%", "75%", "90%"], []);

    const navigation = useNavigation<any>();

    const [showOrderListDepth,setShowOrderListDepth]  = useState(false);

   

    const handlePresentModalPress = useCallback((item: STOCK) => {
       
        setStockData(item);
        let result = handleStockPriceInfo({ previous_day_close_price: item.previous_close, current_price: item.current_price });
        setStockPriceInfo(result);
        ItemDataBottomSheetRef?.current?.present();
    }, []);

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

  return (
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
                          <Pressable style={{ width: '50%' }} onPress={main_blue_btn_cb}>
                              <View style={{ width: "100%", height: 55, backgroundColor: '#3a91f2', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>{main_blue_btn_name}</Text>
                              </View>
                          </Pressable>
                          <Pressable style={{ width: '50%' }} onPress={main_red_btn_cb}>
                              <View style={{ width: '100%', height: 55, backgroundColor: '#da494f', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>{main_red_btn_name}</Text>
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
  )
});

export default ItemBottomSheetCustom


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
