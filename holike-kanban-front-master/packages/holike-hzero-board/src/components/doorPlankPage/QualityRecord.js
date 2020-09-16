import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';

export default class QualityRecord extends PureComponent {

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
        title: '单号',
        dataIndex: '单号',
        width: 100,
        sorter: true,
      },
      {
        title: '厂部',
        dataIndex: '厂部',
        width: 100,
        sorter: true,
      },
      {
        title: '品质员',
        dataIndex: '品质员',
        width: 100,
        sorter: true,
      },
      {
        title: '异常描述',
        dataIndex: '异常描述',
        width: 200,
        sorter: true,
      },
      {
        title: '主机手',
        dataIndex: '主机手',
        width: 100,
        sorter: true,
      },
      {
        title: '组长',
        dataIndex: '组长',
        width: 100,
        sorter: true,
      },
      {
        title: '主管',
        dataIndex: '主管',
        width: 100,
        sorter: true,
      },
      {
        title: '一级分类',
        dataIndex: '一级分类',
        width: 100,
        sorter: true,
      },
      {
        title: '二级分类',
        dataIndex: '二级分类',
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
        单号: `单号${i}`,
        厂部: `厂部${i}`,
        品质员: `品质员${i}`,
        异常描述: `异常描述${i}`,
        主机手: `主机手${i}`,
        组长: `组长${i}`,
        主管: `主管${i}`,
        一级分类: `一级分类${i}`,
        二级分类: `二级分类${i}`,
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
