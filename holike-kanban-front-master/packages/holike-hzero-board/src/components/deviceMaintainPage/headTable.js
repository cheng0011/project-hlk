import React, { PureComponent } from 'react';
import { Table } from 'hzero-ui';
import { isNumber, sum } from 'lodash';

/**
 * 数据列表
 * @extends {PureComponent} - React.PureComponent
 * @reactProps {Function} onChange - 分页查询
 * @reactProps {Boolean} loading - 数据加载完成标记
 * @reactProps {Array} dataSource - Table数据源
 * @return React.element
 */
export default class TableList extends PureComponent {

  /**
   * 渲染columns
   * @returns {*}
   */
  renderColumns() {
    const columns = [
      {
        title: "保养单号",
        dataIndex: 'maintenanceNumber',
        width: 200,
      },
      {
        title: "车间",
        dataIndex: 'workShopName',
        width: 200,
      },
      {
        title: "产线",
        dataIndex: 'productDescriptions',
        width: 200,
      },
      {
        title: "工位",
        dataIndex: 'workcellName',
        width: 150,
      },
      {
        title: "设备名称",
        dataIndex: 'equipmentName',
        width: 200,
      },
      {
        title: "内部资产编码",
        dataIndex: 'innerAssetsCode',
        width: 150,
      },
      {
        title: "保养级别",
        dataIndex: 'maintainLevel',
        width: 150,
      },
      {
        title: "保养负责人",
        dataIndex: 'maintainLeader',
        width: 150,
      },
      {
        title: "保养时间",
        dataIndex: 'maintainDate',
        width: 150,
      },
      {
        title: "保养状态",
        dataIndex: 'maintainStatus',
        width: 150,
      },
    ];
    return columns;
  }

  render() {
    const { loading, dataSource, onClick } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          onRow={(record) => {
            return {
              onClick: () => {
                onClick(record);
              },
            };
          }}
          rowKey={(record, index) => { return `${index}h`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="device-maintain-head-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `$r${index}`; }}
            columns={this.renderColumns()}
            scroll={{ x: scrollX }}
            dataSource={dataSource}
            pagination={false}
          />
        )}
      </React.Fragment>
    );
  }
}