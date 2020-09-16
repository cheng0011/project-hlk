import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
  fetchPlant,
  fetchWorkShop,
  fetchProdLine,
  fetchOpType,
  fetchHeadData,
  fetchRowData,
} from '@/services/missReportWorkServices';

export default {
  namespace: 'missReportWork',
  state: {
    defPlantId: [], // 默认工厂
    plant: [], // 工厂
    workShop: [], // 车间
    prodLine: [], // 产线
    opType: [], // 工序类别
    headData: [], // 头表数据
    rowData: [], // 行表数据
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
    // 查询产线
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
    // 查询头表数据
    *fetchHeadData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchHeadData, payload));
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
    // 查询行表数据
    *fetchRowData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchRowData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            rowData: result || [],
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