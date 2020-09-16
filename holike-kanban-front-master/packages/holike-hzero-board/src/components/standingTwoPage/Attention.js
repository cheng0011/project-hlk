import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  let xDataList = [];
  const s1DataList = [];
  const s2DataList = [];
  chartDataList.forEach((item) => {
    xDataList.push(item.calendarDay);
    if (item.shiftDesc === "白") {
      s1DataList.push(item.attendanceNum);
    } else if (item.shiftDesc === "晚") {
      s2DataList.push(item.attendanceNum);
    }
  });
  xDataList = Array.from(new Set(xDataList)).map((item) => `${Number(item.split("-").pop())}日`);
  // 绘制图表
  const options = {
    color: ['#3398DB', '#B41C93'],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      right: "10%",
      data: ['白班', '晚班'],
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
      name: "白班",
      barCategoryGap: "60%",
      data: s1DataList,
    },
    {
      type: 'bar',
      name: "晚班",
      barCategoryGap: "60%",
      data: s2DataList,
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