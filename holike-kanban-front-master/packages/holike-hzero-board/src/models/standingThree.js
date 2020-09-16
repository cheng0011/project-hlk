import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
  fetchPlantList,
  fetchWorkShopList,
  fetchProdLineList,
  fetchSafeDate,
  fetchPassRateByDay,
  fetchPassRateByWeek,
  fetchPassRateByMonth,
  fetchReplenishRateByDay,
  fetchReplenishRateByWeek,
  fetchReplenishRateByMonth,
  fetchReplenishTimeoutRateByDay,
  fetchReplenishTimeoutRateByWeek,
  fetchReplenishTimeoutRateByMonth,
  fetchPlanDealRateByDay,
  fetchPlanDealRateByWeek,
  fetchPlanDealRateByMonth,
  fetchTrackMatter,
  fetchCloseTrackMatter,
  fetchReplenishMarquee,
} from '@/services/standingThreeServices';

export default {
  namespace: 'standingThree',
  state: {
    defPlantIdList: [], // 默认工厂
    plantList: [], // 工厂下拉列表数据
    workShopList: [], // 车间下拉列表数据
    prodLineList: [], // 产线下拉列表数据
    safeDate: [], // 不安全日期
    passRate: [], // 不合格数
    replenishRate: [], // 补板率
    replenishTimeoutRate: [], // 补板超时率
    planDealRate: [], // 查询计划达成率
    trackMatter: [], // 追踪事项数据
    closeTrackMatter: [], // LM 事项关闭
    replenishMarquee: "", // 跑马灯信息
  },
  effects: {
    // 查询默认工厂
    *fetchDefPlantId({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantId, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlantIdList: result || [],
          },
        });
      }
      return result;
    },
    // 查询工厂下拉列表数据
    *fetchPlantList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlantList, payload));
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
    // 查询车间下拉列表数据
    *fetchWorkShopList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchWorkShopList, payload));
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
    // 查询产线下拉列表数据
    *fetchProdLineList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchProdLineList, payload));
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
    // 查询不安全日期
    *fetchSafeDate({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchSafeDate, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            safeDate: result || [],
          },
        });
      }
      return result;
    },
    // 查询不合格数-按天
    *fetchPassRateByDay({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPassRateByDay, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            passRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询不合格数-按周
    *fetchPassRateByWeek({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPassRateByWeek, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            passRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询不合格数-按月
    *fetchPassRateByMonth({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPassRateByMonth, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            passRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补板率-按天
    *fetchReplenishRateByDay({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishRateByDay, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补板率-按周
    *fetchReplenishRateByWeek({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishRateByWeek, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补板率-按月
    *fetchReplenishRateByMonth({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishRateByMonth, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补超时板率-按天
    *fetchReplenishTimeoutRateByDay({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishTimeoutRateByDay, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishTimeoutRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补超时板率-按周
    *fetchReplenishTimeoutRateByWeek({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishTimeoutRateByWeek, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishTimeoutRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询补超时板率-按月
    *fetchReplenishTimeoutRateByMonth({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishTimeoutRateByMonth, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishTimeoutRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询计划达成率-按天
    *fetchPlanDealRateByDay({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlanDealRateByDay, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            planDealRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询计划达成率-按周
    *fetchPlanDealRateByWeek({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlanDealRateByWeek, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            planDealRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询计划达成率-按月
    *fetchPlanDealRateByMonth({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPlanDealRateByMonth, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            planDealRate: result || [],
          },
        });
      }
      return result;
    },
    // 查询追踪事项
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
    // LM 事项关闭
    *fetchCloseTrackMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCloseTrackMatter, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            closeTrackMatter: result || [],
          },
        });
      }
      return result;
    },
    // 走马灯数据
    *fetchReplenishMarquee({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchReplenishMarquee, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            replenishMarquee: result || "",
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