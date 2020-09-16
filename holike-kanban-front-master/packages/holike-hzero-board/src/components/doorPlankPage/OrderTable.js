import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';
import "./index.less";

export default class OrderTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [{
      title: "门板车间订单进度",
      children: [
        {
          title: '门型',
          dataIndex: '门型',
          width: 50,
        },
        {
          title: '6月4日',
          dataIndex: 'date',
          children: [
            {
              title: '下单量',
              dataIndex: '下单量',
              width: 50,
            },
            {
              title: '单数',
              dataIndex: '单数',
              width: 50,
            },
            {
              title: '完成',
              dataIndex: '完成',
              width: 50,
              className: 'blue_background',
            },
            {
              title: '车间遗留',
              dataIndex: '车间遗留',
              width: 80,
              className: 'blue_background',
            },
          ],
        },
        {
          title: '月累计',
          dataIndex: '月累计',
          children: [{
            title: '下单量',
            dataIndex: '下单量1',
            width: 50,
            className: 'red_background',
          },
            {
              title: '单数',
              dataIndex: '单数1',
              className: 'red_background',
              width: 50,
            },
            {
              title: '完成量',
              dataIndex: '完成量',
              className: 'red_background',
              width: 50,
            },
            {
              title: '车间遗留1',
              dataIndex: '车间遗留1',
              className: 'red_background',
              width: 80,
            },
          ],
        },
      ],
    }];
  }

  render() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        门型: `门型${i}`,
        下单量: i,
        单数: i,
        完成: 2035,
        车间遗留: `车间遗留${i}`,
        下单量1: `下单量1${i}`,
        单数1: `单数1${i}`,
        完成量: `完成量${i}`,
        车间遗留1: `车间遗留1${i}`,
      });
    }

    return (
      <React.Fragment>
        <Table
          columns={this.renderColumns()}
          dataSource={data}
          bordered
          scroll={{x: '100%'}}
        />
      </React.Fragment>
    );
  }
}
