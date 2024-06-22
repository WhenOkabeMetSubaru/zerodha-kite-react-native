import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import OpenTab from '../../component/screens/OrderScreen/OpenTab';
import ExecuteTab from '../../component/screens/OrderScreen/ExecuteTab';
import GTTTab from '../../component/screens/OrderScreen/GTTTab';
import BasketTab from '../../component/screens/OrderScreen/BasketTab';
import SipTab from '../../component/screens/OrderScreen/SipTab';
import AlertTab from '../../component/screens/OrderScreen/AlertTab';
import { SafeAreaView } from 'react-native-safe-area-context';

import DynamicHeader from '../../component/dynamicHeader';
import { primaryScreenTitleConstants } from '../../app/constants/screen';
import { StatusBar } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

const OrderScreen = () => {

  const [showOrderListDepth, setShowOrderListDepth] = useState(false);

  const [showStatus, setShowStatus] = useState(false);



  const scrollOffsetY = useSharedValue(0);


  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {

  }, [])

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Open' },
    { key: 'second', title: 'Executed' },
    { key: 'third', title: 'GTT' },
    { key: 'fourth', title: 'Baskets' },
    { key: 'fifth', title: 'SIPs' },
    { key: 'sixth', title: 'Alerts' },
  ]);

  const handleSearchType = () => {

  }



  const renderScene = SceneMap({
    first: ()=><OpenTab scrollOffsetY={scrollOffsetY}/>,
    second: ()=><ExecuteTab scrollOffsetY={scrollOffsetY}/>,
    third: ()=><BasketTab scrollOffsetY={scrollOffsetY}/>,
    fourth:()=><GTTTab scrollOffsetY={scrollOffsetY}/>,
    fifth: ()=><SipTab scrollOffsetY={scrollOffsetY}/>,
    sixth: ()=><AlertTab scrollOffsetY={scrollOffsetY}/>
  });


  return (
    <>
      <SafeAreaView style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
        <StatusBar backgroundColor={"#e7e7e7"} barStyle={"dark-content"} />
        <DynamicHeader screenName={primaryScreenTitleConstants.ORDERS} scrollOffsetY={scrollOffsetY} showStatus={showStatus} setShowStatus={setShowStatus}>

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
                
                indicatorStyle={{ backgroundColor: '#0181ea' }}
                labelStyle={{ fontSize: 11.5, fontWeight: 600, width: '100%' }}
                activeColor='#0181ea'
                tabStyle={{ width: 'auto', paddingLeft: 20, paddingRight: 20 }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color, fontWeight: '600', minWidth: 40 }}>
                    {route.title}
                  </Text>
                )}

                inactiveColor='black'
                scrollEnabled={true}
                style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
              />
            )}
          />
        </DynamicHeader>
      </SafeAreaView>
    </>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})


