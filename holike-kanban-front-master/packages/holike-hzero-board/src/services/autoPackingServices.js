import request from 'utils/request';

// 订单服务类型
export async function fetchOrderServiceType() {
  return request(`/holike-mes/v1/list/ui?typeCode=HLK_HCM_ORDER_SERVICE_TYPE`, {
    method: 'GET',
  });
}

// 报表数据
export async function fetchAutoPacking(params) {
  return request(`/kanban/v1/auto-package`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}