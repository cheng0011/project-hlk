import { getResponse } from 'utils/utils';
import {
  fetchEquipmentList,
} from '@/services/equipmentServices';

export default {
  namespace: 'equipment',
  state: {
    equipmentList: [],
  },
  effects: {
    // 查询设备报修列表数据
    *fetchEquipmentList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEquipmentList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            equipmentList: result || [],
          },
        });
      }
      return result;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};