import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { filterNullValueObject } from 'utils/utils';
import ExportJsonExcel from 'js-export-excel';
import { Button } from "hzero-ui";
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/unqualifiedPage/search";
import DetailTable from "../../components/unqualifiedPage/detailTable";


@connect(({ unqualified, loading }) => ({
  tableLoading: loading.effects["unqualified/fetchUnqualifiedInfo"],
  unqualified,
}))
export default class PackingPage extends Component {
  form;

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop() {
    const { dispatch } = this.props;
    dispatch({
      type: 'unqualified/fetchWorkShop',
    });
  }

  /**
   * 获取产线
   */
  @Bind()
  getProdLine(workshopId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'unqualified/fetchProdLine',
      payload: {
        workshopId,
      },
    });
  }


  /**
   * 获取不合格类型
   */
  @Bind()
  getCompleteType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'unqualified/fetchCompleteType',
    });
  }

  /**
   * 获取不合格信息
   */
  @Bind()
  getUnqualifiedInfo(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'unqualified/fetchUnqualifiedInfo',
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
    const { unqualified: { unqualifiedInfo } } = this.props;
    const data = unqualifiedInfo || '';// 表格数据
    const option = {};
    const dataTable = [];
    if (data) {
      for (const i in data) {
        if (data) {
          const obj = {
            "不合格类型": data[i].completeType,
            "是否已补板": data[i].printFlag,
            "不合格记录时间": data[i].completeTime,
            "PO": data[i].po,
            "记录人": data[i].recorder,
            "记录产线": data[i].recordProdLineName,
            "指派产线": data[i].assignedProdLineName,
            "修改时间": data[i].lastUpdateDate,
            "修改人": data[i].modifiedBy,
            "批次号": data[i].batchNo,
            "生产订单号": data[i].parentMakeOrderNo,
            "销售订单编号": data[i].saleOrderNo,
            "UPI": data[i].upi,
            "P.no": data[i].panelNo,
            "物料名称": data[i].boardName,
            "优化类型": data[i].optimizationType,
            "花色": data[i].colorName,
            "材质": data[i].materialTypeName,
            "封边信息": data[i].edgeInfo,
            "数量": data[i].quantity,
            "单位": data[i].uom,
            "开料长": data[i].clength,
            "开料宽": data[i].cwidth,
            "开料厚": data[i].cthickness,
            "成品长": data[i].flength,
            "成品宽": data[i].fwidth,
            "成品厚": data[i].fthickness,
            "正面编码": data[i].cncBarcode1,
            "反面编码": data[i].cncBarcode2,
            "不合格原因类别": data[i].meaning,
            "不合格原因明细": data[i].badReasonDetails,
            "责任人": data[i].responsible,
            "责任工序": data[i].standardOpName,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '不合格查询报表';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: [
          "不合格类型",
          "是否已补板",
          "不合格记录时间",
          "PO",
          "记录人",
          "记录产线",
          "指派产线",
          "修改时间",
          "修改人",
          "批次号",
          "生产订单号",
          "销售订单编号",
          "UPI",
          "P.no",
          "物料名称",
          "优化类型",
          "花色",
          "材质",
          "封边信息",
          "数量",
          "单位",
          "开料长",
          "开料宽",
          "开料厚",
          "成品长",
          "成品宽",
          "成品厚",
          "正面编码",
          "反面编码",
          "不合格原因类别",
          "不合格原因明细",
          "责任人",
          "责任工序",
        ],
        sheetHeader: [
          "不合格类型",
          "是否已补板",
          "不合格记录时间",
          "PO",
          "记录人",
          "记录产线",
          "指派产线",
          "修改时间",
          "修改人",
          "批次号",
          "生产订单号",
          "销售订单编号",
          "UPI",
          "P.no",
          "物料名称",
          "优化类型",
          "花色",
          "材质",
          "封边信息",
          "数量",
          "单位",
          "开料长",
          "开料宽",
          "开料厚",
          "成品长",
          "成品宽",
          "成品厚",
          "正面编码",
          "反面编码",
          "不合格原因类别",
          "不合格原因明细",
          "责任人",
          "责任工序",
        ],
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
    const fromTime = fieldValues.logEventsTo ? moment(fieldValues.logEventsTo).format('YYYY-MM-DD') : null;
    const endTime = fieldValues.logEventsFrom ? moment(fieldValues.logEventsFrom).format('YYYY-MM-DD') : null;
    const parentMakeOrderNo = fieldValues.parentMakeOrderNo ? fieldValues.parentMakeOrderNo.split("\n") : null;
    const batchNo = fieldValues.batchNo ? fieldValues.batchNo.split("\n") : null;
    const po = fieldValues.po ? fieldValues.po.split("\n") : null;
    const searchParams = {
      ...fieldValues,
      logEventsTo: fromTime,
      logEventsFrom: endTime,
      parentMakeOrderNo,
      po,
      batchNo,
    };
    this.getUnqualifiedInfo(searchParams);
  }


  /**
   *
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectworkShop(value) {
    this.getProdLine(value);
  }

  componentDidMount() {
    this.getWorkShop();
    this.getCompleteType();
  }

  render() {
    const { unqualified, tableLoading } = this.props;
    const { workShop, prodLine, completeType, unqualifiedInfo } = unqualified;
    const searchProps = {
      workShop, // 车间列表
      prodLine, // 产线下拉列表
      completeType, // 完工类型
      selectWorkShop: this.handleSelectworkShop,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: unqualifiedInfo,
    };
    return (
      <Fragment>
        <Header title="不合格查询报表">
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