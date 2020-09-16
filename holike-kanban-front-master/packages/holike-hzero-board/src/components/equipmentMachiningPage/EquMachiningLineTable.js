import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class EquMachiningLineTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
        title: 'UPI',
        dataIndex: 'upi',
        width: 100,
      },
      {
          title: '板件名称',
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
        title: '加工设备',
        dataIndex: 'equipmentName',
        width: 100,
      },
      {
        title: '扫描时间',
        dataIndex: 'creationDate',
        width: 100,
      }];
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
          pagination={{ showSizeChanger: true, defaultPageSize: 10, pageSizeOptions: ["20", "50", "100","200"] }}
        />
      </React.Fragment>
    );
  }
}