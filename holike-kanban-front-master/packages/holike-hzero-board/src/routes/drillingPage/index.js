import React, {Component} from "react";
import {connect} from "dva";
import {Bind} from 'lodash-decorators';
import {Row, Col} from 'hzero-ui';
import { getCurrentUser } from 'utils/utils';

import MainPage from "../../components/drillingPage/MainPage";

import "./index.less";
import Time from "../../components/Time";
import BatchInfoTable from "../../components/drillingPage/BatchInfoTable";
import OrderInfoTable from "../../components/drillingPage/OrderInfoTable";
import DetailsInfoTable from "../../components/drillingPage/DetailsInfoTable";
import holikeLoading from "../../components/holikeLoading";

@connect(({drilling, loading}) => ({
  batchLoading: loading.effects["drilling/fetchBatchInfoList"],
  orderLoading: loading.effects["drilling/fetchOrderInfoList"],
  detailsLoading: loading.effects["drilling/fetchDetailsByBatch"]||loading.effects["drilling/fetchDetailsByOrder"],
  drilling,
}))
export default class DrillingPage extends Component {
  form;

  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  @Bind()
  handleQuery(value) {
    const {dispatch} = this.props;
    dispatch({
      type: 'drilling/fetchBatchInfoList',
      payload: {
        workshopCode: value,
      },
    });
  }

  @Bind()
  handleOrderQuery(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'drilling/fetchOrderInfoList',
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleDetailsQueryByBatch(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'drilling/fetchDetailsByBatch',
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleDetailsQueryByOrder(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'drilling/fetchDetailsByOrder',
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleBatchComplete(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'drilling/fetchBatchState',
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleHeadClick(record) {
    this.handleOrderQuery({batchOrderNo: record.batchOrderNo});
  }

  @Bind()
  handleHeadClickBYBatch(record) {
    this.handleDetailsQueryByBatch({batchOrderNo: record.batchOrderNo});
  }

  @Bind()
  handleOrderClick(record) {
    this.handleDetailsQueryByOrder({childOrderNumber: record.childOrderNumber});
  }

  @Bind()
  handleCompleteClick(record) {
    const { loginName } = getCurrentUser();
    this.handleBatchComplete({batchOrderNo: record.batchOrderNo, loginName});
  }

  componentDidMount() {
    this.handleQuery();
  }

  render() {
    const {drilling, batchLoading, orderLoading, detailsLoading} = this.props;
    const {
      batchInfoList,
      orderInfoList,
      detailsList,
      batchState,
    } = drilling;
    const mainProps = {
      onSelect: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const batchInfoProps = {
      loading: {spinning: !!batchLoading, indicator: holikeLoading},
      dataSource: batchInfoList,
      onClick: this.handleHeadClick,
      detailsClick: this.handleHeadClickBYBatch,
      completeClick: this.handleCompleteClick,
    };
    const orderInfoProps = {
      loading: {spinning: !!orderLoading, indicator: holikeLoading},
      dataSource: orderInfoList,
      onClick: this.handleOrderClick,
    };
    const detailsInfoProps = {
      loading: {spinning: !!detailsLoading, indicator: holikeLoading},
      dataSource: detailsList,
    };
    return (
      <MainPage
        headerRight={<Time />}
        {...mainProps}
      >
        <Row>
          <Col span={24} style={{padding: '20px', textAlign: 'center'}}>
            <h1 style={{
               color: '#fff',
              'font-weight': 'bold',
              'font-size': '22px',
            }}
            >订单生产信息
            </h1>
            <BatchInfoTable {...batchInfoProps} />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{padding: '20px', textAlign: 'center'}}>
            <h1 style={{
               color: '#fff',
              'font-weight': 'bold',
              'font-size': '22px',
            }}
            >子订单生产信息
            </h1>
            <OrderInfoTable {...orderInfoProps} />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{padding: '20px', textAlign: 'center'}}>
            <DetailsInfoTable {...detailsInfoProps} />
          </Col>
        </Row>
      </MainPage>
    );
  }
}

