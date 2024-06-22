import { View } from "react-native"

export const CircleSpecial = ({width=16,height=16,borderWidth=4,borderRadius=8})=>{

    return (
        <View style={{  height, width, borderWidth, backgroundColor: 'white', borderTopColor: '#0261b6', borderBottomColor: '#0261b6', borderLeftColor: "#0261b6", borderRightColor: '#51c4fe', borderRadius }} />
    )
}