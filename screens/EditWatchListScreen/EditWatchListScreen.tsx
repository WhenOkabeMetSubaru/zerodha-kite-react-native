import { View, Text, Pressable, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute } from '@react-navigation/native'
import { WATCHLIST } from '../../app/types/user'
import { useGetAllStocksByWatchListQuery, useGetWatchListByIDQuery, useUpdateWatchListByIDMutation } from '../../features/slices/userApiSlice'
import { STOCK } from '../../app/types/stock'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'


const EditWatchListScreen = ({ navigation }: { navigation: any }) => {

    const routeParams: any = useRoute();
    const inputRef = useRef<any>();

    const watchId: any = routeParams?.params;

    const getWatchlistData = useGetAllStocksByWatchListQuery({ watchId: watchId?._id });
    const watchListData: WATCHLIST = getWatchlistData?.data?.data || {};

    const [watchListName, setWatchListName] = useState(watchListData?.title || "");
    const [watchListStocks, setWatchListStocks] = useState<STOCK[]>(watchListData?.stocks || []);

    const [updateWatchList] = useUpdateWatchListByIDMutation();


    useEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                return <Pressable onPress={handleWatchListSave} style={{ width: 50, height: 30, justifyContent: 'center', borderRadius: 3, alignItems: 'center', backgroundColor: 'indigo', marginRight: 20 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Save</Text>
                </Pressable>
            }
        })



    }, [watchListName,watchListStocks])




    const handleWatchListSave = () => {

        if (watchListName?.length < 1) {
            return ToastAndroid.showWithGravity("Empty Watchlist Name", 2, 3);
        }

        
        let values = {
            title: watchListName,
            stocks: watchListStocks?.map((item)=>item._id),
            stocks_count: watchListData?.stocks?.length
        }





        updateWatchList({ watchId: watchListData._id, data: values }).then((res) => {
            console.log(res?.data?.data?.stocks)
            ToastAndroid.showWithGravity(res?.data?.info, 3, 3);
        })


    }

    const handleOnDragEnd = (oldIndex: number, newIndex: number) => {

        // setWatchListStocks((stockList: STOCK[]) => {
        //     return arrayMoveImmutable(stockList, oldIndex, newIndex);
        // })

        // console.log(watchListStocks)
    }

    function arrayMoveImmutable(array: STOCK[], fromIndex: number, toIndex: number) {
        // Error handling for invalid indices
        if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
            throw new Error("Invalid fromIndex or toIndex");
        }

        // Create a copy of the original array
        const newArray = array.slice();

        // Handle cases where fromIndex and toIndex are the same
        if (fromIndex === toIndex) {
            return newArray;
        }

        // Handle moving element forward (toIndex > fromIndex)
        if (toIndex > fromIndex) {
            const element = newArray.splice(fromIndex, 1)[0]; // Remove element from original position
            newArray.splice(toIndex, 0, element); // Insert element at new position
        }

        // Handle moving element backward (toIndex < fromIndex)
        else {
            const element = newArray.splice(fromIndex, 1)[0]; // Remove element from original position
            newArray.splice(toIndex, 0, element); // Insert element at new position
        }

        return newArray;
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<STOCK>) => {

        return (
            <View  style={{ height: 70, paddingHorizontal: 20, borderBottomWidth: 0.6, borderColor: '#e7e7e7', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 22,width:'70%' }}>
                    <Pressable onLongPress={drag} disabled={isActive}>
                        <MaterialIconCommunity name='drag-vertical' size={22} />
                    </Pressable>
                    <View style={{ rowGap: 3 }}>
                        <Text numberOfLines={1}>{item.name?.toUpperCase()}</Text>
                      
                        <Text style={{ fontSize: 12, opacity: 0.4 }}>NSE</Text>
                    </View>
                </View>
                <Pressable onPress={() => { }}>
                    <FeatherIcon name='trash-2' size={20} />
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#e7e7e7', height: 100, position: 'relative' }}>
                <View style={{ height: 50, backgroundColor: "#e7e7e7" }}>

                </View>
                <View style={{ height: 50, borderBottomWidth: 0.6, borderColor: '#e7e7e7', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <View style={{ paddingLeft: 10, columnGap: 10, paddingRight: 10, position: 'absolute', flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 3, backgroundColor: 'white', borderWidth: 0.4, borderColor: 'lightgray', left: 20, right: 20, bottom: 25, elevation: 2 }}>
                    <Text style={{ opacity: 0.4 }}>
                        Name
                    </Text>
                    <TextInput ref={inputRef} value={watchListName} onChangeText={(text) => {
                        setWatchListName(text)

                    }} style={{ width: '75%', paddingRight: 10 }} />
                    <FeatherIcon name='edit-3' style={{ marginLeft: 10 }} size={16} />
                </View>
            </View>



            <DraggableFlatList
            data={watchListStocks}
            onDragEnd={({data})=>{

                setWatchListStocks(data);
            }}
            keyExtractor={(item)=>item._id}
            renderItem={renderItem}

            />
        


        </View>
    )
}

export default EditWatchListScreen

