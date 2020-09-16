import React, { Component, Fragment } from "react";
import { Row, Col } from "hzero-ui";
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
import Search from "../../components/prodAbnormalPage/search";
import DetailTable from "../../components/prodAbnormalPage/detailTable";
import LineChart from "../../components/prodAbnormalPage/chart";
import PieChart from "../../components/prodAbnormalPage/pieChart";

import ExportExcelButton from "../../components/exportButton";

const { loginName } = getCurrentUser();

const TYPE = ["creationDate", "weekOfMonth", "month"];

@connect(({ prodAbnormal, loading }) => ({
  tableLoading: loading.effects["prodAbnormal/fetchException"],
  prodAbnormal,
}))
export default class ProdAbnormalPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      workShopList: [],
      chartData: {},
      type: "",
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
      type: 'prodAbnormal/fetchDefPlantId',
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
      type: 'prodAbnormal/fetchPlant',
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(defPlantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'prodAbnormal/fetchWorkShop',
    }).then(res => {
      if (res && res.length > 0) {
        this.setState({
          workShopList: res.filter((item) => item.plantId === defPlantId),
        });
      }
    });
  }

  /**
   * 获取异常数据
   */
  @Bind()
  getException(params) {
    const { dispatch } = this.props;
    const { type } = params;
    dispatch({
      type: 'prodAbnormal/fetchException',
      payload: {
        ...params,
      },
    }).then(res => {
      if (res) {
        this.handleChartData(res, type);
      }
    });
  }

  /**
   * 选择工厂
   * @param {*} value
   */
  @Bind()
  handleSelectPlant(value) {
    const { workShop } = this.props.prodAbnormal;
    this.setState({
      workShopList: workShop.filter(item => item.plantId === value),
    });
  }

  /**
   *
   * 处理图表数据
   * @param {*} data
   * @param {*} type
   */
  handleChartData(data, type) {
    const temp = ["creationDate", "weekOfMonth", "month", "responsibleDepartmnet"];
    this.setState({
      type,
      chartData: {},
    });
    let newData = JSON.parse(JSON.stringify(data));
    const chartData = {};
    newData = newData.length > 0 ? newData.map((item) => {
      const { weekOfMonth, month, size } = item;
      const { creationDate, planStopTypeMeaning, problemType, responsibleDepartmnet } = item.group[0];
      let planStopTime = 0;
      let problemTime = 0;
      item.group.forEach(i => {
        planStopTime += i.planStopTime;
        problemTime += i.problemTime;
      });
      return {
        creationDate,
        weekOfMonth: `第${weekOfMonth}周`,
        month: `${month}月`,
        planStopTime,
        planStopTypeMeaning,
        problemTime,
        problemType,
        responsibleDepartmnet,
        size,
      };
    }) : [];
    if (temp.includes(type)) {
      newData.forEach(item => {
        if (!Object.keys(chartData).includes(item[type].split(" ").shift())) {
          chartData[item[type].split(" ").shift()] = item.size;
        } else {
          chartData[item[type].split(" ").shift()] += item.size;
        }
      });
    } else {
      newData.forEach(item => {
        if (!Object.keys(chartData).includes(item[type])) {
          chartData[item[type]] = type === "planStopTypeMeaning" ? item.planStopTime : item.problemTime;
        } else {
          chartData[item[type]] += type === "planStopTypeMeaning" ? item.planStopTime : item.problemTime;
        }
      });
    };
    this.setState({
      chartData,
    });
  }


  /**
   * 选择单选框
   * @param {*} event
   */
  @Bind()
  handleChange(event) {
    const { target: { value } } = event;
    const { prodAbnormal: { exceptionData } } = this.props;
    if (exceptionData.length > 0) {
      this.handleChartData(exceptionData, value);
    }
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
    this.getException(searchParams);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
    this.getPlant();
  }

  render() {
    const { prodAbnormal, tableLoading } = this.props;
    const { workShopList, chartData, type } = this.state;
    const {
      defPlantId, // 默认工厂
      plant, // 工厂
      exceptionData,
    } = prodAbnormal;
    const searchProps = {
      defPlantId,
      plant,
      workShopList,
      onChange: this.handleChange,
      onSelectPlant: this.handleSelectPlant,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: exceptionData,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "prod-abnormal-table",
          sheetName: "生产异常问题分析表",
        },
      ],
      excelName: "生产异常问题分析报表",
    };
    return (
      <Fragment>
        <Header title="生产异常问题分析">
          <ExportExcelButton {...exportButtonprops} />
        </Header>
        <Content>
          <Search {...searchProps} />
          <Row>
            <Col span={14}>
              <DetailTable {...tableProps} />
            </Col>
            <Col span={10}>
              {Object.keys(chartData).length > 0 && TYPE.includes(type) ? <LineChart chartId="exception-line-chart" chartData={chartData} type={type} /> : <PieChart chartId="exception-pie-chart" chartData={chartData} type={type} />
              }
            </Col>
          </Row>
        </Content>
      </Fragment>
    );
  }
};