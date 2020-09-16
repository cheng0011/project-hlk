import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { filterNullValueObject } from 'utils/utils';
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/batchOrderPage/search";
import DetailTable from "../../components/batchOrderPage/detailTable";
import ExportExcelButton from "../../components/exportButton";

@connect(({ batchOrder, loading }) => ({
  tableLoading: loading.effects["batchOrder/fetchMainData"],
  batchOrder,
}))
export default class BatchOrderPage extends Component {
  form;

  /**
   * 设置Form
   * @param {object} ref - Search组件引用
   */
  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 获取工厂列表
   */
  @Bind()
  getPlant() {
    const { dispatch } = this.props;
    dispatch({
      type: "batchOrder/fetchPlant",
    });
  }

  /**
   * 获取车间列表
   * @param {*} plantId
   */
  @Bind()
  getWorkShop(plantId) {
    const { dispatch } = this.props;
    dispatch({
      type: "batchOrder/fetchWorkShop",
      payload: {
        plantId,
      },
    });
  }

  /**
   * 获取产线列表
   * @param {*} plantId
   * @param {*} workShopId
   */
  @Bind()
  getProdLine(plantId, workshopId) {
    const { dispatch } = this.props;
    dispatch({
      type: "batchOrder/fetchProdLine",
      payload: {
        plantId,
        workshopId,
      },
    });
  }

  /**
   * 获取报表数据
   * @param {*} params
   */
  @Bind()
  getMainData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: "batchOrder/fetchMainData",
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const creationDateFrom = fieldValues.creationDateFrom ? moment(fieldValues.creationDateFrom).format('YYYY-MM-DD HH:mm:ss') : null;
    const creationDateTo = fieldValues.creationDateTo ? moment(fieldValues.creationDateTo).format('YYYY-MM-DD HH:mm:ss') : null;
    const searchParams = {
      ...fieldValues,
      creationDateFrom,
      creationDateTo,
      // creationDateFrom: "2020-03-12 11:19:15",
      // creationDateTo: "2020-03-12 11:19:17",
    };
    this.getMainData(searchParams);
  }


  /**
   * 选择工厂
   * @param {*} plantId
   */
  @Bind()
  handleSelectPlant(plantId) {
    this.getWorkShop(plantId);
  }


  /**
   * 选择车间
   * @param {*} plantId
   * @param {*} workShopId
   */
  @Bind()
  handleSelectWorkShop(plantId, workShopId) {
    this.getProdLine(plantId, workShopId);
  }

  componentDidMount() {
    this.getPlant();
  }

  render() {
    const { batchOrder, tableLoading } = this.props;
    const {
      plant,
      workShop,
      prodLine,
    } = batchOrder;
    const searchProps = {
      plant,
      workShop,
      prodLine,
      selectPlant: this.handleSelectPlant,
      selectWorkShop: this.handleSelectWorkShop,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      // 待开发
      dataSource: [],
    };
    const exportButtonprops = {
      tables: [
        {
          id: "batch-order-table",
          sheetName: "批次订单标准工时计算明细表",
        },
      ],
      excelName: "批次订单标准工时计算明细报表",
    };
    return (
      <Fragment>
        <Header title="批次订单标准工时计算明细">
          <ExportExcelButton {...exportButtonprops} />
        </Header>
        <Content>
          <Search {...searchProps} />
          <DetailTable {...tableProps} />
        </Content>
      </Fragment>
    );
  }
};