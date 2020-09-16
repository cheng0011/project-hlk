import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({ className, chartId, chartDataList }) => {
  const dataList = chartDataList.map((item) => {
    return [item.workShopDesc, item.passRate];
  });
  // const datas = [[1, 2], [2, 2], [3, 4]];
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 25,
      bottom: 20,
      right: 25,
    },
    title: {
      text: "各车间本日制程一次合格率",
      top: "5%",
      textStyle: {
        fontWeight: "lighter",
      },
      left: "center",
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.seriesName}： ${params.data[1]}`;
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {},
    series: [{
      type: 'bar',
      name: "合格率",
      barCategoryGap: "60%",
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

const QualityChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default QualityChartStyle;