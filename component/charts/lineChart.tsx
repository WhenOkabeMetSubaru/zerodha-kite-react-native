import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-gifted-charts';

const LineChartComponent = ({ width = 100, height = 70 }) => {
    const chartDummyData = [{ value: 15 }, { value: 24 }, { value: 26 }, { value: 35 }, { value: 20 }, { value: 45 }, { value: 45 }, { value: 60 }, { value: 50 },{value:30},{value:30},{value:40}];
    return (
        <LineChart
            data={chartDummyData}
            width={width}
            height={height}
            textFontSize1={10}
            hideDataPoints1
            spacing={14}
            color="#3a91f2"
            thickness={1.4}
            hideYAxisText
            hideRules
            hideAxesAndRules
        />
    )
}

export default LineChartComponent