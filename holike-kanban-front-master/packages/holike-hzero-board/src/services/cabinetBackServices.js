import request from 'utils/request';

// 查询工厂
export async function fetchPlant() {
  return request(`/kanban/backplane/capacity/report/query/plant`, {
    method: 'GET',
  });
}

// 查询车间
export async function fetchWorkShop(params) {
  return request(`/kanban/backplane/capacity/report/query/workshop`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询产线
export async function fetchProdLine(params) {
  return request(`/kanban/backplane/capacity/report/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询工序
export async function fetchStandardType(params) {
  return request(`/kanban/backplane/capacity/report/query/standard/type`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询主数据信息
export async function fetchMainData(params) {
  return request(`/kanban/backplane/capacity/report/query/main/data`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}