import { getResponse } from 'utils/utils';
import {
  fetchCheckList,
  fetchDeviceCheck,
} from '@/services/deviceCheckServices';

export default {
  namespace: 'deviceCheck',
  state: {
    checkList: [],
    deviceCheckData: [],
  },
  effects: {
    // 查询是否点检下拉框数据
    *fetchCheckList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCheckList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            checkList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备点检报表数据
    *fetchDeviceCheck({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDeviceCheck, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            deviceCheckData: result.content || [],
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