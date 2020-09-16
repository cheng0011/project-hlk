import { getResponse } from 'utils/utils';
import {
  fetchOpType,
  fetchData,
  fetchEchartsData,
  fetchBatchOrder,
} from '@/services/doorPlankProduceServices';

export default {
  namespace: 'doorPlankProduce',
  state: {
    opType: [], // 工序类别
    headData: [], // 头表数据
    echartsData: [], // echartsData数据
    batchOrderList: [], // echartsData数据
  },
  effects: {
    // 查询工序
    *fetchOpType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOpType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            opType: result || [],
          },
        });
      }
      return result;
    },
    // 查询表格数据
    *fetchData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            headData: result || [],
          },
        });
      }
      return result;
    },
    // 查询Echarts数据
    *fetchEchartsData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEchartsData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            echartsData: result || [],
          },
        });
      }
      return result;
    },
    // 查询批次号数据
    *fetchBatchOrder({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBatchOrder, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            batchOrderList: result || [],
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
