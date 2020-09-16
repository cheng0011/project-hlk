import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartData }) => {
  // const chartData = {
  //   "xxx": [
  //     {
  //       workShopDesc: "xxx",
  //       uomQty: 2,
  //       summaryTime: "DAY",
  //     },
  //     {
  //       workShopDesc: "xxx",
  //       uomQty: 3,
  //       summaryTime: "WEEK",
  //     },
  //     {
  //       workShopDesc: "xxx",
  //       uomQty: 5,
  //       summaryTime: "MONTH",
  //     },
  //   ],
  // };
  const xData = [];
  const legendData = [];
  const seriesData = [];
  Object.entries(chartData)[0][1].forEach(item => {
    let sName = "";
    switch (item.summaryTime) {
      case "DAY":
        sName = "日补板";
        break;
      case "WEEK":
        sName = "周补板";
        break;
      case "MONTH":
        sName = "月补板";
        break;
      default:
        break;
    }
    legendData.push(sName);
    seriesData.push({
      name: sName,
      type: 'bar',
      data: [],
      barCategoryGap: "60%",
    });
  });
  Object.entries(chartData).forEach((item) => {
    xData.push(item[0]);
    item[1].forEach((i, index) => {
      seriesData[index].data.push(i.uomQty);
    });
  });

  // 绘制图表
  const options = {
    color: ['#00B0F0', "#FFC000", "#00B050"],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 35,
    },
    title: {
      text: "各车间补板数量统计",
      top: "3%",
      textStyle: {
        fontWeight: "lighter",
      },
      left: "center",
    },
    legend: {
      show: true,
      top: 5,
      right: 0,
      data: legendData,
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
    ],
    series: seriesData,
  };
  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  }, Object.entries(chartData));
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