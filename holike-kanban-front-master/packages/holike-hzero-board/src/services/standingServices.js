import request from 'utils/request';

// 查询工厂下拉列表数据
export async function fetchPlantList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/plant`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询默认工厂
export async function fetchDefPlantList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/def/plant`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询产线下拉列表数据
export async function fetchProdLineList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询工序下拉列表数据
export async function fetchOpList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/op`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询班次信息
export async function fetchShiftDataList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/shiftData`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取安全看板数据
export async function fetchSafeList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/safe/kanban`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取点检看板数据
export async function fetchInspectList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/inspect/kanban`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取安灯看板数据
export async function fetchAndonList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/andon`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取实时产量柱状图数据
export async function fetchRealTimeOutputList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/real/time/output`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取考勤柱状图数据
export async function fetchAttendanceList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/attendance`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 获取补板率柱状图数据
export async function fetchPatchBoardRateList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/patch/board/rate`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
// 获取补板目标值
export async function fetchPatchBoardTargetValue(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/patch/board/target/value`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
// 获取良品率柱状图数据
export async function fetchYieldRateList(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/yield/rate`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
// 获取良品目标值
export async function fetchYieldtargetValue() {
  return request(`/kanban/v1/L1/standing/kanban/query/yield/target/value`, {
    method: 'GET',
  });
}

// 获取追踪事项数据
export async function fetchTrackMatter(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事件升级
export async function fetchUpgradeTrackMatter(params) {
  return request(`/kanban/v1/L1/standing/kanban/update/upgrade/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事件关闭
export async function fetchCloseTrackMatter(params) {
  return request(`/kanban/v1/L1/standing/kanban/update/close/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 底部标签
export async function fetchBottomLabel(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/bottom/label`, {
    method: 'GET',
    responseType: 'text',
    query: {
      ...params,
    },
  });
}

// 查询项目组列表
export async function fetchItemGroup(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/item/group`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询项目列表
export async function fetchItem(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/item`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询优先级下拉列表
export async function fetchPriority() {
  return request(`/kanban/v1/L1/standing/kanban/query/priority`, {
    method: 'GET',
  });
}


// 查询项目列表
export async function fetchResponsibility(params) {
  return request(`/kanban/v1/L1/standing/kanban/query/responsibility/user`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询项目列表
export async function saveEvent(params) {
  return request(`/holike-mes/v1/titan-inspection-item-rec/save-rec-event/ui`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}