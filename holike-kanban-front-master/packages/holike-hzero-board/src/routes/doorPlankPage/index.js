import React, {Component} from "react";
import {
  getCurrentUser,
} from 'utils/utils';

import {Spin, Row, Col} from "hzero-ui";
import OrderTable from "../../components/doorPlankPage/OrderTable";
import AttendanceAndOutputTable from "../../components/doorPlankPage/AttendanceAndOutputTable";
import PersonaOutputTable from "../../components/doorPlankPage/PersonaOutputTable";
import QualityRecord from "../../components/doorPlankPage/QualityRecord";
import DataDetail from "../../components/doorPlankPage/DataDetail";
import SuppliesChart from "../../components/doorPlankPage/SuppliesChart";
import Title from "../../components/Title";
import chart from "../../assets/icons/chart.png";
import HolikeLoading from "../../components/holikeLoading";

const {loginName} = getCurrentUser();

export default class DoorPlankPage extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      modalTitle: "",
      showModal: false,
    };
  }

  render() {
    return (
      <div>
        <Spin wrapperClassName="loading-wrap" indicator={HolikeLoading} spinning={false}>
          <Row>
            <Col span={24}>
              <Row style={{padding: '20px'}}>
                <Col span={12} style={{padding: '20px'}}>
                  <Title imgUrl={chart} title="订单" />
                  <OrderTable />
                </Col>
                <Col span={12} style={{padding: '20px'}}>
                  <div>
                    <Title imgUrl={chart} title="班组出勤/人均产能" />
                    <AttendanceAndOutputTable />
                  </div>
                  <div>
                    <Title imgUrl={chart} title="个人产能明细" />
                    <PersonaOutputTable />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row style={{padding: '20px'}}>
                <Col span={12} style={{padding: '20px'}}>
                  <Title imgUrl={chart} title="物料齐配套进度" />
                  <SuppliesChart chartId="supplies" />
                </Col>
                <Col span={12} style={{padding: '20px'}}>
                  <div>
                    <Title imgUrl={chart} title="品质问题记录" />
                    <QualityRecord />
                  </div>
                  <div>
                    <Title imgUrl={chart} title="反补数据明细" />
                    <DataDetail />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
};
