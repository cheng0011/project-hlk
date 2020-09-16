import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  const xDataList = [];
  const sDataList = [];
  chartDataList.forEach((item) => {
    xDataList.push(`${parseInt(item.calendarDay.split("-").pop(), 10)}日${item.shiftDesc}班`);
    sDataList.push(item.attendanceNum);
  });
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 10,
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
      data: xDataList,
    },
    yAxis: {},
    series: [{
      type: 'bar',
      name: "出勤人数",
      barCategoryGap: "60%",
      // data: [30, 28, 32, 29, 27, 31, 35],
      data: sDataList,
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

const AttentionChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default AttentionChartStyle;
