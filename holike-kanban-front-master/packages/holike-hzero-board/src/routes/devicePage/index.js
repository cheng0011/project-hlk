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
import { Modal } from "hzero-ui";

import holikeLoading from "../../components/holikeLoading";
import RepairSearch from "../../components/devicePage/repairSearch";
import Search from "../../components/devicePage/search";
import DetailTable from "../../components/devicePage/detailTable";
import RepairTable from "../../components/devicePage/repairTable";
import ExportExcelButton from "../../components/exportButton";

const { loginName } = getCurrentUser();

@connect(({ device, loading }) => ({
  tableLoading: loading.effects["device/fetchDeviceList"],
  detailLoading: loading.effects["device/fetchDeviceRepair"],
  device,
}))
export default class DevicePage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      modalTitle: "",
      showModal: false,
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
   * 获取默认工厂
   * @param {*} userName // 当前用户名
   */
  @Bind()
  getDefPlantId(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchDefPlantId',
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
      type: 'device/fetchPlant',
    });
  }

  /**
   * 获取设备mtbf报表数据
   * @param
   */
  @Bind()
  getDeviceList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchDeviceList',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 获取设备报修数据
   * @param
   */
  @Bind()
  getDeviceRepair(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchDeviceRepair',
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
    this.getDeviceList(searchParams);
  }


  /**
   * 点击每一行
   * @param {*} record
   */
  @Bind()
  handleClickRow(record) {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const { wd } = fieldValues;
    this.setState({
      modalTitle: `${wd === "sb" ? `${record.equipmentName}设备` : `${record.equipmentGroupName}设备组`}---${record.queryStartTime || ""}-${record.queryEndTime || ""}报修及维修情况`,
      showModal: true,
    });
    const {equipmentGroupId, equipmentId, workcellId, queryStartTime, queryEndTime } = record;
    const params = {
      equipmentGroupId,
      equipmentId,
      workcellId,
      startDate: queryStartTime,
      endDate: queryEndTime,
    };
    this.getDeviceRepair(params);
  }

  // 点报修击查询按钮
  @Bind()
  handleModalSearch(fieldValues) {
    this.getDeviceRepair(fieldValues);
  }

  @Bind()
  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
  }

  render() {
    const { device, tableLoading, detailLoading } = this.props;
    const {
      defPlantIdList,
      plant,
      deviceDataList,
      deviceRepair,
    } = device;
    const searchProps = {
      defPlantIdList,
      plant,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const modalSearchProps = {
      onClickModalSearch: this.handleModalSearch,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: deviceDataList,
      onClick: this.handleClickRow,
    };
    const detailTableProps = {
      loading: { spinning: !!detailLoading, indicator: holikeLoading },
      dataSource: deviceRepair,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "device-table",
          sheetName: "设备MTBF&MTTR表",
        },
      ],
      excelName: "设备MTBF&MTTR报表",
    };
    return (
      <Fragment>
        <Header title="设备MTBF&MTTR">
          <ExportExcelButton {...exportButtonprops} />
        </Header>
        <Content>
          <Search {...searchProps} />
          <DetailTable {...tableProps} />
          <Modal
            title={this.state.modalTitle}
            onCancel={this.handleCloseModal}
            width={1200}
            footer={null}
            visible={this.state.showModal}
          >
            <RepairSearch {...modalSearchProps} />
            <RepairTable {...detailTableProps} />
          </Modal>
        </Content>
      </Fragment>
    );
  }
};
