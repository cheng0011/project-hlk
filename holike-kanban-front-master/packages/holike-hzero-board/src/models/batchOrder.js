import { getResponse } from 'utils/utils';
import {
  fetchPlant,
  fetchWorkShop,
  fetchProdLine,
  fetchMainData,
} from '@/services/batchOrderServices';

export default {
  namespace: 'batchOrder',
  state: {
    plant: [],
    workShop: [],
    prodLine: [],
    mainData: [],
  },
  effects: {
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
    // 查询车间下拉列表数据
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
    // 查询产线下拉列表数据
    *fetchProdLine({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProdLine, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            prodLine: result || [],
          },
        });
      }
      return result;
    },
    // 查询报表数据
    *fetchMainData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchMainData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            mainData: result || [],
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