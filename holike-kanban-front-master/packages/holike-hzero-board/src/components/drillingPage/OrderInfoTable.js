import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class OrderInfoTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
        title: '序号',
        dataIndex: 'sequenceNumber',
        width: 100,
      },
      {
        title: '子订单号',
        dataIndex: 'childOrderNumber',
        width: 100,
      },
      {
        title: '分拣号',
        dataIndex: 'sorting',
        width: 100,
      },
      {
        title: '面积',
        dataIndex: 'area',
        width: 100,
      },
      {
        title: '板件数',
        dataIndex: 'plateNumber',
        width: 100,
      },
      {
        title: '扫描数',
        dataIndex: 'numberOfScanning',
        width: 100,
      },
      {
        title: '未扫描数',
        dataIndex: 'notScanNumber',
        width: 100,
      },
      {
        title: '扫描进度',
        dataIndex: 'progressPercentage',
        width: 100,
        render: (text) => {
          return (
            <span>{`${parseFloat(text*100).toFixed(1)}%`}</span>
          );
        },
      },
    ];
  }

  render() {
    const {loading, dataSource, onClick} = this.props;
    for (let i = 0; i < dataSource.length; i++) {
      dataSource[i].sequenceNumber = i + 1;
    }
    return (
      <React.Fragment>
        <Table
          columns={this.renderColumns()}
          dataSource={dataSource}
          onRow={(record) => {
            return {
              onClick: () => {
                onClick(record);
              },
            };
          }}
          rowKey={(record, index) => { return `${index}h`; }}
          loading={loading}
          scroll={{x: '100%'}}
        />
      </React.Fragment>
    );
  }
}
