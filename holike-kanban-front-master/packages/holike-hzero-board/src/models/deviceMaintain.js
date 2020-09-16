import { getResponse } from 'utils/utils';
import {
  fetchStatus,
  fetchDeviceMainTain,
} from '@/services/deviceMaintainServices';

export default {
  namespace: 'deviceMaintain',
  state: {
    status: [],
    deviceData: [],
  },
  effects: {
    // 查询状态下拉列表数据
    *fetchStatus({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchStatus, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            status: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备保养数据
    *fetchDeviceMainTain({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDeviceMainTain, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            deviceData: result.content || [],
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