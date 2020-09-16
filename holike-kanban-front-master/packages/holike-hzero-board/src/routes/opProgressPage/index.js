import React, { Component, Fragment } from "react";
import { message, Modal, Spin, Button } from "hzero-ui";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import { filterNullValueObject } from 'utils/utils';
import ExportJsonExcel from 'js-export-excel';
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/opProgressPage/search";
import DetailTable from "../../components/opProgressPage/detailTable";

const echarts = require("echarts");

@connect(({ opProgress, loading }) => ({
  detailLoading: loading.effects["opProgress/fetchOpWorkSchedule"],
  chartModalLoading: loading.effects["opProgress/selectOneRow"],
  opProgress,
}))
export default class opProgressPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      showChartModal: false,
      type: null,
      dimension: null,
    };
  }

  /**
   * 获取工序加工进度数据
   * @param {*} params
   */
  @Bind()
  getOpWorkSchedule(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'opProgress/fetchOpWorkSchedule',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 设置Form
   * @param {object} ref - Search组件引用
   */
  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 导出数据
   */
  @Bind()
  downloadExcel() {
    const { opProgress: { opWorkScheduleData } } = this.props;
    const data = opWorkScheduleData || '';// 详情表格数据
    const option = {};
    const dataTable = [];
    if (data) {
      for (const i in data) {
        if (data) {
          const obj = {
            "批次号": data[i].batchOrderNo,
            "分拣号": data[i].sortingNumber,
            "子订单号": data[i].parentMakeOrderNo,
            "PO": data[i].po,
            "工序": data[i].opDesc,
            "板件数": data[i].boardQty,
            "完工数": data[i].completeQty,
            "未完工数": data[i].unCompleteQty,
            "完工率": data[i].completeRate,
            "异常率": data[i].errorRate,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '工序加工进度监控报表';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ["批次号", "分拣号", "子订单号", "PO", "工序", "板件数", "完工数", "未完工数", "完工率", "异常率"],
        sheetHeader: ["批次号", "分拣号", "子订单号", "PO", "工序", "板件数", "完工数", "未完工数", "完工率", "异常率"],
      },
    ];

    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  /**
   * 渲染柱状图图表
   * @param {*} dom
   */
  @Bind()
  renderChart(dom, chartDataList, batchOrderNo) {
    const xData = [];
    const s1Data = [];
    const s2Data = [];
    chartDataList.forEach((item) => {
      xData.push(item.opDesc);
      s1Data.push(item.completeQty);
      s2Data.push(item.unCompleteQty);
    });
    // 绘制图表
    const options = {
      color: ['#3F81C2', '#D04648'],
      grid: {
        left: 40,
        bottom: 20,
        right: 25,
        toprenderChart: 30,
      },
      title: {
        text: `批次号: ${batchOrderNo}`,
        top: "3%",
        textStyle: {
          fontWeight: "normal",
        },
        left: "center",
      },
      legend: {
        orient: 'vertical',
        right: 20,
        show: true,
        data: ['完工数', '未完工数'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          interval: 0,
          // rotate: 40,
        },
      },
      yAxis: [
        {
          type: 'value',
          scale: true,
          min: 0,
        },
      ],
      series: [{
        name: '完工数',
        type: 'bar',
        barCategoryGap: "60%",
        label: {
          show: true,
          position: 'inside',
        },
        data: s1Data,
      },
      {
        name: '未完工数',
        type: 'bar',
        label: {
          show: true,
          position: 'inside',
        },
        data: s2Data,
      }],
    };
    const myChart = echarts.init(dom);
    myChart.setOption(options);
  }

  /**
   * 点击表的每一行
   * @param {*} record
   */
  @Bind()
  handleClickRow(record) {
    const { type, dimension } = this.state;
    const { batchOrderNo, parentMakeOrderNo } = record;
    // console.log(record);
    const params = {
      type,
      dimension,
      batchOrderNoList: batchOrderNo,
      pmoNo: parentMakeOrderNo,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'opProgress/selectOneRow',
      payload: {
        ...params,
      },
    }).then(res => {
      new Promise((resolve) => {
        this.setState({
          showChartModal: true,
        });
        resolve(true);
      }).then(
        (result) => {
          if (result) {
            this.renderChart(document.getElementById("chartModal"), res, batchOrderNo);
          }
        }
      );
    });
  }

  @Bind()
  handleCloseModal() {
    this.setState({
      showChartModal: false,
    });
  }

  // 查询
  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const batchFormList = fieldValues.batchOrderNoList ? fieldValues.batchOrderNoList.split("\n") : null;
    const { type, dimension } = fieldValues;
    this.setState({
      type,
      dimension,
    });

    const searchParams = {
      ...fieldValues,
      batchOrderNoList: batchFormList,
    };
    if (fieldValues.batchOrderNoList) {
      this.getOpWorkSchedule(searchParams);
    } else {
      message.info("批次号不能为空");
    }

  }

  render() {
    const { opProgress, detailLoading, chartModalLoading } = this.props;
    const { opWorkScheduleData } = opProgress;
    const searchProps = {
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableDetailProps = {
      onClick: this.handleClickRow,
      loading: { spinning: !!detailLoading, indicator: holikeLoading },
      dataSource: opWorkScheduleData,
    };
    return (
      <Fragment>
        <Header title="工序加工进度监控报表">
          <Button
            onClick={this.downloadExcel}
            style={{
              borderColor: "#03A134",
              backgroundColor: "#03A134",
            }}
            type="primary"
          >
            导出
          </Button>
        </Header>
        <Content>
          <Search {...searchProps} />
          <Spin
            spinning={!!chartModalLoading}
          >
            <DetailTable {...tableDetailProps} />
            <Modal
              visible={this.state.showChartModal}
              footer={null}
              onCancel={this.handleCloseModal}
            >
              <div id="chartModal" style={{ width: "500px", height: "250px" }} />
            </Modal>
          </Spin>
        </Content>
      </Fragment>
    );
  }
};