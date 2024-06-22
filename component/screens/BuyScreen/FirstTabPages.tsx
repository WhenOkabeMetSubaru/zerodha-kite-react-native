import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler'
import FeatureIcon from 'react-native-vector-icons/Feather'
import OctIcon from "react-native-vector-icons/Octicons"
import Material from 'react-native-vector-icons/MaterialIcons'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import SwipeButtonCustom from '../../extra/swipeButton'


export const FirstRegularTabBuy = () => {

    const [hideExtra, setHideExtra] = useState(false);

   


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <Text style={{ fontWeight: 600 }}>Trigger</Text>
                    <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                        <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





            </ScrollView>

            {/*Bottom Button Swipe*/}
            <View style={{ height: 180, backgroundColor: 'white', elevation: 10, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
                <View style={[ { height: 40, backgroundColor: '#e7e7e7', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
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
                    <SwipeButtonCustom/>

                </View>
            </View>
        </View>

    )
}

export const FirstCoverTabBuy = () => {



    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                       
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', columnGap:20 }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                       
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <Text style={{ fontWeight: 600 }}>Stoploss trigger</Text>
                    <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                        <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

            

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
                    
                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}

export const FirstAMOTabBuy = () => {
    const [hideExtra, setHideExtra] = useState(false);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>

               

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





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
                    
                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}


export const FirstIcebergTabBuy = () => {
    const [hideExtra, setHideExtra] = useState(false);




    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ rowGap: 10, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <Text style={{ fontWeight: 600 }}>Number of legs</Text>
                    <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                        <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                    </View>
                    <Text style={{opacity:0.4,fontSize:13}}>1 qty. per leg</Text>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





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
                    
                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}


export const SecondRegularTabBuy = () => {

    const [hideExtra, setHideExtra] = useState(false);




    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ rowGap: 13, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <Text style={{ fontWeight: 600 }}>Trigger</Text>
                    <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                        <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





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
                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}


export const SecondAMOTabBuy = () => {
    const [hideExtra, setHideExtra] = useState(false);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>



                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





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

                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}


export const SecondIcebergTabBuy = () => {
    const [hideExtra, setHideExtra] = useState(false);




    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white', }}>
                <View style={{ height: 140, backgroundColor: '#e7e7e7', position: 'relative' }}>
                    <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>

                    </View>
                    <View style={{ height: 70, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

                    </View>

                    <View style={{ position: 'absolute', flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', columnGap: 10, height: 110, elevation: 2, bottom: 15, left: 20, right: 20, backgroundColor: 'white', borderRadius: 4 }}>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <Text style={{ fontWeight: 600 }}>Quantity</Text>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <OctIcon name="stack" color="lightgray" style={{ position: 'absolute', right: 4, top: 13 }} size={22} />
                            </View>
                        </View>
                        <View style={{ rowGap: 13, width: '50%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 600, width: '40%' }}>Price</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>Tick size 0.05</Text>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                                <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />
                                <Material name="colorize" style={{ position: 'absolute', right: 4, top: 10 }} size={25} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Product</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: '48%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Intraday
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4, color: "#2a8af4" }}>
                                MIS
                            </Text>
                        </View>
                        <View style={{ height: 40, marginLeft: 14, borderColor: 'lightgray', borderWidth: 1, borderRadius: 2, width: '48%', flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Long term
                            </Text>
                            <Text style={{ fontSize: 11, opacity: 0.4 }}>
                                CNC
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, rowGap: 10 }}>
                    <Text style={{ fontWeight: 600 }}>Type</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                Market
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                Limit
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL
                            </Text>
                        </View>
                        <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                                SL-M
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ rowGap: 10, width: '50%', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <Text style={{ fontWeight: 600 }}>Number of legs</Text>
                    <View style={{ height: 50, flexDirection: 'row', position: 'relative', borderWidth: 0.7, borderColor: 'lightgray', borderRadius: 4, overflow: 'hidden' }}>
                        <TextInput cursorColor={"#2a8af4"} keyboardType={"number-pad"} style={{ width: '80%', paddingLeft: 5, fontSize: 20 }} />

                    </View>
                    <Text style={{ opacity: 0.4, fontSize: 13 }}>1 qty. per leg</Text>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: 600, width: 100 }}>Tags</Text>
                    <View style={{ borderRadius: 2, borderColor: "#2a8af4", width: 100, height: 25, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                        <FeatureIcon name="plus" color="#2a8af4" size={16} />
                        <Text style={{ color: "#2a8af4", fontSize: 12 }}>Add tags</Text>
                    </View>
                </View>

                <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />

                {
                    hideExtra == true &&
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontWeight: 600, width: 100 }}>Validity</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '60%' }}>
                                <View style={{ height: 40, borderColor: '#2a8af4', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11, color: "#2a8af4" }}>
                                        DAY
                                    </Text>
                                </View>

                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        IOC
                                    </Text>
                                </View>
                                <View style={{ height: 40, borderColor: 'lightgray', borderWidth: 1, columnGap: 5, borderRadius: 2, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 11 }}>
                                        Minutes
                                    </Text>
                                </View>
                            </View>
                        </View>

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

                <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
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
                </View>





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

                    <SwipeButtonCustom />

                </View>
            </View>
        </View>

    )
}
