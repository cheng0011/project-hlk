import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
} from '@/services/packingServices';
import {
  fetchPlant,
  fetchWorkShop,
  fetchProdLine,
  fetchStandardType,
  fetchMainData,
} from '@/services/cabinetBackServices';

export default {
  namespace: 'cabinetBack',
  state: {
    defPlantId: [], // 默认工厂
    plant: [], // 工厂
    workShop: [], // 车间
    prodLine: [], // 产线
    standardType: [], // 工序
    mainData: [], // 主数据
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
            workShop: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询产线
    *fetchProdLine({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProdLine, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            prodLine: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询工序
    *fetchStandardType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchStandardType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            standardType: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询主数据
    *fetchMainData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchMainData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            mainData: result.rows || [],
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