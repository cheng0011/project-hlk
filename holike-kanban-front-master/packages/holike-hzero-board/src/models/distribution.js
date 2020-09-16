import { getResponse } from 'utils/utils';
import {
  fetchPlantList,
  fetchWorkShopList,
  fetchKanbanData,
  fetchMapPoint,
  fetchMachineUserList,
} from '@/services/distributionServices';
import { fetchDefPlantList } from "@/services/standingServices";

export default {
  namespace: 'distribution',
  state: {
    defPlantList: [], // 默认工厂
    plantList: [], // 工厂下拉列表数据
    workShopList: [], // 车间下拉列表数据
    kanbanDataList: [], // 看板显示数据
    mapPointList: [], // 坐标
    machineUserList: [], // 机修房人员
  },
  effects: {
    // 查询工厂下拉列表
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
            defPlantList: result || [],
          },
        });
      }
      return result;
    },
    // 查询车间下拉列表
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
    // 查询看板显示数据
    *fetchKanbanData({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchKanbanData, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            kanbanDataList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询坐标
    *fetchMapPoint({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchMapPoint, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            mapPointList: result.rows || [],
          },
        });
      }
      return result;
    },
    // 查询机修房人员信息
    *fetchMachineUserList({ payload }, { call, put }) {
      const result = getResponse(yield call(fetchMachineUserList, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            machineUserList: result.rows || [],
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