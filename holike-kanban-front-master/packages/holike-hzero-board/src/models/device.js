import { getResponse } from 'utils/utils';
import {
  fetchDeviceList,
  fetchDeviceRepair,
} from '@/services/deviceServices';

import {
  fetchDefPlantId,
  fetchPlant,
} from '@/services/missReportWorkServices';

export default {
  namespace: 'device',
  state: {
    defPlantIdList: [],
    plant: [],
    deviceDataList: [],
    deviceRepair: [],
  },
  effects: {
    // 查询默认工厂
    *fetchDefPlantId({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantId, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlantIdList: result || [],
          },
        });
      }
      return result;
    },
    // 查询工厂
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
    // 查询设备mtbf报表数据
    *fetchDeviceList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDeviceList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            deviceDataList: result || [],
          },
        });
      }
      return result;
    },
    // 查询设备报修数据
    *fetchDeviceRepair({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDeviceRepair, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            deviceRepair: result || [],
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