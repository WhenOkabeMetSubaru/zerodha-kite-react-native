import { memo, useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View } from "react-native";

const CustomRadioButtonNotMemoized = ({ checkFlag = false, onPressFunction, innerColor = 'white', activeColor ="#3a91f2"}: { checkFlag: Boolean, onPressFunction: any,innerColor?:any,activeColor?:any }) => {

    const [checked, setChecked] = useState(checkFlag || false);

    useEffect(() => {
       
        setChecked(checkFlag)
    }, [checkFlag])


    return (
        <TouchableWithoutFeedback onPress={onPressFunction}>
            <View style={{ width: 16, height: 16, borderColor: checked == true ? activeColor : 'gray', borderRadius: 100, borderWidth: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 9, height: 9, borderRadius: 100, backgroundColor: checked == true ? activeColor : innerColor }} />
            </View>
        </TouchableWithoutFeedback>
    )
}


export const CustomRadioButton =  memo(CustomRadioButtonNotMemoized)