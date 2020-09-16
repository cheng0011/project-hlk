import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Header, Content } from 'components/Page';
import {
  filterNullValueObject,
} from 'utils/utils';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/autoPackingPage/search";
import DetailTable from "../../components/autoPackingPage/detailTable";
import ExportExcelButton from "../../components/exportButton";


@connect(({ autoPacking, loading }) => ({
  tableLoading: loading.effects["autoPacking/fetchAutoPacking"],
  autoPacking,
}))
export default class AutoPackingPage extends Component {
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
   * 获取工厂下拉框数据
   */
  @Bind()
  getPlant() {
    const { dispatch } = this.props;
    dispatch({
      type: "autoPacking/fetchPlant",
    });
  }

  /**
   * 获取订单服务类型下拉框数据
   */
  @Bind()
  getOrderServiceType() {
    const { dispatch } = this.props;
    dispatch({
      type: "autoPacking/fetchOrderServiceType",
    });
  }

  /**
   * 获取自动包装报表数据
   * @param {*} params
   */
  @Bind()
  getAutoPacking(params) {
    const { dispatch } = this.props;
    dispatch({
      type: "autoPacking/fetchAutoPacking",
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
    const startDeliveryDate = fieldValues.startDeliveryDate ? moment(fieldValues.startDeliveryDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const endDeliveryDate = fieldValues.endDeliveryDate ? moment(fieldValues.endDeliveryDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const orderCreationDateFrom = fieldValues.orderCreationDateFrom ? moment(fieldValues.orderCreationDateFrom).format('YYYY-MM-DD HH:mm:ss') : null;
    const orderCreationDateTo = fieldValues.orderCreationDateTo ? moment(fieldValues.orderCreationDateTo).format('YYYY-MM-DD HH:mm:ss') : null;
    const batchCreationDateFrom = fieldValues.batchCreationDateFrom ? moment(fieldValues.batchCreationDateFrom).format('YYYY-MM-DD HH:mm:ss') : null;
    const batchCreationDateTo = fieldValues.batchCreationDateTo ? moment(fieldValues.batchCreationDateTo).format('YYYY-MM-DD HH:mm:ss') : null;
    const auditDateTimeFrom = fieldValues.auditDateTimeFrom ? moment(fieldValues.auditDateTimeFrom).format('YYYY-MM-DD HH:mm:ss') : null;
    const auditDateTimeTo = fieldValues.auditDateTimeTo ? moment(fieldValues.auditDateTimeTo).format('YYYY-MM-DD HH:mm:ss') : null;
    const batchOrderNoList = fieldValues.batchOrderNoList ? fieldValues.batchOrderNoList.split("\n") : null;
    const originalPoList = fieldValues.originalPoList ? fieldValues.originalPoList.split("\n") : null;
    const dealerNameList = fieldValues.dealerNameList ? fieldValues.dealerNameList.split("\n") : null;
    const searchParams = {
      ...fieldValues,
      startDeliveryDate,
      endDeliveryDate,
      orderCreationDateFrom,
      orderCreationDateTo,
      batchCreationDateFrom,
      batchCreationDateTo,
      auditDateTimeFrom,
      auditDateTimeTo,
      batchOrderNoList,
      originalPoList,
      dealerNameList,
    };
    this.getAutoPacking(searchParams);
  }

  componentDidMount() {
    this.getOrderServiceType();
    this.getPlant();
  }

  render() {
    const { autoPacking, tableLoading } = this.props;
    const {
      orderServiceType,
      plant,
      autoPackingData,
    } = autoPacking;
    const searchProps = {
      orderServiceType,
      plant,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: autoPackingData,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "auto-packing-table",
          sheetName: "自动包装订单子订单包装数量统计",
        },
      ],
      excelName: "自动包装订单子订单包装数量统计报表",
    };
    return (
      <Fragment>
        <Header title="自动包装订单子订单包装数量统计">
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