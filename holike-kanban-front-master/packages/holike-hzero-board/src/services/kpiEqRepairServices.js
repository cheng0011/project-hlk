import request from 'utils/request';

// 查询所有有效工厂
export async function fetchPlantList() {
  return request(`/kanban/KpiEqRepair/kanban/queryPlant`, {
    method: 'GET',
  });
}

// 查询所有有效车间
export async function fetchWorkShopList() {
  return request(`/kanban/KpiEqRepair/kanban/queryWorkShop`, {
    method: 'GET',
  });
}

// 查询所有有效产线
export async function fetchProdLineList() {
  return request(`/kanban/KpiEqRepair/kanban/queryProdline`, {
    method: 'GET',
  });
}

// 查询设备报修情况
export async function fetchEqRepair(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqReair`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询设备使用情况
export async function fetchEqUse(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqUse`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询设备报修情况
export async function fetchEqFault(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqFault`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询维修及时率
export async function fetchEqReairTimeRate(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqReairTimeRate`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询设备维修时长
export async function fetchEqRepairTime(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqRepairTime`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询暂停情况
export async function fetchEqRepairSuspendInfo() {
  return request(`/kanban/KpiEqRepair/kanban/queryEqRepairSuspendInfo`, {
    method: 'GET',
  });
}

// 人员维修时长与维修单数柱状图
export async function fetchEqRepairOrdersAndTime(params) {
  return request(`/kanban/KpiEqRepair/kanban/queryEqRepairOrdersAndTime`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询追踪事项数据
export async function fetchTrackMatter() {
  return request(`/kanban/KpiEqRepair/kanban/query/track/matter`, {
    method: 'GET',
  });
}


// LM 事件升级
export async function fetchUpgradeTrackMatter(params) {
  return request(`/kanban/KpiEqRepair/kanban/update/upgrade/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// LM 事件关闭
export async function fetchCloseTrackMatter(params) {
  return request(`/kanban/KpiEqRepair/kanban/update/close/track/matter`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
