import request from 'utils/request';

// 状态
export async function fetchStatus() {
  return request(`/holike-mes/v1/list/ui?typeCode=HLK_HME_EM_STATUS`, {
    method: 'GET',
  });
}

// 设备保养报表
export async function fetchDeviceMainTain(params) {
  return request(`/kanban/v1/report/device-maintain`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}