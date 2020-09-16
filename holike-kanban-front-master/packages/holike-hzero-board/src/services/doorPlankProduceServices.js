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
 * 查询表格数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchData(params) {
  return request(`/kanban/v1/report/door-plank-produce/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 查询Echarts数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchEchartsData(params) {
  return request(`/kanban/v1/report/door-plank-produce/listEcharts`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}

/**
 * 根据车间和时间查询批次号
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchBatchOrder(params) {
  return request(`/kanban/v1/report/door-plank-produce/listBatchOrder`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}
