import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, Switch, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FeatureIcon from 'react-native-vector-icons/Feather'
import { CustomRadioButton } from '../../../component/radio';
import ToggleSwitch from 'toggle-switch-react-native';

const SettingScreen = () => {

    const [defaultThemeState,setDefaultThemeState] = useState(true);
    const [darkThemeState,setDarkThemeState] = useState(false);

    const [orderNotificationState,setOrderNotificationState] = useState(false);
    const [showOrderWindowState,setShowOrderWindowState] = useState(false);
    const [accessibilityState,setAccessibilityState] = useState(false);
    const [fullScreenState,setFullScreenState]  = useState(false);
    const [stickPinState,setStickPinState] = useState(false);

    const [chartState,setChartState] = useState({first:false,second:false,third:false});

    const [watchListState,setWatchListState] = useState({first:true,second:false})


    return (
        <ScrollView style={{backgroundColor:'white',borderTopWidth:0.7,borderColor:'#e7e7e7'}}>
            <View style={{ padding: 20, rowGap: 15 }}>
                <Text style={{ fontWeight: 600 }}>Theme</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Default</Text>
                    <CustomRadioButton checkFlag={defaultThemeState} onPressFunction={() => {setDefaultThemeState(true);setDarkThemeState(false); }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Dark</Text>
                    <CustomRadioButton checkFlag={darkThemeState} onPressFunction={() => { setDefaultThemeState(false);setDarkThemeState(true) }} />
                </View>
            </View>

            <View style={{height:0.7,backgroundColor:'#e7e7e7',marginTop:10}}/>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20,paddingLeft:20,paddingRight:20}}>
                <Text>Order notifications</Text>
                <ToggleSwitch size={"large"} isOn={orderNotificationState} onToggle={() => {setOrderNotificationState(!orderNotificationState) }} offColor={"#e7e7e7"} onColor={"#4984f3"}/>
                {/* <Switch value={orderNotificationState} onValueChange={()=>setOrderNotificationState(!orderNotificationState)}/> */}

                {/* <ToggleCustom value={orderNotificationState} onChange={()=>setOrderNotificationState(!orderNotificationState)}/> */}

            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{width:'80%'}}>
                    <Text>Stick order window</Text>
                    <Text style={{color:'gray',fontSize:12,}}>Don't automatically hide order window after order placement</Text>
                </View>
                {/* <Switch value={showOrderWindowState} onValueChange={() => setShowOrderWindowState(!showOrderWindowState)} /> */}
                <ToggleSwitch size={"large"} isOn={showOrderWindowState} onToggle={() => { setShowOrderWindowState(!showOrderWindowState)  }} offColor={"#e7e7e7"} onColor={"#4984f3"} />
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{width:'80%'}}>
                    <Text>Accessibility mode</Text>
                    <Text style={{color:'gray',fontSize:12,}}>Disables transitions and simplifies UI</Text>
                </View>
          
                <ToggleSwitch size={"large"} isOn={accessibilityState} onToggle={() => { setAccessibilityState(!accessibilityState)  }} offColor={"#e7e7e7"} onColor={"#4984f3"} />
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ width: '80%' }}>
                    <Text>Fullscreen</Text>
                    <Text style={{ color: 'gray', fontSize: 12, }}>May not work on certain devices</Text>
                </View>

                <ToggleSwitch size={"large"} isOn={fullScreenState} onToggle={() => { setFullScreenState(!fullScreenState) }} offColor={"#e7e7e7"} onColor={"#4984f3"} />
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ width: '80%' }}>
                    <Text>Sticky pins</Text>
                    <Text style={{ color: 'gray', fontSize: 12, }}>Show pinned stock tickers on the top on all screens.</Text>
                </View>

                <ToggleSwitch size={"large"} isOn={stickPinState} onToggle={() => { setStickPinState(!stickPinState) }} offColor={"#e7e7e7"} onColor={"#4984f3"} />
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ width: '80%' }}>
                    <Text>Disable battery optimization</Text>
                    <Text style={{ color: 'gray', fontSize: 12, }}>Get regular widget updates and reduce app closes</Text>
                </View>

               
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ padding: 20, rowGap: 15 }}>
                <Text style={{ fontWeight: 600 }}>Chart</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{flexDirection:'row',columnGap:10,alignItems:'center'}}>
                        <FeatureIcon name="user" size={25}/>
                        <Text>ChartIQ</Text>
                    </View>
                    <CustomRadioButton checkFlag={chartState.first} onPressFunction={() => { setChartState({first:true,second:false,third:false}) }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
                        <FeatureIcon name="user" size={25} />
                        <Text>TradingView v1.0</Text>
                    </View>
                    <CustomRadioButton checkFlag={chartState.second} onPressFunction={() => { setChartState({ first: false, second: true, third: false }) }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
                        <FeatureIcon name="user" size={25} />
                        <Text>TradingView v2.0</Text>
                    </View>
                    <CustomRadioButton checkFlag={chartState.third} onPressFunction={() => { setChartState({ first: false, second: false, third: true }) }} />
                </View>
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ padding: 20, rowGap: 15}}>
                <Text style={{ fontWeight: 600 }}>Watchlist change</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Close price</Text>
                    <CustomRadioButton checkFlag={watchListState.first} onPressFunction={() => { setWatchListState({first:true,second:false}) }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Open price</Text>
                    <CustomRadioButton checkFlag={watchListState.second} onPressFunction={() => { setWatchListState({ first: false, second: true }) }} />
                </View>
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20,marginBottom:50 }} />

        </ScrollView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({})

