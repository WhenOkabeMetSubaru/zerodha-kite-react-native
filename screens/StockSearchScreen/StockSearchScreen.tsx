import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-gesture-handler'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { useGetAllStocksByWatchListQuery, useGetWatchListByIDQuery } from '../../features/slices/userApiSlice'
import { useRoute } from '@react-navigation/native'
import { WATCHLIST } from '../../app/types/user'
import { useGetSearchStockByNameQuery, useLazyGetSearchStockByNameQuery } from '../../features/slices/stockApiSlice'
import useDebounce from '../../features/hooks/useDebounce'
import StocksTabSearchScreen from '../../component/screens/StockSearchScreen/StocksTab'

const StockSearchScreen = ({ navigation }: { navigation?: any }) => {

  const [searchText, setSearchText] = useState<any>('');

  const routeParams = useRoute();
  const watchId: any = routeParams?.params;

  const getWatchlistData = useGetWatchListByIDQuery({ watchId: watchId?._id });
  const watchlistData: WATCHLIST = getWatchlistData?.data?.data || {};

  const [stockData, setStockData] = useState([]);

  const stockDetails = useGetSearchStockByNameQuery({ stockName: searchText });

  const [lazyStockDetails] = useLazyGetSearchStockByNameQuery();


  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState([
    { key: 0, title: '#' },
    { key: 1, title: 'MF' },
    { key: 2, title: 'IPO' },
    { key: 3, title: 'G-Sec' }
  ]);


  const FirstRoute = () => <View><Text>Red</Text></View>

  const renderScene = SceneMap({
    0: () => <StocksTabSearchScreen watchListStockData={watchlistData.stocks} watchListId={watchlistData?._id} stockData={stockData} />,
    1: FirstRoute,
    2: FirstRoute,
    3: FirstRoute
  })



  let searchStock: any;

  const handleSearchDebounce = (text: any, ms: number) => {

    setSearchText(text);


    console.log(text, searchText)
    if (text == "") return;
    lazyStockDetails({ stockName: text }).then((res) => {
      if (res?.data?.data) {
        setStockData(res?.data?.data)
      }
    })

    // clearTimeout(searchStock);

    // searchStock =  setTimeout(async()=>{

    // },ms);  
  }


  const debounce: any = (text: any, ms: any) => {
    clearTimeout(searchStock);


    searchStock = setTimeout(() => {
      setSearchText(text);

      if (text == "") return;
      lazyStockDetails({ stockName: text }).then((res) => {
        if (res?.data?.data) {
          setStockData(res?.data?.data)
        }
      })
    }, ms);
  }

 
  useEffect(() => {

    const timeout = setTimeout(() => {

      if (searchText == "") return;
      
      lazyStockDetails({ stockName: searchText }).then((res) => {
        if (res?.data?.data) {
          setStockData(res?.data?.data)
        }
      })
    }, 500)

    return () => {
      clearTimeout(timeout)
    }

  }, [searchText])



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ height: 50, borderBottomWidth: 0.3, borderColor: '#e7e7e7', columnGap: 5, flexDirection: 'row', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10 }}>
        <Pressable onPress={() => { navigation.goBack() }}><FeatherIcon name='arrow-left' size={25} /></Pressable>
        <TextInput value={searchText} onChangeText={(text) => { setSearchText(text); }} placeholder='Search eg:infy bse, nifty fut' selection={{ start: searchText.length, end: searchText.length }} style={{ width: '80%', paddingLeft: 10, paddingRight: 10 }} />
        {
          searchText?.length > 0 &&
          <Pressable onPress={() => {
              setSearchText("");
              setStockData([]);
          }}>
            <Text style={{ color: '#0181ea' }}>Clear</Text>
          </Pressable>
        }
      </View>



      <TabView

        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => {
          setIndex(index);

        }}
        renderTabBar={props => (
          <TabBar
            {...props}

            indicatorStyle={{ backgroundColor: '#0181ea', width: 50, left: '6%' }}
            tabStyle={{ width: 100, elevation: 0 }}
            labelStyle={{ fontSize: 11, fontWeight: 500, width: '100%' }}
            scrollEnabled={true}
            activeColor='#0181ea'
            inactiveColor='gray'
            style={{ backgroundColor: "white", elevation: 0 }}
          />
        )}
      />


    </SafeAreaView>
  )
}

export default StockSearchScreen

const styles = StyleSheet.create({})