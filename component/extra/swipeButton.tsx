import { View, Text, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withClamp, withSpring, withTiming } from 'react-native-reanimated'
import FeatherIcon from 'react-native-vector-icons/Feather'

const SwipeButtonCustom = ({ primaryColor ="#2a8af4",callback}:{primaryColor?:string,callback:(args:any)=>void}) => {

    const translateX = useSharedValue(0);

    const rotateLoader = useSharedValue(0);

    rotateLoader.value = withTiming(1,{
        duration:2
    })

    const [toggled, setToggled] = useState<Boolean>(false);

    const handleComplete = (isToggled: any) => {
        if (isToggled !== toggled) {
            setToggled(isToggled);
        }
        callback(translateX);
    }




    const panGesture = Gesture.Pan()
        .onStart((event: any) => {

        })
        .onUpdate((event) => {
            let newValue;

            if (toggled == true) {
                newValue = 30 + event.translationX;
            } else {
                newValue = event.translationX;
            }

            if (newValue >= 0 && newValue <= 205) {

                translateX.value = newValue;
            }
        })
        .onEnd((event) => {
            if (translateX.value < 120) {
                translateX.value = withSpring(0, { damping: 500,stiffness:300 });
            } else {
                translateX.value = withSpring(205, { damping: 500 });
                
                runOnJS(handleComplete)(true)
                

            }

            
            
        })

    const eStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],

        }
    })

    const textAnimateStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(translateX.value, [0, 170], [1, 0], Extrapolation.CLAMP),
            transform: [{ translateX: interpolate(translateX.value, [0, 170], [0, 270 / 2 - 50]) }]
        }
    })

    // const loaderStyle = useAnimatedStyle(() => {
    //     return {
    //         transform:[{rotate:interpolate(rotateLoader.value,[0,1],[0,360],Extrapolation.CLAMP)}]
    //     }
    // })

    return (

        
            <View style={{ width: 270, height: 65, borderRadius: 100, backgroundColor: primaryColor, position: 'relative' }}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[eStyle, { height: 65, width: 65, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 3, borderColor: primaryColor }]}>

                        <FeatherIcon name="chevron-right" color={primaryColor} size={30} />

                    </Animated.View>
                </GestureDetector>
                <Animated.Text style={[textAnimateStyles, { color: 'white', textAlign: 'center', fontSize: 12, position: 'absolute', margin: 'auto', bottom: 24, left: '35%' }]}>
                    SWIPE TO BUY
                </Animated.Text>
            </View> 

    )
}

export default SwipeButtonCustom