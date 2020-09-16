import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { filterNullValueObject, getCurrentUser } from 'utils/utils';
import { Header, Content } from 'components/Page';
import ExportExcelButton from "../../components/exportButton";

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/reportWorkPage/search";
import DetailTable from "../../components/reportWorkPage/detailTable";

const { loginName } = getCurrentUser();

@connect(({ reportWork, loading }) => ({
  tableLoading: loading.effects["reportWork/fetchMainData"],
  reportWork,
}))
export default class ReportWorkPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      defPlantId: null,
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
      type: 'reportWork/fetchDefPlantId',
      payload: {
        userName,
      },
    }).then(res => {
      if (res.length > 0) {
        this.setState({
          defPlantId: Number(res[0].def_plant_id),
        });
        this.getWorkShop(Number(res[0].def_plant_id));
      }
    });
  }

  /**
   * 获取车间
   */
  @Bind()
  getWorkShop(plantId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchWorkShop',
      payload: {
        plantId,
      },
    });
  }

  /**
   * 获取部件
   */
  @Bind()
  getParts() {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchParts',
    });
  }

  /**
   * 获取人员
   */
  @Bind()
  getPeople(plantId, workShopId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchPeople',
      payload: {
        plantId,
        workShopId,
      },
    });
  }

  /**
   * 获取工序
   */
  @Bind()
  getOpList(plantId, workShopId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchOpList',
      payload: {
        plantId,
        workShopId,
      },
    });
  }

  /**
   * 获取报工主数据
   * @param {*} params
   */
  @Bind()
  getMainData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchMainData',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 获取个人产能数据
   * @param {*} params
   */
  @Bind()
  getPersonCapacity(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportWork/fetchPersonCapacity',
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

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const fromTime = fieldValues.completeTimeFrom ? moment(fieldValues.completeTimeFrom).format('YYYY-MM-DD HH:mm:ss') : null;
    const endTime = fieldValues.completeTimeTo ? moment(fieldValues.completeTimeTo).format('YYYY-MM-DD HH:mm:ss') : null;
    const poTextFormat = fieldValues.poList ? fieldValues.poList.split("\n") : null;
    const childTextFormat = fieldValues.pmoList ? fieldValues.pmoList.split("\n") : null;
    const batchNoListFormat = fieldValues.batchNoList ? fieldValues.batchNoList.split("\n") : null;

    const searchParams = {
      ...fieldValues,
      completeTimeFrom: fromTime,
      completeTimeTo: endTime,
      poList: poTextFormat,
      pmoList: childTextFormat,
      batchNoList: batchNoListFormat,
    };
    this.getMainData(searchParams);
    this.getPersonCapacity(searchParams);
  }


  /**
   * 选择车间下拉列表
   * @param {*} value
   */
  @Bind()
  handleSlectWorkShop(value) {
    const { defPlantId } = this.state;
    this.getOpList(defPlantId, value);
    this.getPeople(defPlantId, value);
  }

  componentDidMount() {
    this.getDefPlantId(loginName);
    this.getParts();
  }

  render() {
    const { reportWork, tableLoading } = this.props;
    const {
      workShopList, // 车间下拉
      peopleList, // 人员列表
      opList, // 工序列表
      partsList, // 部件列表
      mainData,
      personCapacity,
    } = reportWork;
    const searchProps = {
      workShopList,
      peopleList,
      partsList,
      opList,
      onSelectWorkShop: this.handleSlectWorkShop,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
      // exportExcel: this.downloadExcel,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: mainData,
      personCapacity,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "report-work-table",
          sheetName: "报工查询",
        },
        {
          id: "person-capacity",
          sheetName: "个人产能",
        },
      ],
      excelName: "报工查询报表",
    };
    return (
      <Fragment>
        <Header title="报工查询">
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