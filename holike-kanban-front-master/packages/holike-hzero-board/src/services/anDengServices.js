import request from 'utils/request';

// 安灯&产能首页下拉列表
export async function fetchAnDengList() {
  return request(`/kanban/v1/andon/capacity/kanban/query/drop/down/list`, {
    method: 'GET',
  });
}

export async function fetchProductLineList(params) {
  return request(`/kanban/v1/andon/capacity/kanban/query/prod/line`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询看板信息（圆点）
export async function fetchBoardList(params) {
  return request(`/kanban/v1/andon/capacity/kanban/query/kanban/data`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

// 查询弹框信息
export async function fetchInformation(params) {
  return request(`/kanban/v1/andon/capacity/kanban/query/andon/information`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

