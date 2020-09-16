import request from 'utils/request';

// 查询默认工厂
export async function fetchDefPlantId(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/def/plant`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询工厂列表
export async function fetchPlant(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/plant`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询产线列表
export async function fetchProdLine(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询安全看板
export async function fetchSafeData(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/safe/kanban`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询点检看板
export async function fetchInspect(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/inspect/kanban`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询产量
export async function fetchOutput(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/output`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询考勤
export async function fetchAttendance(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/attendance`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询补板
export async function fetchPatchBoard(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/patch/board/rate`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询良品
export async function fetchYield(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/rolled/yield`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询直通率目标值
export async function fetchYieldTargetValue() {
  return request(`/kanban/v1/L2/standing/kanban/query/rolled/yield/target/value`, {
    method: 'GET',
  });
}

// 查询追踪事项
export async function fetchTrackMatter(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事件关闭
export async function fetchCloseMatter(params) {
  return request(`/kanban/v1/L2/standing/kanban/update/close/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事件升级
export async function fetchUpgradeMatter(params) {
  return request(`/kanban/v1/L2/standing/kanban/update/upgrade/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 底部标签
export async function fetchBottomLabel(params) {
  return request(`/kanban/v1/L2/standing/kanban/query/bottom/label`, {
    method: 'GET',
    responseType: 'text',
    query: {
      ...params,
    },
  });
}