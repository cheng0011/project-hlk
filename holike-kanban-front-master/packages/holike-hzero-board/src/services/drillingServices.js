import request from 'utils/request';

export async function fetchBatchInfoList(params) {
  return request(`/kanban/v1/drilling/kanban/query/batch/info/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

export async function fetchOrderInfoList(params) {
  return request(`/kanban/v1/drilling/kanban/query/order/info/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

export async function fetchDetailsByBatch(params) {
  return request(`/kanban/v1/drilling/kanban/query/panel/details/byBatch`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

export async function fetchDetailsByOrder(params) {
  return request(`/kanban/v1/drilling/kanban/query/panel/details/byOrder`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

export async function fetchBatchState(params) {
  return request(`/kanban/v1/drilling/kanban/update/batch/state`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

