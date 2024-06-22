// export const orderData:orderStatusPrimary  = {

import { orderScreenButtonName } from "../../../app/constants/buttonNames";
import { orderColors } from "../../../app/constants/colors";
import { orderScreenFlags } from "../../../app/constants/flagsAndChecks";
import { HANDLE_ORDER_STATUS_FUNC_PROPS, orderStatusPrimary, orderTypePrimary } from "../../../app/types/order";


// }

export function handleStatusChange(status: orderStatusPrimary):HANDLE_ORDER_STATUS_FUNC_PROPS {
    
    switch (status) {
        case orderScreenFlags.COMPLETED:
            return {
                BACKGROUND_COLOR: orderColors.ORDER_COMPLETED_STATUS_BACKGROUND_COLOR,
                TEXT_COLOR: orderColors.ORDER_COMPLETED_STATUS_TEXT_COLOR,
                BUTTON_TITLE:orderScreenButtonName.ORDER_COMPLETE_BUTTON_NAME

            }
        case orderScreenFlags.REJECTED:
            return {
                BACKGROUND_COLOR: orderColors.ORDER_REJECTED_STATUS_BACKGROUND_COLOR,
                TEXT_COLOR: orderColors.ORDER_REJECTED_STATUS_TEXT_COLOR,
                BUTTON_TITLE:orderScreenButtonName.ORDER_REJECTED_BUTTON_NAME

            }
        case orderScreenFlags.PENDING:
            return {
                BACKGROUND_COLOR: orderColors.ORDER_PENDING_STATUS_BACKGROUND_COLOR,
                TEXT_COLOR: orderColors.ORDER_PENDING_STATUS_TEXT_COLOR,
                BUTTON_TITLE:orderScreenButtonName.ORDER_PENDING_BUTTON_NAME

            }
        case orderScreenFlags.CANCELLED:
            return {
                BACKGROUND_COLOR: orderColors.ORDER_CANCELLED_STATUS_BACKGROUND_COLOR,
                TEXT_COLOR: orderColors.ORDER_CANCELLED_STATUS_TEXT_COLOR,
                BUTTON_TITLE:orderScreenButtonName.ORDER_CANCELLED_BUTTON_NAME

            }

        default:
            return {
                BACKGROUND_COLOR:"",
                TEXT_COLOR:"",
                BUTTON_TITLE:""

            };

    }
}

export function handleOrderType (type:orderTypePrimary):HANDLE_ORDER_STATUS_FUNC_PROPS{

    switch(type){

        case orderScreenFlags.BUY_ORDER:
            return {
                BACKGROUND_COLOR:orderColors.ORDER_BUY_TAG_BACKGROUND_COLOR,
                TEXT_COLOR:orderColors.ORDER_BUY_TAG_TEXT_COLOR,
                BUTTON_TITLE:orderScreenButtonName.ORDER_BUY_BUTTON_NAME
            }

        case orderScreenFlags.SELL_ORDER:
            return {
                BACKGROUND_COLOR: orderColors.ORDER_SELL_TAG_BACKGROUND_COLOR,
                TEXT_COLOR: orderColors.ORDER_SELL_TAG_TEXT_COLOR,
                BUTTON_TITLE: orderScreenButtonName.ORDER_SELL_BUTTON_NAME
            }

        default:
            return {
                BACKGROUND_COLOR:"",
                TEXT_COLOR:"",
                BUTTON_TITLE:""
            }

    }
}