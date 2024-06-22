import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';



const BasketTab = ({scrollOffsetY}:{scrollOffsetY:any}) => {

    const scrollHandler = useAnimatedScrollHandler((event) => {

        scrollOffsetY.value = event.contentOffset.y;

    });

  return (
      <Animated.ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
          scrollEventThrottle={20}
          onScroll={scrollHandler} showsVerticalScrollIndicator={false}>
          <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', columnGap: 15 }}>
                  <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />

              </View>
              <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>

                  <FeatherIcon name="plus" size={15} color="#0484f7" />
                  <Text style={{ fontSize: 12, color: "#0484f7" }}>
                      New basket
                  </Text>
              </View>
          </View>
      </Animated.ScrollView>
  )
}

export default BasketTab