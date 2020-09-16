import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartData, type }) => {
  // const chartData = {
  //   "2020-11-12": 4, "2020-11-13": 5, "2020-11-15": 7, "2020-11-16": 1,
  //   "2020-11-17": 2, "2020-11-18": 7, "2020-11-19": 8, "2020-11-20": 7,
  // };
  const lineParams = ["creationDate", "weekOfMonth", "month"];
  const lineXdata = [];
  const lineData = [];

  if (lineParams.includes(type)) {
    Object.keys(chartData).forEach(item => {
      lineXdata.push(item);
      lineData.push(chartData[item]);
    });
  };

  // 绘制折线图
  const lineOptions = {
    color: ["#00B0F0"],
    grid: {
      left: 30,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      top: 0,
      left: 10,
      orient: 'vertical',
      data: ['异常总数'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      data: lineXdata,
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        min: 0,
      },
    ],
    series: [
      {
        name: '异常总数',
        type: 'line',
        smooth: true,
        data: lineData,
      },
    ],
  };



  useEffect(() => {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(lineOptions);
  }, [chartData]);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const ChartStyle = styled(Chart)`
 &{
   min-height: 320px;
   width: 100%;
 }
`;

export default ChartStyle;