import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { message } from "hzero-ui";
import { getCurrentUser } from 'utils/utils';

import MainPage from "../../components/MainPage";
import FooterLeft from "../../components/distributionPage/FooterLeft";
import HeaderRight from "../../components/distributionPage/HeaderRight";
import PersonPosition from "../../components/distributionPage/PersonPosition";

const info = () => {
  message.info('未查询到数据');
};

// 获取用户名
const { loginName } = getCurrentUser();

const IndexPage = ({ dispatch, distribution }) => {
  const {
    defPlantList, // 默认工厂
    plantList, // 工厂下拉列表数据
    workShopList, // 车间下拉列表数据
    kanbanDataList, // 看板显示数据
    mapPointList, // 坐标
    machineUserList, // 机修房人员
  } = distribution;

  const [imgUrl, setImgUrl] = useState("");

  // 获取默认工厂
  const getdefPlantList = (userName) => {
    dispatch({
      type: "distribution/fetchDefPlantList",
      payload: {
        userName,
      },
    }).then(res => {
      if (res && res.length > 0) {
        getPlantList();
        getWorkShopList(res[0].defPlantId);
      }
    });
  };

  // 获取工厂列表信息
  const getPlantList = () => {
    dispatch({
      type: "distribution/fetchPlantList",
    });
  };

  // 获取车间列表信息
  const getWorkShopList = (plantId) => {
    dispatch({
      type: "distribution/fetchWorkShopList",
      payload: {
        plantId,
      },
    }).then((res) => {
      if (typeof res === "object") {
        const { mapAddress, workShopId } = res.rows[0];
        setImgUrl(`https://${mapAddress}`);
        // 当车间Id不等于空的时候才去获取看板数据
        if(!(workShopId === null || workShopId === '')){
          getKanbanData(workShopId);
        }
      };
    });
  };

  // 获取看板显示信息
  const getKanbanData = (workshopId) => {
    dispatch({
      type: "distribution/fetchKanbanData",
      payload: {
        workshopId,
      },
    }).then((res) => {
      if (typeof res === "object") {
        if (res.rows.length > 0) {
          const { wkcId } = res.rows[0];
          getMapPoint(wkcId);
        } else {
          info();
        }
      };
    });
  };

  // 获取坐标
  const getMapPoint = (wkcId) => {
    dispatch({
      type: "distribution/fetchMapPoint",
      payload: {
        wkcId,
      },
    });
  };

  // 获取机修房人员信息
  const getMachineUserList = () => {
    dispatch({
      type: "distribution/fetchMachineUserList",
    });
  };

  // 选择车间切换
  function handleSelectWorkShop(value) {
    workShopList.forEach((item) => {
      if (item.workShopId === value) {
        setImgUrl(`https://${item.mapAddress}`);
      }
    });
    getKanbanData(value);
  }
  // 选择工厂切换
  function handleSelectPlant(value) {
    getWorkShopList(value);
  }

  useEffect(() => {
    getdefPlantList(loginName);
    getMachineUserList();
  }, []);

  const headerRightProps = {
    defPlantList,
    plantList,
    workShopList,
    selectPlant: handleSelectPlant,
    selectWorkShop: handleSelectWorkShop,
  };

  return (
    <MainPage
      chineseTitle="机修人员分布"
      englishTitle="Mechanics's distribution"
      imageUrl={imgUrl}
      headerRight={<HeaderRight {...headerRightProps} />}
      footerLeft={<FooterLeft machineUserList={machineUserList} />}
    >
      {
        kanbanDataList.length > 0 && mapPointList.length > 0 && kanbanDataList.map((item, index) => {
          return (
            <PersonPosition kanbanData={item} mapPoint={mapPointList[index]} />
          );
        })
      }
    </MainPage>
  );
};

export default connect(({ distribution }) => ({ distribution }))(IndexPage);
