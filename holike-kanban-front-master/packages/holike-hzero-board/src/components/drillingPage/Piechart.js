import React, {useEffect} from "react";
import styled from "styled-components";

const echarts = require("echarts");

const PieChart = ({className, chartId, chartData}) => {
  // 绘制饼图
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      show: false,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          normal: {
            label: { // 此处为指示线文字
              show: true,
              position: 'center', // 标签的位置
              textStyle: {
                fontWeight: 200,
                fontSize: 50, // 文字的字体大小
              },
              formatter(p) { // 指示线对应文字
                return '80%';
              },
            },
            labelLine: { // 指示线状态
              show: true,
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          },
        },
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'},
        ],
      },
    ],
  };


  useEffect(() => {
    const myChart = echarts.init(document.getElementById(`${chartId}`));
    myChart.setOption(options);
  }, chartData);
  return (
    <div>
      <h3 style={{
        color: '#fff',
        'font-weight': 'bold',
        'font-size': '22px',
      }}
      ><div style={{width: "20px", height: "60px", backgroundColor: "#fff"}} />
        123455
      </h3>
      <div
        id={chartId}
        className={className}
      />
    </div>
  );
};

const PieChartStyle = styled(PieChart)`
 &{
   height: 500px;
   width: 100%;
 }
`;

export default PieChartStyle;
