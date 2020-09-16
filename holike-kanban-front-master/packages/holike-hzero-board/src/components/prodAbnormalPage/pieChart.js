import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const Chart = ({ className, chartId, chartData, type }) => {
  const lineParams = ["creationDate", "weekOfMonth", "month"];
  const pieData = [];
  const pieSData = [];
  if (!lineParams.includes(type)) {
    Object.keys(chartData).forEach(item => {
      pieData.push(item);
      pieSData.push({ name: item, value: chartData[item] });
    });
  };

  // 绘制饼图
  const pieOptions = {
    color: ["#0779e4", "#77d8d8", "#4cbbb9", "#eff3c6", "#588da8", "#ccafaf", "#e58a8a", "#d8345f"],
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.name}： ${params.value}小时`;
      },
    },
    legend: {
      show: true,
      left: 10,
      orient: 'vertical',
      data: pieData,
    },
    series: [{
      type: 'pie',
      hoverOffset: 0,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}：{d}%',
      },
      data: pieSData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
  };

  useEffect(() => {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(pieOptions);
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