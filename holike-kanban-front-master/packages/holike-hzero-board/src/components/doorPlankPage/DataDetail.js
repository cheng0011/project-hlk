import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class DataDetail extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
        title: '日期',
        dataIndex: '日期',
        width: 100,
        sorter: true,
      },
      {
        title: '订单号',
        dataIndex: '订单号',
        width: 100,
        sorter: true,
      },
      {
        title: '物料描述',
        dataIndex: '物料描述',
        width: 120,
        sorter: true,
      },
      {
        title: '物料颜色',
        dataIndex: '物料颜色',
        width: 120,
        sorter: true,
      },
      {
        title: '异常描述',
        dataIndex: '异常描述',
        width: 120,
        sorter: true,
      },
      {
        title: '规格',
        dataIndex: '规格',
        width: 100,
        sorter: true,
      },
      {
        title: '数量',
        dataIndex: '数量',
        width: 100,
        sorter: true,
      },
      {
        title: '领取原因',
        dataIndex: '领取原因',
        width: 120,
        sorter: true,
      },
      {
        title: '补料人',
        dataIndex: '补料人',
        width: 100,
        sorter: true,
      },
      {
        title: '责任人',
        dataIndex: '责任人',
        width: 100,
        sorter: true,
      },
      {
        title: '组长',
        dataIndex: '组长',
        width: 100,
        sorter: true,
      },
    ];
  }

  render() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        日期: `日期${i}`,
        订单号: `订单号${i}`,
        物料描述: `物料描述${i}`,
        物料颜色: `物料颜色${i}`,
        异常描述: `异常描述${i}`,
        规格: `规格${i}`,
        数量: `数量${i}`,
        领取原因: `领取原因${i}`,
        补料人: `补料人${i}`,
        责任人: `责任人${i}`,
        组长: `组长${i}`,
      });
    }

    return (
      <React.Fragment>
        <Table
          columns={this.renderColumns()}
          dataSource={data}
          bordered
          scroll={{x: '100%', y: '150px'}}
        />
      </React.Fragment>
    );
  }
}
