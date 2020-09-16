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
        title: "包装时间",
        dataIndex: 'creationDate',
        width: 100,
      },
      {
        title: "PO",
        dataIndex: 'po',
        width: 150,
      },
      {
        title: "经销商",
        dataIndex: 'dealerName',
        width: 150,
      },
      {
        title: "生产订单",
        dataIndex: 'demandOrderNo',
        width: 100,
      },
      {
        title: "生产子订单",
        dataIndex: 'parentMakeOrderNo',
        width: 100,
      },
      {
        title: "SO",
        dataIndex: 'saleOrderNo',
        width: 100,
      },
      {
        title: "材质",
        dataIndex: 'materialTypeName',
        width: 100,
      },
      {
        title: "花色",
        dataIndex: 'colorName',
        width: 100,
      },
      {
        title: "包装数量",
        dataIndex: 'pknCount',
        width: 100,
      },
      {
        title: "产线",
        dataIndex: 'prodlineDesc',
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
          rowKey="tenderDocId"
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}
