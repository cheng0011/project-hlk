import React, { useEffect } from "react";
import { connect } from "dva";
import { routerRedux } from 'dva/router';

import { Select } from 'hzero-ui';
import MainPage from "../../components/MainPage";
import Time from "../../components/Time";

import "./index.less";

const { Option } = Select;

// 跳转路由所需参数与下拉框的value 映射
const params = {};

const IndexPage = ({ dispatch, anDeng: { indexList } }) => {
  // const indexList = [
  //   {
  //     plantId: 2222,
  //     mapAddress: "dddd.ddd.ddddww/fffff/dddsdsd.png",
  //     chooseCode: "车间一",
  //   },
  //   {
  //     plantId: 2222,
  //     mapAddress: "dddd.ddd.ddddww/fffff/dddsdsd.png",
  //     chooseCode: "车间二",
  //   },
  // ];
  // 跳转页面
  function handleChange(value) {
    const pathname = `/pub/holike-hzero-board/anDengPage/AnDengPage`;
    dispatch(routerRedux.push({
      pathname,
      state: {
        plantId: params[value].plantId,
        mapAddress: `https://${params[value].mapAddress}`,
        mapId: params[value].mapId,
      },
    }));
  }
  function getAnDengList() {
    dispatch({
      type: 'anDeng/fetchAnDengList',
    });
  }
  useEffect(() => {
    getAnDengList();
  }, []);
  return (
    <MainPage
      chineseTitle="安灯&产能"
      englishTitle="Andon&Capacity"
      headerRight={<Time />}
    >
      <div className="selectWrap">
        <Select
          showSearch
          style={{ width: 200 }}
          onSelect={handleChange}
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            indexList && indexList.map((item) => {
              params[item.chooseCode] = { mapAddress: item.mapAddress, plantId: item.plantId, mapId: item.mapId };
              return (<Option value={item.chooseCode}>{item.chooseCode}</Option>);
            })
          }
        </Select>
      </div>
    </MainPage>
  );
};

export default connect(({ anDeng }) => ({ anDeng }))(IndexPage);

