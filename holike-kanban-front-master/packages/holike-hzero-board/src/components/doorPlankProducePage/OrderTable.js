import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class OrderTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
        title: '门型',
        dataIndex: 'meaning',
        width: 50,
      },
      {
        title: '单日数据量',
        dataIndex: 'date',
        children: [
          {
            title: '下单量',
            dataIndex: 'dayQuantity',
            width: 50,
          },
          {
            title: '单数',
            dataIndex: 'dayOrderNum',
            width: 50,
          },
          {
            title: '完成',
            dataIndex: 'dayComplete',
            width: 50,
          },
          {
            title: '车间遗留',
            dataIndex: 'dayLeaveOver',
            width: 80,
          },
        ],
      },
      {
        title: '月累计',
        dataIndex: '月累计',
        children: [{
          title: '下单量',
          dataIndex: 'monthQuantity',
          width: 50,
        },
          {
            title: '单数',
            dataIndex: 'monthOrderNum',
            width: 50,
          },
          {
            title: '完成量',
            dataIndex: 'monthComplete',
            width: 50,
          },
          {
            title: '车间遗留',
            dataIndex: 'monthLeaveOver',
            width: 80,
          },
        ],
      },
    ];
  }

  render() {
    const { loading, dataSource } = this.props;
    return (
      <React.Fragment>
        <Table
          columns={this.renderColumns()}
          dataSource={dataSource}
          bordered
          loading={loading}
          scroll={{x: '100%'}}
        />
      </React.Fragment>
    );
  }
}
