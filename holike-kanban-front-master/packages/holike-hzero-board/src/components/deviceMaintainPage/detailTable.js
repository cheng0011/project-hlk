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
        title: "保养项",
        dataIndex: 'maintenanceItem',
        width: 150,
      },
      {
        title: "保养方式",
        dataIndex: 'maintenanceWay',
        width: 150,
      },
      {
        title: "工具/物料",
        dataIndex: 'maintenanceTool',
        width: 150,
      },
    ];
    return columns;
  }

  render() {
    const { dataSource } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          rowKey={(record, index) => { return `d${index}`; }}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="device-maintain-row-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${index}d`; }}
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