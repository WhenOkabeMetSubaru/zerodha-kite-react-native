import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSignupMutation } from '../../features/slices/userApiSlice'
import auth from '../../features/helpers/auth'
import { useAppDispatch } from '../../features/hooks/hooks'
import { setToken } from '../../features/slices/user'

const SignupScreen = () => {

    const navigation = useNavigation<any>();

    const dispatch = useAppDispatch();

    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const [signupUser] = useSignupMutation();

    const handleSignup = () => {

        if(!(userDetails?.email.length>0) || !(userDetails?.password?.length>0)){
            return ;
        }

        signupUser(userDetails).then((res)=>{
            console.log(res)
           let data = res.data;
           ToastAndroid.show("Account Created",5)
            // navigation.navigate("LoginScreen")
        })

    }

    return (
        <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <Image style={{ width: 80, height: 50 }} source={require("../../assets/zerodhakitelogo.png")} />
                <Text style={{ fontSize: 26, marginTop: 30 }}>Signup to Kite</Text>

                <TextInput textContentType="name" placeholder={"Firstname"} onChangeText={(text) => setUserDetails({ ...userDetails,firstName: text })} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />
                <TextInput textContentType="name" placeholder={"Lastname"} onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />

                <TextInput textContentType="emailAddress" placeholder={"User ID(eg:AB001)"} onChangeText={(text) => setUserDetails({ ...userDetails, email: text })} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />
                <TextInput secureTextEntry={true} textContentType="password" placeholder={"Password"} onChangeText={(text) => setUserDetails({ ...userDetails, password: text })} style={{ borderWidth: 1, borderColor: 'lightgray', fontSize: 18, height: 50, marginTop: 30, width: '80%', borderRadius: 3, paddingLeft: 15 }} />

                <Pressable onPress={handleSignup} style={{ width: '80%', height: 50, backgroundColor: 'tomato', marginTop: 40, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>Signup</Text>
                </Pressable>
                <View style={{ flexDirection: "row", columnGap: 2, marginTop: 10 }}>
                    <Text style={{ opacity: 0.4 }}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("LoginScreen")}><Text style={{ color: 'red' }}>Login</Text></Pressable>
                </View>


            </View>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})

