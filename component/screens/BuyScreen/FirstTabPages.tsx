import { Alert, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler'
import FeatureIcon from 'react-native-vector-icons/Feather'
import OctIcon from "react-native-vector-icons/Octicons"
import Material from 'react-native-vector-icons/MaterialIcons'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import SwipeButtonCustom from '../../extra/swipeButton'
import { BUY_SELL_SCREEN_COLORS_DATA } from '../../../app/constants/colors'
import { ORDER_INPUT_DATA, ORDER_PRIMARY_TYPE, ORDER_PRIMARY_TYPE_INFO, TRADE_TYPE, VALIDITY_TYPE } from '../../../app/types/order'
import { STOCK } from '../../../app/types/stock'
import { addNewOrder, ORDER_INPUT_PROPS } from './OrderService'
import { useGetUserByTokenQuery } from '../../../features/slices/userApiSlice'
import { usePlaceBuyOrderMutation } from '../../../features/slices/orderSlice'
import { useNavigation } from '@react-navigation/native'




export const FirstRegularTabBuy = ({ tabName = "regular",market_type="nse",stock }: { tabName: ORDER_PRIMARY_TYPE,market_type?:string,stock:STOCK }) => {

    const [hideExtra, setHideExtra] = useState(false);
    const navigation = useNavigation<any>()

    const userDetails = useGetUserByTokenQuery({});

    const [placeNewOrder] = usePlaceBuyOrderMutation();

    //states
    const [selectedProduct, setSelectedProduct] = useState<TRADE_TYPE>("mis");
    const [selectedMainOrderType, setSelectedMainOrderType] = useState<ORDER_PRIMARY_TYPE_INFO>("market");
    const [selectedValidityType, setSelectedValidityType] = useState<VALIDITY_TYPE>("day");

    const [quantity,setQuantity] = useState('1');

    const handleAddOrderInitial = ()=>{

        let stateValues = {
            selectedProduct,
            selectedMainOrderType,
            selectedValidityType,
            quantity:+quantity
        }

        addNewOrder({stateValues:stateValues,userDetails:userDetails?.data?.data,tabName,stockDetails:stock,addOrderCallback:(args:ORDER_INPUT_DATA)=>handleFinalAddOrder(args)})

    }

    const handleFinalAddOrder = (args:ORDER_INPUT_DATA)=>{
        // addNewOrder({ orderDetails: args }).then((res) => {
        //     console.log(res);
        // })

        placeNewOrder({orderDetails:args}).then((res)=>{
            if(res?.data?.error==false){
                ToastAndroid.show("Order Placed Successfully",3);
                navigation.goBack()
            }
        })

        
    }




    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }} showsVerticalScrollIndicator={false}>
             
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput value={quantity} onChangeText={(text)=>setQuantity(text)} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput editable={selectedMainOrderType!=='market'} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* product type*/}
                <OrderPageProductTypeComponent selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {/* Main Order Type */}
                <OrderPageMainOrderTypeComponent selectedMainOrderType={selectedMainOrderType} setSelectedMainOrderType={setSelectedMainOrderType} />


                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {/* Legs */}
               {
                    tabName == "iceberg" ? <View style={{ rowGap: 10, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                        <Text style={{ fontWeight: 600 }}>Number of legs</Text>
                        <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                            <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                        </View>
                        <Text style={{ opacity: 0.4, fontSize: 13 }}>1 qty. per leg</Text>
                    </View>:<></>
               }



                {/*Trigger */}
                {
                    (tabName == "co" || selectedMainOrderType == "sl" || selectedMainOrderType == "sl-m") ? <>
                        <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />
                        <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                            <Text style={{ fontWeight: 600 }}>Trigger</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                            </View>
                        </View>

                    </> : <></>
                }
                

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20,marginBottom:tabName=="co"?200:0 }} />

                {
                    hideExtra == true &&
                    <>
                        <OrderPageValidityComponent selectedValidityType={selectedValidityType} setSelectedValidityType={setSelectedValidityType} />

                        <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                            <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
                            <View style={{ flexDirection: 'row', columnGap: 10 }}>
                                <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                    <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                </View>
                                <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                    <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
                                </View>
                            </View>
                        </View>
                    </>
                }

                {
                    tabName !== 'co' ? <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
                        <Pressable onPress={() => setHideExtra(!hideExtra)}>
                            <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
                                }
                                <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
                                {
                                    hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
                                }
                            </View>
                        </Pressable>
                    </View> : <></>
                }





            </ScrollView>

            {/*Bottom Button Swipe*/}
            <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
                <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
                    <View style={{ flexDirection: 'row', columnGap: 20 }}>
                        <View style={{ flexDirection: 'row', columnGap: 10 }}>
                            <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
                            <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 10 }}>
                            <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
                            <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
                        </View>
                    </View>
                    <FeatureIcon name="rotate-ccw" />
                </View>
                <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    {/* <View style={{ width: 250, height: 60, borderRadius: 100, backgroundColor: '#2a8af4', position: 'relative' }}>
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[eStyle, { height: 60, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 3, borderColor: "#2a8af4" }]}>

                                <FeatureIcon name="chevron-right" color="#2a8af4" size={30} />

                            </Animated.View>
                        </GestureDetector>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, position: 'absolute', margin: 'auto', bottom: 20, left: '35%' }}>
                            SWIPE TO BUY
                        </Text>
                    </View> */}
                    <SwipeButtonCustom callback={(args)=>{
                        handleAddOrderInitial();
                        setTimeout(()=>{
                            args.value = 0;
                        },2000)
                    }} />

                </View>
            </View>
        </View>

    )
}


const SELECTED_BOX_BUY = BUY_SELL_SCREEN_COLORS_DATA.BUY_SCREEN_BUTTON_SELECTED_BORDER_AND_TEXT_COLOR;
const UNSELECTED_BOX_BUY = BUY_SELL_SCREEN_COLORS_DATA.BUY_SCREEN_BUTTON_UNSELECTED_DEFAULT_BORDER_AND_TEXT_COLOR;

export const OrderPageProductTypeComponent = ({ selectedProduct, setSelectedProduct }: { selectedProduct: TRADE_TYPE, setSelectedProduct: React.Dispatch<React.SetStateAction<TRADE_TYPE>> }) => {

    let misCheck = selectedProduct === "mis" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let nrmlCheck = selectedProduct === "nrml" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;


    return (
        <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
            <Text style={{ fontWeight: 600 }}>Product</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pressable onPress={() => setSelectedProduct('mis')} style={{ height: 40, borderColor: misCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontSize: 11, color: misCheck }}>
                        Intraday
                    </Text>
                    <Text style={{ fontSize: 11, opacity: 0.4, color: misCheck }}>
                        MIS
                    </Text>

                </Pressable>

                <Pressable onPress={() => { setSelectedProduct("nrml") }} style={{ height: 40, marginLeft: 14, borderColor: nrmlCheck, borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontSize: 11, color: nrmlCheck }}>
                        Long term
                    </Text>
                    <Text style={{ fontSize: 11, opacity: 0.4, color: nrmlCheck }}>
                        CNC
                    </Text>

                </Pressable>

            </View>
        </View>
    )
}


export const OrderPageMainOrderTypeComponent = ({ selectedMainOrderType, tabName, setSelectedMainOrderType }: { selectedMainOrderType: ORDER_PRIMARY_TYPE_INFO, setSelectedMainOrderType: React.Dispatch<React.SetStateAction<ORDER_PRIMARY_TYPE_INFO>>, tabName?: string }) => {

    let marketCheck = selectedMainOrderType === "market" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let limitCheck = selectedMainOrderType == "limit" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let slCheck = selectedMainOrderType === "sl" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let sl_mCheck = selectedMainOrderType == "sl-m" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;

    return (
        <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
            <Text style={{ fontWeight: 600 }}>Type</Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Pressable onPress={() => { setSelectedMainOrderType("market") }} style={{ height: 40, borderColor: marketCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: marketCheck }}>
                        Market
                    </Text>
                </Pressable>
                <Pressable onPress={() => { setSelectedMainOrderType("limit") }} style={{ height: 40, borderColor: limitCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: limitCheck }}>
                        Limit
                    </Text>
                </Pressable>
                {
                    tabName == "co" ? <></> :
                        <Pressable onPress={() => { setSelectedMainOrderType("sl") }} style={{ height: 40, borderColor: slCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: slCheck }}>
                                SL
                            </Text>
                        </Pressable>
                }
                {
                    tabName == "co" ? <></> :
                        <Pressable onPress={() => { setSelectedMainOrderType("sl-m") }} style={{ height: 40, borderColor: sl_mCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: sl_mCheck }}>
                                SL-M
                            </Text>
                        </Pressable>
                }
            </View>
        </View>
    )
}



export const OrderPageValidityComponent = ({ selectedValidityType, setSelectedValidityType, tabName }: { selectedValidityType: VALIDITY_TYPE, setSelectedValidityType: React.Dispatch<React.SetStateAction<VALIDITY_TYPE>>, tabName?: string }) => {

    let dayCheck = selectedValidityType === "day" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let iocCheck = selectedValidityType === "ioc" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;
    let minutesCheck = selectedValidityType === "minutes" ? SELECTED_BOX_BUY : UNSELECTED_BOX_BUY;



    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                <Pressable onPress={() => setSelectedValidityType("day")} style={{ height: 40, borderColor: dayCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: dayCheck }}>
                        DAY
                    </Text>
                </Pressable>

                <Pressable onPress={() => setSelectedValidityType("ioc")} style={{ height: 40, borderColor: iocCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: iocCheck }}>
                        IOC
                    </Text>
                </Pressable>
                <Pressable onPress={() => setSelectedValidityType("minutes")} style={{ height: 40, borderColor: minutesCheck, borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: minutesCheck }}>
                        Minutes
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}


// export const FirstCoverTabBuy = () => {



//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>

//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>

//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                     <Text style={{ fontWeight: 600 }}>Stoploss trigger</Text>
//                     <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                         <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />



//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>

//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }

// export const FirstAMOTabBuy = () => {
//     const [hideExtra, setHideExtra] = useState(false);


//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Long term
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4 }}>
//                                 CNC
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL-M
//                             </Text>
//                         </View>
//                     </View>
//                 </View>



//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 {
//                     hideExtra == true &&
//                     <>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                             <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
//                             <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
//                                 <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                         DAY
//                                     </Text>
//                                 </View>

//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         IOC
//                                     </Text>
//                                 </View>
//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         Minutes
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                             <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 </View>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
//                                 </View>
//                             </View>
//                         </View>
//                     </>
//                 }

//                 <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
//                     <Pressable onPress={() => setHideExtra(!hideExtra)}>
//                         <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
//                             }
//                             <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
//                             {
//                                 hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
//                             }
//                         </View>
//                     </Pressable>
//                 </View>





//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>

//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }


// export const FirstIcebergTabBuy = () => {
//     const [hideExtra, setHideExtra] = useState(false);




//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Long term
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4 }}>
//                                 CNC
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL-M
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ rowGap: 10, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                     <Text style={{ fontWeight: 600 }}>Number of legs</Text>
//                     <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                         <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

//                     </View>
//                     <Text style={{ opacity: 0.4, fontSize: 13 }}>1 qty. per leg</Text>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 {
//                     hideExtra == true &&
//                     <>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                             <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
//                             <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
//                                 <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                         DAY
//                                     </Text>
//                                 </View>

//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         IOC
//                                     </Text>
//                                 </View>
//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         Minutes
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                             <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 </View>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
//                                 </View>
//                             </View>
//                         </View>
//                     </>
//                 }

//                 <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
//                     <Pressable onPress={() => setHideExtra(!hideExtra)}>
//                         <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
//                             }
//                             <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
//                             {
//                                 hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
//                             }
//                         </View>
//                     </Pressable>
//                 </View>





//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>

//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }


// export const SecondRegularTabBuy = () => {

//     const [hideExtra, setHideExtra] = useState(false);




//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Long term
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4 }}>
//                                 CNC
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL-M
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                     <Text style={{ fontWeight: 600 }}>Trigger</Text>
//                     <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                         <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 {
//                     hideExtra == true &&
//                     <>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                             <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
//                             <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
//                                 <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                         DAY
//                                     </Text>
//                                 </View>

//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         IOC
//                                     </Text>
//                                 </View>
//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         Minutes
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                             <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 </View>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
//                                 </View>
//                             </View>
//                         </View>
//                     </>
//                 }

//                 <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
//                     <Pressable onPress={() => setHideExtra(!hideExtra)}>
//                         <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
//                             }
//                             <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
//                             {
//                                 hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
//                             }
//                         </View>
//                     </Pressable>
//                 </View>





//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>
//                     {/* <View style={{ width: 250, height: 60, borderRadius: 100, backgroundColor: '#2a8af4', position: 'relative' }}>
//                         <GestureDetector gesture={panGesture}>
//                             <Animated.View style={[eStyle, { height: 60, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 3, borderColor: "#2a8af4" }]}>

//                                 <FeatureIcon name="chevron-right" color="#2a8af4" size={30} />

//                             </Animated.View>
//                         </GestureDetector>
//                         <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, position: 'absolute', margin: 'auto', bottom: 20, left: '35%' }}>
//                             SWIPE TO BUY
//                         </Text>
//                     </View> */}
//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }


// export const SecondAMOTabBuy = () => {
//     const [hideExtra, setHideExtra] = useState(false);


//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Long term
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4 }}>
//                                 CNC
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL-M
//                             </Text>
//                         </View>
//                     </View>
//                 </View>



//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 {
//                     hideExtra == true &&
//                     <>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                             <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
//                             <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
//                                 <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                         DAY
//                                     </Text>
//                                 </View>

//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         IOC
//                                     </Text>
//                                 </View>
//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         Minutes
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                             <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 </View>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
//                                 </View>
//                             </View>
//                         </View>
//                     </>
//                 }

//                 <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
//                     <Pressable onPress={() => setHideExtra(!hideExtra)}>
//                         <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
//                             }
//                             <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
//                             {
//                                 hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
//                             }
//                         </View>
//                     </Pressable>
//                 </View>





//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>

//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }


// export const SecondIcebergTabBuy = () => {
//     const [hideExtra, setHideExtra] = useState(false);




//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView style={{ backgroundColor: 'white', }}>
//                 <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
//                     <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

//                     </View>
//                     <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//                     </View>

//                     <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <Text style={{ fontWeight: 600 }}>Quantity</Text>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
//                             </View>
//                         </View>
//                         <View style={{ rowGap: 13, width: '50%' }}>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
//                                 <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
//                             </View>
//                             <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                 <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Product</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Intraday
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
//                                 MIS
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Long term
//                             </Text>
//                             <Text style={{ fontSize: 11, opacity: 0.4 }}>
//                                 CNC
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
//                     <Text style={{ fontWeight: 600 }}>Type</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                 Market
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 Limit
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL
//                             </Text>
//                         </View>
//                         <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 11 }}>
//                                 SL-M
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ rowGap: 10, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                     <Text style={{ fontWeight: 600 }}>Number of legs</Text>
//                     <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                         <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

//                     </View>
//                     <Text style={{ opacity: 0.4, fontSize: 13 }}>1 qty. per leg</Text>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                     <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
//                     <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
//                         <FeatureIcon name="plus" color="#2a8af4" size={16} />
//                         <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
//                     </View>
//                 </View>

//                 <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

//                 {
//                     hideExtra == true &&
//                     <>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
//                             <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
//                             <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
//                                 <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11, color: "#2a8af4" }}>
//                                         DAY
//                                     </Text>
//                                 </View>

//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         IOC
//                                     </Text>
//                                 </View>
//                                 <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 11 }}>
//                                         Minutes
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ rowGap: 13, paddingBottom: 30, paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                             <Text style={{ fontWeight: 600 }}>Disc Qty.</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue={"0"} cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
//                                 </View>
//                                 <View style={{ height: 50, width: '49%', flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
//                                     <TextInput defaultValue='1 minute' cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '90%', paddingLeft: 10, fontSize: 14 }} />
//                                 </View>
//                             </View>
//                         </View>
//                     </>
//                 }

//                 <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
//                     <Pressable onPress={() => setHideExtra(!hideExtra)}>
//                         <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             {
//                                 hideExtra == true && <FeatureIcon name="chevron-up" size={20} />
//                             }
//                             <Text>{hideExtra == true ? 'Less' : 'More'}</Text>
//                             {
//                                 hideExtra == false && <FeatureIcon name="chevron-down" size={20} />
//                             }
//                         </View>
//                     </Pressable>
//                 </View>





//             </ScrollView>

//             {/*Bottom Button Swipe*/}
//             <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
//                 <View style={[{ height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Margin</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹2,939.90</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                             <Text style={{ fontSize: 12, color: 'gray' }}>Charges</Text>
//                             <Text style={{ color: '#2a8af4', fontSize: 12 }}>₹5.80</Text>
//                         </View>
//                     </View>
//                     <FeatureIcon name="rotate-ccw" />
//                 </View>
//                 <View style={{ height: 140, paddingLeft: 20, paddingTop: 15, paddingRight: 20, flexDirection: 'row', justifyContent: 'center' }}>

//                     <SwipeButtonCustom />

//                 </View>
//             </View>
//         </View>

//     )
// }
