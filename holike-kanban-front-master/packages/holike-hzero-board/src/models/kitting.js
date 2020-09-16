import { getResponse } from 'utils/utils';
import {
  fetchKittingList,
  fetchBasicInfo,
  fetchDetailInfo,
} from '@/services/kittingServices';

export default {
  namespace: 'kitting',
  state: {
    list: [], // 首页下拉菜单列表
    basicInfoList: [], // 基础信息
    detailInfoList: [], // 详情信息
  },
  effects: {
    // 查询车间下拉列表数据
    *fetchKittingList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchKittingList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            list: result || [],
          },
        });
      }
      return result;
    },
    // 基础信息
    *fetchBasicInfo({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBasicInfo, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            basicInfoList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 详情信息
    *fetchDetailInfo({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDetailInfo, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            detailInfoList: result.rows || [],
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