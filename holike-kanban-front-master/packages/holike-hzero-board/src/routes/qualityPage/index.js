import React, { useState, useEffect } from "react";
import { Spin, Select, Button, Row, Col } from "hzero-ui";
import { connect } from "dva";

import "./index.less";
import ksl from "../../assets/icons/quality-ksl.png";
import rykq from "../../assets/icons/quality-rykq.png";
import sbbx from "../../assets/icons/quality-sbbx.png";
import cjbb from "../../assets/icons/quality-cjbb.png";
import zchgl from "../../assets/icons/quality-zchgl.png";
import Title from "../../components/Title";
import CustomerChart from "../../components/qualityPage/CustomerChart";
import QualityChart from "../../components/qualityPage/QualityChart";
import AttentionChart from "../../components/qualityPage/AttentionChart";
import RepairChart from "../../components/qualityPage/RepairChart";
import BoardChart from "../../components/qualityPage/BoardChart";
import HolikeLoading from "../../components/holikeLoading";

const { Option } = Select;

const qualityPage = (props) => {
  const {
    dispatch,
    loading,
    quality: {
      plantList, // 工厂下拉列表
      attendanceList, // 人员考勤数据
      customerProsecutionList, // 客诉率数据
      eqRepairDayList, // 报修数据
      qualityControlList, // 制程合格率数据
      replenishBoard, // 车间补板
    },
  } = props;

  const [selectPlantId, setSelectPlantId] = useState(null);

  // 获取所有有效工厂
  function getPlantList() {
    dispatch({
      type: 'quality/fetchPlantList',
    });
  }

  // 获取人员考勤数据
  function getAttendance(plantId) {
    dispatch({
      type: 'quality/fetchAttendance',
      payload: {
        plantId,
      },
    });
  }

  // 获取客诉率数据
  function getCustomerProsecution(plantId) {
    dispatch({
      type: 'quality/fetchCustomerProsecution',
      payload: {
        plantId,
      },
    });
  }

  // 获取车间当月报修数量
  function getEqRepairDay(plantId) {
    dispatch({
      type: 'quality/fetchEqRepairDay',
      payload: {
        plantId,
      },
    });
  }

  // 获取制程合格率数据
  function getQualityControl(plantId) {
    dispatch({
      type: 'quality/fetchQualityControl',
      payload: {
        plantId,
      },
    });
  }
  // 获取制程合格率数据
  function getReplenishBoard(plantId) {
    dispatch({
      type: 'quality/fetchReplenishBoard',
      payload: {
        plantId,
      },
    });
  }

  // 选择工厂
  function handleSelectPlant(value) {
    setSelectPlantId(value);
  }
  // 查询
  function handleClick() {
    getAttendance(selectPlantId);
    getCustomerProsecution(selectPlantId);
    getEqRepairDay(selectPlantId);
    getQualityControl(selectPlantId);
    getReplenishBoard(selectPlantId);
  }

  useEffect(() => {
    getPlantList();
  }, []);
  return (
    <div id="wrap" className="wrap">
      <div className="header">
        <Select
          className="select-center"
          onSelect={handleSelectPlant}
          // defaultValue={selectPlantId}
          style={{ width: 150 }}
          placeholder="工厂"
        >
          {
            plantList && plantList.map((item) => {
              return (<Option value={item.plantId}>{item.plantDesc}</Option>);
            })
          }
        </Select>
        <Button type="primary" onClick={handleClick} style={{ marginLeft: 20 }}>查询</Button>
      </div>
      <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={!!loading}>
        <div className="content">
          <Row style={{ flex: 1 }}>
            <Col span={8} className="quality-ksl">
              <Title title="客诉率" imgUrl={ksl} />
              {customerProsecutionList.length > 0 && <CustomerChart chartId="quality-ksl" chartData={customerProsecutionList} />}
            </Col>
            <Col span={8} className="quality-zchgl">
              <Title title="制程合格率" imgUrl={zchgl} />
              {qualityControlList.length > 0 && <QualityChart chartId="quality-zchgl" chartDataList={qualityControlList} />}
            </Col>
            <Col span={8} className="quality-attention">
              <Title title="人员考勤" imgUrl={rykq} />
              {attendanceList.length > 0 && <AttentionChart chartId="quality-attention" chartDataList={attendanceList} />}
            </Col>
          </Row>
          <Row style={{ flex: 1 }}>
            <Col span={8} className="quality-repair">
              <Title title="设备报修" imgUrl={sbbx} />
              {eqRepairDayList.length > 0 && <RepairChart chartId="quality-repair" chartDataList={eqRepairDayList} />}
            </Col>
            <Col span={16} className="quality-board">
              <Title title="车间补板" imgUrl={cjbb} />
              {Object.keys(replenishBoard).length > 0 && <BoardChart chartId="quality-board" chartData={replenishBoard} />}
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default connect(({ quality, loading }) => ({
  quality,
  loading: loading.effects["quality/fetchAttendance"] ||
    loading.effects["quality/fetchCustomerProsecution"] ||
    loading.effects["quality/fetchEqRepairDay"] ||
    loading.effects["quality/fetchQualityControl"] ||
    loading.effects["quality/fetchReplenishBoard"],
}))(qualityPage);