import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartData }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  let total = 0;
  chartData.forEach((item) => {
    xData.push(item.reason);
    s1Data.push(item.businessQty);
    total = item.businessQty + total;
  });
  s1Data.forEach((item) => {
    s2Data.push((item / total).toFixed(2));
  });
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
    },
    title: {
      text: "本月有效客诉类型统计",
      top: "5%",
      textStyle: {
        fontWeight: "lighter",
      },
      left: "center",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      // formatter(params) {
      //   console.log(params);
      //   return `${params.seriesName}： ${params.data}`;
      // },
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        // max: 10,
        // min: 0,
        boundaryGap: [0.5, 0.5],
      },
      {
        type: 'value',
        scale: true,
        max: 1,
        min: 0,
      },
    ],
    series: [{
      name: '客诉量',
      type: 'bar',
      barCategoryGap: "60%",
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
      name: '客诉率',
      yAxisIndex: 1,
      color: "#ED7A2C",
      type: 'line',
      smooth: true,
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
  }, chartData);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const CustomerChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default CustomerChartStyle;