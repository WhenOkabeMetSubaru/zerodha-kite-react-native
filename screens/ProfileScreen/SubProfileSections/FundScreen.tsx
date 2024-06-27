import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import FeatureIcon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler';
import { CircleSpecial } from '../../../component/extra/circleSpecial';

const FundScreen = () => {

  const [showOrderListDepth, setShowOrderListDepth] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {

  }, [])

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Equity' },
    { key: 'second', title: 'Commodity' },
  ]);

  const handleSearchType = () => {

  }

  const FirstRoute = () => (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }} >
      <View style={{ height: 150, position: 'relative', backgroundColor: "#e7e7e7" }}>
        <View style={{ height: 75, backgroundColor: '#e7e7e7' }}></View>
        <View style={{ backgroundColor: "white", height: 75, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>

        <View style={{ height: 120, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", padding: 10, position: 'absolute', bottom: 10, left: 20, right: 20, borderRadius: 3, backgroundColor: 'white', elevation: 1 }}>
          <View style={{ flexDirection: 'row', columnGap: 3 }}>
            <Text style={{ color: 'gray', fontSize: 12 }}>Available margin (Cash + Collateral)</Text>
            <FeatureIcon name="info" color="#3a91f2" size={16} />
          </View>
          <Text style={{ fontSize: 28, fontWeight: 600, width: '100%', textAlign: 'center', color: "#3a91f2" }}>₹10,22,512.30</Text>
          <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
            <CircleSpecial/>
            <Text style={{ color: "#3a91f2", fontSize: 14 }}>View Statement</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row',justifyContent:'center',paddingLeft:30,paddingRight:30,marginTop:10,columnGap:15 }}>
        <View style={{ width: '50%', height: 50, backgroundColor: '#03ae13', borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <FeatureIcon name="plus" color="white" size={20} />
            <Text style={{ color: 'white' }}>Add funds</Text>
          </View> 
        </View>

        <View style={{width:'50%', height: 50, backgroundColor: '#3a91f2', borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <FeatureIcon name="rotate-ccw" color="white" size={20} />
            <Text style={{ color: 'white' }}>Withdraw</Text>
          </View>
        </View>
      </View>

      <View style={{margin:20,flexDirection:'row',justifyContent:"space-around"}}>
        <View style={{flexDirection:'column',alignItems:'center',rowGap:5,width:'40%'}}>
          <Text style={{fontSize:11,color:'gray'}}>Available cash</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, width: '100%', textAlign: 'center', color:'#474b48'}}>10,22,512.30</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', rowGap: 5, width: '40%' }}>
          <Text style={{ fontSize: 11, color: 'gray' }}>Used margin</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, width: '100%', textAlign: 'center', color: '#474b48' }}>87,545.41</Text>
        </View>
      </View>

      <View style={{height:0.8,backgroundColor:'#e7e7e7',marginTop:10,marginLeft:20,marginRight:20}}/>


      <View style={{ marginTop: 25 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Opening balance</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Payin</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Payout</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>SPAN</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Delivery margin</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Exposure</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Option premium</Text>
          <Text>0.00</Text>
        </View>

      </View>

      <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 25, marginLeft: 20, marginRight: 20 }} />


      <View style={{ marginTop: 25,paddingBottom:30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Collateral (liquid funds)</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Collateral (Equity)</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Total collateral</Text>
          <Text>0.00</Text>
        </View>


      </View>

    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }} >
      <View style={{ height: 150, position: 'relative', backgroundColor: "#e7e7e7" }}>
        <View style={{ height: 75, backgroundColor: '#e7e7e7' }}></View>
        <View style={{ backgroundColor: "white", height: 75, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>

        <View style={{ height: 120, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", padding: 10, position: 'absolute', bottom: 10, left: 20, right: 20, borderRadius: 3, backgroundColor: 'white', elevation: 1 }}>
          <View style={{ flexDirection: 'row', columnGap: 3 }}>
            <Text style={{ color: 'gray', fontSize: 12 }}>Available margin (Cash)</Text>
            <FeatureIcon name="info" color="#3a91f2" size={16} />
          </View>
          <Text style={{ fontSize: 28, fontWeight: 600, width: '100%', textAlign: 'center', color: "#3a91f2" }}>₹0.30</Text>
          <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
            <CircleSpecial/>
            <Text style={{ color: "#3a91f2", fontSize: 14 }}>View Statement</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 30, paddingRight: 30, marginTop: 10, columnGap: 15 }}>
        <View style={{ width: '50%', height: 50, backgroundColor: '#03ae13', borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <FeatureIcon name="plus" color="white" size={20} />
            <Text style={{ color: 'white' }}>Add funds</Text>
          </View>
        </View>

        <View style={{ width: '50%', height: 50, backgroundColor: '#3a91f2', borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 10 }}>
            <FeatureIcon name="rotate-ccw" color="white" size={20} />
            <Text style={{ color: 'white' }}>Withdraw</Text>
          </View>
        </View>
      </View>

      <View style={{ margin: 20, flexDirection: 'row', justifyContent: "space-around" }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', rowGap: 5, width: '40%' }}>
          <Text style={{ fontSize: 11, color: 'gray' }}>Available cash</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, width: '100%', textAlign: 'center', color: '#474b48' }}>0.30</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', rowGap: 5, width: '40%' }}>
          <Text style={{ fontSize: 11, color: 'gray' }}>Used margin</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, width: '100%', textAlign: 'center', color: '#474b48' }}>0.00</Text>
        </View>
      </View>

      <View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: 10, marginLeft: 20, marginRight: 20 }} />


      <View style={{ marginTop: 25 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Opening balance</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Payin</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Payout</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>SPAN</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Delivery margin</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Exposure</Text>
          <Text>0.00</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ color: '#474b48' }}>Option premium</Text>
          <Text>0.00</Text>
        </View>

      </View>


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
            indicatorStyle={{ backgroundColor: '#0181ea', flexDirection: 'row', justifyContent: 'center', width: 80, left: '15%' }}
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

export default FundScreen

const styles = StyleSheet.create({})