import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  chartDataList.forEach((item) => {
    xData.push(item.workShopDesc);
    s1Data.push(item.absenteeismNum);
    s2Data.push(item.attendanceNum);
  });
  // 绘制图表
  const options = {
    color: ['#3E70CA', "#ED7A2C"],
    grid: {
      left: 35,
      bottom: 20,
      right: 25,
    },
    title: {
      text: "各车间当班次人员考勤",
      top: "5%",
      textStyle: {
        fontWeight: "lighter",
      },
      left: "center",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
      },
      data: xData,
    },
    yAxis: [{
      type: 'value',
    }],
    series: [
      {
        name: '缺勤人数',
        type: 'bar',
        stack: '考勤',
        data: s1Data,
      },
      {
        name: '出勤人数',
        type: 'bar',
        stack: '考勤',
        data: s2Data,
      },
    ],
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