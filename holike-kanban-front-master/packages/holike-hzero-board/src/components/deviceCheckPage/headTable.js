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
        title: "点检单号",
        dataIndex: 'checkNumber',
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
        width: 200,
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
        title: "责任部门",
        dataIndex: 'dutyDepartment',
        width: 150,
      },
      {
        title: "班次",
        dataIndex: 'shift',
        width: 150,
      },
      {
        title: "是否点检",
        dataIndex: 'checkFlag',
        width: 150,
      },
      {
        title: "点检开始时间",
        dataIndex: 'checkStartDate',
        width: 150,
      },
      {
        title: "点检结束时间",
        dataIndex: 'checkEndDate',
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
          rowKey={(record, index) => { return `${index}2`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="device-check-head-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${index}x`; }}
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