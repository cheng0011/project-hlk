import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

const Chart = ({ className, chartId, chartDataList }) => {
  const dataList = chartDataList.map((item) => {
    return [item.businessDate, item.repairTime];
  });
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 30,
      bottom: 20,
      right: 25,
      top: 20,
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.data[0]}： ${params.data[1]}`;
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        // rotate: 40,
      },
    },
    yAxis: {},
    series: [{
      type: 'bar',
      name: "维修时长",
      barCategoryGap: "40%",
      label: {
        show: true,
        position: 'top',
      },
      data: dataList,
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

const RepairTimeChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default RepairTimeChartStyle;