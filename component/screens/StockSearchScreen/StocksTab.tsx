import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { STOCK } from '../../../app/types/stock'
import { useAddStockToWatchListMutation, useDeleteStockFromWatchListMutation } from '../../../features/slices/userApiSlice'
import { FlatList } from 'react-native'
import { STOCK_SEARCH_SCREEN_COLORS } from '../../../app/constants/colors'


const StocksTabSearchScreen = ({stockData=[],watchListStockData=[],watchListId}:{stockData?:STOCK[],watchListStockData?:any,watchListId?:string}) => {

    const [addStockToWatchList] = useAddStockToWatchListMutation();
    const [deleteStockFromWatchList]  = useDeleteStockFromWatchListMutation();

   

    function handleStockCheckExists (stockArray:any,id:string):boolean {

        for(let i = 0;i<stockArray.length;i++){
            if(stockArray[i] == id) return true;
        }

        return false;

    }

  return (
    // <ScrollView>
    //     {
    //         stockData?.map((stock:STOCK,index:number)=>{
    //             return <StockSearchStockComponent addStockToWatchList={addStockToWatchList} watchListId={watchListId} deleteStockFromWatchList={deleteStockFromWatchList} isAdded={handleStockCheckExists(watchListStockData,stock?._id)} key={"stock" + index} stock={stock}/>
    //         })
    //     }
        
    // </ScrollView>
    <View>
        <FlatList
            
            data={stockData}
            
            renderItem={({item,index})=>{
                return (
                    <StockSearchStockComponent addStockToWatchList={addStockToWatchList} watchListId={watchListId} deleteStockFromWatchList={deleteStockFromWatchList} isAdded={handleStockCheckExists(watchListStockData, item?._id)} key={"stock" + index} stock={item} />
                )
            }}
        />
    </View>
  )
}

export default StocksTabSearchScreen

const styles = StyleSheet.create({})


export const StockSearchStockComponent =({stock,isAdded,addStockToWatchList,deleteStockFromWatchList,watchListId}:{stock:STOCK,isAdded:boolean,addStockToWatchList?:any,deleteStockFromWatchList?:any,watchListId?:string})=>{
    
    const [addedState,setAddedState]  = useState(isAdded || false);

    const handleAddStock = ()=>{

        
        addStockToWatchList({watchId:watchListId,stockId:stock?._id}).then((res:any)=>{
            if(res?.data?.error==false){
                setAddedState(!addedState);
            }
            
        })

    }

    const handleDeleteStock = () => {

        deleteStockFromWatchList({watchId:watchListId,stockId:stock?._id}).then((res: any) => {
            if (res?.data?.error == false) {
                setAddedState(!addedState);
            }
            
        })

    }
    
    return (
        <Pressable style={{ height: 80, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center',width:'70%' }}>
                <View style={{ justifyContent: 'center', backgroundColor:STOCK_SEARCH_SCREEN_COLORS.STOCK_SEARCH_NSE_TAG_BACKGROUND_COLOR, alignItems: 'center', paddingHorizontal: 7, height: 25, borderRadius: 2 }}>
                    <Text style={{ color: STOCK_SEARCH_SCREEN_COLORS.STOCK_SEARCH_NSE_TAG_TEXT_COLOR, fontSize: 12 }}>NSE</Text>

                </View>
                <View style={{ rowGap: 2 }}>
                    <Text numberOfLines={1}>{stock.name?.toUpperCase()}</Text>
                    <Text numberOfLines={1}   style={{ opacity: 0.4, fontSize: 13}}>{stock.complete_name?.toUpperCase()}</Text>
                </View>
            </View>
            <View>
                {
                    addedState == false?
                        <Pressable onPress={handleAddStock} style={{ width: 25, borderWidth: 0.8, borderColor:STOCK_SEARCH_SCREEN_COLORS.STOCK_SEARCH_ADD_BUTTON_COLOR, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
                            <FeatherIcon size={16} color={STOCK_SEARCH_SCREEN_COLORS.STOCK_SEARCH_ADD_BUTTON_COLOR} name='plus' />
                        </Pressable>:
                        <Pressable onPress={handleDeleteStock} style={{ width: 25, backgroundColor: STOCK_SEARCH_SCREEN_COLORS.STOCK_SCREEN_CHECK_BUTTON_COLOR, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
                            <FeatherIcon size={16} color={"white"} name='check' />
                        </Pressable>

                }
                
                
            </View>
        </Pressable>
    )
}