import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  const lineData = [];
  chartDataList.forEach((item) => {
    const timeList = item.businessDate.split(" ").shift().split("-");
    const day = timeList.pop();
    const month = timeList.pop();
    xData.push(`${Number(month)}月${Number(day)}日`);
    s1Data.push(item.scrapTimeoutQty / item.replenishTimeoutRate);
    s2Data.push(Number(item.scrapTimeoutQty));
    lineData.push(Number(item.replenishTimeoutRate));
  });

  // 绘制图表
  const options = {
    color: ["#00B0F0", '#E92A1D', "#FFBF00"],
    grid: {
      left: 30,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      right: "10%",
      data: ['补板数', '超时数', '超时率'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
      },
      data: xData,
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        // max: 10,
        min: 0,
      },
      {
        type: 'value',
        scale: true,
        max: 1,
        min: 0,
      },
    ],
    series: [
      {
        name: '补板数',
        type: 'bar',
        data: s1Data,
        yAxisIndex: 0,
        barCategoryGap: "60%",
      },
      {
        name: '超时数',
        type: 'bar',
        data: s1Data,
        yAxisIndex: 0,
        barCategoryGap: "60%",
      },
      {
        name: '超时率',
        yAxisIndex: 1,
        type: 'line',
        smooth: true,
        data: lineData,
      },
    ],
  };
  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  }, [...chartDataList]);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const TimeOutChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default TimeOutChartStyle;