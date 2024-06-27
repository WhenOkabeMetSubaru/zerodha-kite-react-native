
import * as SecureStore from 'expo-secure-store'
import { Provider } from 'react-redux';
import { useState, useEffect} from 'react'

import { NavigationContainer } from '@react-navigation/native';
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
import store from './features/store';
import { useAppDispatch, useAppSelector } from './features/hooks/hooks';
import { setToken } from './features/slices/user';
import LoginScreen from './screens/AuthScreen/LoginScreen';
import SignupScreen from './screens/AuthScreen/SignupScreen';
import * as SplashScreen from 'expo-splash-screen';
import StockSearchScreen from './screens/StockSearchScreen/StockSearchScreen';
import EditWatchListScreen from './screens/EditWatchListScreen/EditWatchListScreen';

export default function App() {

  const [isUser, setIsUser] = useState('');
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator()






  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

SplashScreen.preventAutoHideAsync();

const MainScreen = ({ }) => {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


  const [isUser, setIsUser] = useState<boolean>(false);


  const dispatch = useAppDispatch();

  const userState  = useAppSelector(state=>state.user);

  let userToken = '';

  useEffect(() => {

    async function restoreToken() {

      

      try {
        let token = await SecureStore.getItemAsync('jwt');

        if (token) {
         
          userToken = token;
        }else{
         
        }
      } catch (error) {

      }

      if (userToken?.length > 0) {
        dispatch(setToken(userToken));
      }

      setTimeout(()=>{
        SplashScreen.hideAsync();
      },2000)
    }

    restoreToken();

  }, [])




  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer >


          <Stack.Navigator initialRouteName={userState.isLoggedIn == true ? 'HomeScreen':'LoginScreen'} >

            {
              userState.isLoggedIn==false ?<>
                <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
                <Stack.Screen options={{ headerShown: false }} name="SignupScreen" component={SignupScreen} />
              </>:
              <>
                  <Stack.Screen options={{ headerShown: false }} name="WatchListScreen" component={TabBarFinal} />

                  <Stack.Screen options={{ headerShown: true, title: "Profile", headerTitleAlign: "center", cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} name="UserProfileScreen" component={UserProfileScreen} />
                  <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Funds", headerTitleAlign: 'center' }} name="FundScreen" component={FundScreen} />
                  <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Connected Apps", headerTitleAlign: 'center' }} name="ConnectedAppScreen" component={ConnectedAppScreen} />
                  <Stack.Screen options={{ headerShown: true, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Settings", headerTitleAlign: 'center' }} name="SettingScreen" component={SettingScreen} />

                  <Stack.Screen options={{ headerShown: false }} name="BuyScreen" component={BuyScreen} />
                  <Stack.Screen options={{ headerShown: false }} name="SellScreen" component={SellScreen} />
                  <Stack.Screen options={{ headerShown: false, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} name="StockSearchScreen" component={StockSearchScreen} />
                  <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#e7e7e7' }, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitle: "Edit watchlist", headerTitleAlign: 'center' }} name="EditWatchListScreen" component={EditWatchListScreen} />

              </>
            }
          </Stack.Navigator>


        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView >

  )
}