import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

const Chart = ({ className, chartId, chartDataList }) => {
  // 绘制图表
  const options = {
    legend: {},
    tooltip: {},
    grid: {
      left: 30,
      bottom: 50,
      right: 25,
      top: 10,
    },
    dataset: {
      dimensions: [{name: 'TRUE_NAME', displayName: '姓名'}, {name: 'MAINTENANCEORDERS', displayName: '单数'}, {name: 'MAINTENANCETIME', displayName: '维修时长(小时)'}],
      source: chartDataList,
    },
    xAxis: {type: 'category', axisLabel: {
        interval: 0,
        formatter(value) {
          return value.split("").join("\n");
        },
      }},
    yAxis: {},
    series: [
      {type: 'bar', label: {
          show: true,
          position: 'inside',
        }},
      {type: 'bar', label: {
          show: true,
          position: 'inside',
        }},
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

const PauseChartStyle = styled(Chart)`
 &{
   height: calc(100% );
   width: 100%;
 }
`;

export default PauseChartStyle;
