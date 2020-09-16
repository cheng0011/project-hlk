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
    const bidBondColumns = [
      {
        title: "批次号",
        dataIndex: 'batchOrderNo',
        width: 150,
      },
      {
        title: "子订单号",
        dataIndex: 'parentMakeOrderNo',
        width: 150,
      },
      {
        title: "UPI",
        dataIndex: 'upi',
        width: 150,
      },
      {
        title: "板件名称",
        dataIndex: 'boardName',
        width: 100,
      },
      {
        title: "板件规格",
        dataIndex: 'sizeSpecification',
        width: 150,
      },
      {
        title: "花色",
        dataIndex: 'colorName',
        width: 100,
      },
      {
        title: "材质",
        dataIndex: 'materialTypeName',
        width: 100,
      },
      {
        title: "数量",
        dataIndex: 'quantity',
        width: 100,
      },
    ];
    return bidBondColumns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          bordered
          rowKey="missReportWorkRowTable"
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}
