import { getResponse } from 'utils/utils';
import {
  fetchOpWorkSchedule,
} from '@/services/opProgressServices';

export default {
  namespace: 'opProgress',
  state: {
    opWorkScheduleData: [], // 加工进度数据
    chartDataList: [], // 图表数据
  },
  effects: {
    // 查询工序加工进度数据
    *fetchOpWorkSchedule({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOpWorkSchedule, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            opWorkScheduleData: result || [],
          },
        });
      }
      return result;
    },
    // 选择某一行
    *selectOneRow({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOpWorkSchedule, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            chartDataList: result || [],
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