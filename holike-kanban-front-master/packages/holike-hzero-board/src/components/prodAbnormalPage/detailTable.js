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
        title: "日",
        dataIndex: 'creationDate',
      },
      {
        title: "周",
        dataIndex: 'weekOfMonth',
      },
      {
        title: "月",
        dataIndex: 'month',
      },
      {
        title: "计划停产",
        dataIndex: 'planStopTypeMeaning',
      },
      {
        title: "异常类型",
        dataIndex: 'problemType',
      },
      {
        title: "责任部门",
        dataIndex: 'responsibleDepartmnet',
      },
      {
        title: "异常数",
        dataIndex: 'size',
      },
    ];
    return columns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const newDataSource = JSON.parse(JSON.stringify(dataSource));
    let data = [];
    data = newDataSource.length > 0 && newDataSource.map((item) => {
      const { weekOfMonth, month, size } = item;
      const { creationDate, problemType, responsibleDepartmnet, planStopTypeMeaning } = item.group[0];
      return { creationDate, weekOfMonth: `第${weekOfMonth}周`, month: `${month}月`, planStopTypeMeaning, problemType, responsibleDepartmnet, size };
    });
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          rowKey={(record, index) => { return `x${index}`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={data}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {data.length > 0 && (
          <Table
            id="prod-abnormal-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `y${index}`; }}
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