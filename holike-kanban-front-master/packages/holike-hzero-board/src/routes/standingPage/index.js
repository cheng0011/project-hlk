import React, { useState, useEffect } from "react";
import { Spin, Button, Select, DatePicker, message, Row, Col } from "hzero-ui";
import { getCurrentUser } from 'utils/utils';
import { connect } from "dva";
import moment from 'moment';
import { dateFormat } from "../../utils/utils";

import HolikeLoading from "../../components/holikeLoading";
import Title from "../../components/Title";
import SafeTable from "../../components/standingPage/SafeTable";
import Inspect from "../../components/standingPage/Inspect";
import Andon from "../../components/standingPage/Andon";
import OutputChart from "../../components/standingPage/OutputChart";
import AttentionChart from "../../components/standingPage/AttentionChart";
import BoardChart from "../../components/standingPage/BoardChart";
import YieldChart from "../../components/standingPage/YieldChart";
import EventTable from "../../components/standingPage/EventTable";
import attendance from "../../assets/icons/attendance.png";
import andon from "../../assets/icons/andon.png";
import check from "../../assets/icons/check.png";
import track from "../../assets/icons/track.png";
import safe from "../../assets/icons/safe.png";
import chart from "../../assets/icons/chart.png";
import "./index.less";

const { Option } = Select;

const OutputTop = ({ dataList, showType }) => {
  let real = 0;
  let total = 0;
  dataList.forEach((item) => {
    // 实际产量
    const temp1 = showType === "area" ? Number(item.assistQty) : Number(item.uomQty);
    // 目标产量
    const temp2 = showType === "area" ? Number(item.hourAssistQty) : Number(item.hourUomQty);
    real += temp1;
    total += temp2;
  });
  return (
    <div style={{ color: "#BF9000", display: "flex" }}>
      <span style={{ marginRight: 5 }}>累计目标产量：{total.toFixed(2)}</span>
      <span style={{ marginRight: 5 }}>累计实际产量：{real.toFixed(2)}</span>
      <span>累计完成率：{(real / total * 100).toFixed(2)}%</span>
    </div>
  );
};

const StandingPage = (props) => {
  const [selectPlantId, setSelectPlantId] = useState("");
  const [selectProdLineId, setSelectProdLineId] = useState("");
  const [selectOpId, setSelectOpId] = useState("");
  const [selectDateTime, setSelectDateTime] = useState("");
  const {
    loading,
    dispatch,
    standing: {
      showType, // 展示方式
      plantList, // 工厂列表
      defPlant, // 默认工厂
      prodLineList, // 产线列表
      opList, // 工序列表
      shiftDataList, // 班次信息
      safeDataList, // 安全看板数据
      inspectList, // 点检数据
      andonList, // 安灯数据
      realTimeOutputList, // 实时产量数据
      attendanceList, // 考勤列表数据
      patchBoardRateList, // 补板率列表数据
      patchBoardTargetValue, // 补板目标值
      yieldRateList, // 良品率列表数据
      yieldtargetValue, // 良品目标值
      trackMatter, // 追踪事项
      bottomLabel, // 底部标签
    },
  } = props;
  // 获取用户名
  const { loginName } = getCurrentUser();

  // 改变展示方式
  function getShowType(type) {
    dispatch({
      type: "standing/changeShowType",
      payload: {
        type,
      },
    });
  }
  // 获取工厂下拉列表
  function getPlantList(userName) {
    dispatch({
      type: "standing/fetchPlantList",
      payload: {
        userName,
      },
    });
  }

  // 获取默认工厂
  function getDefPlant(userName) {
    dispatch({
      type: "standing/fetchDefPlantList",
      payload: {
        userName,
      },
    }).then((res) => {
      const { defPlantId } = res[0];
      if (defPlantId) {
        setSelectPlantId(defPlantId);
        getProdLineList(userName, defPlantId);
        getBottomLabel(defPlantId);
      }
    });
  }

  // 获取产线下拉列表数据
  function getProdLineList(userName, plantId) {
    dispatch({
      type: "standing/fetchProdLineList",
      payload: {
        userName,
        plantId,
      },
    }).then((res) => {
      // let prodLine = null;
      if (res && res.length > 0) {
        const { prodLineId } = res[0];
        // prodLine = prodLineId;
        setSelectProdLineId(prodLineId);
        getOpList(userName, plantId, prodLineId);
        const nowDateTime = dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');
        getShiftDataList(prodLineId, nowDateTime);
      } else {
        message.info("该工厂下暂无相关产线");
        setSelectProdLineId(null);
      }
      // getOpList(userName, plantId, prodLine);
    });
  }

  // 获取工序下拉列表数据
  function getOpList(userName, plantId, prodLineId) {
    dispatch({
      type: "standing/fetchOpList",
      payload: {
        userName,
        plantId,
        prodLineId,
      },
    }).then((res) => {
      if (res && res.length > 0) {
        const { opId } = res[0];
        setSelectOpId(opId);
      } else {
        message.info("该工厂下暂无相关工序");
        setSelectOpId(null);
      }
    });
  }

  // 获取班次信息
  function getShiftDataList(prodLineId, selectDate) {
    dispatch({
      type: "standing/fetchShiftDataList",
      payload: {
        prodLineId,
        selectDate,
      },
    });
  }

  // 获取安全看板数据
  function getSafeDataList(plantId,prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchSafeList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取点检数据
  function getInspectList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchInspectList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取安灯数据
  function getAndonList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchAndonList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取实时产量数据
  function getRealTimeOutputListnList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchRealTimeOutputList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取考勤列表数据
  function getAttendanceList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchAttendanceList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取补板率列表数据
  function getPatchBoardRateList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchPatchBoardRateList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取补板目标值
  function getPatchBoardTargetValue() {
    dispatch({
      type: "standing/fetchPatchBoardTargetValue",
    });
  }

  // 获取良品率列表数据
  function getYieldRateList(plantId, prodLineId, opId, selectDate) {
    dispatch({
      type: "standing/fetchYieldRateList",
      payload: {
        plantId,
        prodLineId,
        opId,
        selectDate: selectDate || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // selectDate: selectDate || "2020-02-11 19:00:00",
      },
    });
  }

  // 获取良品目标值
  function getYieldtargetValue() {
    dispatch({
      type: "standing/fetchYieldtargetValue",
    });
  }

  // 获取追踪事项
  function getTrackMatter(opId) {
    dispatch({
      type: "standing/fetchTrackMatter",
      payload: {
        opId,
      },
    });
  }

  // 事件关闭
  function getCloseTrackMatter(eventId, reasonAnalyzeDesc, userName) {
    return dispatch({
      type: "standing/fetchCloseTrackMatter",
      payload: {
        eventId,
        reasonAnalyzeDesc,
        userName,
      },
    }).then(() => {
      getTrackMatter(selectOpId);
      return Promise.resolve(true);
    });
  }

  // 事件升级
  function getUpgradeTrackMatter(eventId, userName) {
    return dispatch({
      type: "standing/fetchUpgradeTrackMatter",
      payload: {
        eventId,
        userName,
      },
    }).then(() => {
      getTrackMatter(selectOpId);
      return Promise.resolve(true);
    });
  }

  // 获取底部标签
  function getBottomLabel(plantId) {
    return dispatch({
      type: "standing/fetchBottomLabel",
      payload: {
        plantId,
      },
    });
  }
  // 选择工厂
  function handleSelectPlant(value) {
    setSelectPlantId(value);
    // 重新获取产线列表数据
    getProdLineList(loginName, value);
    if (selectProdLineId) {
      getOpList(loginName, value, selectProdLineId);
    }
    getBottomLabel(value);
  }

  // 选择产线
  function handleSelectProdLine(value) {
    setSelectProdLineId(value);
    getOpList(loginName, selectPlantId, value);
    // 重新获取班次信息
    const nowDateTime = selectDateTime || dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');
    getShiftDataList(value, nowDateTime);
  }

  // 选择工序
  function handleSelectOp(value) {
    setSelectOpId(value);
  }

  function handleOkTime() {
    getShiftDataList(selectProdLineId, selectDateTime);
  }

  function handleChangeDateTime(value, dataString) {
    setSelectDateTime(dataString);
  }

  // 点击查询按钮
  function handleQuery() {
    getSafeDataList(selectPlantId,selectProdLineId, selectOpId, selectDateTime);
    getInspectList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getAndonList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getRealTimeOutputListnList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getAttendanceList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getPatchBoardRateList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getYieldRateList(selectPlantId, selectProdLineId, selectOpId, selectDateTime);
    getTrackMatter(selectOpId);
  }
  // 点击按面积按钮
  function handleArea() {
    getShowType("area");
  }
  function handleTask() {
    getShowType("task");
  }
  // 初始化获取工厂下拉数据和默认工厂
  useEffect(() => {
    getDefPlant(loginName);
    getPlantList(loginName);
    getPatchBoardTargetValue();
    getYieldtargetValue();
  }, []);

  return (
    <div id="wrap" className="wrap">
      <div className="header">
        <div className="header-left">
          <Button onClick={handleArea} type="default">按面积</Button>
          <Button onClick={handleTask} type="default">按任务</Button>
        </div>
        <div className="header-right">
          {
            defPlant.defPlantId && (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                onSelect={handleSelectPlant}
                allowClear
                defaultValue={defPlant.defPlantId}
                placeholder="工厂"
              >
                {
                  plantList && plantList.map((item) => {
                    return (<Option value={item.plantId}>{item.plantDesc}</Option>);
                  })
                }
              </Select>
            )
          }
          {
            prodLineList.length > 0 && (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                allowClear
                defaultValue={prodLineList[0].prodLineId}
                value={selectProdLineId}
                placeholder="选择产线"
                onSelect={handleSelectProdLine}
              >
                {
                  prodLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
                }
              </Select>
            )
          }

          {
            opList.length > 0 && (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                onSelect={handleSelectOp}
                allowClear
                defaultValue={opList[0].opId}
                value={selectOpId}
                placeholder="选择工序"
              >
                {
                  opList.map((item) => (<Option value={item.opId}>{item.opDesc}</Option>))
                }
              </Select>
            )
          }
          <DatePicker
            onOk={handleOkTime}
            onChange={handleChangeDateTime}
            showTime
            defaultValue={moment(new Date(), "YYYY-MM-DD HH:mm:ss")}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: "14%", marginLeft: 20 }}
          />
          {
            shiftDataList.length > 0 ? (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                allowClear
                defaultValue={shiftDataList[0].shiftCode}
                value={shiftDataList[0].shiftCode}
                placeholder="选择班次"
              >
                {
                  shiftDataList.map((item) => (<Option disabled="true" value={item.shiftCode}>{item.shiftDesc}</Option>))
                }
              </Select>
            ) : (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                allowClear
                placeholder="选择班次"
              />
              )
          }
          <Button type="primary" onClick={handleQuery} style={{ marginLeft: 20 }}>查询</Button>
        </div>
      </div>
      <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={!!loading}>
        <div className="content">
          <Row style={{ flex: 1 }}>
            <Col span={12} style={{ height: "100%" }}>
              <Row style={{ height: "100%" }}>
                <Col span={10} className="safe">
                  <Title imgUrl={safe} title="安全" />
                  <SafeTable safeDataList={safeDataList} selectDateTime={selectDateTime} />
                </Col>
                <Col span={14} className="check-andon-wrap">
                  <div className="check">
                    <Title imgUrl={check} title="点检" />
                    <Inspect inspectList={inspectList} />
                  </div>
                  <div className="andon">
                    <Title imgUrl={andon} title="ANDON" />
                    <Andon andonList={andonList} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="output">
              <Title imgUrl={chart} title="实时产量/完成率(D)" />
              {
                realTimeOutputList.length > 0 && (
                  <>
                    <OutputTop dataList={realTimeOutputList} showType={showType} />
                    <OutputChart chartId="output" chartDataList={realTimeOutputList} showType={showType} />
                  </>
                )
              }
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="attendance">
              <Title imgUrl={attendance} title="考勤" />
              {attendanceList.length > 0 && <AttentionChart chartId="attendance" chartDataList={attendanceList} />}
            </Col>
            <Col span={12} className="add-board">
              <Title imgUrl={chart} title="补板数/补板率-" target={patchBoardTargetValue} />
              {patchBoardRateList.length > 0 && <BoardChart chartId="add-board" chartDataList={patchBoardRateList} showType={showType} />}
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="good-quality">
              <Title imgUrl={chart} title="不良品数/良品率-" target={yieldtargetValue} />
              {yieldRateList.length > 0 && <YieldChart chartId="good-quality" chartDataList={yieldRateList} showType={showType} />}
            </Col>
            <Col span={12} className="track">
              <Title imgUrl={track} title="追踪事项" />
              <EventTable trackMatter={trackMatter} upgradeTrackMatter={getUpgradeTrackMatter} closeTrackMatter={getCloseTrackMatter} />
            </Col>
          </Row>
        </div>
      </Spin>
      <div className="footer"><span>{typeof bottomLabel === "string" ? bottomLabel : ""}</span></div>
    </div>
  );
};

export default connect(({ standing, loading }) => ({
  standing,
  loading: loading.effects["standing/fetchSafeList"] ||
    loading.effects["standing/fetchInspectList"] ||
    loading.effects["standing/fetchAndonList"] ||
    loading.effects["standing/fetchRealTimeOutputList"] ||
    loading.effects["standing/fetchAttendanceList"] ||
    loading.effects["standing/fetchPatchBoardRateList"] ||
    loading.effects["standing/fetchYieldRateList"] ||
    loading.effects["standing/fetchTrackMatter"],
}))(StandingPage);
