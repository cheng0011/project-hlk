import { getResponse } from 'utils/utils';
import {
  fetchPlantList,
  fetchDefPlantList,
  fetchProdLineList,
  fetchOpList,
  fetchShiftDataList,
  fetchSafeList,
  fetchInspectList,
  fetchAndonList,
  fetchRealTimeOutputList,
  fetchAttendanceList,
  fetchPatchBoardRateList,
  fetchPatchBoardTargetValue,
  fetchYieldRateList,
  fetchYieldtargetValue,
  fetchTrackMatter,
  fetchUpgradeTrackMatter,
  fetchCloseTrackMatter,
  fetchBottomLabel,
  fetchItemGroup,
  fetchItem,
  fetchPriority,
  fetchResponsibility,
} from '@/services/standingServices';

export default {
  namespace: 'standing',
  state: {
    showType: "area", // 展示类型
    plantList: [], // 工厂下拉列表
    defPlant: {}, // 默认工厂
    prodLineList: [], // 产线列表
    opList: [], // 工序列表
    shiftDataList: [], // 班次信息
    safeDataList: [], // 安全看板
    inspectList: [], // 点检数据
    andonList: [], // 安灯数据
    realTimeOutputList: [], // 实时产量数据
    attendanceList: [], // 考勤列表数据
    patchBoardRateList: [], // 补板率列表数据
    patchBoardTargetValue: [], // 补板目标值
    yieldRateList: [], // 良品率列表数据
    yieldtargetValue: [], // 良品目标值
    trackMatter: [], // 追踪事项
    upgradeTrackMatter: "", // 事件升级
    closeTrackMatter: "", // 事件关闭
    bottomLabel: "", // 底部标签
    itemGroupList: [], // 项目组列表
    itemList: [], // 项目列表
    priorityList: [], // 优先级列表
    responsibilityList: [], // 责任人列表
  },
  effects: {
    // 展示类型
    *changeShowType({ payload }, { put }) {
      const { type } = payload;
      if (type) {
        yield put({
          type: 'updateState',
          payload: {
            showType: type || "",
          },
        });
      }
      return type;
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
    // 查询默认工厂
    *fetchDefPlantList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchDefPlantList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            defPlant: result[0] || {},
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
    // 查询工序下拉列表数据
    *fetchOpList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchOpList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            opList: result || [],
          },
        });
      }
      return result;
    },
    // 查询班次信息
    *fetchShiftDataList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchShiftDataList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            shiftDataList: result || [],
          },
        });
      }
      return result;
    },
    // 查询安全看板数据
    *fetchSafeList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchSafeList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            safeDataList: result || [],
          },
        });
      }
      return result;
    },
    // 查询点检数据
    *fetchInspectList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchInspectList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            inspectList: result || [],
          },
        });
      }
      return result;
    },
    // 查询安灯看板数据
    *fetchAndonList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAndonList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            andonList: result || [],
          },
        });
      }
      return result;
    },
    // 查询实时产量
    *fetchRealTimeOutputList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchRealTimeOutputList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            realTimeOutputList: result || [],
          },
        });
      }
      return result;
    },
    // 获取考勤柱状图数据
    *fetchAttendanceList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchAttendanceList, payload));
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
    // 查询补板率列表数据
    *fetchPatchBoardRateList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPatchBoardRateList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            patchBoardRateList: result || [],
          },
        });
      }
      return result;
    },
    // 查询良品目标值
    *fetchYieldtargetValue({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchYieldtargetValue, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            yieldtargetValue: result || [],
          },
        });
      }
      return result;
    },
    // 查询良品率列表数据
    *fetchYieldRateList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchYieldRateList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            yieldRateList: result || [],
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
    // 事件升级
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
    // 事件关闭
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
    // 查询项目组
    *fetchItemGroup({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchItemGroup, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            itemGroupList: result || [],
          },
        });
      }
      return result;
    },
    // 查询项目
    *fetchItem({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchItem, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            itemList: result || [],
          },
        });
      }
      return result;
    },
    // 查询优先级
    *fetchPriority({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchPriority, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            priorityList: result || [],
          },
        });
      }
      return result;
    },
    // 查询责任人
    *fetchResponsibility({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchResponsibility, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            responsibilityList: result || [],
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