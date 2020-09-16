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
    const bidBondColumns = [
      {
        title: "材料-厚度",
        dataIndex: 'materialFthickness',
        width: 100,
      },
      {
        title: "材料",
        dataIndex: 'materialTypeName',
        width: 100,
      },
      {
        title: "厚度",
        dataIndex: 'fthickness',
        width: 100,
      },
      {
        title: "面积",
        dataIndex: 'area',
        width: 100,
      },
    ];
    return bidBondColumns;
  }

  render() {
    const { loading, dataSource, onClick } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          bordered
          rowKey="headTable"
          onRow={(record) => {
            return {
              onClick: () => {
                const { materialTypeName, fthickness } = record;
                onClick(materialTypeName, fthickness);
              },
            };
          }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}
