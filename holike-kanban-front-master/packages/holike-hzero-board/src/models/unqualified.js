import { getResponse } from 'utils/utils';
import {
  fetchWorkShop,
  fetchProdLine,
  fetchCompleteType,
  fetchUnqualifiedInfo,
} from '@/services/unqualifiedServices';

export default {
  namespace: 'unqualified',
  state: {
    workShop: [], // 车间列表
    prodLine: [], // 产线下拉列表
    completeType: [], // 完工类型
    unqualifiedInfo: [], // 不合格信息
  },
  effects: {
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
    // 查询生产线下拉列表数据
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
    // 查询完工类型
    *fetchCompleteType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCompleteType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            completeType: result || [],
          },
        });
      }
      return result;
    },
    // 查询不合格信息
    *fetchUnqualifiedInfo({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchUnqualifiedInfo, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            unqualifiedInfo: result || [],
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