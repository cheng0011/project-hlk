import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class BatchInfoTable extends PureComponent {

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
        title: '板件编号',
        dataIndex: 'upi',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'processStatus',
        width: 100,
      },
      {
        title: '板件描述',
        dataIndex: 'boardName',
        width: 100,
      },
      {
        title: '板件花色',
        dataIndex: 'colorName',
        width: 100,
      },
      {
        title: '长度',
        dataIndex: 'flength',
        width: 100,
      },
      {
        title: '宽度',
        dataIndex: 'fwidth',
        width: 100,
      },
      {
        title: '厚度',
        dataIndex: 'fthickness',
        width: 100,
      },
      {
        title: '面积',
        dataIndex: 'area',
        width: 100,
      },
      {
        title: '是否反补',
        dataIndex: 'denying',
        width: 100,
      },
      {
        title: '扫描设备',
        dataIndex: 'equipmentName',
        width: 100,
      },
      {
        title: '扫描时间',
        dataIndex: 'scanningTime',
        width: 100,
      },
    ];
  }

  render() {
    const {loading, dataSource} = this.props;
    for (let i = 0; i < dataSource.length; i++) {
      dataSource[i].sequenceNumber = i + 1;
    }
    return (
      <React.Fragment>
        <Table
          columns={this.renderColumns()}
          dataSource={dataSource}
          rowKey={(record, index) => { return `${index}h`; }}
          loading={loading}
          scroll={{x: '100%'}}
        />
      </React.Fragment>
    );
  }
}
