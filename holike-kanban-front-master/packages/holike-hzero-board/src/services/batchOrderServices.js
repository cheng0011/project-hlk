import request from 'utils/request';

// 工厂下拉列表
export async function fetchPlant() {
  return request(`/kanban/v1/report/working-hours/query/plant`, {
    method: 'GET',
  });
}

// 车间下拉框
export async function fetchWorkShop(params) {
  return request(`/kanban/v1/report/working-hours/query/workshop`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 产线下拉框
export async function fetchProdLine(params) {
  return request(`/kanban/v1/report/working-hours/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 报表数据
export async function fetchMainData(params) {
  return request(`/kanban/v1/report/working-hours/query/main/data`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}