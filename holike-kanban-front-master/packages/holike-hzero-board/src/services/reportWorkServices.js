import request from 'utils/request';

/**
 * 查询人员下拉
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchPeople(params) {
  return request(`/kanban/v1/report/complete-query/people/drop-list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询工序下拉
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchOpList(params) {
  return request(`/kanban/v1/report/complete-query/op/drop-list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询报工主数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchMainData(params) {
  return request(`/kanban/v1/report/complete-query/main`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询部件
 * @export
 * @returns
 */
export async function fetchParts() {
  return request(`/holike-mes/v1/list/ui?typeCode=HLK_HCM_PRODUCT_TYPE`, {
    method: 'GET',
  });
}

/**
 * 查询个人产能
 * @export
 * @returns
 */
export async function fetchPersonCapacity(params) {
  return request(`/kanban/v1/report/complete-query/export/per-capacity`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}