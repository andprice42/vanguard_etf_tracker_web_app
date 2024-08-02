import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react';

export default memo(function index(data) {
    const chartData = data.data.data.map(item => ({
        name: item.date,
        value: item.close
    }));

    const option = {
        title: {
            text: data.data.name
        },
        xAxis: {
            type: 'category',
            data: chartData.map(item => item.name)
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: chartData.map(item => item.value),
            type: 'bar'
        }]
    };
  return (
    <div>
      <ReactEcharts option={option} style={{ height: '400px' }} />
    </div>
  )
})
