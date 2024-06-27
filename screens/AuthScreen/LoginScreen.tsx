import { Pressable, StyleSheet, Text, TextInput, TextInputProps, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useLoginUserMutation } from '../../features/slices/userApiSlice'
import auth from '../../features/helpers/auth'
import { useAppDispatch } from '../../features/hooks/hooks'
import { setToken } from '../../features/slices/user'

const LoginScreen = () => {

    const navigate = useNavigation<any>();

    const [userDetails,setUserDetails] = useState({email:"",password:""});

    const dispatch  = useAppDispatch();

    const [loginuser] = useLoginUserMutation();

    const handleLogin = () => {

        if (!(userDetails?.email.length > 0) || !(userDetails?.password?.length > 0)) {
            return;
        }

        loginuser(userDetails).then((res) => {
           
            let data = res.data;

            if(data?.token?.length <1) return;
            
           console.log(data?.token)
            auth.authenticate(data?.token,()=>{
                ToastAndroid.show("LoginSuccess", 5)
                dispatch(setToken(data?.token));
            })

            // navigation.navigate("LoginScreen")
        })

    }
    return (
        <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <Image style={{ width: 80, height: 50 }} source={require("../../assets/zerodhakitelogo.png")} />
                <Text style={{ fontSize: 26, marginTop: 30 }}>Login to Kite</Text>

                <TextInput textContentType="emailAddress" placeholder={"User ID(eg:AB001)"} onChangeText={(text) =>  setUserDetails({...userDetails,email:text})} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />
                <TextInput secureTextEntry={true} textContentType="password" placeholder={"Password"} onChangeText={(text) => setUserDetails({ ...userDetails,password: text })} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />

                <Pressable onPress={handleLogin} style={{width:'80%',height:50,backgroundColor:'tomato',marginTop:40,borderRadius:3,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:18,color:'white'}}>Login</Text>
                </Pressable>
                <View style={{flexDirection:"row",columnGap:2,marginTop:10}}>
                    <Text style={{opacity:0.4}}>Don't have an account?</Text>
                    <Pressable onPress={()=>{navigate.navigate("SignupScreen")}}><Text style={{color:'red'}}>Signup</Text></Pressable>
                </View>
                

            </View>
        </View>
    )
}

export default LoginScreen


const styles = StyleSheet.create({})




// const [routes] = useState(
//     getWatchlistData?.data?.data?.map((item: any, i: number) => {
//         return {
//             key: i?.toString(),
//             title: item?.title
//         }
//     })
// );


// const renderScene = SceneMap({
//     0: FirstRoute,
//     1: SecondRoute,
//     2: FirstRoute,
//     3: FirstRoute,
//     4: FirstRoute,
//     5: FirstRoute,
//     6: FirstRoute
// });