import request from 'utils/request';

/**
 * 查询默认工厂信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchDefPlantId(params) {
  return request(`/kanban/v1/report/omitComplete/queryDefPlantId`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询工厂
 * @export
 * @returns
 */
export async function fetchPlant() {
  return request(`/kanban/v1/report/omitComplete/queryPlant`, {
    method: 'GET',
  });
}

/**
 * 查询车间
 * @export
 * @returns
 */
export async function fetchWorkShop() {
  return request(`/kanban/v1/report/omitComplete/queryWorkShop`, {
    method: 'GET',
  });
}

/**
 * 查询产线
 * @export
 * @returns
 */
export async function fetchProdLine() {
  return request(`/kanban/v1/report/omitComplete/queryProdLine`, {
    method: 'GET',
  });
}

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
 * 查询头表数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchHeadData(params) {
  return request(`/kanban/v1/report/omitComplete/queryOmitCompleteHead`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询行表数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchRowData(params) {
  return request(`/kanban/v1/report/omitComplete/queryOmitCompleteDtl`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}