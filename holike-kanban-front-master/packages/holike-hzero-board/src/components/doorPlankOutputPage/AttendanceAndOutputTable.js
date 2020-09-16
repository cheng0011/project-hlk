import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class AttendanceAndOutputTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
        title: '班组',
        dataIndex: 'team',
        width: 100,
        sorter: (a, b) => a.team.length - b.team.length,
      },
      {
        title: '工序',
        dataIndex: 'meaning',
        width: 100,
        sorter: (a, b) => a.meaning.length - b.meaning.length,
      },
      {
        title: '产能',
        dataIndex: 'capacity',
        width: 100,
        sorter: (a, b) => a.capacity.length - b.capacity.length,
      },
      {
        title: '出勤人数',
        dataIndex: 'numberAttendance',
        width: 100,
        sorter: (a, b) => a - b,
      },
      {
        title: '人均',
        dataIndex: 'avg',
        width: 100,
        sorter: (a, b) => a - b,
      }];
  }

  render() {
    const { loading, dataSource } = this.props;
    for (const item of dataSource) {
      item.avg=(parseInt(item.capacity)/item.numberAttendance).toFixed(2);
    }
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
