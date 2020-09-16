import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartDataList, showType }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  chartDataList.forEach((item) => {
    xData.push(`${parseInt(item.calendarDay.split("-").pop(), 10)}日`);
    s1Data.push(showType === "area" ? item.assistDisqualifiedQty : item.uomDisqualifiedQty);
    const s2 = showType === "area" ? (item.assistDisqualifiedQty / item.assistQty).toFixed(2) : (item.uomDisqualifiedQty / item.uomQty).toFixed(2);
    s2Data.push(s2);
  });
  // 绘制图表
  const options = {
    color: ["#FFC000", "#00B050"],
    grid: {
      left: 40,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      right: "30%",
      data: ['不合格数', '直通率'],
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
      name: '不合格数',
      type: 'bar',
      barCategoryGap: "60%",
      // xAxisIndex: 1,
      yAxisIndex: 0,
      // label: {
      //   show: true,
      //   position: 'inside',
      // },
      data: s1Data,
    },
    {
      name: '直通率',
      yAxisIndex: 1,
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

const PassRateStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default PassRateStyle;