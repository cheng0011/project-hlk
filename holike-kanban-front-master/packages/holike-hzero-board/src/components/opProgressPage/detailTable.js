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
        title: "分拣号",
        dataIndex: 'sortingNumber',
        width: 150,
      },
      {
        title: "子订单号",
        dataIndex: 'parentMakeOrderNo',
        width: 150,
      },
      {
        title: "PO",
        dataIndex: 'po',
        width: 150,
      },
      {
        title: "工序",
        dataIndex: 'opDesc',
        width: 100,
      },
      {
        title: "板件数",
        dataIndex: 'boardQty',
        width: 80,
      },
      {
        title: "完工数",
        dataIndex: 'completeQty',
        width: 80,
      },
      {
        title: "未完工数",
        dataIndex: 'unCompleteQty',
        width: 80,
      },
      {
        title: "完工率",
        dataIndex: 'completeRate',
        width: 80,
      },
      {
        title: "异常率",
        dataIndex: 'errorRate',
        width: 80,
      },
    ];
    return bidBondColumns;
  }

  render() {
    const { loading, dataSource, onClick } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          bordered
          rowKey="op"
          onRow={(record) => {
            return {
              onClick: () => {
                // const { materialTypeName, fthickness } = record;
                onClick(record);
              },
            };
          }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}
