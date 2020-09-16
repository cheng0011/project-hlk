import request from 'utils/request';

/**
 * 查询工序类别
 * @export
 * @returns
 */
export async function fetchOpType() {
  return request(`/kanban/v1/report/omitComplete/queryOpType`, {
    method: 'GET',
  });
}

/**
 * 查询班组出勤/人均产能
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchOutput(params) {
  return request(`/kanban/v1/report/door-plank-output/output`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询个人产能明细
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchPersonOutput(params) {
  return request(`/kanban/v1/report/door-plank-output/personOutput`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
