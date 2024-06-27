import { View, Text, Pressable, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useRoute } from '@react-navigation/native'
import { WATCHLIST } from '../../app/types/user'
import { useUpdateWatchListByIDMutation } from '../../features/slices/userApiSlice'


const EditWatchListScreen = ({navigation}:{navigation:any}) => {

    const routesParams:any = useRoute();
    const inputRef = useRef<any>();

    const watchListData:WATCHLIST = routesParams?.params;

    const [watchListName,setWatchListName] = useState(watchListData?.title || "");

    const [updateWatchList] = useUpdateWatchListByIDMutation();
    

    useEffect(()=>{
       
        navigation.setOptions({
            headerRight:()=>{
                return <Pressable onPress={handleWatchListSave} style={{width:50,height:30,justifyContent:'center',borderRadius:3,alignItems:'center',backgroundColor:'indigo',marginRight:20}}>
                    <Text style={{color:'white',fontSize:12}}>Save</Text>
                </Pressable>
            }
        })

        

    },[watchListName])


    useEffect(()=>{},[watchListName])

    const handleWatchListSave = ()=>{
        
        if(watchListName?.length<1){
            return ToastAndroid.showWithGravity("Empty Watchlist Name",2,3);
        }

        let values = {
            title:watchListName,
            stocks:watchListData.stocks,
            stocks_count:watchListData?.stocks?.length
        }

       

        updateWatchList({watchId:watchListData._id,data:values}).then((res)=>{
            console.log(res);
            ToastAndroid.showWithGravity(res?.data?.info,3,3);
        })


    }

  return (
    <ScrollView style={{height:'100%',backgroundColor:'white'}}>
        <View style={{backgroundColor:'#e7e7e7',height:100,position:'relative'}}>
            <View style={{height:50,backgroundColor:"#e7e7e7"}}>

            </View>
            <View style={{height:50,backgroundColor:'white',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
            <View style={{paddingLeft:10,columnGap:10, paddingRight:10, position:'absolute',flexDirection:'row',alignItems:'center',height:50,borderRadius:3,backgroundColor:'white',borderWidth:0.4,borderColor:'lightgray',left:20,right:20,bottom:25,elevation:2}}>
                <Text style={{opacity:0.4}}>
                    Name
                </Text>
                <TextInput ref={inputRef} value={watchListName} onChangeText={(text)=>{
                      setWatchListName(text)
                   
                }} style={{width:'75%',paddingRight:10}}/>
                <FeatherIcon  name='edit-3' style={{marginLeft:10}} size={16}/>
            </View> 
        </View>
    </ScrollView>
  )
}

export default EditWatchListScreen