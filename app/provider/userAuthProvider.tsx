import { ReactNode, useEffect } from "react"
import { View } from "react-native-reanimated/lib/typescript/Animated"
import { useGetUserByTokenQuery } from "../../features/slices/userApiSlice"

export const UserAuth = ({children}:{children:ReactNode})=>{

    let userDetails = useGetUserByTokenQuery({});


    useEffect(()=>{

    },[])

    return (
        <>
            {children}
        </>
    )
}