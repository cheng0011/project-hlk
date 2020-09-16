import request from 'utils/request';

// 设备更换配件报表数据
export async function fetchDeviceChange(params) {
  return request(`/kanban/v1/device-report/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}