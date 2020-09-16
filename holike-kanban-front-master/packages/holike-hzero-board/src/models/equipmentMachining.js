import { getResponse } from 'utils/utils';
import {
  fetchEquMachiningHeadList,
  fetchEquMachiningLineList
} from '@/services/equipmentMachiningService';

export default {
  namespace: 'equipmentMachining',
  state: {
    equMachiningHead: [],//加工头数据
    equMachiningLine: [], //加工行数据
  },
  effects: {
    // 查询设备加工头数据
    *fetchEquMachiningHead({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEquMachiningHeadList, payload));
      console.log(result);
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            equMachiningHead: result || [],
          },
        });
      }
      return result;
    },
    // 查询设备加工行数据
    *fetchEquMachiningLine({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEquMachiningLineList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            equMachiningLine: result || [],
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
