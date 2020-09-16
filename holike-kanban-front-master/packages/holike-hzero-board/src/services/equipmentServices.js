import request from 'utils/request';

// 设备报修表格数据
export async function fetchEquipmentList() {
  return request(`/kanban/equipment/repair/kanban/query/equipment/repair/info`, {
    method: 'GET',
  });
}