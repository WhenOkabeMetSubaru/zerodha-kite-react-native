import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import FeatureIcon from 'react-native-vector-icons/Feather'
import Animated, { Easing, Extrapolation, interpolate, ReduceMotion, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import LineChartComponent from '../charts/lineChart'



const Max_Header_Height = 50;
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height

const DynamicHeader = ({children,showStatus,setShowStatus,scrollOffsetY,screenName}:{children:ReactNode,screenName:string, showStatus?:any,setShowStatus?:any,scrollOffsetY?:any}) => {

   
    const [showOverview, setShowOverView] = useState(false);

    


    // const animateHeight = useDerivedValue(()=>{
    //     const formatedValue = Math.abs(scrollOffsetY.value)
    //     console.log(formatedValue)
    //     scrollNewValue.value = formatedValue;
    //     console.log("new value",scrollNewValue.value)
    //     return {}
    // })



    const boxHeight = useSharedValue(0);// Animated value for height

    const handleButtonClickOpen = () => {
        
        // boxHeight.value = withTiming(400,
        //     {
        //         duration:250,
        //         easing: Easing.in(Easing.bezierFn(0.19, 0.71, 0.27, 1.03)),
        //         reduceMotion:ReduceMotion.System
        //     }
        // )
        boxHeight.value = withSpring(400,{
            damping:1000,
            stiffness:100,
         
        })
        setShowStatus(!showOverview)
        setShowOverView(!showOverview)
    };

    const handleButtonClickClose = () => {

        // boxHeight.value = withTiming(0,{
        //     duration:300,
        //     easing:Easing.in(Easing.poly(1))

        // });
        boxHeight.value = withSpring(0, {
            damping: 500,
            stiffness: 300
        })
        setShowStatus(!showOverview)
        setShowOverView(!showOverview)
    };

    const heightIncreaseAnimationStyle = useAnimatedStyle(() => {
        return {
            top: boxHeight.value,
        };
    });

    const overViewBoxStyles = useAnimatedStyle(() => {

        return {
            opacity: interpolate(boxHeight.value, [0, 400], [0, 1], Extrapolation.EXTEND)
        }
    })

    const mainBoxStyles = useAnimatedStyle(() => {

        return {
            opacity: interpolate(boxHeight.value, [0, 400], [1, 0.3], Extrapolation.EXTEND),
            elevation: interpolate(boxHeight.value, [0, 400], [10, 20], Extrapolation.CLAMP)
        }
    })

    const headerHeightStyles = useAnimatedStyle(()=>{
        const heightStyleCustom = interpolate(Math.abs(scrollOffsetY.value), [0, 200], [Max_Header_Height, Min_Header_Height], Extrapolation.CLAMP);
        return {
            height: withSpring(heightStyleCustom,{damping:100,stiffness:1000})
        }
    })



  return (
      <>
          <Animated.View style={[{ backgroundColor: '#e7e7e7', position: 'absolute' }]}>
                
              <View style={{ marginTop: 10, paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                  <Animated.Text style={[{ fontSize: 25, fontWeight: 600, width: '40%' }, overViewBoxStyles]}>Overview</Animated.Text>
                  <FeatureIcon onPress={() => {handleButtonClickClose()}} name="x" size={35} />
              </View>
              <View style={{ marginTop: 25, paddingLeft: 25, paddingRight: 25, flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
                  <View style={{ width: '45%', rowGap: 5 }}>
                      <Animated.Text style={[{ fontWeight: 600 }, overViewBoxStyles]}>NIFTY 50</Animated.Text>
                      <Animated.Text style={[{ fontSize: 18 }, overViewBoxStyles]}>23,290.15</Animated.Text>
                      <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', paddingTop: 10, paddingLeft: 5 }}>
                          <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+468.75</Animated.Text>
                          <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+2.05%</Animated.Text>
                      </View>

                  </View>
                  <View style={{ width: '40%', rowGap: 5 }}>
                      <Animated.Text style={[{ fontWeight: 600 }, overViewBoxStyles]}>NIFTY BANK</Animated.Text>
                      <Animated.Text style={[{ fontSize: 18 }, overViewBoxStyles]}>49,800.25</Animated.Text>
                      <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center', paddingTop: 10, paddingLeft: 5 }}>
                          <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+511.35</Animated.Text>
                          <Animated.Text style={[{ fontSize: 11, color: 'green' }, overViewBoxStyles]}>+1.05%</Animated.Text>
                      </View>

                  </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                  <Animated.View style={[overViewBoxStyles, { width: '45%' }]}>
                      <LineChartComponent width={150} />
                  </Animated.View>
                  <Animated.View style={[overViewBoxStyles, { width: '40%' }]}>
                      <LineChartComponent width={150} />
                  </Animated.View>
              </View>
              <Animated.Text style={[overViewBoxStyles, { fontSize: 12, marginTop: -20, color: 'gray', paddingLeft: 20, paddingRight: 20 }]}>* Charts indicate 52 weeks trend</Animated.Text>

              <View style={{ marginTop: 20, height: 0.5, marginLeft: 20, marginRight: 20, backgroundColor: 'gray', opacity: 0.3 }} />

              <View style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 30 }}>
                  <Text style={{ fontWeight: 600 }}>
                      Funds
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{ width: '50%' }}>
                          <Text style={{ color: 'gray' }}>Equity</Text>
                          <Text style={{ fontSize: 18 }}>₹0.30</Text>
                      </View>
                      <View style={{ width: '50%', paddingLeft: 20 }}>
                          <Text style={{ color: 'gray' }}>Commodity</Text>
                          <Text style={{ fontSize: 18 }}>₹0.00</Text>
                      </View>
                  </View>
              </View>

          </Animated.View>
          <Animated.View style={[{ flexDirection: 'column', flex: 1 }, mainBoxStyles, heightIncreaseAnimationStyle]}>
              <Animated.View style={[{ backgroundColor: '#e7e7e7', flexDirection: "row", justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, alignItems: 'center' },headerHeightStyles]}>
                  <Text style={{ fontSize: 25, fontWeight: 600, width: '40%' }}>{screenName}</Text>
                  <FeatureIcon onPress={() => {handleButtonClickOpen()}} name="chevron-down" size={35} />
              </Animated.View>
            {children}
          </Animated.View>
      </>
  )
}

export default DynamicHeader

const styles = StyleSheet.create({})