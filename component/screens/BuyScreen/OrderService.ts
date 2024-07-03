import { ToastAndroid } from "react-native";
import { ORDER, ORDER_INPUT_DATA, ORDER_PRIMARY_TYPE, ORDER_PRIMARY_TYPE_INFO, TRADE_TYPE, VALIDITY_TYPE } from "../../../app/types/order";
import { STOCK } from "../../../app/types/stock";
import { USER } from "../../../app/types/user";
import { useAddNewOrderMutation } from "../../../features/slices/orderSlice";
import { handleConvertNumberToIndianSystem, handleCurrencyIndianToInteger } from "../../common/priceFunctions/currencyConverter";


export type ORDER_INPUT_PROPS = {
    addOrderCallback:(args:ORDER_INPUT_DATA)=>void,
    stateValues:{
        selectedProduct:TRADE_TYPE,
        selectedMainOrderType:ORDER_PRIMARY_TYPE_INFO,
        selectedValidityType:VALIDITY_TYPE,
        quantity:number

    },
    userDetails:USER,
    stockDetails:STOCK,
    tabName:ORDER_PRIMARY_TYPE
}

export async function addNewOrder({stateValues,stockDetails,userDetails, addOrderCallback,tabName}:ORDER_INPUT_PROPS){

    let orderObj:ORDER_INPUT_DATA  = {
        order_type:"buy",
        commodity_type:"equity",
        trade_type:stateValues.selectedProduct,
        quantity:stateValues.quantity,
        order_primary_type:tabName,
        order_placed_type_info:stateValues.selectedMainOrderType
        
    }

    let getCalculatedPrice:number = parseFloat((handleCurrencyIndianToInteger(stockDetails.current_price) * stateValues.quantity).toFixed(2));


    if(getCalculatedPrice > userDetails?.equity_amount){
        
        ToastAndroid.show("Insufficient Balance", 5);
        return;
        
    }

    orderObj = {
        ...orderObj,
        item:stockDetails._id,
        order_placed_at_price_initial:handleCurrencyIndianToInteger(stockDetails.current_price),

    }

    addOrderCallback(orderObj);
   

}