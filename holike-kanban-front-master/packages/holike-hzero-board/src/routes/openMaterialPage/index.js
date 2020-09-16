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
import Search from "../../components/openMaterialPage/search";
import HeadTable from "../../components/openMaterialPage/headTable";
import DetailTable from "../../components/openMaterialPage/detailTable";

const { loginName } = getCurrentUser();

@connect(({ openMaterial, loading }) => ({
  headLoading: loading.effects["openMaterial/fetchHead"],
  detailLoading: loading.effects["openMaterial/fetchDetail"],
  openMaterial,
}))
export default class openMaterialPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      defWorkShopList: [],
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
      type: 'openMaterial/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then(res => {
      if (res.length > 0) {
        this.getPlant();
        this.getWorkShop(res[0].def_plant_id);
      }
    });
  }

  /**
   * 获取所有工厂
   */
  @Bind()
  getPlant() {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchPlant',
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(defPlantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchWorkShop',
    }).then(res => {
      if (res.length > 0) {
        this.setState({
          defWorkShopList: res.filter((item) => item.plantId === Number(defPlantId)),
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
      type: 'openMaterial/fetchProdLine',
    });
  }


  /**
   * 获取产品类别
   */
  @Bind()
  getProductType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchProductType',
    });
  }

  /**
  * 获取功能类型
  */
  @Bind()
  getFunctionType(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchFunctionType',
      payload: {
        userName,
      },
    });
  }

  /**
  * 获取订单服务类型
  */
  @Bind()
  getOrderServiceType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchOrderServiceType',
    });
  }

  /**
  * 获取头信息
  */
  @Bind()
  gethHead(param) {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchHead',
      payload: {
        ...param,
      },
    });
  }

  /**
  * 获取行详情信息
  */
  @Bind()
  getDetail(param) {
    const { dispatch } = this.props;
    dispatch({
      type: 'openMaterial/fetchDetail',
      payload: {
        ...param,
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
    const { openMaterial: { detailList, headList } } = this.props;
    const data = detailList || '';// 详情表格数据
    const option = {};
    const option1 = {};
    const dataTable = [];
    const dataTable1 = [];
    if (headList) {
      for (const i in headList) {
          const obj = {
            "材料-厚度": headList[i].materialFthickness,
            "材料": headList[i].materialTypeName,
            "厚度": headList[i].fthickness,
            '面积': headList[i].area,
          };
        dataTable1.push(obj);
      }
    }
    option1.fileName = '开料报工厚度查询统计头表';
    option1.datas = [
      {
        sheetData: dataTable1,
        sheetName: 'sheet',
        sheetFilter: ['材料-厚度', '材料', '厚度', '面积'],
        sheetHeader: ['材料-厚度', '材料', '厚度', '面积'],
      },
    ];
    const toExcel1 = new ExportJsonExcel(option1);
    toExcel1.saveExcel();
    if (data) {
      for (const i in data) {
        if (data) {
          const obj = {
            "工厂": data[i].plantDesc,
            "车间": data[i].workShopDesc,
            "产线": data[i].prodLineDesc,
            '批次号': data[i].batchOrderNo,
            '采购订单号': data[i].po,
            '产品类别': data[i].productType,
            '子订单号': data[i].parentMakeOrderNo,
            '材料-厚度': data[i].materialFthickness,
            '材料': data[i].materialTypeName,
            '厚度': data[i].fthickness,
            '面积': data[i].area,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '开料报工厚度查询统计报表';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['工厂', '车间', '产线', '批次号', '采购订单号', '产品类别', '子订单号', '材料-厚度', '材料', '厚度', '面积'],
        sheetHeader: ['工厂', '车间', '产线', '批次号', '采购订单号', '产品类别', '子订单号', '材料-厚度', '材料', '厚度', '面积'],
      },
    ];

    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  // 查询
  @Bind()
  handleQuery(materialTypeName = null, fthickness = null) {
    let run = true;
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const fromTime = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD hh:mm:ss') : null;
    const endTime = fieldValues.endDate ? moment(fieldValues.endDate).format('YYYY-MM-DD hh:mm:ss') : null;
    const batchNumFormat = fieldValues.batchOrderNoList ? fieldValues.batchOrderNoList.split("\n") : null;
    const purchaseNumFormat = fieldValues.poList ? fieldValues.poList.split("\n") : null;
    const childNumFormat = fieldValues.parentMakeOrderNoList ? fieldValues.parentMakeOrderNoList.split("\n") : null;
    const searchParams = {
      ...fieldValues,
      startDate: fromTime,
      endDate: endTime,
      batchOrderNoList: batchNumFormat,
      poList: purchaseNumFormat,
      parentMakeOrderNoList: childNumFormat,
      materialTypeName,
      fthickness,
    };
    if (materialTypeName || fthickness) {
      run = false;
    } else {
      run = true;
    }
    if (run) {
      this.gethHead(searchParams);
    }
    this.getDetail(searchParams);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
    this.getProdLine();
    this.getProductType();
    this.getFunctionType(loginName);
    this.getOrderServiceType();
  }

  render() {
    const { openMaterial, detailLoading, headLoading } = this.props;
    const {
      defPlantId,
      plantList,
      workShopList,
      prodLineList,
      productType,
      functionType,
      orderServiceType,
      headList, // 头信息
      detailList, // 行详情信息
    } = openMaterial;
    const searchProps = {
      defPlantId,
      plantList,
      defWorkShopList: this.state.defWorkShopList,
      workShopList,
      prodLineList,
      productType,
      functionType,
      orderServiceType,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableHeadProps = {
      loading: { spinning: !!headLoading, indicator: holikeLoading },
      dataSource: headList,
      onClick: this.handleQuery,
    };
    const tableDetailProps = {
      loading: { spinning: !!detailLoading, indicator: holikeLoading },
      dataSource: detailList,
    };
    return (
      <Fragment>
        <Header title="开料报工厚度查询统计报表">
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
          <HeadTable {...tableHeadProps} />
          <DetailTable {...tableDetailProps} />
        </Content>
      </Fragment>
    );
  }
};
