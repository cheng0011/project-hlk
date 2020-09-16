import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
  fetchWorkShop,
  fetchProdLine,
  fetchPackageReport,
} from '@/services/packingServices';

export default {
  namespace: 'packing',
  state: {
    defPlantId: [], // 当前用户默认工厂信息
    workShopList: [], // 所有车间列表
    prodLineList: [], // 所有产线列表
    packageReport: [], // 包装报表数据
  },
  effects: {

    /**
     * 查询当前用户默认工厂
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
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

    /**
     * 查询车间
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchWorkShop({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchWorkShop, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            workShopList: result || [],
          },
        });
      }
      return result;
    },

    /**
     * 查询产线
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchProdLine({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProdLine, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            prodLineList: result || [],
          },
        });
      }
      return result;
    },

    /**
     *
     * 查询包装报表数据
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchPackageReport({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPackageReport, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            packageReport: result || [],
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