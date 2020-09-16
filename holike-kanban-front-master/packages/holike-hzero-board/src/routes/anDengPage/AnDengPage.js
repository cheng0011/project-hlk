import React, { useState, useEffect } from "react";
import { Select, Checkbox, message, DatePicker } from "hzero-ui";
import { connect } from "dva";

import MainPage from "../../components/MainPage";
import MessageCard from "../../components/anDengPage/MessageCard";

const { Option } = Select;

const info = () => {
  message.info('未查询到数据');
};

const HeaderRight = (props) => {
  const {
    productLineList,
    changeProductLine,
    toggleAnDeng,
    togglePower,
    setSelectOne,
    setSelectTwo,
    selectOne,
    selectTwo,
    setSelectStartDateTime,
    selectStartDateTime,
    setSelectEndDateTime,
    selectEndDateTime,
  } = props;
  function onSelect(value) {
    if(selectTwo == null || selectTwo === ''){
      setSelectOne(value);
    }else{
      setSelectOne(value);
      changeProductLine(value, selectTwo, selectStartDateTime, selectEndDateTime);
    }
  }
  function onSelectTwo(value) {
    // 如果第一个选择框没有选择，则不发送请求
    if(selectOne == null || selectOne === '') {
      setSelectTwo(value);
    }else{
      setSelectTwo(value);
      changeProductLine(selectOne, value, selectStartDateTime, selectEndDateTime);
    }
  }
  function onChangeAnDeng(e) {
    toggleAnDeng(e.target.checked);
  }
  function onChangePower(e) {
    togglePower(e.target.checked);
  }

  function handleChangeDateTime(value, dataString) {
    console.log("start dataString:", dataString);
    setSelectStartDateTime(dataString);
  }

  function handleChangeEndDateTime(value, dataString) {
    console.log("end dataString:", dataString);
    setSelectEndDateTime(dataString);
  }

  /**
   * 当选取开始时间成功后
   */
  function handleOkTime() {
    console.log("SelectStartDateTime:", selectStartDateTime);
    const flag = selectOne !== null && selectOne !== '' && selectTwo !== null && selectTwo !== '' ;
    if(flag){
      changeProductLine(selectOne, selectTwo, selectStartDateTime, selectEndDateTime);
    }
  }

  /**
   * 当选取结束时间成功后
   */
  function handleOkEndTime() {
    console.log("SelectEndDateTime:", selectEndDateTime);
    const flag = selectOne !== null && selectOne !== '' && selectTwo !== null && selectTwo !== '' ;
    if(flag){
      changeProductLine(selectOne, selectTwo, selectStartDateTime, selectEndDateTime);
    }
  }
  return (
    <>
      <Select
        showSearch
        style={{ width: 150, marginRight: 10 }}
        placeholder="请选择产线"
        onSelect={onSelect}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          productLineList && productLineList.map((item) => (<Option value={item.prodLineId}>{item.descriptions}</Option>))
        }
      </Select>
      <Select
        showSearch
        style={{ width: 150, marginRight: 10 }}
        placeholder='请选择维度'
        onSelect={onSelectTwo}
      >
        <Option value='currentDate'>当日</Option>
        <Option value='shift'>当班次</Option>
      </Select>
      <DatePicker
        onOk={handleOkTime}
        onChange={handleChangeDateTime}
        showTime

        format="YYYY-MM-DD HH:mm:ss"
        style={{ width: 150, marginRight: 10 }}
      />
      <DatePicker
        onOk={handleOkEndTime}
        onChange={handleChangeEndDateTime}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        style={{ width: 150, marginRight: 10 }}
      />
      <Checkbox style={{ color: "#b2dffb" }} defaultChecked onChange={onChangeAnDeng}>安灯</Checkbox>
      <Checkbox style={{ color: "#b2dffb" }} defaultChecked onChange={onChangePower}>产能</Checkbox>
    </>
  );
};

const AnDengPage = ({ dispatch, location: { state: { plantId, mapAddress, mapId } }, anDeng: { productLineList, boardNodeList } }) => {
  // 安灯 check 状态
  const [anDengType, setAnDengType] = useState(true);
  // 产能 check 状态
  const [powerType, setPowerType] = useState(true);

  // 选择框1的值
  const [selectOne, setSelectOne] = useState('');
  // 选择框2的值
  const [selectTwo, setSelectTwo] = useState('');

  // 开始时间
  const [selectStartDateTime, setSelectStartDateTime] = useState("");
  // 结束时间
  const [selectEndDateTime, setSelectEndDateTime] = useState("");


  useEffect(() => {
    getProductLineList();
    getNodeInfo(mapId);
  }, [mapId]);
  // 获取生产线下拉框列表数据
  function getProductLineList() {
    dispatch({
      type: 'anDeng/fetchProductLineList',
      payload: { mapId, plantId },
    });
  }
  // 获取圆点信息
  function getNodeInfo(x, y = null, z = null, a = null, b = null) {
    dispatch({
      type: 'anDeng/fetchBoardList',
      payload: {
        mapId: x,
        prodLineId: y,
        dimension: z,
        startDate: a,
        endDate: b,
      },
    }).then(res=>{
      if(res.rows.length===0) {
        info();
      }
    });
  }
  // 选择生产线
  function handleChangeProductLine(prodLineId, dimension = null, startDate = null, endDate = null) {
    getNodeInfo(mapId, prodLineId, dimension, startDate, endDate);
  }
  // 点击安灯复选框
  function toggleAnDeng(value) {
    setAnDengType(value);
  }
  // 点击产能复选框
  function togglePower(value) {
    setPowerType(value);
  }
  return (
    <MainPage
      headerRight={
        <HeaderRight
          productLineList={productLineList}
          toggleAnDeng={toggleAnDeng}
          togglePower={togglePower}
          changeProductLine={handleChangeProductLine}
          setSelectOne={setSelectOne}
          setSelectTwo={setSelectTwo}
          selectOne={selectOne}
          selectTwo={selectTwo}
          setSelectStartDateTime={setSelectStartDateTime}
          selectStartDateTime={selectStartDateTime}
          setSelectEndDateTime={setSelectEndDateTime}
          selectEndDateTime={selectEndDateTime}
        />
      }
      chineseTitle="安灯&产能"
      englishTitle="Andon&Capacity"
      imageUrl={mapAddress}
    >
      {
        boardNodeList && boardNodeList.map((item) => {
          return (
            <MessageCard nodeInfo={item} anDengType={anDengType} powerType={powerType} />
          );
        })
      }
    </MainPage>
  );
};

export default connect(({ anDeng }) => ({ anDeng }))(AnDengPage);
