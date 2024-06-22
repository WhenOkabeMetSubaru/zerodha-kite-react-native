import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo'


const BidScreen = () => {

  const [showOrderListDepth, setShowOrderListDepth] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {

  }, [])

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Auctions' },
    { key: 'second', title: 'IPO' },
    { key: "third", title: "Govt.securities" }
  ]);

  const handleSearchType = () => {

  }


  const [toggled, setToggled] = useState(false);

 


  


  const FirstRoute = () => (
    <ScrollView style={{ backgroundColor: 'white' }} >
      <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', columnGap: 15 }}>
          <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />

        </View>

      </View>
     
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ backgroundColor: 'white' }} >
      <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', columnGap: 15 }}>
          <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
          <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
        </View>

        <View style={{ flexDirection: 'row', columnGap: 5 }}>
          <View style={{ width: 70, height: 25, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e7e7e7' }}>
            <Text style={{ fontSize: 11, color: "#0484f7" }}>Ongoing</Text>

          </View>
          <View style={{ width: 70, height: 25, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 11, color: "gray" }}>Applied</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView style={{ backgroundColor: 'white' }} >
      <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', columnGap: 15 }}>
          <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
          <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
        </View>

      </View>
    </ScrollView>
  );


  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
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
            indicatorStyle={{ backgroundColor: '#0181ea', width: 100, left: '5%' }}
            labelStyle={{ fontSize: 11.5, fontWeight: 600, width: '100%' }}
            activeColor='#0181ea'
            renderLabel={({ route, focused, color }) => (
              <View style={{ flexDirection: 'row', columnGap: 5 }}>
                <Text style={{ color, fontWeight: 600, minWidth: 120, textAlign: 'center' }}>
                  {route.title}
                </Text>
                
              </View>
            )}
            // renderBadge={(data)=>{
            //   return (
            //     <View style={{width:40,height:40,borderRadius:100}}>
            //       <Text>10 {console.log(data)}</Text>
            //     </View>
            //   )
            // }}
            inactiveColor='black'

            style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
          />
        )}
      />
    </>
  )
}

export default BidScreen

const styles = StyleSheet.create({})