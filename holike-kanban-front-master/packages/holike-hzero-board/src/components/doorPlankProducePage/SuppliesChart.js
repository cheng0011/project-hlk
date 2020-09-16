import React, {useEffect} from "react";
import styled from "styled-components";

const echarts = require('echarts');

const Chart = ({className, chartId, chartDataList, batchNoListText}) => {
  // {meaning: "排钻", additionCode: "小板", sumQuantity: 229, completeQuantity: 10}
  const yAxisData = [];
  const sumQuantity = [];
  const completeQuantity = [];
  let meaning;
  let sum = 0;
  let complete = 0;
  for (const item of chartDataList) {
    if (item.meaning !== meaning && yAxisData.length > 0) {
      yAxisData.push(`${meaning}${(complete / sum*100).toFixed(1)}%-------------------------`);
      sumQuantity.push(sum);
      completeQuantity.push(complete);
      sum = 0;
      complete = 0;
    }
    meaning = item.meaning;
    sum += item.sumQuantity;
    complete += item.completeQuantity;
    yAxisData.push(`${item.additionCode+(item.completeQuantity/item.sumQuantity*100).toFixed(1)}%`);
    sumQuantity.push(item.sumQuantity);
    completeQuantity.push(item.completeQuantity);
  }
  if (yAxisData.length > 0) {
    yAxisData.push(`${meaning}${(complete / sum*100).toFixed(1)}%-------------------------`);
    sumQuantity.push(sum);
    completeQuantity.push(complete);
  }
  const options = {
    title: {
      text: batchNoListText,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['完', '计'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [{
      type: 'value',
      boundaryGap: [0, 0.01],
    }],
    yAxis: [{
      type: 'category',
      data: yAxisData,
      axisLabel: {
        align: "right",
        margin: 10,
        fontWeight: 'bold',
        fontSize: 14,
      },
    }],
    series: [
      {
        name: '计',
        type: 'bar',
        barWidth: 22,
        itemStyle: {
          normal: {
            color: '#2f4554',
          },
        },
        data: sumQuantity,
      },
      {
        name: '完',
        type: 'bar',
        barWidth: 22,
        itemStyle: {
          normal: {
            color: '#c23531',
          },
        },
        barGap: '-100%',
        data: completeQuantity,
      },
    ],
  };

  function initChart() {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
    const autoHeight = yAxisData.length * 50 + 100; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
    myChart.resize({height: autoHeight});
  }

  useEffect(() => {
    initChart();
  });
  return (
    <div
      id={chartId}
      className={className}
    />
  );
};

const SuppliesChartStyle = styled(Chart)`
 &{
   height: 800px;
 }
`;

export default SuppliesChartStyle;
