import React, {Component, Fragment} from "react";
import {filterNullValueObject} from 'utils/utils';
import {Bind} from 'lodash-decorators';
import {Button, Row, Col} from "hzero-ui";
import {Header, Content} from 'components/Page';
import {isUndefined} from 'lodash';
import moment from 'moment';
import {connect} from 'dva';
import ExportJsonExcel from "js-export-excel";
import OrderTable from "../../components/doorPlankProducePage/OrderTable";
import Search from "../../components/doorPlankProducePage/search";
import SuppliesChart from "../../components/doorPlankProducePage/SuppliesChart";
import holikeLoading from "../../components/holikeLoading";

@connect(({doorPlankProduce, loading}) => ({
  headTableLoading: loading.effects["doorPlankProduce/fetchData"],
  doorPlankProduce,
}))
export default class DoorPlankProducePage extends Component {
  form;

  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 获取工序
   */
  @Bind()
  getOpType() {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankProduce/fetchOpType',
    });
  }

  /**
   * 获取表格数据
   * @param {*} params
   */
  @Bind()
  getHeadData(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankProduce/fetchData',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 获取进度条数据
   * @param {*} params
   */
  @Bind()
  getEchartsData(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankProduce/fetchEchartsData',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 导出数据
   */
  @Bind()
  downloadExcel() {
    const {doorPlankProduce: {headData}} = this.props;
    const data1 = headData || '';// 头表格数据
    const option1 = {};
    const dataTable1 = [];
    if (data1) {
      for (const i of data1) {
        const obj = {
          "门型": i.meaning,
          "下单量": i.dayQuantity,
          "单数": i.dayOrderNum,
          "完成": i.dayComplete,
          "月下单量": i.monthQuantity,
          "月单数": i.monthOrderNum,
          "月完成量": i.monthComplete,
          "月车间遗留": i.monthLeaveOver,
        };
        dataTable1.push(obj);
      }
    }
    option1.fileName = '门板车间订单进度';
    option1.datas = [
      {
        sheetData: dataTable1,
        sheetName: 'sheet',
        sheetFilter: ["门型", "下单量", "单数", "完成", "月下单量", "月单数", "月完成量", "月车间遗留"],
        sheetHeader: ["门型", "下单量", "单数", "完成", "月下单量", "月单数", "月完成量", "月车间遗留"],
      },
    ];
    const toExcel1 = new ExportJsonExcel(option1);
    toExcel1.saveExcel();
  }


  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const startDate = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD') : null;
    const searchParams = {
      ...fieldValues,
      startDate,
    };

    if (startDate != null) {
      this.getHeadData(searchParams);
    }
    if (searchParams.batchNoListText !== undefined) {
      this.props.doorPlankProduce.batchNoListText = searchParams.batchNoListText;
      this.getEchartsData(searchParams);
    }
  }

  componentDidMount() {
    this.getOpType();
  }

  render() {
    const {doorPlankProduce, headTableLoading} = this.props;
    const {
      opType, // 工序
      headData, // 表格数据
      echartsData, // echartsData数据
      batchNoListText, // 批次号
    } = doorPlankProduce;
    const searchProps = {
      opType,
      dispatch: this.props.dispatch,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const headTableProps = {
      loading: {spinning: !!headTableLoading, indicator: holikeLoading},
      dataSource: headData,
    };
    return (
      <Fragment>
        <Header title="门板车间订单进度">
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
          <Row>
            <Col span={24}>
              <OrderTable {...headTableProps} />
            </Col>
            <Col span={24}>{echartsData !== undefined && echartsData.length > 0 && (
              <SuppliesChart chartId="supplies" chartDataList={echartsData} batchNoListText={batchNoListText} />
            )}
            </Col>
          </Row>
        </Content>
      </Fragment>
    );
  }
};
