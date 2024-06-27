import { View, Text } from 'react-native'
import React from 'react'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypeIcon from 'react-native-vector-icons/Entypo';

const Ipo = ({ scrollOffsetY }: { scrollOffsetY: any }) => {

    const scrollHandler = useAnimatedScrollHandler((event) => {

        scrollOffsetY.value = event.contentOffset.y;

    });

    return (
        <Animated.ScrollView
            style={{ flex: 1, backgroundColor: 'white' }}
            scrollEventThrottle={20}
            onScroll={scrollHandler} showsVerticalScrollIndicator={false} >
            <View style={{ height: 40, borderBottomWidth: 0.8, borderBottomColor: '#e7e7e7', paddingLeft: 25, paddingRight: 20, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', columnGap: 15 }}>
                    <FeatherIcon name="search" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                    <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                </View>

                <View style={{ flexDirection: 'row', columnGap: 5 }}>
                    <View style={{ width: 70, height: 25, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e7e7e7' }}>
                        <Text style={{ fontSize: 11, color: "#0484f7" }}>Ongoing</Text>

                    </View>
                    <View style={{ width: 70, height: 25, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: "gray" }}>Applied</Text>
                    </View>
                </View>

            </View>
        </Animated.ScrollView>
    )
}

export default Ipo