import { getResponse } from 'utils/utils';
import {
  fetchPeople,
  fetchOpList,
  fetchParts,
  fetchMainData,
  fetchPersonCapacity,
} from '@/services/reportWorkServices';

import {
  fetchDefPlantId,
} from '@/services/packingServices';

import {
  fetchWorkShop,
} from '@/services/cabinetBackServices';

export default {
  namespace: 'reportWork',
  state: {
    defPlantId: [], // 用户默认工厂
    workShopList: [], // 车间下拉
    peopleList: [], // 人员列表
    opList: [], // 工序列表
    partsList: [], // 部件列表
    mainData: {}, // 报工主数据
    personCapacity: [], // 个人产能数据
  },
  effects: {
    // 查询当前用户默认工厂
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
    // 查询车间下拉列表数据
    *fetchWorkShop({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchWorkShop, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            workShopList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询人员列表
    *fetchPeople({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPeople, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            peopleList: result || [],
          },
        });
      }
      return result;
    },
    // 查询工序下拉列表数据
    *fetchOpList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOpList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            opList: result || [],
          },
        });
      }
      return result;
    },
    // 查询部件下拉列表数据
    *fetchParts({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchParts, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            partsList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询报工主数据
    *fetchMainData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchMainData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            mainData: result || {},
          },
        });
      }
      return result;
    },
    // 查询个人产能数据
    *fetchPersonCapacity({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPersonCapacity, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            personCapacity: result || [],
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