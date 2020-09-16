import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartDataList }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  chartDataList.forEach((item) => {
    xData.push(item.businessDate);
    s1Data.push(item.failureFrequency);
    s2Data.push(item.repair_rate.toFixed(2));
  });
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 30,
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.seriesName}： ${params.data}`;
      },
    },
    legend: {
      data: ['设备故障次数', '故障率'],
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        interval: 0,
        // rotate: 40,
      },
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        // max: 10,
        // min: 0,
        boundaryGap: [0, 2],
      },
      {
        type: 'value',
        scale: true,
        max: 1,
        min: 0,
        boundaryGap: [0, 0.2],
      },
    ],
    series: [{
      name: '设备故障次数',
      type: 'bar',
      // xAxisIndex: 1,
      yAxisIndex: 0,
      color: "#3E70CA",
      label: {
        show: true,
        position: 'inside',
      },
      data: s1Data,
    },
    {
      name: '故障率',
      yAxisIndex: 1,
      color: "#ED7A2C",
      type: 'line',
      label: {
        show: true,
        position: 'top',
      },
      data: s2Data,
    }],
  };
  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  }, chartDataList);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const OutputChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default OutputChartStyle;
