import request from 'utils/request';

// 查询工序加工进度数据
export async function fetchOpWorkSchedule(params) {
  return request(`/kanban/v1/report/op-work-schedule/query/dgv`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}