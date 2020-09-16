import request from 'utils/request';

/**
 * 查询异常分析表单数据
 * @export
 * @param {*} params
 * @returns
 */
export async function fetchException(params) {
  return request(`/kanban/v1/exception-analysis/list`, {
    method: 'GET',
    query: {
      ...params,
    },
  });
}