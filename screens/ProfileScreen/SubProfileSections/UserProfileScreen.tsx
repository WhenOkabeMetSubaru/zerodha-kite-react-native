import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { CircleSpecial } from '../../../component/extra/circleSpecial'
import { useGetUserByTokenQuery } from '../../../features/slices/userApiSlice'
import { USER } from '../../../app/types/user'

const UserProfileScreen = () => {

    const [sessionState, setSessionState] = useState(false);
    const userDetails = useGetUserByTokenQuery({});
    let userData: USER = userDetails?.data?.data || {};

    return (
        <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 3, paddingLeft: 23, paddingRight: 23, marginTop: 10 }}>
                <View>
                    <Text style={{ fontSize: 18 }}>{userData?.firstName + " " + userData?.lastName}</Text>
                    <Text style={{ fontSize: 12, marginTop: 4, color: 'gray' }}>VDCK 177</Text>
                </View>
                <View style={{ width: 90, height: 90, position: 'relative' }}>
                    <View style={{ width: 90, height: 90, borderRadius: 100, backgroundColor: '#e6efff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 35, color: '#9ec1ff' }}>
                            {userData?.firstName?.charAt(0).toUpperCase() + userData?.lastName?.charAt(0)?.toUpperCase()}
                        </Text>
                    </View>
                    <View style={{ width: 25, position: 'absolute', right: 2, bottom: 2, height: 25, backgroundColor: '#3a91f2', borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcon name="edit" color="white" size={14} />
                    </View>
                </View>

            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding:23 }}>
                <Text style={{ color: 'gray' }}>Password & Security</Text>
                <Text style={{ color: "#3a91f2" }}>Manage</Text>
            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7' }} />

            <View style={{ padding:23, rowGap: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Support code</Text>
                    <View style={{columnGap:5,flexDirection:'row',alignItems:'center'}}>
                        <CircleSpecial width={15} height={15}/>
                        <Text style={{ color: "#3a91f2" }}>View</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Email</Text>
                    <Text style={{}}>{userData?.email}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Phone</Text>
                    <Text >*1132</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>PAN</Text>
                    <Text >*E78F</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Demat (BO)</Text>
                    <Text style={{ color: "#3a91f2" }}>564871514545454</Text>
                </View>

                <Text style={{ color: "#3a91f2" }}>Manage account</Text>

            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7' }} />

            <View style={{ padding:23, rowGap: 15 }}>
                <Text>Bank accounts</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>ICICI BANK LTD</Text>
                    <Text style={{}}>*7834</Text>
                </View>


            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7' }} />

            {/* Segments*/}
            <View style={{ padding:23, rowGap: 15 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Segments</Text>
                    <Text style={{ color: "#3a91f2" }}>MF</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>Demat authorisation</Text>
                    <Text style={{ color: "#3a91f2" }}>eDIS</Text>
                </View>


            </View>

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7' }} />

            {
                sessionState == false ? <TouchableWithoutFeedback onPress={() => setSessionState(true)}>
                    <View style={{ padding:23, rowGap: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#3a91f2' }}>View active sessions</Text>
                        <MaterialIcon name="keyboard-arrow-down" size={22} color="#3a91f2" />
                    </View>
                </TouchableWithoutFeedback> :
                    <>
                        <View style={{ padding:23, rowGap: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: 'gray' }}>Active sessions</Text>
                                <Text style={{ color: "#3a91f2" }}>Clear sessions</Text>
                            </View>
                            <View style={{flexDirection:'row',columnGap:15,alignItems:'center'}}>
                                <View style={{width:3,height:3,borderRadius:100,backgroundColor:'black'}}/>
                                <Text>Kite Android</Text>
                            </View>
                        </View>
                    </>
            }

            <View style={{ height: 0.7, backgroundColor: '#e7e7e7' }} />

            <View style={{padding:23,rowGap:15,paddingBottom:50}}>
                <Text>Account closure</Text>
                <Text style={{ fontSize: 13, color: 'gray' }}>Account closure is permanent and irrevisible. Please read <Text style={{ color:"#3a91f2"}}>this</Text> before proceeding</Text>
                <Text style={{ color:"#3a91f2"}}>Continue</Text>
            </View>

        </ScrollView>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({})