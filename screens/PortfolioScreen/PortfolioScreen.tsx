import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { CircleSpecial } from '../../component/extra/circleSpecial';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo'

const PortfolioScreen = () => {

  const [showOrderListDepth, setShowOrderListDepth] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {

  }, [])

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Holdings' },
    { key: 'second', title: 'Positions' },
  ]);

  const handleSearchType = () => {

  }

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }} >

        <View style={{ height: 180, backgroundColor: "#e7e7e7", position: 'relative' }}>
          <View style={{ backgroundColor: '#e7e7e7', height: 90 }}>

          </View>
          <View style={{ backgroundColor: "white", height: 90 }}>

          </View>
          <View style={{ height: 140, position: "absolute", backgroundColor: "white", bottom: 5, left: 20, right: 20, borderRadius: 4, elevation: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: 14, opacity: 0.4 }}>Invested</Text>
                <Text style={{ fontSize: 18 }}>₹95,008.45</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontSize: 14, opacity: 0.4 }}>Current</Text>
                <Text style={{ fontSize: 18 }}>₹95,750.23</Text>
              </View>
            </View>

            <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginLeft: 20, marginRight: 20, marginTop: 15 }} />

            <View style={{ flexDirection: 'row', marginTop: 14, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between", alignItems: 'center' }}>
              <Text style={{ fontSize: 18, opacity: 0.3, width: '50%' }}>P&L</Text>
              <View style={{ flexDirection: 'row', columnGap: 5, width: '50%', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'green' }}>+747.23</Text>
                <Text style={{ fontSize: 14, color: 'green', marginTop: 2 }}>+0.75%</Text>
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

        <PortfolioScreenStockDetails avg='2254.03' changed_percentaged='2.01' qty='5' invested='10005.34' name='GLAND' ltp='2272.50' />
        <PortfolioScreenStockDetails avg='2988.03' changed_percentaged='1.33' qty='15' invested='48005.14' name='RELIANCE' ltp='2930.47' />
        <PortfolioScreenStockDetails avg='4757.03' changed_percentaged='5.32' qty='4' invested='22005.32' name='TCS' ltp='4783.20' />
        <PortfolioScreenStockDetails avg='1651.03' changed_percentaged='0.12' qty='2' invested='3205.05' name="HDFCBANK" ltp='1650.44' />
        <PortfolioScreenStockDetails avg='853.03' changed_percentaged='0.55' qty='10' invested='12005.30' name="ICICIBANK" ltp='1050.44' />
        <PortfolioScreenStockDetails avg='1357.03' changed_percentaged='1.14' qty='10' invested='15005.11' name="INDUSIND BANK" ltp='1650.44' />

        <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 100, flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
          <FeatherIcon name='lock' size={15} color={"#0484f7"} />
          <Text style={{ color: "#0484f7" }}>Authorization</Text>
        </View>


      </ScrollView>
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

  );

  const SecondRoute = () => (
    <ScrollView style={{ backgroundColor: 'white' }} >


      <View style={{ height: 120, backgroundColor: "#e7e7e7", position: 'relative' }}>
        <View style={{ backgroundColor: '#e7e7e7', height: 60 }}>

        </View>
        <View style={{ backgroundColor: "white", height: 60 }}>

        </View>

        <View style={{ height: 90, position: "absolute",rowGap:5, backgroundColor: "white", bottom: 15, left: 20, right: 20, borderRadius: 4, elevation: 4,justifyContent:'center',alignItems:'center' }}>
          
          <Text style={{opacity:0.35,fontSize:15}}>Total P&L</Text>
          <Text style={{fontSize:20,color:'green'}}>+1,844.30</Text>
          
        </View>
      </View>

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

      <PortfolioScreenPositionDetails name="NIFTY JUNE 24000 CE" ltp='135.44' />
      
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });


  return (
    <>
      <TabView

        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#0181ea', flexDirection: 'row', justifyContent: 'center', width: 100, left: '13%' }}
            labelStyle={{ fontSize: 11.5, fontWeight: 600, width: '100%' }}
            activeColor='#0181ea'
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color, fontWeight: 600, minWidth: 120, textAlign: 'center' }}>
                {route.title}
              </Text>
            )}
            inactiveColor='black'

            style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
          />
        )}
      />
    </>
  )
}

export default PortfolioScreen

const styles = StyleSheet.create({})


const PortfolioScreenStockDetails = ({ name = "", ltp = "",avg="",qty="",invested="",changed_percentaged=""}) => {

  return (
    <View>
      <View style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35,fontSize:12 }}>{qty}</Text>
              <Text style={{fontSize:12}}>Qty.</Text>
            </View>
            <Text>•</Text>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35, fontSize: 12 }}>Avg.</Text>
              <Text style={{ fontSize: 12 }}>5588.01</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: 'red' }}>-3.03%</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>{name}</Text>
          <Text style={{ fontSize: 14, color: 'green' }}>
            +5539.50
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: "space-between", alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, opacity: 0.35 }}>Invested</Text>
            <Text style={{ fontSize: 12 }}>{invested}</Text>
          </View>

          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <Text style={{ fontSize: 13, opacity: 0.35 }}>LTP</Text>
            <Text style={{ fontSize: 13 }}>{ltp}</Text>
            <Text style={{ color: 'green', fontSize: 12 }}>(+{changed_percentaged}%)</Text>
          </View>

        </View>

      </View>
    </View>

  )
}


const PortfolioScreenPositionDetails = ({ name = "", ltp = "" }) => {

  return (
    <View>
      <View style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35,fontSize:12 }}>Qty.</Text>
              <Text style={{ color:"#0484f7",fontSize:12}}>50</Text>
            </View>
            <Text>•</Text>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35,fontSize:12 }}>Avg.</Text>
              <Text style={{fontSize:12}}>5588.01</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#f2e7c5' ,paddingLeft:5,paddingRight:5,paddingTop:2,paddingBottom:2}}>
            <Text style={{fontSize:11}}>MIS</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>{name}</Text>
          <Text style={{ fontSize: 14, color: 'green' }}>
            +1,844.30
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: "space-between", alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, opacity: 0.35 }}>NFO</Text>
            
          </View>

          <View style={{ flexDirection: 'row', columnGap: 3 }}>
            <Text style={{ fontSize: 12, opacity: 0.35 }}>LTP</Text>
            <Text style={{ fontSize: 11 }}>{ltp}</Text>
           
          </View>

        </View>

      </View>
    </View>

  )
}


