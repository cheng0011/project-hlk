import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Header, Content } from 'components/Page';
import {
  filterNullValueObject,
  // getCurrentUser
} from 'utils/utils';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/deviceMaintainPage/search";
import HeadTable from "../../components/deviceMaintainPage/headTable";
import DetailTable from "../../components/deviceMaintainPage/detailTable";
import ExportExcelButton from "../../components/exportButton";

// const { loginName } = getCurrentUser();

@connect(({ deviceMaintain, loading }) => ({
  tableLoading: loading.effects["deviceMaintain/fetchDeviceMainTain"],
  deviceMaintain,
}))
export default class DeviceMaintainPage extends Component {
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
   *
   * 获取设备保养报表
   * @param {*} params
   */
  @Bind()
  getDeviceMainTain(params) {
    const { dispatch } = this.props;
    dispatch({
      type: "deviceMaintain/fetchDeviceMainTain",
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

    const startDate = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const endDate = fieldValues.endDate ? moment(fieldValues.endDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const searchParams = {
      ...fieldValues,
      startDate,
      endDate,
    };
    this.getDeviceMainTain(searchParams);
  }

  @Bind()
  handleClick(record) {
    this.setState({
      detailTableData: record.lines,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取状态下拉框数据
    dispatch({
      type: "deviceMaintain/fetchStatus",
    });
  }

  render() {
    const { deviceMaintain, tableLoading } = this.props;
    const {
      status,
      deviceData,
    } = deviceMaintain;
    const searchProps = {
      status,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      dataSource: this.state.detailTableData,
    };
    const headProps = {
      onClick: this.handleClick,
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: deviceData,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "device-maintain-head-table",
          sheetName: "设备保养查询头表",
        },
        {
          id: "device-maintain-row-table",
          sheetName: "设备保养查询详情表",
        },
      ],
      excelName: "设备保养查询报表",
    };
    return (
      <Fragment>
        <Header title="设备保养查询">
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