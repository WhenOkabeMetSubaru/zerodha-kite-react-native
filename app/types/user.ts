import { STOCK } from "./stock";

export interface USER {
    firstName: string;
    lastName?: string; // Optional last name
    username: string;
    email: string;
    mobile?: string; // Optional mobile number
    created: Date;
    updated?: Date;
    profile_status: PROFILE_STATUS;
    equity_amount: number;
    equity_used_margin: number;
    equity_opening_balance?: number; // Optional opening balance
    equity_pay_in: number;
    equity_pay_out: number;
    equity_span: number;
    equity_delivery_margin: number;
    equity_exposure: number;
    equity_option_premium: number;
    equity_collateral_liquid: number;
    equity_collateral_equity: number;
    commodity_amount: number;
    commodity_used_margin: number;
    commodity_opening_balance?: number; // Optional opening balance
    commodity_pay_in: number;
    commodity_pay_out: number;
    commodity_span: number;
    commodity_delivery_margin: number;
    commodity_exposure: number;
    commodity_option_premium: number;
}

type PROFILE_STATUS = 'pending' | 'verified' | 'rejected' | 'banned';


export interface WATCHLIST {
    _id:string;
    title:string;
    created_by?:string;
    stocks?:STOCK[]
}