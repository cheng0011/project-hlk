import request from 'utils/request';

// 齐套查询首页下拉列表
export async function fetchKittingList() {
  return request(`/kanban/v1/andon/capacity/kanban/query/drop/down/list`, {
    method: 'GET',
  });
}

// 齐套查询基础信息
export async function fetchBasicInfo(params) {
  return request(`/kanban/kitting/query/kanban/query/basic/info`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 齐套查询详情信息
export async function fetchDetailInfo(params) {
  return request(`/kanban/kitting/query/kanban/query/detail/info`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}