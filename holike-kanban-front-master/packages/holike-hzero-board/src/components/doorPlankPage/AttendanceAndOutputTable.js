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
        dataIndex: '班组',
        width: 100,
        sorter: (a, b) => a.班组.length - b.班组.length,
      },
      {
        title: '工序',
        dataIndex: '工序',
        width: 100,
        sorter: (a, b) => a.工序.length - b.工序.length,
      },
      {
        title: '产能',
        dataIndex: '产能',
        width: 100,
        sorter: (a, b) => a.工序.length - b.工序.length,
      },
      {
        title: '出勤人数',
        dataIndex: '出勤人数',
        width: 100,
        sorter: (a, b) => a.工序.length - b.工序.length,
      },
      {
        title: '人均',
        dataIndex: '人均',
        width: 100,
        sorter: (a, b) => a.工序.length - b.工序.length,
      }];
  }

  render() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        班组: `班组${i}`,
        工序: `工序${i}`,
        产能: `产能${i}`,
        出勤人数: `出勤人数${i}`,
        人均: `人均${i}`,
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
