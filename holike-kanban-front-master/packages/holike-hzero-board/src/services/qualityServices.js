import request from 'utils/request';

// 查询工厂下拉列表数据
export async function fetchPlantList() {
  return request(`/kanban/KpiEqRepair/kanban/queryPlant`, {
    method: 'GET',
  });
}

// 查询人员考勤数据
export async function fetchAttendance(params) {
  return request(`/kanban/v1/titan-qms/kanban/query/attendance`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询客诉率数据
export async function fetchCustomerProsecution(params) {
  return request(`/kanban/v1/titan-qms/kanban/query/customer-prosecution`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询车间当月报修数量
export async function fetchEqRepairDay(params) {
  return request(`/kanban/v1/titan-qms/kanban/query/eq-repair-day`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询制程合格率数据
export async function fetchQualityControl(params) {
  return request(`/kanban/v1/titan-qms/kanban/query/quality-control`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询车间补板数量
export async function fetchReplenishBoard(params) {
  return request(`/kanban/v1/titan-qms/kanban/query/replenish-board`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}