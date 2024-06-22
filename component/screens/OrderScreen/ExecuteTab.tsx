import { View, Text } from 'react-native'
import React from 'react'
import { CircleSpecial } from '../../extra/circleSpecial';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypeIcon from 'react-native-vector-icons/Entypo'
import { orderColors } from '../../../app/constants/colors';
import { orderScreenButtonName } from '../../../app/constants/buttonNames';
import { orderScreenFlags } from '../../../app/constants/flagsAndChecks';
import { HANDLE_ORDER_STATUS_FUNC_PROPS, orderStatusPrimary, orderTypePrimary } from '../../../app/types/order';
import { handleOrderType, handleStatusChange } from './extraOrderData';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';


const ExecuteTab = ({scrollOffsetY}:{scrollOffsetY:any}) => {

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
                  <EntypeIcon name="sound-mix" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
              </View>
              <View style={{ flexDirection: 'row', columnGap: 6, alignItems: 'center' }}>
                  <FeatherIcon name="file-text" size={15} color="#0484f7" style={{ opacity: 0.4 }} />
                  <Text style={{ fontSize: 12, color: "#0484f7", opacity: 0.5 }}>
                      Contract note
                  </Text>
                  <CircleSpecial />
                  <Text style={{ fontSize: 12, color: "#0484f7" }}>
                      Tradebook
                  </Text>
              </View>
          </View>

          <PortfolioScreenPositionDetails name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails order_type="sell" order_status="completed" name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails order_type="sell" order_status="completed" name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails order_type="sell" order_status="completed" name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />

          <PortfolioScreenPositionDetails name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
          <PortfolioScreenPositionDetails order_type="sell" order_status="completed" name='BANK NIFTY 19th JUNE 50600 CE' ltp='225.3' />
      </Animated.ScrollView>
  )
}

export default ExecuteTab


const PortfolioScreenPositionDetails = ({ name = "", ltp = "",order_type=orderScreenFlags.BUY_ORDER,order_status= orderScreenFlags.COMPLETED }:{name?:string,ltp?:string,order_type?:orderTypePrimary,order_status?:orderStatusPrimary}) => {


    let statusData:HANDLE_ORDER_STATUS_FUNC_PROPS = handleStatusChange(order_status);
    let orderTypeData:HANDLE_ORDER_STATUS_FUNC_PROPS = handleOrderType(order_type);

    return (
        <View>
            <View style={{ height: 115, borderBottomWidth: 0.7, borderBottomColor: '#e7e7e7', paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, backgroundColor: orderTypeData?.BACKGROUND_COLOR, borderRadius: 1 }}>
                            <Text style={{ fontSize: 12, color: orderTypeData?.TEXT_COLOR }}>
                                {orderTypeData?.BUTTON_TITLE}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12 }}>
                            900/900
                        </Text>
                        {/* <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, backgroundColor: '#daf3f7', borderRadius: 1 }}>
                            <Text style={{ fontSize: 12, color: '#0076c8' }}>SELL</Text>
                        </View> */}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', columnGap: 1 }}>
                        <View style={{ flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
                            <FeatherIcon name='clock' style={{ opacity: 0.4 }} />
                            <Text style={{ opacity: 0.4, fontSize: 12, fontWeight: 600, minWidth: 60 }}>13:19:06</Text>
                        </View>
                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, backgroundColor: statusData?.BACKGROUND_COLOR, borderRadius: 1 }}>
                            <Text style={{ fontSize: 12, color:statusData?.TEXT_COLOR }}>{statusData?.BUTTON_TITLE}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14 }}>{name}</Text>
                    <View style={{ flexDirection: 'row', columnGap: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, opacity: 0.4 }}>Avg.</Text>
                        <Text style={{ fontSize: 13 }}>179.82</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: "space-between", alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, opacity: 0.35, fontWeight: 500, minWidth: 50 }}>NFO</Text>

                    </View>

                    <View style={{ flexDirection: 'row', columnGap: 3 }}>
                        <Text style={{ fontSize: 12, opacity: 0.35, fontWeight: 500 }}>MIS</Text>
                        <Text style={{ fontSize: 12, opacity: 0.35, fontWeight: 500, minWidth: 50 }}>MARKET</Text>

                    </View>

                </View>

            </View>
        </View>

    )
}
