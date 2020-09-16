import request from 'utils/request';

// 查询工厂下拉列表
export async function fetchPlantList() {
  return request(`/kanban/v1/staff/distribution/kanban/query/drop/down/list`, {
    method: 'GET',
  });
}

// 查询车间下拉列表
export async function fetchWorkShopList(params) {
  return request(`/kanban/v1/staff/distribution/kanban/query/work/shop`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询看板显示信息
export async function fetchKanbanData(params) {
  return request(`/kanban/v1/staff/distribution/kanban/query/kanban/data`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询坐标信息
export async function fetchMapPoint(params) {
  return request(`/kanban/v1/staff/distribution/kanban/query/map/point`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询机修房人员信息
export async function fetchMachineUserList() {
  return request(`/kanban/v1/staff/distribution/kanban/query/map/machineuser`, {
    method: 'GET',
  });
}