import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require("echarts");

const PieChart = ({ className, chartId, chartData }) => {
  // 绘制饼图
  const options = {
    color: ["#E97C30", '#5A99D3'],
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.name}： ${params.value}`;
      },
    },
    legend: {
      show: true,
      right: 10,
      top: "40%",
      orient: 'vertical',
      data: ['报修设备', '正常设备'],
    },
    series: [{
      type: 'pie',
      // radius: '55%',
      hoverOffset: 0,
      // center: ['40%', '50%'],
      label: {
        show: true,
        position: 'inside',
        formatter: '{c}',
      },
      data: [{ name: "报修设备", value: chartData[0].eqNoUsing }, { name: "正常设备", value: chartData[0].eqAll-chartData[0].eqNoUsing }],
    }],
  };



  useEffect(() => {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
  myChart.setOption(options);
  }, chartData);
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const PieChartStyle = styled(PieChart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default PieChartStyle;
