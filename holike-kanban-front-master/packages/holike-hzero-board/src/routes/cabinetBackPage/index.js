import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import { Button, message } from "hzero-ui";
import moment from 'moment';
import { filterNullValueObject, getCurrentUser } from 'utils/utils';
import ExportJsonExcel from 'js-export-excel';
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/cabinetBackPage/search";
import DetailTable from "../../components/cabinetBackPage/detailTable";

const { loginName } = getCurrentUser();

@connect(({ cabinetBack, loading }) => ({
  detailLoading: loading.effects["cabinetBack/fetchMainData"],
  cabinetBack,
}))
export default class CabinetBackPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      selectPlantId: null,
      // selectWorkShopId: null,
      // selectProdLineId: null,
      // defWorkShopList: [],
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
      type: 'cabinetBack/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then(res => {
      if (res.length > 0) {
        this.getPlant();
        const defPlantId = Number(res[0].def_plant_id);
        this.getWorkShop(defPlantId);
        this.setState({
          selectPlantId: defPlantId,
        });
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
      type: 'cabinetBack/fetchPlant',
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(plantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'cabinetBack/fetchWorkShop',
      payload: {
        plantId,
      },
    }).then(res => {
      if (res.rows.length > 0) {
        const { workShopId } = res.rows[0];
        this.getProdLine(plantId, workShopId);
        // this.setState({
        //   selectWorkShopId: workShopId,
        // });
      }
    });
  }

  /**
   * 获取产线
   */
  @Bind()
  getProdLine(plantId, workshopId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'cabinetBack/fetchProdLine',
      payload: {
        plantId,
        workshopId,
      },
    }).then(res => {
      if (res) {
        const { rows } = res;
        if (rows && rows.length > 0) {
          const { prodLineId } = rows[0];
          this.getStandardType(plantId, prodLineId);
        }
      }
    });
  }


  /**
   * 获取工序
   */
  @Bind()
  getStandardType(plantId, prodLineId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'cabinetBack/fetchStandardType',
      payload: {
        plantId,
        prodLineId,
      },
    });
  }

  /**
  * 获取主数据
  */
  @Bind()
  getMainData(param) {
    const { dispatch } = this.props;
    dispatch({
      type: 'cabinetBack/fetchMainData',
      payload: {
        ...param,
      },
    });
  }


  /**
   * 选择工厂
   * @param {*} value
   */
  @Bind()
  handleSelectPlant(value) {
    this.setState({
      selectPlantId: value,
    });
    this.getWorkShop(value);
  }


  /**
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectWorkShop(value) {
    // this.setState({
    //   selectWorkShopId: value,
    // });
    this.getProdLine(this.state.selectPlantId, value);
  }

  /**
   * 选择产线
   * @param {*} value
   */
  @Bind()
  handleSelectProdLine(value) {
    // this.setState({
    //   selectProdLineId: value,
    // });
    this.getStandardType(this.state.selectPlantId, value);
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
    const { cabinetBack: { mainData } } = this.props;
    const data = mainData || '';// 详情表格数据
    const option = {};
    const dataTable = [];
    if (data) {
      for (const i in data) {
        if (data) {
          const obj = {
            "工厂": data[i].descriptions,
            "车间": data[i].workShopName,
            "产线": data[i].prodLineName,
            '工件厚度': data[i].fthickness,
            '工件数量': data[i].quantity,
            '工件面积': data[i].area,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '柜体背板产能报表';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['工厂', '车间', '产线', '工件厚度', '工件数量', '工件面积'],
        sheetHeader: ['工厂', '车间', '产线', '工件厚度', '工件数量', '工件面积'],
      },
    ];

    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  // 查询
  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const fromTime = fieldValues.creationDateFrom ? moment(fieldValues.creationDateFrom).format('YYYY-MM-DD') : null;
    const endTime = fieldValues.creationDateTo ? moment(fieldValues.creationDateTo).format('YYYY-MM-DD') : null;
    const mainDataParams = {
      ...fieldValues,
      creationDateFrom: fromTime,
      creationDateTo: endTime,
    };
    if (!fieldValues.workShopId) {
      message.error("车间不能为空");
    } else {
      this.getMainData(mainDataParams);
    }
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
  }

  render() {
    const { cabinetBack, detailLoading } = this.props;
    const {
      defPlantId, // 默认工厂
      plant, // 工厂
      workShop, // 车间
      prodLine, // 产线
      standardType, // 工序
      mainData, // 主数据
    } = cabinetBack;
    const searchProps = {
      defPlantId,
      plant,
      workShop,
      prodLine,
      standardType,
      selectPlant: this.handleSelectPlant,
      selectWorkShop: this.handleSelectWorkShop,
      selectProdLine: this.handleSelectProdLine,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableDetailProps = {
      loading: { spinning: !!detailLoading, indicator: holikeLoading },
      dataSource: mainData,
    };
    return (
      <Fragment>
        <Header title="柜体背板产能报表">
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
          <DetailTable {...tableDetailProps} />
        </Content>
      </Fragment>
    );
  }
};