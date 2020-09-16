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

const IndexPage = ({ dispatch, kitting }) => {
  // 跳转页面
  function handleChange(value) {
    const pathname = `/pub/holike-hzero-board/kitPage/kitQuery`;
    dispatch(routerRedux.push({
      pathname,
      state: {
        mapAddress: `https://${params[value].mapAddress}`,
        mapId: params[value].mapId,
      },
    }));
  }
  function getAnDengList() {
    dispatch({
      type: 'kitting/fetchKittingList',
    });

  }
  useEffect(() => {
    getAnDengList();
  }, []);
  return (
    <MainPage chineseTitle="齐套查询" englishTitle="kitting Query" headerRight={<Time />}>
      <div className="selectWrap">
        <Select
          showSearch
          style={{ width: 200 }}
          onChange={handleChange}
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            kitting.list && kitting.list.map((item) => {
              params[item.chooseCode] = { mapAddress: item.mapAddress, mapId: item.mapId };
              return (<Option value={item.chooseCode}>{item.chooseCode}</Option>);
            })
          }
        </Select>
      </div>
    </MainPage>
  );
};

export default connect(({ kitting }) => ({ kitting }))(IndexPage);

