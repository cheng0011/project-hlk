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
        width: 150,
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
        title: "批次号",
        dataIndex: 'batchOrderNo',
        width: 150,
      },
      {
        title: "采购订单号",
        dataIndex: 'po',
        width: 180,
      },
      {
        title: "产品类别",
        dataIndex: 'productType',
        width: 100,
      },
      {
        title: "子订单号",
        dataIndex: 'parentMakeOrderNo',
        width: 100,
      },
      {
        title: "材料-厚度",
        dataIndex: 'materialFthickness',
        width: 100,
      },
      {
        title: "材料",
        dataIndex: 'materialTypeName',
        width: 80,
      },
      {
        title: "厚度",
        dataIndex: 'fthickness',
        width: 80,
      },
      {
        title: "面积",
        dataIndex: 'area',
        width: 80,
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
          rowKey="detailTable"
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}
