import { API_RESPONSE_DEFAULT } from "./global";
import { STOCK } from "./stock";

export type orderStatusPrimary = ORDER_PENDING_STATUS | ORDER_REJECTED_STATUS | ORDER_COMPLETE_STATUS | ORDER_CANCELLED_STATUS;

export type orderTypePrimary = ORDER_TYPE_BUY | ORDER_TYPE_SELL;

//order_status
export type ORDER_COMPLETE_STATUS = "completed";
export type ORDER_REJECTED_STATUS = "rejected";
export type ORDER_PENDING_STATUS = "pending";
export type ORDER_CANCELLED_STATUS = "cancelled";

//order_type
export type ORDER_TYPE_BUY = "buy";
export type ORDER_TYPE_SELL = "sell";


//colors
type ORDER_BUY_TAG_BACKGROUND_COLOR = '#daf3f7';
type ORDER_BUY_TAG_TEXT_COLOR = "#0076c8";
type ORDER_SELL_TAG_TEXT_COLOR = '#b50000';
type ORDER_SELL_TAG_BACKGROUND_COLOR = "#f9e5e5";
type ORDER_PENDING_STATUS_BACKGROUND_COLOR = "";
type ORDER_REJECTED_STATUS_BACKGROUND_COLOR = ORDER_SELL_TAG_BACKGROUND_COLOR;
type ORDER_COMPLETED_STATUS_BACKGROUND_COLOR = "#e3f8dd";
type ORDER_PENDING_STATUS_TEXT_COLOR = "";
type ORDER_REJECTED_STATUS_TEXT_COLOR = ORDER_SELL_TAG_TEXT_COLOR;
type ORDER_COMPLETED_STATUS_TEXT_COLOR = "#218f01";
type ORDER_CANCELLED_STATUS_BACKGROUND_COLOR ="";
type ORDER_CANCELLED_STATUS_TEXT_COLOR = "";


export interface ORDER_SCREEN_FLAGS_AND_STATUS {
    COMPLETED: ORDER_COMPLETE_STATUS,
    PENDING: ORDER_PENDING_STATUS,
    REJECTED: ORDER_REJECTED_STATUS,
    CANCELLED:ORDER_CANCELLED_STATUS,
    BUY_ORDER: ORDER_TYPE_BUY,
    SELL_ORDER: ORDER_TYPE_SELL
}


export interface ORDER_SCREEN_COLORS {
    ORDER_BUY_TAG_BACKGROUND_COLOR: ORDER_BUY_TAG_BACKGROUND_COLOR,
    ORDER_BUY_TAG_TEXT_COLOR: ORDER_BUY_TAG_TEXT_COLOR,
    ORDER_SELL_TAG_TEXT_COLOR: ORDER_SELL_TAG_TEXT_COLOR,
    ORDER_SELL_TAG_BACKGROUND_COLOR: ORDER_SELL_TAG_BACKGROUND_COLOR,
    ORDER_PENDING_STATUS_BACKGROUND_COLOR: ORDER_PENDING_STATUS_BACKGROUND_COLOR,
    ORDER_REJECTED_STATUS_BACKGROUND_COLOR: ORDER_REJECTED_STATUS_BACKGROUND_COLOR,
    ORDER_COMPLETED_STATUS_BACKGROUND_COLOR: ORDER_COMPLETED_STATUS_BACKGROUND_COLOR,
    ORDER_PENDING_STATUS_TEXT_COLOR: ORDER_PENDING_STATUS_TEXT_COLOR;
    ORDER_REJECTED_STATUS_TEXT_COLOR: ORDER_REJECTED_STATUS_TEXT_COLOR;
    ORDER_COMPLETED_STATUS_TEXT_COLOR: ORDER_COMPLETED_STATUS_TEXT_COLOR;
    ORDER_CANCELLED_STATUS_BACKGROUND_COLOR :"",
    ORDER_CANCELLED_STATUS_TEXT_COLOR : ""
}

export type ORDER_FULL_BACKGROUND_COLORS = ORDER_BUY_TAG_BACKGROUND_COLOR |  ORDER_SELL_TAG_BACKGROUND_COLOR | ORDER_CANCELLED_STATUS_BACKGROUND_COLOR | ORDER_COMPLETED_STATUS_BACKGROUND_COLOR | ORDER_PENDING_STATUS_BACKGROUND_COLOR | ORDER_REJECTED_STATUS_BACKGROUND_COLOR ;
export type ORDER_FULL_TEXT_COLORS = ORDER_BUY_TAG_TEXT_COLOR | ORDER_SELL_TAG_TEXT_COLOR | ORDER_CANCELLED_STATUS_TEXT_COLOR | ORDER_COMPLETED_STATUS_TEXT_COLOR | ORDER_PENDING_STATUS_TEXT_COLOR | ORDER_REJECTED_STATUS_TEXT_COLOR;  

export type COMMODITY_TYPE = 'equity' | 'f&o' | 'mutual_funds' | 'ipo' | 'bonds';
export type ORDER_STATUS_IN_HOLDINGS  = "bought" | "sold";
export type ORDER_PRIMARY_TYPE = "regular" | "co" | "amo" | "iceberg";
export type ORDER_PRIMARY_TYPE_INFO = "market" | "limit" | "sl" | "sl-m";
export type TRADE_TYPE = "mis" | "nrml";
export type VALIDITY_TYPE = 'day' | 'ioc' | 'minutes';


export interface HANDLE_ORDER_STATUS_FUNC_PROPS {
    BACKGROUND_COLOR?:ORDER_FULL_BACKGROUND_COLORS,
    TEXT_COLOR?:ORDER_FULL_TEXT_COLORS,
    BUTTON_TITLE?:string

}

export interface ORDER {
    order_type: orderTypePrimary;
    order_status: orderStatusPrimary;
    created_by: string; 
    order_status_in_holdings:ORDER_STATUS_IN_HOLDINGS;
    commodity_type: COMMODITY_TYPE;
    trade_type?: TRADE_TYPE; 
    order_placed_type_info?: ORDER_PRIMARY_TYPE_INFO; 
    order_primary_type?: ORDER_PRIMARY_TYPE;
    item?: string; 
    quantity: number;
    total_amount:number;
    placed_price?: number; 
    order_placed_at_price_initial?:number;
    order_placed_at_price_final?:number;
    order_sold_at_price_initial?: number;
    order_sold_at_price_final?: number;
    trigger?: {
        flag: boolean;
        price: number;
    };
    tags?: string[]; 
    created_At: Date;
    executed_At: Date;
    validity?: VALIDITY_TYPE; 
    stop_loss_trigger?: number; 
    num_of_legs?: number; 
}

export interface ORDER_WITH_STOCK {
    order_type: orderTypePrimary;
    order_status: orderStatusPrimary;
    total_amount?:number;
    created_by: string;
    order_status_in_holdings: ORDER_STATUS_IN_HOLDINGS;
    commodity_type: COMMODITY_TYPE;
    trade_type?: TRADE_TYPE;
    order_placed_type_info?: ORDER_PRIMARY_TYPE_INFO;
    order_primary_type?: ORDER_PRIMARY_TYPE;
    item?: STOCK;
    quantity: number;
    placed_price?: number;
    order_placed_at_price_initial?: number;
    order_placed_at_price_final?: number;
    order_sold_at_price_initial?: number;
    order_sold_at_price_final?: number;
    trigger?: {
        flag: boolean;
        price: number;
    };
    tags?: string[];
    created_At: Date;
    executed_At: Date;
    validity?: VALIDITY_TYPE;
    stop_loss_trigger?: number;
    num_of_legs?: number;
}   

export interface ORDER_INPUT_DATA {
    order_type: orderTypePrimary;
    order_status?: orderStatusPrimary;
    created_by?: string;
    order_status_in_holdings?: ORDER_STATUS_IN_HOLDINGS;
    commodity_type: COMMODITY_TYPE;
    trade_type: TRADE_TYPE;
    order_placed_type_info?: ORDER_PRIMARY_TYPE_INFO;
    order_primary_type?: ORDER_PRIMARY_TYPE;
    item?: string;
    quantity: number;
    order_placed_at_price_initial?: number;
    order_placed_at_price_final?: number;
    trigger?: {
        flag: boolean;
        price: number;
    };
    tags?: string[];
    created_At?: Date;
    executed_At?: Date;
    validity?: VALIDITY_TYPE;
    stop_loss_trigger?: number;
    num_of_legs?: number;
}

export interface ORDER_RESPONSE_SINGLE extends API_RESPONSE_DEFAULT {
    error:boolean;
    info:string;
    data:ORDER;
}

export interface ORDER_RESPONSE_MULTIPLE extends API_RESPONSE_DEFAULT {
    error: boolean;
    info: string;
    data: ORDER [];
}

