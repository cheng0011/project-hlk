import React, {PureComponent} from 'react';
import {Table} from 'hzero-ui';
import "./equMachiningCss.less"
export default class EquMachiningHeadTable extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    return [
      {
          title: '加工wkc',
          dataIndex: 'description',
          width: 100,
      },
      {
        title: '加工设备',
        dataIndex: 'equipmentName',
        width: 100,
      },
      {
        title: '面积',
        dataIndex: 'area',
        width: 100,
      },
      {
        title: '孔径',
        dataIndex: 'dia',
        width: 150,
      },
      {
        title: '反补数量',
        dataIndex: 'reworkCount',
        width: 100,
      }
    ];
  }

  render() {
    const { loading, dataSource,onClick } = this.props;
    return (
      <React.Fragment>
        <Table
        onRow={(record) => {
          return {
            onClick: () => {
              onClick(record);
            },
          };
        }}
        rowKey={(record, index) => { return `${index}h`; }}
          columns={this.renderColumns()}
          dataSource={dataSource}
          bordered
          loading={loading}
          scroll={{x: '100%'}}
          pagination={{showSizeChanger:true,defaultPageSize:5,pageSizeOptions:["5","10","20"]}}
        />
      </React.Fragment>
    );
  }
}