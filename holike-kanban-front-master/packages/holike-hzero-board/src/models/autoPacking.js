import { getResponse } from 'utils/utils';
import {
  fetchPlant,
} from '@/services/missReportWorkServices';
import {
  fetchOrderServiceType,
  fetchAutoPacking,
} from '@/services/autoPackingServices';

export default {
  namespace: 'autoPacking',
  state: {
    orderServiceType: [],
    plant: [],
    autoPackingData: {},
  },
  effects: {
    // 查询订单服务类型
    *fetchOrderServiceType({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOrderServiceType, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            orderServiceType: result.rows || [],
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
    // 查询报表数据
    *fetchAutoPacking({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAutoPacking, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            autoPackingData: result || {},
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