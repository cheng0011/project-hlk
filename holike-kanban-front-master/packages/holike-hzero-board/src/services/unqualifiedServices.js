import request from 'utils/request';

// 查询车间下拉列表
export async function fetchWorkShop() {
  return request(`/kanban/v1/disqualified/info/inquire/query/workshop/down/list`, {
    method: 'GET',
  });
}

// 查询产线下拉列表
export async function fetchProdLine(params) {
  return request(`/kanban/v1/disqualified/info/inquire/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询完工类型
export async function fetchCompleteType() {
  return request(`/kanban/v1/disqualified/info/inquire/query/complete/type`, {
    method: 'GET',
  });
}

// 查询不合格信息
export async function fetchUnqualifiedInfo(params) {
  return request(`/kanban/v1/disqualified/info/inquire/query/disqualified/information`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

