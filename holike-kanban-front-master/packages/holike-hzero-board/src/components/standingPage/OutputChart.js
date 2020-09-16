import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList, showType }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  const lineData= [];
  chartDataList.forEach((item) => {
    // 实际产量
    const temp1 = showType === "area" ? Number(item.assistQty) : Number(item.uomQty);
    // 目标产量
    const temp2 = showType === "area" ? Number(item.hourAssistQty) : Number(item.hourUomQty);
    xData.push(`${item.outputTime.split(" ").pop()}:00`);
    s1Data.push(temp1);
    s2Data.push(temp2);
    lineData.push((temp1/temp2).toFixed(3));
  });

  // 绘制图表
  const options = {
    color: ["#B41C93", '#00B0F0', "#00B050"],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      right: "10%",
      data: ['实际产量', '目标产量', '完成率'],
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
        min: 0,
      },
    ],
    series: [
      {
        name: '目标产量',
        type: 'bar',
        // stack: '产量',
        data: s2Data,
        yAxisIndex: 0,
        barCategoryGap: "60%",
        barGap: "-100%",
      },
      {
        name: '实际产量',
        type: 'bar',
        // stack: '产量',
        data: s1Data,
        yAxisIndex: 0,
        barCategoryGap: "60%",
        barGap: "-100%",
      },
      {
        name: '完成率',
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
  }, [...chartDataList, showType]);
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