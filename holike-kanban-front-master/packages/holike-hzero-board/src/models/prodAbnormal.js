import { getResponse } from 'utils/utils';

import {
  fetchException,
} from '@/services/prodAbnormalServices';

import {
  fetchDefPlantId,
  fetchPlant,
  fetchWorkShop,
} from '@/services/missReportWorkServices';

export default {
  namespace: 'prodAbnormal',
  state: {
    defPlantId: [], // 默认工厂
    plant: [], // 工厂
    workShop: [], // 车间
    exceptionData: [],
  },
  effects: {
    // 查询默认工厂
    *fetchDefPlantId({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantId, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlantId: result || [],
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
    // 查询车间
    *fetchWorkShop({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchWorkShop, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            workShop: result || [],
          },
        });
      }
      return result;
    },
    // 查询异常数据
    *fetchException({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchException, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            exceptionData: result || [],
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