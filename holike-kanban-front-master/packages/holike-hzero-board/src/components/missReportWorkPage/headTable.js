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
        title: "工厂",
        dataIndex: 'plantDesc',
        width: 100,
      },
      {
        title: "车间",
        dataIndex: 'workShopDesc',
        width: 150,
      },
      {
        title: "产线",
        dataIndex: 'prodLineDesc',
        width: 150,
      },
      {
        title: "工序类别",
        dataIndex: 'opTypeDesc',
        width: 100,
      },
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
        title: "板件类型",
        dataIndex: 'boardTypeDesc',
        width: 100,
      },
      {
        title: "漏报工",
        dataIndex: 'missReportCount',
        width: 100,
      },
      {
        title: "已报工",
        dataIndex: 'reportedCount',
        width: 100,
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
          rowKey="missReportWorkTable"
          onRow={(record) => {
            return {
              onClick: () => {
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
