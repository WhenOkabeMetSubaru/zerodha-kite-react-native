import { Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { CircleSpecial } from '../../component/extra/circleSpecial'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicHeader from '../../component/dynamicHeader'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import auth from '../../features/helpers/auth'
import { useAppDispatch } from '../../features/hooks/hooks'
import { setLogout } from '../../features/slices/user'
import { useGetUserByTokenQuery } from '../../features/slices/userApiSlice'
import { USER } from '../../app/types/user'
import { HEADER_PRIMARY_SCREEN_TITLE } from '../../app/types/global'

const ProfileScreen = () => {

  const navigation = useNavigation<any>();
  const [showStatus, setShowStatus] = useState<Boolean>(false);

  //data hooks
  const userDetails = useGetUserByTokenQuery({});
  let userData:USER = userDetails?.data?.data || {};

  const dispatch = useAppDispatch();

  const scrollOffsetY = useSharedValue(0);

  const appCodeBottomSheetRef = useRef<BottomSheetModal>(null);

  const appCodeBottomSheetSnappoints = useMemo(() => ["25%"], []);

  const handlePresentModalPress = useCallback(() => {
    appCodeBottomSheetRef.current?.present();
  }, []);


  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}

      />
    ),
    []
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {

    scrollOffsetY.value = event.contentOffset.y;

  });


  return (
    <>
      <SafeAreaView style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
        <StatusBar backgroundColor={"#e7e7e7"} barStyle={"dark-content"} />
        <DynamicHeader screenName={HEADER_PRIMARY_SCREEN_TITLE.ACCOUNT} scrollOffsetY={scrollOffsetY} showStatus={showStatus} setShowStatus={setShowStatus}>
          <View style={{position:'relative',backgroundColor:'#e7e7e7',height:45}}>
            <View style={{ backgroundColor: "#e7e7e7", position: 'absolute', top:0,left: 0, right: 0 }}>
              <View style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ fontSize: 18 }}>{userData?.firstName + " " + userData?.lastName}</Text>
                <FeatherIcon name="bell" size={20} />
              </View>
            </View>
          </View>
          
          <Animated.ScrollView
            style={{ flex: 1, backgroundColor: 'white' }}
            scrollEventThrottle={1}
            onScroll={scrollHandler} showsVerticalScrollIndicator={false} >
            
            <View style={{ height: 130, backgroundColor: '#e7e7e7', position: 'relative' }}>
              <View style={{ height: 70, backgroundColor: '#e7e7e7' }}>
               
              </View>
              <View style={{ height: 60, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

              </View>
              <TouchableWithoutFeedback onPressIn={() => { navigation.navigate("UserProfileScreen") }}>
                <View style={{ height: 120, elevation: showStatus==true?0:3, position: 'absolute', bottom: 1, left: 15, right: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 3, padding: 20 }}>
                  <View>
                    <Text style={{ fontSize: 18 }}>DD1877</Text>
                    <Text style={{ fontSize: 11, marginTop: 4 }}>{userData?.email}</Text>
                  </View>
                  <View style={{ width: 90, height: 90, borderRadius: 100, backgroundColor: '#e6efff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 35, color: '#9ec1ff' }}>
                      {userData?.firstName?.charAt(0).toUpperCase() + userData?.lastName?.charAt(0)?.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ marginTop: 35 }}>
              <Text style={{ paddingLeft: 20, paddingRight: 20, fontWeight: 600 }}>Account</Text>
              <SpaceLine />

              <ProfileScreenElements onPressCallBack={() => { navigation.navigate('FundScreen') }} name='Funds' icon={<MaterialIcon name="currency-rupee" size={22} color="gray" />} />
              <ProfileScreenElements onPressCallBack={handlePresentModalPress} name='App Code' icon={<FeatherIcon name="unlock" size={22} color="gray" />} />
              <ProfileScreenElements onPressCallBack={() => navigation.navigate("UserProfileScreen")} name='Profile' icon={<FeatherIcon name="user" size={22} color="gray" />} />
              <ProfileScreenElements onPressCallBack={() => { navigation.navigate('SettingScreen') }} name='Settings' icon={<FeatherIcon name="settings" size={22} color="gray" />} />
              <ProfileScreenElements onPressCallBack={() => { navigation.navigate('ConnectedAppScreen') }} name='Connected apps' icon={<FeatherIcon name="box" size={22} color="gray" />} />
              <ProfileScreenElements onPressCallBack={()=>auth.clearJWT(()=>{dispatch(setLogout())})} name='Logout' icon={<FeatherIcon name="log-out" size={22} color="gray" />} />


              <View style={{ paddingLeft: 20, paddingRight: 25, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600, width: 100 }}>Console</Text>
                <CircleSpecial width={23} height={23} borderRadius={12} borderWidth={5.5} />
              </View>
              <View style={{ flexDirection: 'row', columnGap: 40, paddingLeft: 40, paddingRight: 20, marginTop: 20 }}>
                <Text style={{ color: "#3a91f2" }}>Portfolio</Text>
                <Text style={{ color: "#3a91f2" }}>Tradebook</Text>
                <Text style={{ color: "#3a91f2" }}>P&L</Text>
                <Text style={{ color: "#3a91f2" }}>Tax P&L</Text>
              </View>
              <View style={{ flexDirection: 'row', columnGap: 40, paddingLeft: 40, paddingRight: 20, marginTop: 10 }}>
                <Text style={{ color: "#3a91f2" }}>Gift stocks</Text>
                <Text style={{ color: "#3a91f2" }}>Family</Text>
                <Text style={{ color: "#3a91f2" }}>Downloads</Text>

              </View>

              <Text style={{ paddingLeft: 20, paddingRight: 20, fontWeight: 600, marginTop: 30 }}>Support</Text>
              <SpaceLine />

              <ProfileScreenElements name='Support portal' icon={<FeatherIcon name="life-buoy" size={22} color="gray" />} />
              <ProfileScreenElements name='User manual' icon={<FeatherIcon name="help-circle" size={22} color="gray" />} />
              <ProfileScreenElements name='Contact' icon={<FeatherIcon name="phone" size={22} color="gray" />} />

              <Text style={{ paddingLeft: 20, paddingRight: 20, fontWeight: 600, marginTop: 30 }}>Others</Text>
              <SpaceLine />

              <ProfileScreenElements name='Invite friends' icon={<FeatherIcon name="user-plus" size={22} color="gray" />} />
              <ProfileScreenElements name='Licenses' icon={<FeatherIcon name="file-text" size={22} color="gray" />} />



            </View>
          </Animated.ScrollView>
        </DynamicHeader>
      </SafeAreaView>

      <BottomSheetModal backdropComponent={renderBackdrop} handleComponent={null} snapPoints={appCodeBottomSheetSnappoints} ref={appCodeBottomSheetRef} index={0}  >

        <BottomSheetView style={{ flexDirection: 'column', rowGap: 10, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 600, width: '90%', textAlign: 'center' }}>App Code</Text>
          <Text style={{ fontSize: 14 }}>Enter this code to login to kite web</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 20, marginTop: 15 }}>
            <Text style={{ fontSize: 30 }}>0&nbsp;9&nbsp;9</Text>
            <Text style={{ fontSize: 30 }}>6&nbsp;5&nbsp;8</Text>
          </View>
          <View style={{ height: 1.3, borderRadius: 10, backgroundColor: '#e7e7e7', width: '90%', marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={{ height: 1.3, backgroundColor: "#4984f3", width: '40%' }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 5, marginTop: 10 }}>
            <Text>Changes</Text>
            <Text>in</Text>
            <Text style={{ color: '#4984f3' }}>10s</Text>
          </View>
        </BottomSheetView>



      </BottomSheetModal>
    </>


  )
}

export default ProfileScreen

const styles = StyleSheet.create({})

export const SpaceLine = ({ top = 10 }) => {

  return (<View style={{ height: 0.8, backgroundColor: '#e7e7e7', marginTop: top }} />)
}

export const ProfileScreenElements = ({ name = "", icon, onPressCallBack }: { name: string, icon: any, onPressCallBack?: any }) => {

  const navigate = useNavigation();

  return (
    <>
      <Pressable onPress={onPressCallBack} style={({ pressed }) => [{ backgroundColor: pressed ? '#dff8ff' : 'transparent' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20, marginTop: 18 }}>
          <Text>
            {name}
          </Text>
          {icon}
        </View>

        <SpaceLine top={18} />
      </Pressable>
    </>
  )
}