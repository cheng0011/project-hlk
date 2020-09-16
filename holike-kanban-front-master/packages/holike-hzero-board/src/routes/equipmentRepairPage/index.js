import React, { useEffect } from "react";
import { connect } from "dva";

import MainPage from "../../components/MainPage";
import RepairTable from "../../components/equipmentRepairPage/RepairTable";
import Time from "../../components/Time";

const IndexPage = ({ dispatch, equipment: { equipmentList } }) => {
  // 获取设备报修列表信息
  const getEquipmentList = () => {
    dispatch({
      type: "equipment/fetchEquipmentList",
    });
  };

  useEffect(() => {
    getEquipmentList();
  }, []);

  return (
    <MainPage chineseTitle="设备报修情况" englishTitle="Equipment Repair" headerRight={<Time />}>
      <RepairTable equipmentList={equipmentList} />
    </MainPage>
  );
};

export default connect(({ equipment }) => ({ equipment }))(IndexPage);