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
import Search from "../../components/missReportWorkPage/search";
import HeadTable from "../../components/missReportWorkPage/headTable";
import DetailTable from "../../components/missReportWorkPage/detailTable";

const { loginName } = getCurrentUser();

@connect(({ missReportWork, loading }) => ({
  headTableLoading: loading.effects["missReportWork/fetchHeadData"],
  rowTableLoading: loading.effects["missReportWork/fetchRowData"],
  missReportWork,
}))
export default class MissReportWorkPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      workShopList: [],
      prodLineList: [],
      // opTypeList: [],
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
      type: 'missReportWork/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then((res) => {
      if (res && res.length > 0) {
        this.getWorkShop(Number(res[0].def_plant_id));
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
      type: 'missReportWork/fetchPlant',
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(defPlantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'missReportWork/fetchWorkShop',
    }).then(res => {
      if (res && res.length > 0) {
        this.setState({
          workShopList: res.filter((item) => item.plantId === defPlantId),
        });
      }
    });
  }

  /**
   * 获取产线
   */
  @Bind()
  getProdLine() {
    const { dispatch } = this.props;
    dispatch({
      type: 'missReportWork/fetchProdLine',
    });
  }

  /**
  * 获取工序
  */
  @Bind()
  getOpType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'missReportWork/fetchOpType',
    });
  }

  /**
   * 获取头表数据
   * @param {*} params
   */
  @Bind()
  getHeadData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'missReportWork/fetchHeadData',
      payload: {
        ...params,
      },
    });
  }

  /**
  * 获取行表数据
  * @param {*} params
  */
  @Bind()
  getRowData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'missReportWork/fetchRowData',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 选择工厂
   * @param {*} value
   */
  @Bind()
  handleSelectPlant(value) {
    const { workShop } = this.props.missReportWork;
    this.setState({
      workShopList: workShop.filter(item => item.plantId === value),
    });
  }


  /**
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectWorkShop(value) {
    const { prodLine } = this.props.missReportWork;
    this.setState({
      prodLineList: prodLine.filter(res => res.workShopId === value),
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
    const { missReportWork: { headData, rowData } } = this.props;
    const data1 = headData || '';// 头表格数据
    const data2 = rowData || '';// 行表格数据
    const option1 = {};
    const option2 = {};
    const dataTable2 = [];
    const dataTable1 = [];
    if (data1) {
      for (const i in data1) {
        if (data1) {
          const obj = {
            "工厂": data1[i].plantDesc,
            "车间": data1[i].workShopDesc,
            "产线": data1[i].prodLineDesc,
            "工序类别": data1[i].opTypeDesc,
            "批次号": data1[i].batchOrderNo,
            "子订单号": data1[i].parentMakeOrderNo,
            "板件类型": data1[i].boardTypeDesc,
            "漏报工": data1[i].missReportCount,
            "已报工": data1[i].reportedCount,
          };
          dataTable1.push(obj);
        }
      }
    }
    if (data2) {
      for (const i in data2) {
        if (data2) {
          const obj = {
            "批次号": data2[i].batchOrderNo,
            "子订单号": data2[i].parentMakeOrderNo,
            "UPI": data2[i].upi,
            "板件类型": data2[i].boardName,
            "板件规格": data2[i].sizeSpecification,
            "花色": data2[i].colorName,
            "材质": data2[i].materialTypeName,
            "数量": data2[i].quantity,
          };
          dataTable2.push(obj);
        }
      }
    }
    option1.fileName = '漏报工查询报表1';
    option2.fileName = '漏报工查询报表2';
    option1.datas = [
      {
        sheetData: dataTable1,
        sheetName: 'sheet',
        sheetFilter: ["工厂", "车间", "产线", "工序类别", "批次号", "子订单号", "板件类型", "漏报工", "已报工"],
        sheetHeader: ["工厂", "车间", "产线", "工序类别", "批次号", "子订单号", "板件类型", "漏报工", "已报工"],
      },
    ];
    option2.datas = [
      {
        sheetData: dataTable2,
        sheetName: 'sheet',
        sheetFilter: ["批次号", "子订单号", "UPI", "板件类型", "板件规格", "花色", "材质", "数量"],
        sheetHeader: ["批次号", "子订单号", "UPI", "板件类型", "板件规格", "花色", "材质", "数量"],
      },
    ];

    const toExcel1 = new ExportJsonExcel(option1);
    const toExcel2 = new ExportJsonExcel(option2);
    toExcel1.saveExcel();
    toExcel2.saveExcel();
  }

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const fromTime = fieldValues.receiveDateBegin ? moment(fieldValues.receiveDateBegin).format('YYYY-MM-DD HH:mm:ss') : null;
    const endTime = fieldValues.receiveDateEnd ? moment(fieldValues.receiveDateEnd).format('YYYY-MM-DD HH:mm:ss') : null;
    const batchOrderNoFormat = fieldValues.batchOrderNo ? fieldValues.batchOrderNo.split("\n").join(",") : null;
    const childTextFormat = fieldValues.parentMakeOrderNo ? fieldValues.parentMakeOrderNo.split("\n").join(",") : null;
    const poListTextFormat = fieldValues.poList ? fieldValues.poList.split("\n").join(",") : null;
    const searchParams = {
      ...fieldValues,
      receiveDateBegin: fromTime,
      receiveDateEnd: endTime,
      batchOrderNo: batchOrderNoFormat,
      parentMakeOrderNo: childTextFormat,
      poList: poListTextFormat,
    };
    this.getHeadData(searchParams);
  }


  /**
   * 点击头表的每一行
   * @param {*} record
   */
  @Bind()
  handleClickRow(record) {
    const { standardOpType, boardType, batchOrderNo, parentMakeOrderNo } = record;
    const params = {
      opType: standardOpType,
      boardType,
      batchOrderNo,
      parentMakeOrderNo,
    };
    this.getRowData(params);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
    this.getPlant();
    this.getProdLine();
    this.getOpType();
  }

  render() {
    const { missReportWork, headTableLoading, rowTableLoading } = this.props;
    const { workShopList, prodLineList } = this.state;
    const {
      defPlantId, // 默认工厂
      plant, // 工厂
      opType, // 工序
      headData, // 头表数据
      rowData, // 行表数据
    } = missReportWork;
    const searchProps = {
      defPlantId,
      plant,
      workShopList,
      prodLineList,
      opType,
      onSelectPlant: this.handleSelectPlant,
      onSelectWorkShop: this.handleSelectWorkShop,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const headTableProps = {
      loading: { spinning: !!headTableLoading, indicator: holikeLoading },
      dataSource: headData,
      onClick: this.handleClickRow,
    };
    const rowTableProps = {
      loading: { spinning: !!rowTableLoading, indicator: holikeLoading },
      dataSource: rowData,
    };
    return (
      <Fragment>
        <Header title="漏报工查询报表">
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
          <HeadTable {...headTableProps} />
          <DetailTable {...rowTableProps} />
        </Content>
      </Fragment>
    );
  }
};