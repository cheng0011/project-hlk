import React, { PureComponent } from 'react';
import { Table, Row, Col } from 'hzero-ui';
import { isNumber, sum } from 'lodash';
import { Bind } from 'lodash-decorators';

/**
 * 数据列表
 * @extends {PureComponent} - React.PureComponent
 * @reactProps {Function} onChange - 分页查询
 * @reactProps {Boolean} loading - 数据加载完成标记
 * @reactProps {Array} dataSource - Table数据源
 * @return React.element
 */
export default class TableList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      oneTable: [],
      towTable: [],
      threeTable: [],
      fourTable: [],
    };
  }

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    const columns = [
      {
        title: "报修单号",
        dataIndex: 'repairNum',
        width: 200,
      },
      {
        title: "设备名称",
        dataIndex: 'equipmentName',
        width: 200,
      },
      {
        title: "内部资产编码",
        dataIndex: 'innerAssetsCode',
        width: 150,
      },
      {
        title: "工位",
        dataIndex: 'workcellName',
        width: 300,
      },
      {
        title: "状态",
        dataIndex: 'status',
        width: 150,
      },
      {
        title: "故障描述",
        dataIndex: 'faultDiscription',
        width: 250,
      },
      {
        title: "故障备注",
        dataIndex: 'faultRemarks',
        width: 150,
      },
      {
        title: "报修时间点",
        dataIndex: 'warrantyTime',
        width: 150,
      },
      {
        title: "维修时间点",
        dataIndex: 'repairTime',
        width: 150,
      },
      {
        title: "响应间隔(分钟)",
        dataIndex: 'responseInterval',
        width: 150,
      },
      {
        title: "维修时长(小时)",
        dataIndex: 'repairMaintenance',
        width: 150,
      },
      {
        title: "处理措施",
        dataIndex: 'dealMeasures',
        width: 150,
      },
      {
        title: "措施备注",
        dataIndex: 'measuresRemarks',
        width: 150,
      },
    ];
    return columns;
  }

  renderColumns1() {
    const columns = [
      {
        title: "报修人",
        dataIndex: 'maintainer',
        width: 100,
      },
      {
        title: "维修人",
        dataIndex: 'repairer',
        width: 100,
      },
    ];
    return columns;
  }

  renderColumns2() {
    const columns = [
      {
        title: "协作人",
        dataIndex: 'collaborator',
        width: 100,
      },
      {
        title: "工作量",
        dataIndex: 'workload',
        width: 100,
      },
    ];
    return columns;
  }

  renderColumns3() {
    const columns = [
      {
        title: "配件编码",
        dataIndex: 'accessoryCode',
        width: 200,
      },
      {
        title: "配件描述",
        dataIndex: 'accessoryDiscription',
        width: 200,
      },
      {
        title: "数量",
        dataIndex: 'accessory_num',
        width: 200,
      },
      {
        title: "单位",
        dataIndex: 'accessory_unit',
        width: 200,
      },
    ];
    return columns;
  }

  renderColumns4() {
    const columns = [
      {
        title: "暂停时长(小时)",
        dataIndex: 'pauseDuration',
        width: 100,
      },
      {
        title: "暂停原因",
        dataIndex: 'pauseReason',
        width: 150,
      },
    ];
    return columns;
  }

  @Bind()
  handleClick(record) {
    const { repairPersonInfoVOList, collaboratorInfoVOList, partsInfoVOList, suspendInfoVOList } = record;
    this.setState({
      oneTable: [...repairPersonInfoVOList],
      towTable: [...collaboratorInfoVOList],
      threeTable: [...partsInfoVOList],
      fourTable: [...suspendInfoVOList],
    });
  }


  render() {
    const { loading, dataSource } = this.props;
    const { oneTable, towTable, threeTable, fourTable } = this.state;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          onRow={(record) => {
            return {
              onClick: () => {
                this.handleClick(record);
              },
            };
          }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        <Row type="flex" justify="space-between" style={{ width: "100%" }}>
          <Col span={4}>
            <Table
              uncontrolled
              bordered
              columns={this.renderColumns1()}
              dataSource={oneTable}
              pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
            />
          </Col>
          <Col span={4}>
            <Table
              uncontrolled
              bordered
              columns={this.renderColumns2()}
              dataSource={towTable}
              pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
            />
          </Col>
          <Col span={8}>
            <Table
              uncontrolled
              bordered
              columns={this.renderColumns3()}
              dataSource={threeTable}
              pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
            />
          </Col>
          <Col span={4}>
            <Table
              uncontrolled
              bordered
              columns={this.renderColumns4()}
              dataSource={fourTable}
              pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
            />
          </Col>
        </Row>


        {dataSource.length > 0 && (
          <Table
            id="device-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns()}
            scroll={{ x: scrollX }}
            dataSource={dataSource}
            pagination={false}
          />
        )}
        {dataSource.length > 0 && (
          <Table
            id="device-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns()}
            dataSource={dataSource}
            pagination={false}
          />
        )}
        {oneTable.length > 0 && (
          <Table
            id="device-one-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns1()}
            dataSource={oneTable}
            pagination={false}
          />
        )}
        {towTable.length > 0 && (
          <Table
            id="device-two-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns2()}
            dataSource={towTable}
            pagination={false}
          />
        )}
        {threeTable.length > 0 && (
          <Table
            id="device-three-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns3()}
            dataSource={threeTable}
            pagination={false}
          />
        )}
        {fourTable.length > 0 && (
          <Table
            id="device-four-repair-table"
            style={{ display: "none" }}
            uncontrolled
            bordered
            columns={this.renderColumns4()}
            dataSource={fourTable}
            pagination={false}
          />
        )}
      </React.Fragment>
    );
  }
}
