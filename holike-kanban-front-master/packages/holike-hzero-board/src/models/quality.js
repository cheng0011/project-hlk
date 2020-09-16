import { getResponse } from 'utils/utils';
import {
  fetchPlantList,
  fetchAttendance,
  fetchCustomerProsecution,
  fetchEqRepairDay,
  fetchQualityControl,
  fetchReplenishBoard,
} from '@/services/qualityServices';

export default {
  namespace: 'quality',
  state: {
    plantList: [], // 工厂下拉列表
    attendanceList: [], // 人员考勤数据
    customerProsecutionList: [], // 客诉率数据
    eqRepairDayList: [], // 报修数据
    qualityControlList: [], // 制程合格率数据
    replenishBoard: {}, // 车间补板

  },
  effects: {
    // 查询车间下拉列表数据
    *fetchPlantList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlantList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            plantList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询人员考勤数据
    *fetchAttendance({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAttendance, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            attendanceList: result || [],
          },
        });
      }
      return result;
    },
    // 查询客诉率数据
    *fetchCustomerProsecution({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCustomerProsecution, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            customerProsecutionList: result || [],
          },
        });
      }
      return result;
    },
    // 查询车间当月报修数量
    *fetchEqRepairDay({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqRepairDay, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqRepairDayList: result || [],
          },
        });
      }
      return result;
    },
    // 查询制程合格率数据
    *fetchQualityControl({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchQualityControl, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            qualityControlList: result || [],
          },
        });
      }
      return result;
    },
    // 查询车间补板数量
    *fetchReplenishBoard({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishBoard, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishBoard: result || {},
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