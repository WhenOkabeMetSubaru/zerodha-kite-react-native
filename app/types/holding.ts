import { STOCK } from "./stock";

type HOLDING_STATUS = "bought" | "sold";


export interface HOLDING {
    item:STOCK;
    average_price:number;
    total_amount:number;
    _id?:string;
    quantity:number;
    created_At?:string;
    is_sold?:boolean;
    holding_sold_at_price_final?:[
        {
            quantity?:number;
            price?:number
        }
    ],
    status?:HOLDING_STATUS;
}