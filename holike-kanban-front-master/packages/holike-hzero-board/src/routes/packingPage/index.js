import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { filterNullValueObject, getCurrentUser } from 'utils/utils';
import ExportJsonExcel from 'js-export-excel';
import { Button } from "hzero-ui";
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/packingPage/search";
import DetailTable from "../../components/packingPage/DetailTable";

const { loginName } = getCurrentUser();

@connect(({ packing, loading }) => ({
  plantLoading: loading.effects["packing/fetchDefPlantId"],
  tableLoading: loading.effects["packing/fetchPackageReport"],
  packing,
}))
export default class PackingPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      defProdLineList: [],
    };
  }

  /**
   * 获取默认工厂
   * @param {*} userName // 当前用户名
   */
  @Bind()
  getDefPlantId(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: 'packing/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then(res => {
      if (res.length > 0) {
        this.getWorkShop(res[0].def_plant_id);
      }
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(defPlantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'packing/fetchWorkShop',
    }).then(res => {
      if (res.length > 0) {
        this.getProdLine(res.filter(item => item.plantId === Number(defPlantId))[0]);
      }
    });
  }

  /**
   * 获取产线
   */
  @Bind()
  getProdLine(firstWorkShop) {
    const { dispatch } = this.props;
    dispatch({
      type: 'packing/fetchProdLine',
    }).then(res => {
      this.setState({
        defProdLineList: res.filter((item) => item.workShopId === firstWorkShop.workShopId),
      });
    });
  }

  @Bind()
  getPackageReport(workShopId, po, childNo, packDateBegin, packDateEnd, batchNoListTextFormat) {
    const { dispatch } = this.props;
    dispatch({
      type: 'packing/fetchPackageReport',
      payload: {
        workShopId,
        "po[]": po,
        "parentMakeOrderNo[]": childNo,
        "batchNoList[]": batchNoListTextFormat,
        packDateBegin,
        packDateEnd,
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
    const { packing: { packageReport } } = this.props;
    const data = packageReport || '';// 表格数据
    const option = {};
    const dataTable = [];
    if (data) {
      for (const i in data) {
        if (data) {
          const obj = {
            '包装时间': data[i].creationDate,
            'PO': data[i].po,
            '经销商': data[i].dealerName,
            '生产订单': data[i].demandOrderNo,
            '生产子订单': data[i].parentMakeOrderNo,
            'SO': data[i].saleOrderNo,
            '材质': data[i].materialTypeName,
            '花色': data[i].colorName,
            '产线': data[i].prodlineDesc,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '包装报表';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['包装时间', 'PO', '经销商', '生产订单', '生产子订单', 'SO', '材质', '花色', '产线'],
        sheetHeader: ['包装时间', 'PO', '经销商', '生产订单', '生产子订单', 'SO', '材质', '花色', '产线'],
      },
    ];

    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const fromTime = fieldValues.packingTimeFrom ? moment(fieldValues.packingTimeFrom).format('YYYY-MM-DD') : null;
    const endTime = fieldValues.packingTimeTo ? moment(fieldValues.packingTimeTo).format('YYYY-MM-DD') : null;
    const poTextFormat = fieldValues.poText ? fieldValues.poText.split("\n").join(",") : null;
    const childTextFormat = fieldValues.childText ? fieldValues.childText.split("\n").join(",") : null;
    const batchNoListTextFormat = fieldValues.batchNoListText ? fieldValues.batchNoListText.split("\n").join(",") : null;
    this.getPackageReport(fieldValues.workShop, poTextFormat, childTextFormat, fromTime, endTime, batchNoListTextFormat);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
  }

  render() {
    const { packing, tableLoading } = this.props;
    const { defPlantId, workShopList, prodLineList, packageReport } = packing;
    const searchProps = {
      defPlantId,
      workShopList,
      prodLineList,
      defProdLineList: this.state.defProdLineList,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: packageReport,
    };
    return (
      <Fragment>
        <Header title="包装报表">
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
          <DetailTable {...tableProps} />
        </Content>
      </Fragment>
    );
  }
};