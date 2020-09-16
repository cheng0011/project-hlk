import { getResponse } from 'utils/utils';
import {
  fetchOpType,
  fetchOutput,
  fetchPersonOutput,
} from '@/services/doorPlankOutputServices';

export default {
  namespace: 'doorPlankOutput',
  state: {
    opType: [], // 工序类别
    outputData: [], // 头表数据
    personOutputData: [], // 个人产能明细
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
    // 查询班组出勤/人均产能
    *fetchOutput({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOutput, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            outputData: result || [],
          },
        });
      }
      return result;
    },
    // 查询个人产能明细
    *fetchPersonOutput({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPersonOutput, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            personOutputData: result || [],
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
