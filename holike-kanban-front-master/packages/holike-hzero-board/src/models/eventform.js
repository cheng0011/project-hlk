import { getResponse } from 'utils/utils';
import {
  fetchPlantList,
  fetchDefPlantList,
  fetchProdLineList,
  fetchOpList,
  fetchItemGroup,
  fetchItem,
  fetchPriority,
  fetchResponsibility,
  saveEvent,
} from '@/services/standingServices';

export default {
  namespace: 'eventForm',
  state: {
    plantList: [], // 工厂下拉列表
    defPlant: {}, // 默认工厂
    prodLineList: [], // 产线列表
    opList: [], // 工序列表
    itemGroupList: [], // 项目组列表
    itemList: [], // 项目列表
    priorityList: [], // 优先级列表
    responsibilityList: [], // 责任人列表
    saveEventStatus: "", // 保存事件返回结果
  },
  effects: {
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
    // 保存事件
    *saveEvent({ payload }, { call, put }) {
      const result = getResponse(yield call(saveEvent, payload));
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            saveEventStatus: result || "",
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