import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId }) => {

  const options = {
    title: {
      text: 'HHY200606013BH',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['完', '计'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: ['竖框', '横框', '木板', '门芯板', '衣通', '导轨'],
    },
    series: [
      {
        name: '完',
        type: 'bar',
        stack: '总量',
        data: [160, 120, 100, 122, 134, 150],
      },
      {
        name: '计',
        type: 'bar',
        stack: '总量',
        data: [200, 300, 235, 342, 234, 456],
      },
    ],
  };

  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  });
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const SuppliesChartStyle = styled(Chart)`
 &{
   height: 500px;
 }
`;

export default SuppliesChartStyle;
