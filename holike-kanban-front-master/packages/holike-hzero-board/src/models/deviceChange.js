import { getResponse } from 'utils/utils';
import {
  fetchDeviceChange,
} from '@/services/deviceChangeServices';

import {
  fetchDefPlantId,
  fetchPlant,
} from '@/services/missReportWorkServices';

export default {
  namespace: 'deviceChange',
  state: {
    defPlant: [],
    plant: [],
    deviceChangeData: [],
  },
  effects: {
    // 查询默认工厂数据
    *fetchDefPlantId({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantId, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlant: result || [],
          },
        });
      }
      return result;
    },
    // 查询工厂下拉列表数据
    *fetchPlant({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlant, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            plant: result || [],
          },
        });
      }
      return result;
    },
    // 查询设备更换配件报表数据
    *fetchDeviceChange({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDeviceChange, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            deviceChangeData: result.content || [],
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