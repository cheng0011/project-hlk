import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';
import "./index.less";

export default class PersonaOutputTable extends PureComponent {

  renderColumns() {
    return [
      {
        title: "主机手",
        dataIndex: "主机手",
        width: 120,
      },
      {
        title: "工序",
        dataIndex: "工序",
        width: 120,
      },
      {
        title: '6月6日',
        children: [
          {
            title: 'T1',
            dataIndex: 'T1',
            width: 120,
          },
          {
            title: 'TH',
            dataIndex: 'TH',
            width: 120,
          },
          {
            title: 'T5',
            dataIndex: 'T5',
            width: 120,
          },
          {
            title: 'FC',
            dataIndex: 'FC',
            width: 120,
          },
          {
            title: 'FH',
            dataIndex: 'FH',
            width: 120,
          },
          {
            title: 'FG',
            dataIndex: 'FG',
            width: 120,
          },
          {
            title: 'BE',
            dataIndex: 'BE',
            width: 120,
          },
          {
            title: '衣通',
            dataIndex: '衣通',
            width: 120,
          },
          {
            title: 'B单',
            dataIndex: 'B单',
            width: 120,
          },
          {
            title: '合计',
            dataIndex: '合计',
            width: 120,
            className: 'blue_background',
          },
        ],
      },
      {
        title: '月累计',
        children: [
          {
            title: 'T1',
            dataIndex: 'T11',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'TH',
            dataIndex: 'TH1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'T5',
            dataIndex: 'T51',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'FC',
            dataIndex: 'FC1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'FH',
            dataIndex: 'FH1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'FG',
            dataIndex: 'FG1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'BE',
            dataIndex: 'BE1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: '衣通',
            dataIndex: '衣通1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: 'B单',
            dataIndex: 'B单1',
            className: 'orange_background',
            width: 120,
          },
          {
            title: '累计',
            dataIndex: '累计',
            className: 'orange_background',
            width: 120,
          },
        ],
      },
    ];
  }

  render() {
    const data = [];
    for (let i = 0; i < 120; i++) {
      data.push({
        key: i,
        主机手: `主机手${i}`,
        工序: `工序${i}`,
        T1: `T1${i}`,
        TH: `TH${i}`,
        T5: `T5${i}`,
        FC: `FC${i}`,
        FH: `FH${i}`,
        FG: `FG${i}`,
        BE: `BE${i}`,
        衣通: `衣通${i}`,
        B单: `B单${i}`,
        合计: `合计${i}`,
        T11: `T11${i}`,
        TH1: `TH1${i}`,
        T51: `T51${i}`,
        FC1: `FC1${i}`,
        FH1: `FH1${i}`,
        FG1: `FG1${i}`,
        BE1: `BE1${i}`,
        衣通1: `衣通1${i}`,
        B单1: `B单1${i}`,
        累计: `累计${i}`,
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
