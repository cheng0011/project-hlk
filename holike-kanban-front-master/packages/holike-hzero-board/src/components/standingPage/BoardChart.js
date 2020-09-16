import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartDataList, showType }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  chartDataList.forEach((item) => {
    xData.push(`${parseInt(item.calendarDay.split("-").pop(), 10)}日${item.shiftDesc}班`);
    s1Data.push(showType === "area" ? item.assistShiftScrapQty : item.uomShiftScrapQty);
    const s2 = showType === "area" ? (item.assistShiftScrapQty / item.assistShiftOutput).toFixed(2) : (item.uomShiftScrapQty / item.uomShiftOutput).toFixed(2);
    s2Data.push(s2);
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
    legend: {
      show: true,
      right: "30%",
      data: ['补板数', '补板率'],
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
        // rotate: 40,
      },
    },
    yAxis: [
      {
        name: showType === "area" ? "平米" : "块",
        nameTextStyle: {
          align: "center",
          fontWeight: "bold",
        },
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
    series: [{
      name: '补板数',
      type: 'bar',
      barCategoryGap: "60%",
      // xAxisIndex: 1,
      yAxisIndex: 0,
      color: "#3E70CA",
      // label: {
      //   show: true,
      //   position: 'inside',
      // },
      data: s1Data,
    },
    {
      name: '补板率',
      yAxisIndex: 1,
      color: "#ED7A2C",
      type: 'line',
      smooth: true,
      // label: {
      //   show: true,
      //   position: 'top',
      // },
      data: s2Data,
    }],
  };
  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  }, [...chartDataList, showType]);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const BoardChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default BoardChartStyle;
