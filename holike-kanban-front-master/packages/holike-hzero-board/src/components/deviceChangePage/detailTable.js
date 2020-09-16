import React, { PureComponent } from 'react';
import { Table } from 'hzero-ui';
import { isNumber, sum } from 'lodash';

/**
 * 数据列表
 * @extends {PureComponent} - React.PureComponent
 * @reactProps {Function} onChange - 分页查询
 * @reactProps {Boolean} loading - 数据加载完成标记
 * @reactProps {Array} dataSource - Table数据源
 * @return React.element
 */
export default class TableList extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    const columns = [
      {
        title: "配件编码",
        dataIndex: 'itemCode',
        width: 200,
      },
      {
        title: "配件名称",
        dataIndex: 'materialDiscriptions',
        width: 200,
      },
      {
        title: "设备组",
        dataIndex: 'equipmentGroupName',
        width: 150,
      },
      {
        title: "设备名称",
        dataIndex: 'equipmentName',
        width: 150,
      },
      {
        title: "内部资产编码",
        dataIndex: 'innerAssetsCode',
        width: 150,
      },
      {
        title: "工位",
        dataIndex: 'description',
        width: 200,
      },
      {
        title: "上次更换设备时间",
        dataIndex: 'startDate',
        width: 150,
      },
      {
        title: "本次更换设备时间",
        dataIndex: 'endDate',
        width: 150,
      },
      {
        title: "MTBF(平均故障更换配件间隔时间)(天)",
        dataIndex: 'mtbf',
        width: 150,
      },
    ];
    return columns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          rowKey={(record, index) => { return `${record.key}${index}`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="device-change-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${record.key}${index}`; }}
            columns={this.renderColumns()}
            scroll={{ x: scrollX }}
            dataSource={dataSource}
            pagination={false}
          />
        )}
      </React.Fragment>
    );
  }
}
