import { getResponse } from 'utils/utils';
import {
  fetchAnDengList,
  fetchProductLineList,
  fetchBoardList,
  fetchInformation,
} from '@/services/anDengServices';

export default {
  namespace: 'anDeng',
  state: {
    indexList: [], // 首页下拉菜单列表
    productLineList: [], // 生产线下拉列表
    boardNodeList: [], // 看板圆点列表
    information: {}, // 弹框信息
  },
  effects: {
    // 查询车间下拉列表数据
    *fetchAnDengList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAnDengList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            indexList: result || [],
          },
        });
      }
      return result;
    },
    // 查询生产线下拉列表数据
    *fetchProductLineList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProductLineList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            productLineList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询看板圆点列表数据
    *fetchBoardList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBoardList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            boardNodeList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询信息详情数据
    *fetchInformation({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchInformation, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            informationList: result.rows || {},
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
