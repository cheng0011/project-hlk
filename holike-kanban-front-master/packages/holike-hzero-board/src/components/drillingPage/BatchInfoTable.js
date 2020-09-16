import React, {PureComponent} from 'react';
import {Table, Popconfirm} from 'hzero-ui';

export default class BatchInfoTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    const {detailsClick, completeClick} = this.props;
    return [
      {
        title: '序号',
        dataIndex: 'sequenceNumber',
        width: 50,
      },
      {
        title: '批次',
        dataIndex: 'batchOrderNo',
        width: 120,
      },
      {
        title: '上线时间',
        dataIndex: 'onlineTime',
        width: 130,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
      },
      {
        title: '板件数',
        dataIndex: 'plateNumber',
        width: 100,
      },
      {
        title: '扫描数据',
        dataIndex: 'scanData',
        width: 100,
      },
      {
        title: '扫描数据(不在规则内)',
        dataIndex: 'notInTheRules',
        width: 100,
      },
      {
        title: '扫描进度',
        dataIndex: 'scanningProgress',
        width: 100,
        render: (text) => {
          return (
            <span>{`${parseFloat(text*100).toFixed(1)}%`}</span>
          );
        },
      },
      {
        title: '未扫描数',
        dataIndex: 'notScanNumber',
        width: 100,
      },
      {
        title: '面积',
        dataIndex: 'area',
        width: 100,
      },
      {
        title: '板件详情',
        dataIndex: '',
        width: 100,
        key: 'x',
        render: (text, record) => {
          return (
            <a href="javascript:;" onClick={() => detailsClick(record)}>查看</a>
          );
        },
      },
      {
        title: '批次状态',
        dataIndex: '',
        width: 100,
        render: (text, record) => {
          return (
            <Popconfirm title="确定完成吗?" onConfirm={() => completeClick(record)}>
              <a href="javascript:;">完成</a>
            </Popconfirm>
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
    /* for (const item of dataSource) {
      item.avg=(parseInt(item.capacity)/item.numberAttendance).toFixed(2);
    } */
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
          rowKey={(record, index) => {
            return `${index}h`;
          }}
          loading={loading}
          scroll={{x: '100%'}}
        />
      </React.Fragment>
    );
  }
}
