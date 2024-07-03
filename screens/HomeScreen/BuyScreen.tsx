import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { CustomRadioButton } from '../../component/radio'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import {  FirstRegularTabBuy } from '../../component/screens/BuyScreen/FirstTabPages'
import { useRoute } from '@react-navigation/native'
import { useGetStockByIDQuery, useSubscribeSingleStockQuery } from '../../features/slices/stockApiSlice'
import { STOCK } from '../../app/types/stock'


const BuyScreen = ({ navigation }: { navigation: any }) => {

    const [firstCheckState, setFirstCheckState] = useState(true);
    const [secondCheckState, setSecondCheckState] = useState(false)

    const routeParams = useRoute<any>();

    const stockDetailsSocket = useSubscribeSingleStockQuery({stockId:routeParams?.params?._id});

    const stockData:STOCK = stockDetailsSocket?.data?.data;
  

    const { top } = useSafeAreaInsets()

    const [firstOptionTabIndex,SetFirstOptionTabIndex] = useState(0)
    const [secondOptionTabIndex,setSecondOptionTabIndex] = useState(0);
    
    const firstOptionData:any = useState([
        { key: 'first', title: 'Regular' },
        { key: 'second', title: 'Cover' },
        { key: 'third', title: 'AMO' },
        { key: 'fourth', title: 'Iceberg' }
    ]);

    const secondOptionData: any = useState([
        { key: 'first', title: 'Regular' },
        { key: 'second', title: 'AMO' },
        { key: 'third', title: 'Iceberg' }
    ]);

   

    const firstOptionRenderScene  = ({route}:{route:any})=>{

        switch(route.key){
            case 'first':
                return <FirstRegularTabBuy tabName='regular' stock={stockData}/>
            
            case 'second':
                return <FirstRegularTabBuy tabName="co"  stock={stockData}/>

            case 'third':
                return <FirstRegularTabBuy tabName='amo'  stock={stockData}/>

            case 'fourth':
                return <FirstRegularTabBuy tabName='iceberg'  stock={stockData}/>
        }
    }

    const secondOptionRenderScene = ({ route }: { route: any }) => {

        switch (route.key) {
            case 'first':
                return <FirstRegularTabBuy tabName='regular' market_type='bse' stock={stockData}/>

            case 'second':
                return <FirstRegularTabBuy tabName='amo' market_type='bse' stock={stockData}/>

            case 'third':
                return <FirstRegularTabBuy tabName='iceberg' market_type='bse' stock={stockData}/>

           
        }
    }

   


    
   


    return (
        <SafeAreaView style={{ position: 'relative', flexDirection: 'column',flex:1 }}>
            <View style={{ height: 50, paddingLeft: 15, paddingRight: 15, backgroundColor: '#e7e7e7', position: 'absolute', left: 0, right: 0, top: top, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', columnGap: 23, alignItems: 'center' }}>
                    <FeatherIcon onPress={()=>navigation.goBack()} name="arrow-left" size={25} />
                    <View style={{rowGap:4}}>
                        <Text style={{ fontSize: 13,paddingLeft:2 }}>{stockData?.name?.toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', columnGap: 12,alignItems:'center' }}>
                            <View style={{flexDirection:'row',columnGap:6}}>
                                <CustomRadioButton activeColor={"#0471f7"} innerColor={"#e7e7e7"} checkFlag={firstCheckState} onPressFunction={() => { setFirstCheckState(true); setSecondCheckState(false); }} />
                                <Text style={{ color: firstCheckState == true ? '#2a8af4' : 'gray', fontSize: 11 }}>NSE: ₹ {stockData?.current_price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', columnGap: 6 }}>
                                <CustomRadioButton activeColor={"#0471f7"} innerColor={"#e7e7e7"} checkFlag={secondCheckState} onPressFunction={() => { setFirstCheckState(false); setSecondCheckState(true); }} />
                                <Text style={{ color: secondCheckState == true ? '#2a8af4' : 'gray', fontSize: 11 }}>BSE: ₹ {stockData?.current_price}</Text>
                           </View>
                        </View>
                    </View>
                </View>
                <View >
                    <FeatherIcon name="more-vertical" size={25} />
                </View>

            </View>
            
            {
                firstCheckState == true && secondCheckState==false && <TabView

                    style={{ top: top + 45 }}
                    navigationState={{ index: firstOptionTabIndex, routes: firstOptionData[0] }}
                    renderScene={firstOptionRenderScene}
                    swipeEnabled={true}
                    onIndexChange={(item) => SetFirstOptionTabIndex(item)}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#0181ea' }}
                            tabStyle={{ width: "auto" }}
                            labelStyle={{ fontSize: 12, fontWeight: 600, width: '100%', marginLeft: 8, marginRight: 8 }}
                            scrollEnabled={true}
                            activeColor='#0181ea'
                            inactiveColor='black'
                            style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
                        />
                    )}
                />
            }
               
            {
                secondCheckState==true && firstCheckState==false &&
                <TabView

                    style={{ top: top + 45 }}
                    navigationState={{ index: secondOptionTabIndex, routes: secondOptionData[0] }}
                    renderScene={secondOptionRenderScene}
                    swipeEnabled={true}
                    onIndexChange={(item) => setSecondOptionTabIndex(item)}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#0181ea', width: secondOptionTabIndex == 1 ? 70 : 80, left: secondOptionTabIndex == 1 ? '8.5%' : '7%' }}
                           
                            labelStyle={{ fontSize: 12, fontWeight: 600, width: '100%', marginLeft: 8, marginRight: 8 }}
                           
                            activeColor='#0181ea'
                            inactiveColor='black'
                            style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
                        />
                    )}
                />
            }
         
        </SafeAreaView>
        
    )
}

export default BuyScreen