import request from 'utils/request';

// 查询默认工厂
export async function fetchDefPlantId(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryDefPlantId`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询工厂下拉列表数据
export async function fetchPlantList() {
  return request(`/kanban/v1/L3/standing/kanban/query/queryPlantDownListData`, {
    method: 'GET',
  });
}

// 查询车间下拉列表数据
export async function fetchWorkShopList() {
  return request(`/kanban/v1/L3/standing/kanban/queryWorkShop`, {
    method: 'GET',
  });
}

// 查询产线下拉列表数据
export async function fetchProdLineList() {
  return request(`/kanban/v1/L3/standing/kanban/query/queryProdLineDownListData`, {
    method: 'GET',
  });
}

// 查询不安全日期
export async function fetchSafeDate(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/querySafeDate`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询不合格数-按天
export async function fetchPassRateByDay(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/QueryPassRateByDay`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询不合格数-按周
export async function fetchPassRateByWeek(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/QueryPassRateByWeek`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询不合格数-按月
export async function fetchPassRateByMonth(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/QueryPassRateByMonth`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补板率-按天
export async function fetchReplenishRateByDay(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishRateByDay`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补板率-按周
export async function fetchReplenishRateByWeek(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishRateByWeek`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补板率-按月
export async function fetchReplenishRateByMonth(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishRateByMonth`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补超时板率-按天
export async function fetchReplenishTimeoutRateByDay(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishTimeoutRateByDay`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补超时板率-按周
export async function fetchReplenishTimeoutRateByWeek(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishTimeoutRateByWeek`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补超时板率-按月
export async function fetchReplenishTimeoutRateByMonth(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryReplenishTimeoutRateByMonth`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询计划达成率-按天
export async function fetchPlanDealRateByDay(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryPlanDealRateByDay`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询计划达成率-按周
export async function fetchPlanDealRateByWeek(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryPlanDealRateByWeek`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询计划达成率-按月
export async function fetchPlanDealRateByMonth(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/queryPlanDealRateByMonth`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询追踪事项数据
export async function fetchTrackMatter(params) {
  return request(`/kanban/v1/L3/standing/kanban/query/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事项关闭
export async function fetchCloseTrackMatter(params) {
  return request(`/kanban/v1/L3/standing/kanban/update/close/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询跑马灯信息
export async function fetchReplenishMarquee() {
  return request(`/kanban/v1/L3/standing/kanban/query/ReplenishMarquee`, {
    method: 'GET',
    responseType: 'text',
  });
}