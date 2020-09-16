import React, {useState, useEffect} from "react";
import {Spin, Select, Button, Row, Col, DatePicker} from "hzero-ui";
import {connect} from "dva";
import moment from 'moment';
import {getCurrentUser} from 'utils/utils';

import {dateFormat, removeDay} from "../../utils/utils";
import "./index.less";
import KpiChart from "../../assets/icons/kpi-chart.png";
import KpiOnTime from "../../assets/icons/kpi-onTime.png";
import KpiPause from "../../assets/icons/kpi-pause.png";
import KpiRepair from "../../assets/icons/kpi-repair.png";
import KpiTime from "../../assets/icons/kpi-time.png";
import track from "../../assets/icons/track.png";
import Title from "../../components/Title";
import Chart from "../../components/kpiEqRepairPage/Chart";
import PieChart from "../../components/kpiEqRepairPage/PieChart";
import PieChart1 from "../../components/kpiEqRepairPage/PieChart1";
import TimeRateChart from "../../components/kpiEqRepairPage/TimeRateChart";
import RepairTimeChart from "../../components/kpiEqRepairPage/RepairTimeChart";
import PauseTable from "../../components/kpiEqRepairPage/PauseTable";
import PauseChart from "../../components/kpiEqRepairPage/PauseChart";
import EventTable from "../../components/kpiEqRepairPage/EventTable";
import HolikeLoading from "../../components/holikeLoading";

const {Option} = Select;

const kipEqRepairPage = (props) => {
  const {
    dispatch,
    loading,
    kpiEqRepair: {
      plantList,
      workShopList,
      prodLineList,
      eqRepairList, // 设备维修情况列表
      reairTimeRateList, // 维修及时率
      repairTimeList, // 维修时长
      eqUseData, // 设备使用情况
      eqFaultData, // 设备报修情况
      eqRepairSuspendInfoList, // 设备暂停情况列表
      eqRepairOrdersAndTime, // 设备暂停总时间
      trackMatter, // 追踪事项
    },
  } = props;
  const [selectPlantId, setSelectPlantId] = useState(6806);
  const [newWorkShopList, setNewWorkShopList] = useState([]);
  const [selectWorkShopId, setSelectWorkShopId] = useState(null);
  const [newProdLineList, setNewProdLineList] = useState([]);
  const [selectProdId, setSelectProdId] = useState(null);
  const [selectTime, setSelectTime] = useState("");
  const {loginName} = getCurrentUser();

  // 获取所有有效工厂
  function getPlantList() {
    dispatch({
      type: 'kpiEqRepair/fetchPlantList',
    });
  }

  // 获取所有有效车间
  function getWorkShopList() {
    dispatch({
      type: 'kpiEqRepair/fetchWorkShopList',
    }).then((res) => {
      if (res) {
        const tempList = res.rows.filter((item) => item.plantId === 6806);
        setNewWorkShopList(tempList);
      }
    });
  }

  // 获取所有有效产线
  function getProdLineList() {
    dispatch({
      type: 'kpiEqRepair/fetchProdLineList',
    }).then((res) => {
      if (res) {
        setNewProdLineList(res.rows);
      }
    });
  }

  // 获取设备报修情况数据
  function getEqRepair(plantId, creationDate, ...rest) {
    const [workShopId, prodlineId] = rest;
    dispatch({
      type: 'kpiEqRepair/fetchEqRepair',
      payload: {
        plantId,
        workShopId,
        prodlineId,
        creationDate: removeDay(creationDate) || dateFormat(new Date(), 'yyyy-MM'),
      },
    });
  }

  // 获取设备使用情况数据
  function getEqUse(plantId, creationDate, ...rest) {
    const [workShopId, prodlineId] = rest;
    dispatch({
      type: 'kpiEqRepair/fetchEqUse',
      payload: {
        plantId,
        workShopId,
        prodlineId,
        creationDate: creationDate || dateFormat(new Date(), 'yyyy-MM-dd'),
      },
    });
  }

  // 获取设备报修情况数据
  function getEqFault(plantId, ...rest) {
    const [workShopId, prodlineId] = rest;
    dispatch({
      type: 'kpiEqRepair/fetchEqFault',
      payload: {
        plantId,
        workShopId,
        prodlineId,
      },
    });
  }

  // 获取维修及时率数据
  function getReairTimeRateList(creationDate) {
    dispatch({
      type: 'kpiEqRepair/fetchEqReairTimeRate',
      payload: {
        creationDate: removeDay(creationDate) || dateFormat(new Date(), 'yyyy-MM'),
      },
    });
  }

  // 获取维修时长
  function getEqRepairTime(plantId, creationDate, ...rest) {
    const [workShopId, prodlineId] = rest;
    dispatch({
      type: 'kpiEqRepair/fetchEqRepairTime',
      payload: {
        plantId,
        creationDate: removeDay(creationDate) || dateFormat(new Date(), 'yyyy-MM'),
        workShopId,
        prodlineId,
      },
    });
  }

  // 获取设备暂停情况
  function getEqRepairSuspendInfo() {
    dispatch({
      type: 'kpiEqRepair/fetchEqRepairSuspendInfo',
    });
  }

  // 获取设备暂停总时间
  function getEqRepairOrdersAndTime(plantId, creationDate, workShopId, prodLineId) {
    dispatch({
      type: 'kpiEqRepair/fetchEqRepairOrdersAndTime',
      payload: {
        plantId,
        creationDate: creationDate|| dateFormat(new Date(), 'yyyy-MM-dd'),
        workShopId,
        prodLineId,
      },
    });
  }

  // 获取追踪事项数据
  function getTrackMatter() {
    dispatch({
      type: 'kpiEqRepair/fetchTrackMatter',
    });
  }

  useEffect(() => {
    getDefPlant(loginName);
    getPlantList();
    getWorkShopList();
    getProdLineList();
  }, []);

  // function handleQuery() {

  // }

  // 获取默认工厂
  function getDefPlant(userName) {
    dispatch({
      type: "kpiEqRepair/fetchPlantList",
      payload: {
        userName,
      },
    }).then((res) => {
      if (res.rows) {
        const {plantId} = res.rows[0].plantId;
        if (plantId) {
          setSelectPlantId(plantId);
        }
      }
    });
  }

  // 选择工厂
  function handleSelectPlant(value) {
    const tempList = workShopList.filter((item) => {
      return item.plantId === value;
    });
    setNewWorkShopList(tempList);
    setSelectPlantId(value);
  }

  // 选择车间
  function handleSelectWorkShop(value) {
    setSelectWorkShopId(value);
    const tempList = prodLineList.filter((item) => {
      return item.workShopId === value;
    });
    setNewProdLineList(tempList);
  }

  // 选择产线
  function handleSelectProdLine(value) {
    setSelectProdId(value);
  }

  // 选择时间
  function handleChangeDateTime(value, dataString) {
    setSelectTime(dataString);
  }

  // 确定按钮
  function handleClick() {
    getReairTimeRateList(selectTime);
    getEqRepair(selectPlantId, selectTime, selectWorkShopId, selectProdId);
    getEqRepairTime(selectPlantId, selectTime, selectWorkShopId, selectProdId);
    getEqUse(selectPlantId, selectTime, selectWorkShopId, selectProdId);
    getEqFault(selectPlantId, selectWorkShopId, selectProdId);
    getEqRepairOrdersAndTime(selectPlantId, selectTime, selectWorkShopId, selectProdId);
    getEqRepairSuspendInfo();
    getTrackMatter();
  }

  // 事件关闭
  function getCloseTrackMatter(eventId, reasonAnalyzeDesc, userName) {
    return dispatch({
      type: "kpiEqRepair/fetchCloseTrackMatter",
      payload: {
        eventId,
        reasonAnalyzeDesc,
        userName,
      },
    }).then(() => {
      getTrackMatter();
      return Promise.resolve(true);
    });
  }

  // 事件升级
  function getUpgradeTrackMatter(eventId, userName) {
    return dispatch({
      type: "kpiEqRepair/fetchUpgradeTrackMatter",
      payload: {
        eventId,
        userName,
      },
    }).then(() => {
      getTrackMatter();
      return Promise.resolve(true);
    });
  }

  return (
    <div id="wrap" className="wrap">
      <div className="header">
        <div className="select-block">
          <span>工厂</span>
          <Select
            className="select-center"
            onSelect={handleSelectPlant}
            defaultValue={selectPlantId}
            style={{marginLeft: 10, width: 200}}
            placeholder="==请选择=="
          >
            {
              plantList && plantList.map((item) => {
                return (<Option value={item.plantId}>{item.plantDesc}</Option>);
              })
            }
          </Select>
        </div>
        <div className="select-block">
          <span>车间</span>
          <Select
            className="select-center"
            style={{marginLeft: 10, width: 200}}
            onSelect={handleSelectWorkShop}
            onChange={handleSelectWorkShop}
            allowClear
            placeholder="==请选择=="
          >
            {
              newWorkShopList.map((item) => (<Option value={item.workShopId}>{item.workShopDesc}</Option>))
            }
          </Select>
        </div>
        <div className="select-block">
          <span>产线</span>
          <Select
            className="select-center"
            style={{marginLeft: 10, width: 200}}
            disabled={!selectWorkShopId}
            allowClear
            placeholder="==请选择=="
            onSelect={handleSelectProdLine}
            onChange={handleSelectProdLine}
          >
            {
              newProdLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
            }
          </Select>
        </div>

        <div className="select-block">
          <span>时间</span>
          <DatePicker
            onChange={handleChangeDateTime}
            defaultValue={moment(new Date(), "YYYY-MM-DD")}
            format="YYYY-MM-DD"
            style={{width: 200, marginLeft: 10}}
          />
        </div>

        <Button type="primary" onClick={handleClick} style={{marginLeft: 20}}>确定</Button>
      </div>
      <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={!!loading}>
        <div className="content">
          <Row style={{flex: 1}}>
            <Col span={8} className="eqRepair">
              <Title title="设备报修情况" imgUrl={KpiRepair} />
              {eqRepairList.length > 0 && <Chart chartId="eqrepair" chartDataList={eqRepairList} />}
            </Col>
            <Col span={8} className="eqUse">
              <Title title="设备使用情况" imgUrl={KpiChart} />
              {eqUseData.length > 0 && <PieChart chartId="eqUse" chartData={eqUseData} />}
            </Col>
            <Col span={8} className="ontime-rate">
              <Title title="维修及时率" imgUrl={KpiOnTime} />
              {reairTimeRateList.length > 0 && <TimeRateChart chartId="ontime-rate" chartDataList={reairTimeRateList} />}
            </Col>
          </Row>
          <Row style={{flex: 1}}>
            <Col span={8} className="eqTime">
              <Title title="设备维修时长(小时)" imgUrl={KpiTime} />
              {repairTimeList.length > 0 && <RepairTimeChart chartId="eqTime" chartDataList={repairTimeList} />}
            </Col>
            <Col span={8} className="eqUse">
              <Title title="设备当前报修情况" imgUrl={KpiChart} />
              {eqFaultData.length > 0 && <PieChart1 chartId="eqFault" chartData={eqFaultData} />}
            </Col>
            <Col span={8} className="repair-pause">
              <Title title="人员维修情况" imgUrl={KpiPause} />
              {eqRepairOrdersAndTime.length > 0 &&
              <PauseChart chartId="repair-pause" chartDataList={eqRepairOrdersAndTime} />}
            </Col>
          </Row>
          <Row style={{flex: 1}}>
            <Col span={16} className="repair-list">
              <Title title="设备暂停情况" imgUrl={KpiChart} />
              <PauseTable tableData={eqRepairSuspendInfoList} />
            </Col>
            <Col span={8} className="event">
              <Title title="追踪事项" imgUrl={track} />
              <EventTable
                trackMatter={trackMatter}
                upgradeTrackMatter={getUpgradeTrackMatter}
                closeTrackMatter={getCloseTrackMatter}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default connect(({kpiEqRepair, loading}) => ({
  kpiEqRepair,
  loading: loading.effects["kpiEqRepair/fetchEqRepair"] ||
    loading.effects["kpiEqRepair/fetchEqUse"] ||
    loading.effects["kpiEqRepair/fetchEqFault"] ||
    loading.effects["kpiEqRepair/fetchEqReairTimeRate"] ||
    loading.effects["kpiEqRepair/fetchEqRepairTime"] ||
    loading.effects["kpiEqRepair/fetchEqRepairSuspendInfo"] ||
    loading.effects["kpiEqRepair/fetchEqRepairOrdersAndTime"] ||
    loading.effects["kpiEqRepair/fetchTrackMatter"],
}))(kipEqRepairPage);
