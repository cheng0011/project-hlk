import request from 'utils/request';

// 查询是否点检下拉框数据
export async function fetchCheckList() {
  return request(`/holike-mes/v1/list/ui?typeCode=HLK_HME_EQ_CHECK_TASK`, {
    method: 'GET',
  });
}

// 设备点检报表
export async function fetchDeviceCheck(params) {
  return request(`/kanban/v1/device-shot-check/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}