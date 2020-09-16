import request from 'utils/request';

// 查询设备mtbf报表数据
export async function fetchDeviceList(params) {
  return request(`/kanban/v1/device-mtbf/list-mtbf`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询设备报修数据
export async function fetchDeviceRepair(params) {
  return request(`/kanban/v1/device-mtbf/query/device-warranty`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}