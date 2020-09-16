import request from 'utils/request';

// 板件属性报表数据
export async function fetchBoardAttr(params) {
  return request(`/kanban/v1/upi-property/main-query`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}