import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { Provider } from 'react-redux';
import { useState, useEffect, useRef } from 'react'

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TabBarFinal } from './screens/HomeScreen/HomeScreen';
import FundScreen from './screens/ProfileScreen/SubProfileSections/FundScreen';
import SettingScreen from './screens/ProfileScreen/SubProfileSections/SettingScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import UserProfileScreen from './screens/ProfileScreen/SubProfileSections/UserProfileScreen';
import ConnectedAppScreen from './screens/ProfileScreen/SubProfileSections/ConnectedAppScreen';
import BuyScreen from './screens/HomeScreen/BuyScreen';
import SellScreen from './screens/HomeScreen/SellScreen';

export default function App() {

  const [isUser, setIsUser] = useState('');
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator()






  return (
    <MainScreen />
  );
}

const MainScreen = ({ }) => {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


  const [isUser, setIsUser] = useState<boolean>(false);


  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // auth.isAuthenticated().then((data) => {
    //   if (typeof data == 'string' && data?.length > 0) {
    //     setIsUser(true)
    //   }
    // })
  }, [])


  const handleLogin = async () => {
    let token = await SecureStore.getItemAsync('jwt');
    return token;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer >


          <Stack.Navigator initialRouteName='HomeScreen' >

            <Stack.Screen options={{ headerShown: false }} name="WatchListScreen" component={TabBarFinal} />

            <Stack.Screen options={{ headerShown: true,title:"Profile",headerTitleAlign:"center",cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }} name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Funds", headerTitleAlign: 'center' }} name="FundScreen" component={FundScreen} />
            <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Connected Apps", headerTitleAlign: 'center' }} name="ConnectedAppScreen" component={ConnectedAppScreen} />
            <Stack.Screen options={{ headerShown: true, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Settings", headerTitleAlign: 'center' }} name="SettingScreen" component={SettingScreen} />
            <Stack.Screen options={{headerShown:false }} name="BuyScreen" component={BuyScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SellScreen" component={SellScreen} />
          </Stack.Navigator>


        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView >
  )
}