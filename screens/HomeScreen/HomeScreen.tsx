
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, Image, SearchBar } from 'react-native-elements'
import FeatureIcon from "react-native-vector-icons/Feather"
import EntypeIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OrderScreen from '../OrderScreen/OrderScreen'
import PortfolioScreen from '../PortfolioScreen/PortfolioScreen'
import BidScreen from '../BidScreen/BidScreen'
import ProfileScreen from '../ProfileScreen/ProfileScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native'
import Animated, { Easing, Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import LineChartComponent from '../../component/charts/lineChart'
import DynamicHeader from '../../component/dynamicHeader'
import { useGetAllWatchListByUserQuery, useGetUserByTokenQuery } from '../../features/slices/userApiSlice'
import TabDataWatchListHome from '../../component/screens/HomeScreen/TabData'
import { USER, WATCHLIST } from '../../app/types/user'
import { HEADER_PRIMARY_SCREEN_TITLE } from '../../app/types/global'




const HomeScreen = () => {

    //states
    const [showOrderListDepth, setShowOrderListDepth] = useState(false);
    const [showStatus,setShowStatus] = useState(false);
    const [routes, setRoutes] = useState([]);

   
    const getWatchlistData = useGetAllWatchListByUserQuery();

    const watchListData:WATCHLIST[] = getWatchlistData?.data?.data || [];

    useEffect(()=>{
        
        if(getWatchlistData?.data?.data?.length>0){
            let itemData = getWatchlistData?.data?.data?.map((item: any, i: number) => {
                return {
                    key: i?.toString(),
                    title: item?.title
                }
            });
            setRoutes(itemData);
            
        }else{
            getWatchlistData?.refetch()
        }
        

    },[getWatchlistData?.isLoading])
    
    
    const scrollOffsetY = useSharedValue(0);
   

    const navigation = useNavigation<any>()


    const [index, setIndex] = useState(0);
  
   
    // const renderScene = SceneMap({
    //     0: ()=><TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[0]?._id}  showStatus={showStatus} setShowStatus={setShowStatus}/>,
    //     1: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[1]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />,
    //     2: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[2]?._id} showStatus={showStatus} setShowStatus={setShowStatus} /> ,
    //     3: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[3]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />,
    //     4: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[4]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />,
    //     5: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[5]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />,
    //     6: () => <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[6]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />,


    // });


    const renderScene = ({route}:{route?:any})=>{
        switch(route.key){
            case '0':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[0]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
            
            case '1':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[1]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
        
            case '2':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[2]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
            
            case '3':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[3]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
            
            case '4':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[4]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />

            case '5':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[5]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
            
            case '6':
                return <TabDataWatchListHome scrollOffsetY={scrollOffsetY} watchListId={watchListData[6]?._id} showStatus={showStatus} setShowStatus={setShowStatus} />
        
            default:
                return null;
            }
    }
   

    return (
        <SafeAreaView  style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
            <StatusBar backgroundColor={"#e7e7e7"} barStyle={"dark-content"} />
            <DynamicHeader screenName={HEADER_PRIMARY_SCREEN_TITLE.WATCHLIST} scrollOffsetY={scrollOffsetY} showStatus={showStatus} setShowStatus={setShowStatus}>
          
            {
                getWatchlistData.isLoading==false?

                        <TabView
                            lazy={true}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={(index) => {
                                setIndex(index);
                                scrollOffsetY.value = 0;
                            }}

                            renderTabBar={props => (
                                <TabBar
                                    {...props}
                                    onTabLongPress={() => navigation.navigate("EditWatchListScreen", {_id: watchListData[index]?._id })}
                                    indicatorStyle={{ backgroundColor: '#0181ea' }}
                                    tabStyle={{ width: 100, elevation: 0 }}
                                    labelStyle={{ fontSize: 11, fontWeight: 500, width: '100%' }}
                                    scrollEnabled={true}
                                    activeColor='#0181ea'
                                    inactiveColor='gray'
                                    style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
                                />
                            )}
                        />:
                        <View style={{height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                            <ActivityIndicator size={"large"} color="blue"/>
                        </View>
            }
               


                   
              
            </DynamicHeader>
        

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

export const TabBarFinal = () => {

    const Tab = createBottomTabNavigator();

    const userDetails = useGetUserByTokenQuery({});

    const userData:USER = userDetails?.data?.data || {};



    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    marginBottom: 5
                },
                tabBarIcon: ({ focused, color, size = 25 }) => {

                    let iconName;

                    if (route.name == 'WatchList') {
                        iconName = 'bookmark-outline';
                    } else if (route.name == 'Orders') {
                        iconName = 'book';
                    } else if (route.name == 'Portfolio') {
                        iconName = "briefcase";
                    } else if (route.name == 'Bids') {
                        iconName = 'edit-2'
                    } else if (route.name == 'Profile') {
                        iconName = "user";
                    }

                    return route.name == "WatchList" ? (
                        <Icon style={{ elevation: 5 }} name={iconName!} size={size} color={color} />
                    ) : (<FeatureIcon name={iconName!} size={size} color={color} style={{ elevation: 5 }} />)

                },
                tabBarStyle: {
                    height: 55
                },

                tabBarActiveTintColor: "#0682e1",
                tabBarInactiveTintColor: "grey"
            })}
        >


            <Tab.Screen options={{ headerShown: false, title: "WatchList", headerStyle: { backgroundColor: '#e7e7e7' } }} name="WatchList" component={HomeScreen} />
            <Tab.Screen options={{ headerShown: false, title: "Orders", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Orders" component={OrderScreen} />
            <Tab.Screen options={{ headerShown: false, title: "Portfolio", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Portfolio" component={PortfolioScreen} />
            <Tab.Screen options={{ headerShown: false, title: "Bids", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Bids" component={BidScreen} />
            <Tab.Screen options={{ headerShown: false, title: userData.firstName?.toUpperCase() || "Account", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export const StockOrderDetails = () => {

    return (<View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '20%' }}>3,002.30</Text>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '10%', textAlign: 'center' }}>1</Text>
        <Text style={{ fontSize: 11, color: '#2a8af4', width: '18%', textAlign: 'right' }}>4</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '20%', marginLeft: 8 }}>3,005.95</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '10%', textAlign: 'center' }}>3</Text>
        <Text style={{ fontSize: 11, color: '#f74e55', width: '18%', textAlign: 'right' }}>200</Text>
    </View>)
}




// import { Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
// import React, { useCallback, useMemo, useRef, useState } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Icon, Image, SearchBar } from 'react-native-elements'
// import FeatureIcon from "react-native-vector-icons/Feather"
// import EntypeIcon from 'react-native-vector-icons/Entypo'
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import OrderScreen from '../OrderScreen/OrderScreen'
// import PortfolioScreen from '../PortfolioScreen/PortfolioScreen'
// import BidScreen from '../BidScreen/BidScreen'
// import ProfileScreen from '../ProfileScreen/ProfileScreen'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
// import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import { useNavigation } from '@react-navigation/native'
// import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// import LineChartComponent from '../../component/charts/lineChart'


// const HomeScreen = () => {

//     //states
//     const [showOrderListDepth, setShowOrderListDepth] = useState(false);
//     const [showOverview, setShowOverView] = useState(false);




//     const boxHeight = useSharedValue(0);// Animated value for height

//     const handleButtonClick = (flag?: boolean) => {
//         boxHeight.value = withTiming(flag == true ? 400 : 0, {
//             duration: 150, // Slightly longer duration for smoother transition
//             easing: Easing.poly(0.5),
//         });
//         setShowOverView(!showOverview)
//     };

//     const heightIncreaseAnimationStyle = useAnimatedStyle(() => {
//         return {
//             height: boxHeight.value,
//         };
//     });

//     const overViewBoxStyles = useAnimatedStyle(() => {

//         return {
//             opacity: interpolate(boxHeight.value, [0,400], [0, 1], Extrapolation.EXTEND)
//         }
//     })

//     const mainBoxStyles = useAnimatedStyle(() => {

//         return {
//             opacity: interpolate(boxHeight.value, [0, 400], [1, 0.3], Extrapolation.EXTEND)
//         }
//     })

//     const navigation = useNavigation<any>()


//     const ItemDataBottomSheetRef = useRef<BottomSheetModal>(null);

//     const ItemDataBottomSheetSnappoints = useMemo(() => ["25%", "30%", "40%", "50%", "75%", "90%"], []);

//     const handlePresentModalPress = useCallback(() => {
//         ItemDataBottomSheetRef.current?.present();
//     }, []);



//     const [index, setIndex] = useState(0);
//     const [routes] = useState([
//         { key: 'first', title: 'WatchList 1' },
//         { key: 'second', title: 'WatchList 2' },
//         { key: 'third', title: 'WatchList 3' },
//         { key: 'fourth', title: 'WatchList 4' },
//         { key: 'fifth', title: 'WatchList 5' },
//     ]);



//     const renderBackdrop = useCallback(
//         (props: any) => (
//             <BottomSheetBackdrop
//                 {...props}
//                 disappearsOnIndex={-1}
//                 appearsOnIndex={0}
//                 opacity={0.5}

//             />
//         ),
//         []
//     );

//     const FirstRoute = () => (
//         <View style={{ flex: 1 }} >
//             <View style={{ width: '100%', height: 80, position: "relative", backgroundColor: '#e7e7e7' }}>
//                 <View style={{ width: '100%', height: 45, backgroundColor: '#e7e7e7' }} />
//                 <View style={{ width: '100%', height: 35, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25 }} />
//                 <View style={{ position: 'absolute', elevation: showOverview == true ? 0 : 1, shadowRadius: 10, shadowOpacity: 1, shadowOffset: { width: 2, height: 5 }, shadowColor: 'black', padding: 5, left: 20, right: 20, alignItems: 'center', borderRadius: 5, top: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50 }}>
//                     <View style={{ flexDirection: 'row', columnGap: 20 }}>
//                         <FeatureIcon name="search" color={"gray"} style={{ marginLeft: 8 }} size={20} />
//                         <Text style={{ fontSize: 13, color: 'gray' }}>Search&nbsp; &&nbsp; add</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', columnGap: 10, marginRight: 10 }}>
//                         <Text style={{ fontSize: 13, color: 'gray' }}>0/100</Text>
//                         <View style={{ width: 1, height: 20, borderColor: 'lightgray', borderLeftWidth: 0.5 }} />
//                         <EntypeIcon name='sound-mix' color="#e7e7e7" size={20} />
//                     </View>

//                 </View>
//             </View>
//             <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
//                 <View style={{ marginBottom: 10 }}>
//                     <TouchableWithoutFeedback onPress={handlePresentModalPress}>
//                         <View style={{ height: 80, backgroundColor: 'white', borderBottomWidth: 0.7, borderColor: 'lightgray', paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
//                             <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                                 <Text style={{ fontWeight: 400, minWidth: 100 }}>HDFCBANK</Text>
//                                 <Text style={{ color: "red" }}>1,511.10</Text>
//                             </View>
//                             <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontSize: 12, color: 'gray', minWidth: 100 }}>NSE</Text>
//                                 <Text style={{ fontSize: 11 }}>-19.40 (-1.26%)</Text>
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                     <View style={{ height: 80, backgroundColor: 'white', borderBottomWidth: 0.7, borderColor: 'lightgray', paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
//                         <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                             <Text style={{ fontWeight: 400, minWidth: 100 }}>RELIANCE</Text>
//                             <Text style={{ color: "red" }}>2,975.40</Text>
//                         </View>
//                         <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 12, color: 'gray', minWidth: 100 }}>NSE</Text>
//                             <Text style={{ fontSize: 11 }}>-25.62 (-0.53%)</Text>
//                         </View>
//                     </View>
//                     <View style={{ height: 80, backgroundColor: 'white', borderBottomWidth: 0.7, borderColor: 'lightgray', paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
//                         <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                             <Text style={{ fontWeight: 400, minWidth: 100 }}>TCS</Text>
//                             <Text style={{ color: "red" }}>4512.10</Text>
//                         </View>
//                         <View style={{ flexDirection: "row", marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 12, color: 'gray', minWidth: 100 }}>NSE</Text>
//                             <Text style={{ fontSize: 11 }}>-50.62 (-1.53%)</Text>
//                         </View>
//                     </View>

//                 </View>
//             </View>
//         </View>
//     );

//     const SecondRoute = () => (
//         <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
//     );

//     const renderScene = SceneMap({
//         first: FirstRoute,
//         second: SecondRoute,
//         third: FirstRoute,
//         fourth: FirstRoute,
//         fifth: FirstRoute
//     });


//     const handleChangeText = () => { }

//     return (
//         <SafeAreaView style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
//             <StatusBar backgroundColor={"#e7e7e7"} barStyle={"dark-content"} />

//             <Animated.View style={[heightIncreaseAnimationStyle, { backgroundColor: '#e7e7e7' }]}>
                
//                     <View style={{ marginTop: 10, paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
//                         <Animated.Text style={[{ fontSize: 25, fontWeight: 600, width: '40%' },overViewBoxStyles]}>Overview</Animated.Text>
//                         <FeatureIcon onPress={() => handleButtonClick(!showOverview)} name="x" size={35} />
//                     </View>
//                     <View style={{ marginTop: 25, paddingLeft: 25, paddingRight: 25, flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
//                         <View style={{ width: '45%', rowGap: 5 }}>
//                             <Animated.Text style={[{ fontWeight: 600 },overViewBoxStyles]}>NIFTY 50</Animated.Text>
//                             <Animated.Text style={[{ fontSize: 18 },overViewBoxStyles]}>23,290.15</Animated.Text>
//                             <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', paddingTop: 10, paddingLeft: 5 }}>
//                                 <Animated.Text style={[{ fontSize: 11, color: 'green' },overViewBoxStyles]}>+468.75</Animated.Text>
//                                 <Animated.Text style={[{ fontSize: 11, color: 'green' },overViewBoxStyles]}>+2.05%</Animated.Text>
//                             </View>

//                         </View>
//                         <View style={{ width: '40%', rowGap: 5 }}>
//                         <Animated.Text style={[{ fontWeight: 600 }, overViewBoxStyles]}>NIFTY BANK</Animated.Text>
//                         <Animated.Text style={[{ fontSize: 18 }, overViewBoxStyles]}>49,800.25</Animated.Text>
//                             <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', paddingTop: 10, paddingLeft: 5 }}>
//                             <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+511.35</Animated.Text>
//                             <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+1.05%</Animated.Text>
//                             </View>

//                         </View>
//                     </View>
//                     <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
//                         <Animated.View style={[overViewBoxStyles,{ width: '45%' }]}>
//                             <LineChartComponent width={150} />
//                         </Animated.View>
//                         <Animated.View style={[overViewBoxStyles,{ width: '40%' }]}>
//                             <LineChartComponent width={150} />
//                         </Animated.View>
//                     </View>
//                     <Animated.Text style={[overViewBoxStyles,{ fontSize: 12, marginTop: -20, color: 'gray', paddingLeft: 20, paddingRight: 20 }]}>* Charts indicate 52 weeks trend</Animated.Text>

//                     <View style={{ marginTop: 20, height: 0.5, marginLeft: 20, marginRight: 20, backgroundColor: 'gray', opacity: 0.3 }} />

//                     <View style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20 }}>
//                         <Text style={{ fontWeight: 600 }}>
//                             Funds
//                         </Text>
//                         <View style={{ flexDirection: 'row', marginTop: 20 }}>
//                             <View style={{ width: '50%' }}>
//                                 <Text style={{ color: 'gray' }}>Equity</Text>
//                                 <Text style={{ fontSize: 18 }}>₹0.30</Text>
//                             </View>
//                             <View style={{ width: '50%', paddingLeft: 20 }}>
//                                 <Text style={{ color: 'gray' }}>Commodity</Text>
//                                 <Text style={{ fontSize: 18 }}>₹0.00</Text>
//                             </View>
//                         </View>
//                     </View>
              
//             </Animated.View>
//             <Animated.View style={[{ flexDirection: 'column', flex: 1 },mainBoxStyles]}>
//                 <View style={{ height: 50, backgroundColor: '#e7e7e7', flexDirection: "row", justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
//                     <Text style={{ fontSize: 25, fontWeight: 600, width: '40%' }}>Watchlist</Text>
//                     <FeatureIcon onPress={() => handleButtonClick(!showOverview)} name="chevron-down" size={35} />
//                 </View>
//                 <TabView

//                     navigationState={{ index, routes }}
//                     renderScene={renderScene}
//                     onIndexChange={setIndex}
//                     renderTabBar={props => (
//                         <TabBar
//                             {...props}
//                             indicatorStyle={{ backgroundColor: '#0181ea' }}
//                             tabStyle={{ width: 100, elevation: 0 }}
//                             labelStyle={{ fontSize: 11, fontWeight: 500, width: '100%' }}
//                             scrollEnabled={true}
//                             activeColor='#0181ea'
//                             inactiveColor='gray'
//                             style={{ backgroundColor: "#e7e7e7", elevation: 0 }}
//                         />
//                     )}
//                 />


//                 <BottomSheetModal enableOverDrag={false} handleComponent={null} snapPoints={ItemDataBottomSheetSnappoints} backdropComponent={renderBackdrop} enablePanDownToClose={true} ref={ItemDataBottomSheetRef} animateOnMount={true} enableDynamicSizing={true}   >


//                     <>
//                         <View style={{ paddingLeft: 30, paddingRight: 10, borderBottomWidth: 0.8, paddingBottom: 12, paddingTop: 10, borderColor: '#e7e7e7' }}>
//                             <Text style={{ fontSize: 20 }}>RELIANCE</Text>
//                             <View style={{ flexDirection: 'row', columnGap: 8, marginTop: 1 }}>
//                                 <Text style={{ fontSize: 12 }}>NSE</Text>
//                                 <Text style={{ color: 'red', fontSize: 12 }}>2,975.40</Text>
//                                 <Text style={{ fontSize: 12 }}>-25.62 (-0.53%)</Text>
//                             </View>
//                         </View>
//                         <BottomSheetScrollView style={{ minHeight: 500, paddingTop: 10 }}>

//                             <View style={{ paddingLeft: 30, paddingRight: 30, borderBottomWidth: 0.8, paddingTop: 25, paddingBottom: 24, borderColor: '#e7e7e7' }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 10 }}>
//                                     <Pressable style={{ width: '50%' }} onPress={() => { ItemDataBottomSheetRef.current?.close(); navigation.navigate("BuyScreen"); }}>
//                                         <View style={{ width: "100%", height: 55, backgroundColor: '#3a91f2', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
//                                             <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>BUY</Text>
//                                         </View>
//                                     </Pressable>
//                                     <Pressable style={{ width: '50%' }} onPress={() => { ItemDataBottomSheetRef.current?.close(); navigation.navigate("SellScreen"); }}>
//                                         <View style={{ width: '100%', height: 55, backgroundColor: '#da494f', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
//                                             <Text style={{ color: 'white', fontWeight: 500, minWidth: 30 }}>SELL</Text>
//                                         </View>
//                                     </Pressable>

//                                 </View>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 10, marginTop: 25 }}>

//                                     <FeatureIcon color={"#2a8af4"} name="bar-chart-2" size={20} />
//                                     <Text style={{ color: "#2a8af4" }}>View chart</Text>
//                                     <FeatureIcon color="#2a8af4" name="arrow-right" size={20} />

//                                 </View>
//                             </View>

//                             <View style={{ paddingTop: 25, paddingBottom: 24, borderColor: '#e7e7e7', borderBottomWidth: 0.8 }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, }}>
//                                     <View style={{ flexDirection: 'row', columnGap: 7 }}>
//                                         <FeatureIcon name="bell" color="#2a8af4" size={20} />
//                                         <Text style={{ color: "#2a8af4" }}>Create alert</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', columnGap: 7 }}>
//                                         <MaterialCommunityIcon name="email-fast" color="#2a8af4" size={20} />
//                                         <Text style={{ color: "#2a8af4" }}>Create GTT</Text>
//                                     </View>
//                                 </View>


//                                 <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '20%' }}>Bid</Text>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '10%' }}>Orders</Text>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '18%', textAlign: 'right' }}>Qty</Text>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '20%', marginLeft: 8 }}>Offer</Text>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '10%' }}>Orders</Text>
//                                     <Text style={{ fontSize: 11, color: '#c3c4c5', width: '18%', textAlign: 'right' }}>Qty</Text>
//                                 </View>
//                                 <StockOrderDetails />
//                                 <StockOrderDetails />
//                                 <StockOrderDetails />
//                                 <StockOrderDetails />
//                                 <StockOrderDetails />
//                                 {
//                                     showOrderListDepth == true &&

//                                     <>
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                         <StockOrderDetails />
//                                     </>
//                                 }
//                                 <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
//                                     <TouchableWithoutFeedback onPress={() => { setShowOrderListDepth(!showOrderListDepth); }}>
//                                         <Text style={{ color: '#2a8af4' }}>
//                                             Show {showOrderListDepth == true ? 5 : 20} depth
//                                         </Text>
//                                     </TouchableWithoutFeedback>
//                                 </View>




//                             </View>

//                             <View style={{ marginTop: 20, paddingLeft: 25, paddingRight: 25 }}>
//                                 <Text style={{ fontSize: 13, fontWeight: 600 }}>Day's range</Text>
//                                 <View style={{ marginTop: 20 }}>
//                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                                         <View>
//                                             <Text style={{ fontSize: 12, color: 'gray' }}>Low</Text>
//                                             <Text style={{ marginTop: 5 }}>2,918.00</Text>
//                                         </View>
//                                         <View>
//                                             <Text style={{ fontSize: 12, color: 'gray' }}>High</Text>
//                                             <Text style={{ marginTop: 5 }}>3,020.00</Text>
//                                         </View>

//                                     </View>
//                                     <View style={{ backgroundColor: '#e7e7e7', height: 4, marginTop: 15 }}>

//                                     </View>
//                                 </View>

//                                 <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
//                                         <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}>Open</Text>
//                                         <Text style={{ marginTop: 5 }}>2,918.00</Text>
//                                     </View>
//                                     <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center' }}>
//                                         <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}>Prev close</Text>
//                                         <Text style={{ marginTop: 5 }}>3,018.00</Text>
//                                     </View>

//                                 </View>

//                             </View>

//                             <View style={{ marginTop: 20 }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Volume</Text>
//                                     <Text>1,07,63,971</Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Avg. trade price</Text>
//                                     <Text>2,978.07</Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Last traded quantity</Text>
//                                     <Text>20</Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Last traded at</Text>
//                                     <Text>2024-06-03 15:59:57</Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fbfbfb', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Lower circuit</Text>
//                                     <Text>2,718.60</Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 30, paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}>
//                                     <Text style={{ color: 'gray' }}>Upper circuit</Text>
//                                     <Text>3,322.70</Text>
//                                 </View>

//                             </View>

//                             <View style={{ marginTop: 25, paddingLeft: 25, paddingRight: 25, }}>
//                                 <Text style={{ fontWeight: 600 }}>
//                                     Apps
//                                 </Text>
//                                 <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
//                                 <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
//                                     <MaterialCommunityIcon name="dice-2-outline" color="#2a8af4" size={20} />
//                                     <Text>Fundamentals</Text>
//                                 </View>
//                                 <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
//                                 <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
//                                     <MaterialCommunityIcon name="lightning-bolt" color="darkblue" size={20} />
//                                     <Text>Technicals</Text>
//                                 </View>
//                                 <View style={{ marginTop: 10, borderWidth: 0.7, borderColor: '#f1f1f1' }} />
//                                 <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', marginTop: 10 }}>
//                                     <MaterialCommunityIcon name="briefcase-variant" color="darkorange" size={20} />
//                                     <Text>Option Chain</Text>
//                                 </View>

//                             </View>

//                             <View style={{ marginTop: 35, paddingLeft: 25, paddingRight: 25, paddingBottom: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Text style={{ fontWeight: 600, width: '40%' }}>Pin to overview</Text>
//                                 <View style={{ flexDirection: 'row', columnGap: 10 }}>
//                                     <View style={{ width: 90, height: 35, borderWidth: 0.7, borderColor: "black", borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Text style={{ alignSelf: "center", fontSize: 12 }}>Spot 1</Text>
//                                     </View>
//                                     <View style={{ width: 90, height: 35, borderWidth: 0.7, borderColor: "black", borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Text style={{ alignSelf: "center", fontSize: 12 }}>Spot 2</Text>
//                                     </View>
//                                 </View>
//                             </View>


//                         </BottomSheetScrollView>
//                     </>


//                 </BottomSheetModal>
//             </Animated.View>

//         </SafeAreaView>
//     )
// }

// export default HomeScreen

// const styles = StyleSheet.create({})

// export const TabBarFinal = () => {

//     const Tab = createBottomTabNavigator();


//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarLabelStyle: {
//                     marginBottom: 5
//                 },
//                 tabBarIcon: ({ focused, color, size = 25 }) => {

//                     let iconName;

//                     if (route.name == 'WatchList') {
//                         iconName = 'bookmark-outline';
//                     } else if (route.name == 'Orders') {
//                         iconName = 'book';
//                     } else if (route.name == 'Portfolio') {
//                         iconName = "briefcase";
//                     } else if (route.name == 'Bids') {
//                         iconName = 'edit-2'
//                     } else if (route.name == 'Profile') {
//                         iconName = "user";
//                     }

//                     return route.name == "WatchList" ? (
//                         <Icon style={{ elevation: 5 }} name={iconName!} size={size} color={color} />
//                     ) : (<FeatureIcon name={iconName!} size={size} color={color} style={{ elevation: 5 }} />)

//                 },
//                 tabBarStyle: {
//                     height: 55
//                 },

//                 tabBarActiveTintColor: "#0682e1",
//                 tabBarInactiveTintColor: "grey"
//             })}
//         >


//             <Tab.Screen options={{ headerShown: false, title: "WatchList", headerStyle: { backgroundColor: '#e7e7e7' } }} name="WatchList" component={HomeScreen} />
//             <Tab.Screen options={{ headerShown: true, title: "Orders", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Orders" component={OrderScreen} />
//             <Tab.Screen options={{ headerShown: true, title: "Portfolio", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Portfolio" component={PortfolioScreen} />
//             <Tab.Screen options={{ headerShown: true, title: "Bids", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Bids" component={BidScreen} />
//             <Tab.Screen options={{ headerShown: true, title: "Account", headerStyle: { backgroundColor: '#e7e7e7' } }} name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     )
// }

// export const StockOrderDetails = () => {

//     return (<View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 10 }}>
//         <Text style={{ fontSize: 11, color: '#2a8af4', width: '20%' }}>3,002.30</Text>
//         <Text style={{ fontSize: 11, color: '#2a8af4', width: '10%', textAlign: 'center' }}>1</Text>
//         <Text style={{ fontSize: 11, color: '#2a8af4', width: '18%', textAlign: 'right' }}>4</Text>
//         <Text style={{ fontSize: 11, color: '#f74e55', width: '20%', marginLeft: 8 }}>3,005.95</Text>
//         <Text style={{ fontSize: 11, color: '#f74e55', width: '10%', textAlign: 'center' }}>3</Text>
//         <Text style={{ fontSize: 11, color: '#f74e55', width: '18%', textAlign: 'right' }}>200</Text>
//     </View>)
// }