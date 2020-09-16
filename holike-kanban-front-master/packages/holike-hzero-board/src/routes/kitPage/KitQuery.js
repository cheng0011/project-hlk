import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Input, Button, message } from "hzero-ui";
import styled from "styled-components";

import MainPage from "../../components/MainPage";
import InfoDetail from "../../components/kitPage/InfoDetail";

import "./kitQuery.less";

const COLOR = [
  "rgba(254,52,110,0.5)", "rgba(0,189,170,0.5)", "rgba(64,0,130,0.5)", "rgba(241,231,182,0.5)", "rgba(207,241,239,0.5)",
  "rgba(251,207,252,0.5)", "rgba(190,121,223,0.5)", "rgba(210,250,251,0.5)", "rgba(255,163,77,0.5)", "rgba(184,13,87,0.5)",
  "rgba74,71,163,0.5)", "rgba(250,251,164,0.5)", "rgba(237,102,99,0.5)", "rgba(163,247,191,0.5)", "rgba(243,212,212,0.5)",
  "rgba(232,249,233,0.5)", "rgba(110,87,115,0.5)", "rgba(212,80,121,0.5)", "rgba(48,71,94,0.5)", "rgba(241,243,244,0.5)",
  "rgba(255,164,27,0.5)", "rgba(84,18,59,0.5)", "rgba(136,225,242,0.5)", "rgba(169,255,253,0.5)", "rgba(253,211,101,0.5)",
  "rgba(234,122,251,0.5)", "rgba(140,186,81,0.5)", "rgba(95,108,175,0.5)", "rgba(204,218,70,0.5)", "rgba(66,230,164,0.5)",
];

const { Search } = Input;

// 修改 Button 组件的原样式
const ButtonStyle = styled(Button)`
  background-color: #bbded6;
  border-color: #bbded6;
  &:hover {
    background-color: #8ac6d1;
    border-color: #8ac6d1;
    color: black;
  }
`;

const HeaderRight = ({ queryDetailInfo }) => {
  // const [inputValue, setInputValue] = useState(null);
  function handleSearch(value) {
    queryDetailInfo(value);
  }
  // useEffect(() => {
  // }, [inputValue]);
  return (
    <>
      <Search
        placeholder="批次/子订单/UPI"
        enterButton="查询"
        size="default"
        style={{ width: 300 }}
        onSearch={handleSearch}
      />
    </>
  );
};

const FooterRight = ({ alert }) => {
  const [hidden, setHidden] = useState(false);
  function handleClick() {
    setHidden(true);
  }

  return hidden ? null : (
    <div className="alert">
      <span className="message">{alert}</span>
      <ButtonStyle size="small" onClick={handleClick}>关闭</ButtonStyle>
    </div>
  );
};

const KitPage = ({ dispatch, location: { state: { mapAddress, mapId } }, kitting: { basicInfoList, detailInfoList } }) => {
  const alert = "工位加工量/工位派工量/大工序派工量/大工序总量";
  const [lookupCodeList, setLookupCodeList] = useState([]);
  const [colorDict, setColorDict] = useState({});
  // 获取基础信息
  function getKittingInfo() {
    dispatch({
      type: 'kitting/fetchBasicInfo',
      payload: {
        mapId,
      },
    }).then((res) => {
      const temp = [];
      const colorTemp = [];
      const colorObj = {};
      res.rows.forEach(item => {
        temp.push(item.lookupCode);
        colorTemp.push(item.additionCode);
      });
      Array.from(new Set(colorTemp)).forEach((item, index) => {
        colorObj[`${item}`] = COLOR[index];
      });
      setLookupCodeList(temp);
      setColorDict(colorObj);
    });
  }
  // 查询详情信息
  function queryDetailInfo(inputString) {
    dispatch({
      type: 'kitting/fetchDetailInfo',
      payload: {
        inputString,
        lookupCodeList,
      },
    }).then(res => {
      if (!res.success) {
        message.error(res.message);
      }
    });
  }

  useEffect(() => {
    getKittingInfo();
  }, [mapId]);
  return (
    <MainPage
      chineseTitle="齐套查询"
      englishTitle="kitting Query"
      imageUrl={mapAddress}
      headerRight={<HeaderRight queryDetailInfo={queryDetailInfo} />}
      footerRight={<FooterRight alert={alert} />}
    >
      {
        basicInfoList && basicInfoList.map((item) => {
          return (
            <InfoDetail nodeInfo={item} detailInfoList={detailInfoList} colorDict={colorDict} />
          );
        })
      }
    </MainPage>
  );
};

export default connect(({ kitting }) => ({ kitting }))(KitPage);