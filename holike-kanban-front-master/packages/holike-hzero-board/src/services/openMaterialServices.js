import request from 'utils/request';

/**
 * 查询默认工厂信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchDefPlantId(params) {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryDefPlantId`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询工厂信息
 */
export async function fetchPlant() {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryPlant`, {
    method: 'GET',
  });
}

/**
 * 查询车间信息
 */
export async function fetchWorkShop() {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryWorkShop`, {
    method: 'GET',
  });
}

/**
 * 查询产线信息
 */
export async function fetchProdLine() {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryProdLine`, {
    method: 'GET',
  });
}

/**
 * 查询产品类别信息
 */
export async function fetchProductType() {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryProductType`, {
    method: 'GET',
  });
}

/**
 * 查询功能类型信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchFunctionType(params) {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryFunctionType`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询订单服务类型
 */
export async function fetchOrderServiceType() {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryOrderServiceType`, {
    method: 'GET',
  });
}

/**
 * 查询头信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchHead(params) {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryMaterialFthicknessHead`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询行明细信息
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchDetail(params) {
  return request(`/kanban/report/hmeMaterialFthicknessReport/queryMaterialFthicknessDetail`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
