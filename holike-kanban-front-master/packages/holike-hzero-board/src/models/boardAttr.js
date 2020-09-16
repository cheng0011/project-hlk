import { getResponse } from 'utils/utils';
import {
  fetchBoardAttr,
} from '@/services/boardAttrServices';

export default {
  namespace: 'boardAttr',
  state: {
    boardAttrData: [],
  },
  effects: {
    // 查询板件属性报表数据
    *fetchBoardAttr({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBoardAttr, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            boardAttrData: result || [],
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