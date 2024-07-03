import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { CircleSpecial } from '../../component/extra/circleSpecial';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicHeader from '../../component/dynamicHeader';
import { StatusBar } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { HEADER_PRIMARY_SCREEN_TITLE } from '../../app/types/global';
import Holdings from '../../component/screens/PortfolioScreen/Holdings';
import Positions from '../../component/screens/PortfolioScreen/Positions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const PortfolioScreen = () => {

  const [showOrderListDepth, setShowOrderListDepth] = useState(false);

 

  const [showStatus,setShowStatus] = useState(false);

  const scrollOffsetY = useSharedValue(0);



  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Holdings' },
    { key: 'second', title: 'Positions' },
  ]);

  

  const renderScene = ({route}:{route:any})=>{

    switch(route.key){
      case 'first':
        return <Holdings showStatus={showStatus} scrollOffsetY={scrollOffsetY}/>
      
      case 'second':
        return <Positions showStatus={showStatus} scrollOffsetY={scrollOffsetY}/>

      default:
        return <></>
    }
  }


  return (
    <>
      <SafeAreaView style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
        <StatusBar backgroundColor={"#e7e7e7"} barStyle={"dark-content"} />
        <DynamicHeader screenName={HEADER_PRIMARY_SCREEN_TITLE.PORTFOLIO} scrollOffsetY={scrollOffsetY} showStatus={showStatus} setShowStatus={setShowStatus}>

        <TabView

          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(index)=>{
            setIndex(index);
            scrollOffsetY.value = 0;
          }}
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
        </DynamicHeader>
      </SafeAreaView>
    </>
  )
}

export default PortfolioScreen

const styles = StyleSheet.create({})


const PortfolioScreenStockDetails = ({ name = "", ltp = "", avg = "", qty = "", invested = "", changed_percentaged = "" }) => {

  return (
    <View>
      <View style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35, fontSize: 12 }}>{qty}</Text>
              <Text style={{ fontSize: 12 }}>Qty.</Text>
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
              <Text style={{ opacity: 0.35, fontSize: 12 }}>Qty.</Text>
              <Text style={{ color: "#0484f7", fontSize: 12 }}>50</Text>
            </View>
            <Text>•</Text>
            <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
              <Text style={{ opacity: 0.35, fontSize: 12 }}>Avg.</Text>
              <Text style={{ fontSize: 12 }}>5588.01</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2e7c5', paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2 }}>
            <Text style={{ fontSize: 11 }}>MIS</Text>
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


