import React, { useState, useEffect } from "react";
import { Spin, Row, Col } from "hzero-ui";
import { getCurrentUser } from 'utils/utils';
import { connect } from "dva";
import { dateFormat } from "../../utils/utils";

import HolikeLoading from "../../components/holikeLoading";
import Search from "../../components/standingThreePage/search";
import Title from "../../components/Title";
import OutTimeTitle from "../../components/standingThreePage/OutTimeTitle";
import SafeDay from "../../components/standingThreePage/SafeDay";
import PassRateChart from "../../components/standingThreePage/PassRateChart";
import ReplenishRateChart from "../../components/standingThreePage/ReplenishRateChart";
import TimeOutChart from "../../components/standingThreePage/TimeOutChart";
import PlanChart from "../../components/standingThreePage/PlanChart";
import EventTable from "../../components/standingThreePage/EventTable";
import onceHgl from "../../assets/icons/quality-sbbx.png";
import plan from "../../assets/icons/plan.png";
import track from "../../assets/icons/track.png";
import safe from "../../assets/icons/safe.png";
import chart from "../../assets/icons/chart.png";
import "./index.less";

// const holikeLoading = <HolikeLoading />;
const StandingPage = (props) => {
  const {
    loading,
    dispatch,
    standingThree: {
      plantList, // 工厂列表
      defPlantIdList, // 默认工厂
      workShopList, // 车间下拉列表数据
      prodLineList, // 产线列表
      safeDate, // 安全看板数据
      passRate, // 不合格数
      replenishRate, // 补板率
      replenishTimeoutRate, // 补板超时率
      planDealRate, // 查询计划达成率
      trackMatter, // 追踪事项
      replenishMarquee, // 跑马灯数据
    },
  } = props;
  const [selectPlantId, setSelectPlantId] = useState(null);
  const [newWorkShopList, setNewWorkShopList] = useState([]);
  const [selectWorkShopId, setSelectWorkShopId] = useState(null);
  const [newProdLineList, setNewProdLineList] = useState([]);
  const [selectProdId, setSelectProdId] = useState(null);
  const [selectDateTime, setSelectDateTime] = useState("");
  const [time, setTime] = useState("DAY");
  // 获取用户名
  const { loginName } = getCurrentUser();

  // 获取工厂下拉列表
  function getPlantList() {
    dispatch({
      type: "standingThree/fetchPlantList",
    });
  }

  // 获取默认工厂
  function getDefPlant(userName) {
    dispatch({
      type: "standingThree/fetchDefPlantId",
      payload: {
        userName,
      },
    }).then((res) => {
      if (res.length > 0) {
        const { defPlantId } = res[0];
        setSelectPlantId(defPlantId);
        getPlantList();
        getWorkShopList(defPlantId);
      }
    });
  }
  // 获取车间下拉列表数据
  function getWorkShopList(defPlantId) {
    dispatch({
      type: "standingThree/fetchWorkShopList",
    }).then((res) => {
      if (res) {
        const tempList = res.filter((item) => item.plantId === defPlantId);
        setNewWorkShopList(tempList);
      }
    });
  }
  // 获取产线下拉列表数据
  function getProdLineList() {
    dispatch({
      type: "standingThree/fetchProdLineList",
    }).then((res) => {
      if (res) {
        setNewProdLineList(res);
      }
    });
  }

  // 获取安全看板数据
  function getSafeDate(plantId, selectDate, ...rest) {
    const [workShopId, prodLineId] = rest;
    dispatch({
      type: "standingThree/fetchSafeDate",
      payload: {
        plantId,
        workShopId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }
  // 获取不合格数
  function getPassRate(t, plantId, selectDate, ...rest) {
    const [workShopId, prodLineId] = rest;
    switch (t) {
      case "DAY":
        dispatch({
          type: "standingThree/fetchPassRateByDay",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "WEEK":
        dispatch({
          type: "standingThree/fetchPassRateByWeek",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "MONTH":
        dispatch({
          type: "standingThree/fetchPassRateByMonth",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      default:
        break;
    }
  }

  // 获取补板率
  function getReplenishRate(t, plantId, selectDate, ...rest) {
    const [workShopId, prodLineId] = rest;
    switch (t) {
      case "DAY":
        dispatch({
          type: "standingThree/fetchReplenishRateByDay",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "WEEK":
        dispatch({
          type: "standingThree/fetchReplenishRateByWeek",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "MONTH":
        dispatch({
          type: "standingThree/fetchReplenishRateByMonth",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      default:
        break;
    }
  }

  // 获取补板超时率
  function getReplenishTimeoutRate(t, plantId, selectDate, ...rest) {
    const [workShopId, prodLineId] = rest;
    switch (t) {
      case "DAY":
        dispatch({
          type: "standingThree/fetchReplenishTimeoutRateByDay",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "WEEK":
        dispatch({
          type: "standingThree/fetchReplenishTimeoutRateByWeek",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "MONTH":
        dispatch({
          type: "standingThree/fetchReplenishTimeoutRateByMonth",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      default:
        break;
    }
  }

  // 获取计划达成率
  function getPlanDealRate(t, plantId, selectDate, ...rest) {
    const [workShopId, prodLineId] = rest;
    switch (t) {
      case "DAY":
        dispatch({
          type: "standingThree/fetchPlanDealRateByDay",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "WEEK":
        dispatch({
          type: "standingThree/fetchPlanDealRateByWeek",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      case "MONTH":
        dispatch({
          type: "standingThree/fetchPlanDealRateByMonth",
          payload: {
            plantId,
            workShopId,
            prodLineId,
            selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
          },
        });
        break;
      default:
        break;
    }
  }

  // 获取追踪事项
  function getTrackMatter(plantId, ...rest) {
    const [workShopId, prodLineId] = rest;
    dispatch({
      type: "standingThree/fetchTrackMatter",
      payload: {
        plantId,
        workShopId,
        prodLineId,
      },
    });
  }

  // 事件关闭
  function getCloseTrackMatter(eventId, reasonAnalyzeDesc, userName) {
    return dispatch({
      type: "standingThree/fetchCloseTrackMatter",
      payload: {
        eventId,
        reasonAnalyzeDesc,
        userName,
      },
    }).then(() => {
      getTrackMatter(selectPlantId, selectWorkShopId, selectProdId);
      return Promise.resolve(true);
    });
  }

  // 获取跑马灯数据
  function getReplenishMarquee() {
    dispatch({
      type: "standingThree/fetchReplenishMarquee",
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
    setSelectDateTime(dataString);
  }

  // 选择时间段
  function handleSelectTime(value) {
    setTime(value);
  }

  // 点击查询按钮
  function handleQuery() {
    if (selectWorkShopId && selectProdId) {
      getSafeDate(selectPlantId, selectDateTime, selectProdId);
      getPassRate(time, selectPlantId, selectDateTime, selectProdId);
      getReplenishRate(time, selectPlantId, selectDateTime, selectProdId);
      getReplenishTimeoutRate(time, selectPlantId, selectDateTime, selectProdId);
      getPlanDealRate(time, selectPlantId, selectDateTime, selectProdId);
      getTrackMatter(selectPlantId, selectProdId);
    } else {
      getSafeDate(selectPlantId, selectDateTime, selectWorkShopId, selectProdId);
      getPassRate(time, selectPlantId, selectDateTime, selectWorkShopId, selectProdId);
      getReplenishRate(time, selectPlantId, selectDateTime, selectWorkShopId, selectProdId);
      getReplenishTimeoutRate(time, selectPlantId, selectDateTime, selectWorkShopId, selectProdId);
      getPlanDealRate(time, selectPlantId, selectDateTime, selectWorkShopId, selectProdId);
      getTrackMatter(selectPlantId, selectWorkShopId, selectProdId);
    }
  }

  useEffect(() => {
    getDefPlant(loginName);
    getReplenishMarquee();
    getWorkShopList();
    getProdLineList();
  }, []);

  const searchProps = {
    defPlantIdList,
    plantList,
    workShopList: newWorkShopList,
    prodLineList: newProdLineList,
    selectPlant: handleSelectPlant,
    selectWorkShop: handleSelectWorkShop,
    onClick: handleQuery,
    handleChangeDateTime,
    handleSelectTime,
    handleSelectProdLine,
  };

  return (
    <div id="wrap" className="wrap">
      <div className="header">
        <div className="header-right">
          <Search {...searchProps} />
        </div>
      </div>
      <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={!!loading}>
        <div className="content">
          <Row style={{ flex: 1 }}>
            <Col span={8} style={{ height: "100%" }} className="safe">
              <Title imgUrl={safe} title="安全" />
              <SafeDay safeDataList={safeDate} selectDateTime={selectDateTime} />
            </Col>
            <Col span={16} className="onceOk">
              <Title imgUrl={onceHgl} title="一次合格率" />
              {passRate.length > 0 && <PassRateChart chartId="onceOk" chartDataList={passRate} />}
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="buBan">
              <Title imgUrl={chart} title="补板率" />
              {replenishRate.length > 0 && <ReplenishRateChart chartId="buBan" chartDataList={replenishRate} />}
            </Col>
            <Col span={12} className="buBanOverTime">
              <OutTimeTitle imgUrl={chart} title="补板超时率--" target={replenishTimeoutRate} />
              {replenishTimeoutRate.length > 0 && <TimeOutChart chartId="buBanOverTime" chartDataList={replenishTimeoutRate} />}
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="planOk">
              <Title imgUrl={plan} title="计划达成率" />
              {planDealRate.length > 0 && <PlanChart chartId="planOk" chartDataList={planDealRate} />}
            </Col>
            <Col span={12} className="track">
              <Title imgUrl={track} title="追踪事项" />
              <EventTable trackMatter={trackMatter} closeTrackMatter={getCloseTrackMatter} />
            </Col>
          </Row>
        </div>
      </Spin>
      <div className="footer"><span>{replenishMarquee}</span></div>
    </div>
  );
};

export default connect(({ standingThree, loading }) => ({
  standingThree,
  loading: loading.effects["standingThree/fetchSafeDate"] ||
    loading.effects["standingThree/fetchPassRateByDay"] ||
    loading.effects["standingThree/fetchPassRateByWeek"] ||
    loading.effects["standingThree/fetchPassRateByMonth"] ||
    loading.effects["standingThree/fetchReplenishRateByDay"] ||
    loading.effects["standingThree/fetchReplenishRateByWeek"] ||
    loading.effects["standingThree/fetchReplenishRateByMonth"] ||
    loading.effects["standingThree/fetchReplenishTimeoutRateByDay"] ||
    loading.effects["standingThree/fetchReplenishTimeoutRateByWeek"] ||
    loading.effects["standingThree/fetchReplenishTimeoutRateByMonth"] ||
    loading.effects["standingThree/fetchPlanDealRateByDay"] ||
    loading.effects["standingThree/fetchPlanDealRateByWeek"] ||
    loading.effects["standingThree/fetchPlanDealRateByMonth"] ||
    loading.effects["standingThree/fetchTrackMatter"],
}))(StandingPage);