import React, { useEffect } from "react";
import styled from "styled-components";

const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

const Chart = ({ className, chartId, chartDataList }) => {
  const dataList = chartDataList.map((item) => {
    return [item.userName, item.sumScore, item.scoreLogic];
  });
  // 绘制图表
  const options = {
    color: ['#3398DB'],
    grid: {
      left: 30,
      bottom: 50,
      right: 25,
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        return `${params.data[0]}： ${params.data[2]}`;
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        // 文字竖着显示
          formatter (value) {
            const str = value.split("");
            return str.join("\n");
        },
      },

    },
    yAxis: {},
    series: [{
      type: 'bar',
      name: "维修及时率",
      barCategoryGap: "40%",
      label: {
        show: true,
        position: 'inside',
      },
      // color: ["#f24", "yellow", "blue"],
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

const TimeRateChartStyle = styled(Chart)`
 &{
   height: calc(100% - 40px);
   width: 100%;
 }
`;

export default TimeRateChartStyle;
