import request from 'utils/request';

/**
 * 查询默认工厂信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchDefPlantId(params) {
  return request(`/kanban/report/hmePackageReport/queryDefPlantId`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询所有有效车间
 * @export
 * @returns
 */
export async function fetchWorkShop() {
  return request(`/kanban/report/hmePackageReport/queryWorkShop`, {
    method: 'GET',
  });
}


/**
 * 查询有效产线
 * @export
 * @returns
 */
export async function fetchProdLine() {
  return request(`/kanban/report/hmePackageReport/queryProdLine`, {
    method: 'GET',
  });
}

/**
 * 查询包装报表
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchPackageReport(params) {
  return request(`/kanban/report/hmePackageReport/queryPackageReport`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}