import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  const xData = [];
  const s1Data = [];
  const s2Data = [];
  chartDataList.forEach((item) => {
    xData.push(item.workShopDesc);
    s1Data.push(item.completeMaintenanceForm);
    s2Data.push(item.allMaintenanceForm - item.completeMaintenanceForm);
  });

  // 绘制图表
  const options = {
    color: ['#3E70CA', "#ED7A2C"],
    grid: {
      left: 35,
      // bottom: 20,
      right: 25,
    },
    title: {
      text: "各车间当月报修情况统计",
      top: "5%",
      textStyle: {
        fontWeight: "lighter",
      },
      left: "center",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
      data: xData,
    },
    yAxis: [{
      type: 'value',
    }],
    series: [
      {
        name: '已完成维修数量',
        type: 'bar',
        stack: '报修情况',
        data: s1Data,
        barCategoryGap: "60%",
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
        },
      },
      {
        name: '未完成维修数量',
        type: 'bar',
        stack: '报修情况',
        data: s2Data,
        barCategoryGap: "60%",
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
        },
      },
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

const RepairChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default RepairChartStyle;