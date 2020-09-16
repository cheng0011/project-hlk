import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
  fetchPlant,
  fetchWorkShop,
  fetchProdLine,
  fetchProductType,
  fetchFunctionType,
  fetchOrderServiceType,
  fetchHead,
  fetchDetail,
} from '@/services/openMaterialServices';

export default {
  namespace: 'openMaterial',
  state: {
    defPlantId: [], // 当前用户默认工厂信息
    plantList: [], // 工厂列表
    workShopList: [], // 所有车间列表
    prodLineList: [], // 所有产线列表
    productType: [], // 产品类别
    functionType: [], // 功能类型
    orderServiceType: [], // 订单服务类型
    headList: [], // 头信息
    detailList: [], // 行详情信息
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
     * 查询所有工厂
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchPlant({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlant, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            plantList: result || [],
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
     * 查询产品类别
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchProductType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProductType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            productType: result || [],
          },
        });
      }
      return result;
    },

    /**
     *
     * 查询功能类型
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchFunctionType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchFunctionType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            functionType: result || [],
          },
        });
      }
      return result;
    },

    /**
     *
     * 查询订单服务类型
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchOrderServiceType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOrderServiceType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            orderServiceType: result || [],
          },
        });
      }
      return result;
    },

    /**
     *
     * 查询头信息
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchHead({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchHead, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            headList: result || [],
          },
        });
      }
      return result;
    },

    /**
     *
     * 查询行详情信息
     * @param {*} { payload }
     * @param {*} { call, put }
     * @returns
     */
    *fetchDetail({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDetail, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            detailList: result || [],
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