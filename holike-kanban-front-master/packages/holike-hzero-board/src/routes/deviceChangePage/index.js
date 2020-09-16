import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import {
  filterNullValueObject,
  getCurrentUser,
} from 'utils/utils';
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/deviceChangePage/search";
import DetailTable from "../../components/deviceChangePage/detailTable";
import ExportExcelButton from "../../components/exportButton";

const { loginName } = getCurrentUser();

@connect(({ deviceChange, loading }) => ({
  tableLoading: loading.effects["deviceChange/fetchDeviceChange"],
  deviceChange,
}))
export default class DeviceChangePage extends Component {
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
   * 获取默认工厂
   * @param {*} userName // 当前用户名
   */
  @Bind()
  getDefPlantId(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: 'deviceChange/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then((res) => {
      if (res && res.length > 0) {
        this.getPlant();
      }
    });
  }

  /**
   * 获取工厂
   */
  @Bind()
  getPlant() {
    const { dispatch } = this.props;
    dispatch({
      type: 'deviceChange/fetchPlant',
    });
  }

  /**
   * 获取设备更换配件报表数据
   */
  @Bind()
  getDeviceChange(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'deviceChange/fetchDeviceChange',
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
    this.getDeviceChange(searchParams);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
  }

  render() {
    const { deviceChange, tableLoading } = this.props;
    const {
      defPlant,
      plant,
      deviceChangeData,
    } = deviceChange;
    const searchProps = {
      defPlant,
      plant,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: deviceChangeData,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "device-change-table",
          sheetName: "设备更换配件MTBF表",
        },
      ],
      excelName: "设备更换配件MTBF报表",
    };
    return (
      <Fragment>
        <Header title="设备更换配件MTBF">
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