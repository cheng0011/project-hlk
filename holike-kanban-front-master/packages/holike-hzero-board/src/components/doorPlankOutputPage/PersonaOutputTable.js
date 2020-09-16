import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';
import moment from 'moment';

export default class PersonaOutputTable extends PureComponent {

  renderColumns() {
    return [
      {
        title: "主机手",
        dataIndex: "hostHand",
        width: 120,
      },
      {
        title: "工序",
        dataIndex: "process",
        width: 120,
      },
      {
        title: this.props.startDate,
        children: [
          {
            title: 'T1',
            dataIndex: 't1Day',
            width: 120,
          },
          {
            title: 'TH',
            dataIndex: 'fhday',
            width: 120,
          },
          {
            title: 'T5',
            dataIndex: 't5Day',
            width: 120,
          },
          {
            title: 'FC',
            dataIndex: 'fcday',
            width: 120,
          },
          {
            title: 'FH',
            dataIndex: 'fhday',
            width: 120,
          },
          {
            title: 'FG',
            dataIndex: 'fgday',
            width: 120,
          },
          {
            title: 'BE',
            dataIndex: 'beday',
            width: 120,
          },
          {
            title: '衣通',
            dataIndex: 'ytDay',
            width: 120,
          },
          {
            title: 'B单',
            dataIndex: 'bday',
            width: 120,
          },
          {
            title: '合计',
            dataIndex: 'sumDay',
            width: 120,
          },
        ],
      },
      {
        title: '月累计',
        children: [
          {
            title: 'T1',
            dataIndex: 't1Month',
            width: 120,
          },
          {
            title: 'TH',
            dataIndex: 'thmonth',
            width: 120,
          },
          {
            title: 'T5',
            dataIndex: 't5Month',
            width: 120,
          },
          {
            title: 'FC',
            dataIndex: 'fcmonth',
            width: 120,
          },
          {
            title: 'FH',
            dataIndex: 'fhmonth',
            width: 120,
          },
          {
            title: 'FG',
            dataIndex: 'fgmonth',
            width: 120,
          },
          {
            title: 'BE',
            dataIndex: 'bemonth',
            width: 120,
          },
          {
            title: '衣通',
            dataIndex: 'ytMonth',
            width: 120,
          },
          {
            title: 'B单',
            dataIndex: 'bmonth',
            width: 120,
          },
          {
            title: '累计',
            dataIndex: 'sumMonth',
            width: 120,
          },
        ],
      },
    ];
  }

  render() {
    const { loading, dataSource } = this.props;
    for (const item of dataSource) {
      item.sumDay=item.t1Day+item.fhday+item.t5Day+item.fcday+item.fhday+item.fgday+item.beday+item.ytDay+item.bday;
      item.sumMonth=item.t1Month+item.thmonth+item.t5Month+item.fcmonth+item.fhmonth+item.fgmonth+item.bemonth+item.ytMonth+item.bmonth;
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
