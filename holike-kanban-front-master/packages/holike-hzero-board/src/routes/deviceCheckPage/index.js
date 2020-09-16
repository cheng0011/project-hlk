import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Header, Content } from 'components/Page';
import { filterNullValueObject } from 'utils/utils';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/deviceCheckPage/search";
import HeadTable from "../../components/deviceCheckPage/headTable";
import DetailTable from "../../components/deviceCheckPage/detailTable";
import ExportExcelButton from "../../components/exportButton";

@connect(({ deviceCheck, loading }) => ({
  tableLoading: loading.effects["deviceCheck/fetchDeviceCheck"],
  deviceCheck,
}))
export default class DeviceCheckPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      detailTableData: [],
    };
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
   * 获取是否点检下拉框数据
   */
  @Bind()
  getCheckList() {
    const { dispatch } = this.props;
    dispatch({
      type: "deviceCheck/fetchCheckList",
    });
  }


  /**
   * 获取设备点检报表数据
   * @param {*} params
   */
  @Bind()
  getDeviceCheck(params) {
    const { dispatch } = this.props;
    dispatch({
      type: "deviceCheck/fetchDeviceCheck",
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleClickRow(record) {
    this.setState({
      detailTableData: record.lines,
    });
  }

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const startDate = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const endDate = fieldValues.endDate ? moment(fieldValues.endDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const searchParams = {
      ...fieldValues,
      startDate,
      endDate,
    };
    this.getDeviceCheck(searchParams);
  }

  componentDidMount() {
    this.getCheckList();
  }

  render() {
    const { deviceCheck, tableLoading } = this.props;
    const {
      checkList,
      deviceCheckData,
    } = deviceCheck;
    const searchProps = {
      checkList,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      dataSource: this.state.detailTableData,
    };
    const headProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: deviceCheckData,
      onClick: this.handleClickRow,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "device-check-head-table",
          sheetName: "设备点检查询头表",
        },
        {
          id: "device-check-row-table",
          sheetName: "设备点检查询详情表",
        },
      ],
      excelName: "设备点检查询报表",
    };
    return (
      <Fragment>
        <Header title="设备点检查询">
          <ExportExcelButton {...exportButtonprops} />
        </Header>
        <Content>
          <Search {...searchProps} />
          <HeadTable {...headProps} />
          <DetailTable {...tableProps} />
        </Content>
      </Fragment>
    );
  }
};