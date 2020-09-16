import { getResponse } from 'utils/utils';
import {
  fetchDefPlantId,
  fetchPlant,
  fetchProdLine,
  fetchSafeData,
  fetchInspect,
  fetchOutput,
  fetchAttendance,
  fetchPatchBoard,
  fetchYield,
  fetchYieldTargetValue,
  fetchTrackMatter,
  fetchCloseMatter,
  fetchUpgradeMatter,
  fetchBottomLabel,
} from '@/services/standingTwoServices';

import { fetchPatchBoardTargetValue } from '@/services/standingServices';

export default {
  namespace: 'standingTwo',
  state: {
    defPlant: [], // 当前用户默认工厂ID
    plantList: [], // 工厂列表
    prodLineList: [], // 产线列表
    safeData: [], // 安全看板
    inspect: [], // 点检
    output: [], // 产量
    attendance: [], // 考勤
    patchBoard: [], // 补板
    patchBoardTargetValue: [], // 补板目标值
    yields: [], // 良品
    yieldTargetValue: [],
    trackMatter: [], // 追踪事项
    upgradeTrackMatter: "", // 事件升级
    closeTrackMatter: "", // 事件关闭
    bottomLabel: "", // 底部标签
  },
  effects: {
    // 默认工厂ID
    *fetchDefPlantId({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantId, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlant: result || [],
          },
        });
      }
      return result;
    },
    // 查询工厂列表
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
    // 查询产线列表
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
    // 查询安全看板
    *fetchSafeData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchSafeData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            safeData: result || [],
          },
        });
      }
      return result;
    },
    // 查询点检
    *fetchInspect({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchInspect, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            inspect: result || [],
          },
        });
      }
      return result;
    },
    // 查询产量
    *fetchOutput({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOutput, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            output: result || [],
          },
        });
      }
      return result;
    },
    // 查询考勤
    *fetchAttendance({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAttendance, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            attendance: result || [],
          },
        });
      }
      return result;
    },
    // 查询补板
    *fetchPatchBoard({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPatchBoard, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            patchBoard: result || [],
          },
        });
      }
      return result;
    },
    // 查询补板目标值
    *fetchPatchBoardTargetValue({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPatchBoardTargetValue, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            patchBoardTargetValue: result || [],
          },
        });
      }
      return result;
    },
    // 查询良品
    *fetchYield({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchYield, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            yields: result || [],
          },
        });
      }
      return result;
    },
    // 查询直通率目标值
    *fetchYieldTargetValue({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchYieldTargetValue, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            yieldTargetValue: result || [],
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
    // LM 事件关闭
    *fetchCloseMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchCloseMatter, payload));
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
    // LM 事件升级
    *fetchUpgradeMatter({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchUpgradeMatter, payload));
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
    // 底部标签
    *fetchBottomLabel({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchBottomLabel, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            bottomLabel: result || "",
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