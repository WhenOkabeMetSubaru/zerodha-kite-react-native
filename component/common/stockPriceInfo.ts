

type STOCK_PRICE_FUNCTION_PROPS = {
    previous_day_close_price:string,
    current_price:string
}

export type STOCK_PRICE_FUNCTION_RETURN_TYPE = {
    stock_price_status:string;
    text_color:string;
    difference_in_price:string;
    percentage_difference:string;
    price_symbol:string;
}


/**
 * 
 * @param {string} previous_day_close_price
 * @params {string} current_price
 * @returns {STOCK_PRICE_FUNCTION_RETURN_TYPE}
 */
export function handleStockPriceInfo ({previous_day_close_price,current_price}:STOCK_PRICE_FUNCTION_PROPS):STOCK_PRICE_FUNCTION_RETURN_TYPE {

    previous_day_close_price = previous_day_close_price?.replace(",","");
    current_price = current_price?.replace(",","");

    let current_price_parsed:any = parseFloat(current_price).toFixed(2);
    let previous_day_close_price_parsed:any = parseFloat(previous_day_close_price).toFixed(2)

    let finalObj = {
        stock_price_status:'',
        text_color:'',
        difference_in_price:'',
        percentage_difference:'',
        price_symbol:''
    };

    if(current_price > previous_day_close_price){

        let difference:any = (current_price_parsed - previous_day_close_price_parsed).toFixed(2);
        let percentage:any = ((difference / previous_day_close_price_parsed) * 100).toFixed(2);

        finalObj = {
            ...finalObj,
            stock_price_status:"gain",
            text_color:"#03a314",
            difference_in_price: difference?.toString(),
            percentage_difference:percentage?.toString(),
            price_symbol:'+'
        }

    
    }
    else if (current_price < previous_day_close_price) {

        let difference:any = (previous_day_close_price_parsed - current_price_parsed).toFixed(2);
        let percentage:any = ((difference / previous_day_close_price_parsed) * 100).toFixed(2);

        finalObj = {
            ...finalObj,
            stock_price_status: "loss",
            text_color: "#df0505",
            difference_in_price: difference?.toString(),
            percentage_difference: percentage?.toString(),
            price_symbol:'-'
        }


    }else {
        let difference = 0.00;
        let percentage = 0.00;

        finalObj = {
            ...finalObj,
            stock_price_status: "none",
            text_color: "black",
            difference_in_price: difference?.toString(),
            percentage_difference: percentage?.toString(),
            price_symbol:''
        }
    }

    return finalObj;
    
}

/**
 * 
 * @param {string} previous_day_close_price
 * @params {string} current_price
 * @returns {STOCK_PRICE_FUNCTION_RETURN_TYPE}
 */
export function handleStockPriceInfoPortfolio({ previous_day_close_price, current_price }:{previous_day_close_price:number,current_price:number}): STOCK_PRICE_FUNCTION_RETURN_TYPE {

    let finalObj = {
        stock_price_status: '',
        text_color: '',
        difference_in_price: '',
        percentage_difference: '',
        price_symbol: ''
    };

   
    if (current_price > previous_day_close_price) {
        
        let difference: any = (current_price - previous_day_close_price).toFixed(2);
        let percentage: any = ((difference / previous_day_close_price) * 100).toFixed(2);

        finalObj = {
            ...finalObj,
            stock_price_status: "gain",
            text_color: "#03a314",
            difference_in_price: difference?.toString(),
            percentage_difference: percentage?.toString(),
            price_symbol: '+'
        }


    }
    else if (current_price < previous_day_close_price) {

        let difference: any = (previous_day_close_price - current_price).toFixed(2);
        let percentage: any = ((difference / previous_day_close_price) * 100).toFixed(2);

        finalObj = {
            ...finalObj,
            stock_price_status: "loss",
            text_color: "#df0505",
            difference_in_price: difference?.toString(),
            percentage_difference: percentage?.toString(),
            price_symbol: '-'
        }


    } else {
        let difference = 0.00;
        let percentage = 0.00;

        finalObj = {
            ...finalObj,
            stock_price_status: "none",
            text_color: "black",
            difference_in_price: difference?.toString(),
            percentage_difference: percentage?.toString(),
            price_symbol: ''
        }
    }

    return finalObj;

}