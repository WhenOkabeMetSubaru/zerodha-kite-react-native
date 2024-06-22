import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'

const ConnectedAppScreen = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ height: 60, position: 'relative', backgroundColor: '#e7e7e7' }}>
                <View style={{ height: 30, backgroundColor: '#e7e7e7' }}>

                </View>
                <View style={{ height: 30, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />
                <View style={{ height: 50, paddingLeft: 15, paddingRight: 15, columnGap: 15, borderRadius: 3, flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, left: 20, right: 20, backgroundColor: 'white', elevation: 2 }}>
                    <FeatherIcon name="search" color={"gray"} size={20} />
                    <Text style={{ color: 'gray' }}>Search apps</Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', columnGap: 20, paddingLeft: 22, paddingRight: 22, alignItems: 'center' }}>
                    <FeatherIcon name="user" size={25} color="blue"/>
                    <View>
                        <Text>Support Portal</Text>
                        <Text style={{color:'gray',fontSize:11}}>Zerodha support portal</Text>
                    </View>
                </View>
                <View style={{height:0.7,backgroundColor:'#e7e7e7',marginTop:20}}/>

                <View style={{ flexDirection: 'row', columnGap: 20, paddingLeft: 22,marginTop:20, paddingRight: 22, alignItems: 'center' }}>
                    <FeatherIcon name="user" size={25} color="blue" />
                    <View>
                        <Text>Varsity mobile app</Text>
                        <Text style={{ color: 'gray', fontSize: 11 }}>Varsity mobile app</Text>
                    </View>
                </View>
                <View style={{ height: 0.7, backgroundColor: '#e7e7e7', marginTop: 20 }} />

            </View>
        </View>
    )
}

export default ConnectedAppScreen

const styles = StyleSheet.create({})