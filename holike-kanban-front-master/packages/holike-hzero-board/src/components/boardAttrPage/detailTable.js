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
        title: "工厂",
        dataIndex: 'plantDesc',
        width: 150,
      },
      {
        title: "车间",
        dataIndex: 'workShopDesc',
        width: 150,
      },
      {
        title: "产线",
        dataIndex: 'prodLineDesc',
        width: 150,
      },
      {
        title: "物料标识",
        dataIndex: 'workOrderId',
        width: 150,
      },
      {
        title: "角度",
        dataIndex: 'angle',
        width: 150,
      },
      {
        title: "倒角个数",
        dataIndex: 'anglecount',
        width: 150,
      },
      {
        title: "弧长",
        dataIndex: 'arclength',
        width: 150,
      },
      {
        title: "孔位个数",
        dataIndex: 'holecount',
        width: 150,
      },
      {
        title: "同批次花色板件数量",
        dataIndex: 'quantitywithsamecolorsamebatch',
        width: 150,
      },
      {
        title: "订单板件数",
        dataIndex: 'orderQty',
        width: 150,
      },
      {
        title: "板件所在包装板件数量",
        dataIndex: 'packagematerialquantity',
        width: 150,
      },
      {
        title: "所在包装板件类型板件数(五金除外)",
        dataIndex: 'pknQty',
        width: 150,
      },
      {
        title: "板件所在门层级门板扇数",
        dataIndex: 'packagedoormaterialquantity',
        width: 150,
      },
      {
        title: "封边规则计算结果",
        dataIndex: 'edgecalculationresult',
        width: 150,
      },
      {
        title: "两长边封边结果",
        dataIndex: 'edgeonline',
        width: 150,
      },
      {
        title: "两短边封边结果",
        dataIndex: 'edgemanual',
        width: 150,
      },
      {
        title: "板件所在订单包装数",
        dataIndex: 'orderpackagequantity',
        width: 150,
      },
      {
        title: "板件所在包装最长边",
        dataIndex: 'packagelongedge',
        width: 150,
      },
      {
        title: "板件所在包装最长宽",
        dataIndex: 'packagelongwidth',
        width: 150,
      },
      {
        title: "百叶用量计算值",
        dataIndex: 'louvercalresults',
        width: 150,
      },
      {
        title: "移门组装板件数",
        dataIndex: 'b02panelquantity',
        width: 150,
      },
      {
        title: "异形板件走刀路径",
        dataIndex: 'cncoutline',
        width: 150,
      },
      {
        title: "大小量纲尺寸长",
        dataIndex: 'n1',
        width: 150,
      },
      {
        title: "封边薄边边长",
        dataIndex: 'thinedgelength',
        width: 150,
      },
      {
        title: "物理长边",
        dataIndex: 'physicslength',
        width: 150,
      },
      {
        title: "物理短边",
        dataIndex: 'physicswidth',
        width: 150,
      },
      {
        title: "板件所在包装物理边长",
        dataIndex: 'packagephysicslength',
        width: 150,
      },
      {
        title: "创建时间",
        dataIndex: 'creationDate',
        width: 150,
      },
    ];
    return columns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          uncontrolled
          bordered
          rowKey={(record, index) => { return `h${index}`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="board-attr-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `b${index}`; }}
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