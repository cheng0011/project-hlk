import React from "react";
import { Select } from "hzero-ui";


const { Option } = Select;

const HeaderRight = ({ defPlantList, plantList, workShopList, selectPlant, selectWorkShop }) => {

  function handleSelectPlant(value) {
    selectPlant(value);
  }

  function handleSelectWorkShop(value) {
    selectWorkShop(value);
  }

  return (
    <div id="header-wrap">
      {defPlantList.length > 0 && (
      <Select
        style={{ width: 150, marginRight: 10 }}
        onSelect={handleSelectPlant}
        optionFilterProp="children"
        defaultValue={Number(defPlantList[0].defPlantId)}
      >
        {
          plantList && plantList.map((item) => (<Option value={item.plantId}>{item.descriptions}</Option>))
        }
      </Select>
)}
      {workShopList.length > 0 && (
        <Select
          style={{ width: 150, marginRight: 10 }}
          onSelect={handleSelectWorkShop}
          defaultValue={workShopList[0].workShopId}
          optionFilterProp="children"
        >
          {
            workShopList.map((item) => (<Option value={item.workShopId}>{item.workShopName}</Option>))
          }
        </Select>
      )}
    </div>
  );
};

export default HeaderRight;