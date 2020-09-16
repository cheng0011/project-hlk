import { getResponse } from 'utils/utils';
import {
  fetchPlantList,
  fetchWorkShopList,
  fetchProdLineList,
  fetchEqRepair,
  fetchEqUse,
  fetchEqFault,
  fetchEqReairTimeRate,
  fetchEqRepairTime,
  fetchEqRepairSuspendInfo,
  fetchEqRepairOrdersAndTime,
  fetchTrackMatter,
  fetchUpgradeTrackMatter,
  fetchCloseTrackMatter,
} from '@/services/kpiEqRepairServices';

export default {
  namespace: 'kpiEqRepair',
  state: {
    plantList: [], // 工厂下拉列表
    workShopList: [], // 车间下拉列表
    prodLineList: [], // 产线下拉列表
    eqRepairList: [], // 设备维修情况列表
    eqUseData: [], // 设备使用情况
    eqFaultData: [], // 设备报修情况
    reairTimeRateList: [], // 维修及时率数据
    repairTimeList: [], // 维修时长
    eqRepairSuspendInfoList: [], // 设备暂停情况列表
    eqRepairOrdersAndTime: [], // 设备人员维修时长与维修单数柱状图
    trackMatter: [], // 追踪事项数据
    upgradeTrackMatter: "", // 事件升级
    closeTrackMatter: "", // 事件关闭
  },
  effects: {
    // 查询所有有效工厂
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
    // 查询所有有效车间
    *fetchWorkShopList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchWorkShopList, payload));
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
    // 查询所有有效产线
    *fetchProdLineList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProdLineList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            prodLineList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备维修情况
    *fetchEqRepair({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqRepair, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqRepairList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备使用情况
    *fetchEqUse({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqUse, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqUseData: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备报修情况
    *fetchEqFault({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqFault, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqFaultData: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询维修及时率
    *fetchEqReairTimeRate({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqReairTimeRate, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            reairTimeRateList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询维修时长
    *fetchEqRepairTime({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqRepairTime, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            repairTimeList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询暂停情况
    *fetchEqRepairSuspendInfo({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqRepairSuspendInfo, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqRepairSuspendInfoList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询设备暂停总时间
    *fetchEqRepairOrdersAndTime({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchEqRepairOrdersAndTime, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            eqRepairOrdersAndTime: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询追踪事项数据
    *fetchTrackMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchTrackMatter, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            trackMatter: result || [],
          },
        });
      }
      return result;
    },
    // LM 事件升级
    *fetchUpgradeTrackMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchUpgradeTrackMatter, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            upgradeTrackMatter: result || "",
          },
        });
      }
      return result;
    },
    // LM 事件关闭
    *fetchCloseTrackMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCloseTrackMatter, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            closeTrackMatter: result || "",
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
