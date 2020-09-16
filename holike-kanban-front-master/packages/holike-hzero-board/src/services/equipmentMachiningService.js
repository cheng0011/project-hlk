import request from 'utils/request';

// 查询设备加工头数据
export async function fetchEquMachiningHeadList(params) {
  return request(`/kanban/v1/report/equipment-machining/head/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询设备加工行数据
export async function fetchEquMachiningLineList(params) {
  return request(`/kanban/v1/report/equipment-machining/line/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}