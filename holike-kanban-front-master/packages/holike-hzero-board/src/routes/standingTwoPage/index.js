import React, { useState, useEffect } from "react";
import { Spin, Button, Select, DatePicker, Row, Col, message } from "hzero-ui";
import { getCurrentUser } from 'utils/utils';
import { connect } from "dva";
import moment from 'moment';
import { dateFormat } from "../../utils/utils";

import HolikeLoading from "../../components/holikeLoading";
import Title from "../../components/Title";
import EventTable from "../../components/standingTwoPage/EventTable";
import SafeTable from "../../components/standingTwoPage/SafeTable";
import Output from "../../components/standingTwoPage/Output";
import Inspect from "../../components/standingTwoPage/Inspect";
import Attention from "../../components/standingTwoPage/Attention";
import PatchBoard from "../../components/standingTwoPage/PatchBoard";
import PassRate from "../../components/standingTwoPage/PassRate";
import ddd from "../../assets/icons/ddd.png";
import Attendance from "../../assets/icons/attendance.png";
import track from "../../assets/icons/track.png";
import safe from "../../assets/icons/safe.png";
import check from "../../assets/icons/check.png";
import chart from "../../assets/icons/chart.png";
import "./index.less";

const { Option } = Select;

const StandingTwoPage = (props) => {
  const {
    dispatch,
    loading,
    standingTwo: {
      defPlant, // 当前用户默认工厂ID
      plantList, // 工厂列表
      prodLineList, // 产线列表
      safeData, // 安全看板
      inspect, // 点检
      output, // 产量
      attendance, // 考勤
      patchBoard, // 补板
      patchBoardTargetValue, // 补板目标值
      yields, // 良品
      yieldTargetValue, // 直通率目标值
      trackMatter, // 追踪事项
      bottomLabel, // 走马灯
    },
  } = props;
  const [showType, setShowType] = useState("area");
  const [selectPlantId, setSelectPlantId] = useState(null);
  const [selectProdId, setSelectProdId] = useState(null);
  const [selectDateTime, setSelectDateTime] = useState("");
  // 获取用户名
  const { loginName } = getCurrentUser();

  // 获取工厂下拉列表
  function getPlantList(userName) {
    dispatch({
      type: "standingTwo/fetchPlant",
      payload: {
        userName,
      },
    });
  }

  // 获取默认工厂
  function getDefPlant(userName) {
    dispatch({
      type: "standingTwo/fetchDefPlantId",
      payload: {
        userName,
      },
    }).then((res) => {
      if (res.length > 0) {
        const { defPlantId } = res[0];
        setSelectPlantId(defPlantId);
        getPlantList(loginName);
        getProdLineList(loginName, defPlantId);
        getBottomLabel(defPlantId);
      }
    });
  }

  // 获取产线下拉列表数据
  function getProdLineList(userName, plantId) {
    dispatch({
      type: "standingTwo/fetchProdLine",
      payload: {
        userName,
        plantId,
      },
    }).then(res => {
      if (res.length === 0) {
        setSelectProdId(null);
        message.info("该工厂下暂无产线");
      }
    });
  }

  // 获取安全看板数据
  function getSafeDate(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchSafeData",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取点检看板数据
  function getInspect(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchInspect",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取产量数据
  function getOutput(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchOutput",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取考勤数据
  function getAttendance(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchAttendance",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取补板数据
  function getPatchBoard(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchPatchBoard",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取补板目标值
  function getPatchBoardTargetValue() {
    dispatch({
      type: "standingTwo/fetchPatchBoardTargetValue",
    });
  }

  // 获取良品数据
  function getYield(plantId, prodLineId, selectDate) {
    dispatch({
      type: "standingTwo/fetchYield",
      payload: {
        plantId,
        prodLineId,
        selectDate: selectDate || dateFormat(new Date(), "yyyy-MM-dd"),
      },
    });
  }

  // 获取直通率目标值
  function getYieldTargetValue() {
    dispatch({
      type: "standingTwo/fetchYieldTargetValue",
    });
  }


  // 获取追踪事项
  function getTrackMatter(prodLineId) {
    dispatch({
      type: "standingTwo/fetchTrackMatter",
      payload: {
        prodLineId,
      },
    });
  }

  // 事件升级
  function getUpgradeMatter(eventId, useName) {
    dispatch({
      type: "standingTwo/fetchUpgradeMatter",
      payload: {
        eventId,
        useName,
      },
    });
  }

  // 事件关闭
  function getCloseTrackMatter(eventId, reasonAnalyzeDesc, userName) {
    return dispatch({
      type: "standingTwo/fetchCloseTrackMatter",
      payload: {
        eventId,
        reasonAnalyzeDesc,
        userName,
      },
    }).then(() => {
      getTrackMatter(selectProdId);
      return Promise.resolve(true);
    });
  }

  // 获取底部标签
  function getBottomLabel(plantId) {
    dispatch({
      type: "standingTwo/fetchBottomLabel",
      payload: {
        plantId,
      },
    });
  }

  // 点击面积按钮
  function handleSetArea() {
    setShowType("area");
  }
  // 点击任务按钮
  function handleSetTask() {
    setShowType("task");
  }
  // 选择工厂
  function handleSelectPlant(value) {
    getProdLineList(loginName, value);
    getBottomLabel(value);
    setSelectPlantId(value);
  }

  // 选择产线
  function handleSelectProdLine(value) {
    setSelectProdId(value);
  }

  // 选择时间
  function handleChangeDateTime(value, dataString) {
    setSelectDateTime(dataString);
  }

  // 点击查询按钮
  function handleQuery() {
    if (selectProdId) {
      getSafeDate(selectPlantId, selectProdId, selectDateTime);
      getInspect(selectPlantId, selectProdId, selectDateTime);
      getOutput(selectPlantId, selectProdId, selectDateTime);
      getAttendance(selectPlantId, selectProdId, selectDateTime);
      getPatchBoard(selectPlantId, selectProdId, selectDateTime);
      getYield(selectPlantId, selectProdId, selectDateTime);
      getTrackMatter(selectProdId);
    } else {
      message.error("产线不能为空!");
    }
  }

  useEffect(() => {
    getDefPlant(loginName);
    getPatchBoardTargetValue();
    getYieldTargetValue();
  }, []);

  return (
    <div id="wrap" className="wrap">
      <div className="header">
        <div className="header-left">
          <Button onClick={handleSetArea} type="default">按面积</Button>
          <Button onClick={handleSetTask} type="default">按任务</Button>
        </div>
        <div className="header-right">
          {
            defPlant.length > 0 && (
              <Select
                style={{ width: "12%", marginLeft: 20 }}
                onSelect={handleSelectPlant}
                allowClear
                defaultValue={defPlant[0].defPlantId}
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
          {prodLineList.length > 0 && (
            <Select
              style={{ width: "12%", marginLeft: 20 }}
              onSelect={handleSelectProdLine}
              onChange={handleSelectProdLine}
              allowClear
              disabled={!selectPlantId}
              placeholder="选择产线"
            >
              {
                prodLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
              }
            </Select>
          )
          }
          <DatePicker
            onChange={handleChangeDateTime}
            defaultValue={moment(new Date(), "YYYY-MM-DD")}
            format="YYYY-MM-DD"
            style={{ width: "14%", marginLeft: 20 }}
          />
          <Button type="primary" onClick={handleQuery} style={{ marginLeft: 20 }}>查询</Button>
        </div>
      </div>
      <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={!!loading}>
        <div className="content">
          <Row style={{ flex: 1 }}>
            <Col span={12} style={{ height: "100%" }} className="safe">
              <Row style={{ height: "100%" }}>
                <Col span={12}>
                  <Title imgUrl={safe} title="安全" />
                  <SafeTable safeDataList={safeData} selectDateTime={selectDateTime} />
                </Col>
                <Col span={12} className="check-andon-wrap">
                  <Title imgUrl={check} title="点检" />
                  <Inspect inspectList={inspect} />
                </Col>
              </Row>
            </Col>
            <Col span={12} className="standing-two-output">
              <Title imgUrl={chart} title="产量(D)" />
              {
                output.length > 0 && <Output chartId="standing-two-output" chartDataList={output} showType={showType} />
              }
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="standing-two-attention">
              <Title imgUrl={Attendance} title="考勤" />
              {attendance.length > 0 && <Attention chartDataList={attendance} chartId="standing-two-attention" />}
            </Col>
            <Col span={12} className="standing-two-patch-board">
              <Title imgUrl={chart} title="补板数/补板率--" target={patchBoardTargetValue} />
              {patchBoard.length > 0 && <PatchBoard chartId="standing-two-patch-board" chartDataList={patchBoard} showType={showType} />}
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={12} className="standing-two-passRate">
              <Title imgUrl={ddd} title="直通率(Q)" target={yieldTargetValue} />
              {yields.length > 0 && <PassRate chartId="standing-two-passRate" chartDataList={yields} showType={showType} />}
            </Col>
            <Col span={12} className="track">
              <Title imgUrl={track} title="追踪事项" />
              <EventTable trackMatter={trackMatter} upgradeTrackMatter={getUpgradeMatter} closeTrackMatter={getCloseTrackMatter} />
            </Col>
          </Row>
        </div>
      </Spin>
      <div className="footer"><span>{typeof bottomLabel === "string" ? bottomLabel : ""}</span></div>
    </div>
  );
};

export default connect(({ standingTwo, loading }) => ({
  standingTwo,
  loading: loading.effects["standingTwo/fetchSafeData"] ||
    loading.effects["standingTwo/fetchInspect"] ||
    loading.effects["standingTwo/fetchOutput"] ||
    loading.effects["standingTwo/fetchAttendance"] ||
    loading.effects["standingTwo/fetchPatchBoard"] ||
    loading.effects["standingTwo/fetchYield"] ||
    loading.effects["standingTwo/fetchTrackMatter"],
}))(StandingTwoPage);