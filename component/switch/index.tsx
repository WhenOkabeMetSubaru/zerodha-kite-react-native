





import * as React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const ToggleCustom = ({ isOn=false, onColor, offColor, style, onToggle, labelStyle, label }: { isOn?: any, onColor?: any, offColor?: any, style?: any, onToggle?: any, labelStyle?: any, label?: any }) => {
    // const animatedValue = new Animated.Value(0);

    const animatedValue: any = React.useMemo(()=>new Animated.Value(0),[]);


    const moveToggle = animatedValue?.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
    });



    const color = isOn ? onColor : offColor;

    animatedValue.setValue(isOn ? 0 : 1);

    Animated.timing(animatedValue, {
        toValue: isOn ? 1 : 0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: false,
    }).start();

   

    return (
        <View style={styles.container}>
            
            {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableWithoutFeedback onPress={onToggle}>
                <View style={[styles.toggleContainer, style, { backgroundColor: color,paddingLeft:isOn==true?3:1.5 }]}>
                    <Animated.View
                        style={[
                            styles.toggleWheelStyle,
                            {
                                marginLeft: moveToggle,
                            },
                        ]}
                    />
                   
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleContainer: {
        width: 52,
        height: 32,
        marginLeft: 3,
        borderRadius: 15,
        justifyContent: 'center',
        
    },
    label: {
        marginRight: 2,
    },
    toggleWheelStyle: {
        width: 28,
        height: 28,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 1.5,
    },
});


// import React, { useEffect, useState } from 'react';
// import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from
//     'react-native';


// type TProps = {
//     value: boolean;
//     onChange: () => void;
//     onColor?: string;
//     offColor?: string;
//     label?: string;
//     labelStyle?: any;
// };

// export const ToggleCustom: React.FC<TProps> = ({
//     value,
//     onChange,
//     onColor = 'green',
//     offColor = 'grey',
//     label = '',
//     labelStyle,
// }) => {
//     const [isEnabled, setIsEnabled] = useState(false);

//     useEffect(() => {
//         value && setIsEnabled(value);
//     }, [value]);

//     const toggleSwitch = () => {
//         setIsEnabled(!isEnabled);
//         onChange();
//     };

//     const animatedValue = new Animated.Value(0);

//     const moveToggle = animatedValue.interpolate({
//         inputRange: [-0.2, 0.9],
//         outputRange: [0, 20],
//     });

//     const color = value ? onColor : offColor;

//     animatedValue.setValue(value ? 0 : 1);

//     Animated.timing(animatedValue, {
//         toValue: value ? 1 : 0,
//         duration: 300,
//         easing: Easing.linear,
//         useNativeDriver: false,
//     }).start();

//     return (
//         <View style={styles.container}>
//             {!!label && <Text style={[styles.label, labelStyle]}>{label}
//             </Text>}

//             <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
//                 <View style={[styles.toggleContainer, {
//                     backgroundColor:
//                         color
//                 }]}>
//                     <Animated.View style={[styles.toggleWheelStyle,
//                     { marginLeft: moveToggle }]} />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );
// };



// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     toggleContainer: {
//         width: 50,
//         height: 30,
//         marginLeft: 3,
//         borderRadius: 15,
//         justifyContent: 'center',
//     },
//     label: {
//         marginRight: 2,
//     },
//     toggleWheelStyle: {
//         width: 25,
//         height: 25,
//         backgroundColor: 'white',
//         borderRadius: 12.5,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 2.5,
//         elevation: 1.5,
//     },
// });