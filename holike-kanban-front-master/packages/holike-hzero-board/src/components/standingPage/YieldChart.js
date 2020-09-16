import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList, showType }) => {
  const xData = [];
  const legendData = [];
  const seriesData = [];
  const lineData = [];
  const x = Object.entries(chartDataList[0]).filter((item) => item[0] !== "shiftDesc");
  x[0][1].forEach((item) => {
    seriesData.push({
      name: item.ngReasonDesc,
      type: 'bar',
      stack: '不良品',
      data: [],
      yAxisIndex: 0,
      barCategoryGap: "60%",
    });

    legendData.push(item.ngReasonDesc);
  });
  chartDataList.forEach((item) => {
    const temp = Object.entries(item).filter((i) => i[0] !== "shiftDesc");
    xData.push(`${parseInt(temp[0][0].split("-").pop(), 10)}日${item.shiftDesc}班`);
    // 不良数
    let tempShiftDisqualifiedQty = 0;
    // 总数
    let total = 0;
    temp[0][1].forEach((i, index) => {
      const xx = showType === "area" ? Number(i.assistShiftDisqualifiedQty) : Number(i.uomShiftDisqualifiedQty);
      if(seriesData[index]){
        seriesData[index].data.push(xx);
      }
      tempShiftDisqualifiedQty += xx;
      total = showType === "area" ? Number(i.assistShiftOutput) : Number(i.uomShiftOutput);
    });
    total = total === 0 ? 0 : ((total - tempShiftDisqualifiedQty) / total).toFixed(3);
    lineData.push(total);
  });

  // 绘制图表
  const options = {
    color: ['#00B0F0', "#FFC000"],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
      top: 30,
    },
    legend: {
      show: true,
      right: "30%",
      data: [...legendData, '良品率'],
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
      // data: ["11日白班", "10日晚班", "10日白班", "9日晚班", "9日白班", "8日晚班", "8日白班"],
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
        max: 1,
        min: 0,
      },
    ],
    series: [
      ...seriesData,
      {
        name: '良品率',
        yAxisIndex: 1,
        color: "#00B050",
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

const YieldChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default YieldChartStyle;
