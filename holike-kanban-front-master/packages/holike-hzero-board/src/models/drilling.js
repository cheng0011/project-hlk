import { getResponse } from 'utils/utils';
import {
  fetchBatchInfoList,
  fetchOrderInfoList,
  fetchDetailsByBatch,
  fetchDetailsByOrder,
  fetchBatchState,
} from '@/services/drillingServices';

export default {
  namespace: 'drilling',
  state: {
    batchInfoList: [],
    orderInfoList: [],
    detailsList: [],
    batchState: [],
  },
  effects: {
    *fetchBatchInfoList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBatchInfoList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            batchInfoList: result.rows || [],
          },
        });
      }
      return result;
    },
    *fetchOrderInfoList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOrderInfoList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            orderInfoList: result.rows || [],
          },
        });
      }
      return result;
    },
    *fetchDetailsByBatch({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDetailsByBatch, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            detailsList: result.rows || [],
          },
        });
      }
      return result;
    },
    *fetchDetailsByOrder({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDetailsByOrder, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            detailsList: result.rows || {},
          },
        });
      }
      return result;
    },
    *fetchBatchState({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBatchState, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            batchState: result.rows || {},
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
