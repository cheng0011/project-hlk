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
        title: "不合格类型",
        dataIndex: 'completeType',
        width: 100,
      },
      {
        title: "是否已补板",
        dataIndex: 'printFlag',
        width: 100,
      },
      {
        title: "不合格记录时间",
        dataIndex: 'completeTime',
        width: 150,
      },
      {
        title: "PO",
        dataIndex: 'po',
        width: 150,
      },
      {
        title: "记录人",
        dataIndex: 'recorder',
        width: 100,
      },
      {
        title: "记录产线",
        dataIndex: 'recordProdLineName',
        width: 100,
      },
      {
        title: "指派产线",
        dataIndex: 'assignedProdLineName',
        width: 100,
      },
      {
        title: "修改时间",
        dataIndex: 'lastUpdateDate',
        width: 150,
      },
      {
        title: "修改人",
        dataIndex: 'modifiedBy',
        width: 100,
      },
      {
        title: "批次号",
        dataIndex: 'batchNo',
        width: 150,
      },
      {
        title: "生产订单号",
        dataIndex: 'parentMakeOrderNo',
        width: 150,
      },
      {
        title: "销售订单编号",
        dataIndex: 'saleOrderNo',
        width: 150,
      },
      {
        title: "UPI",
        dataIndex: 'upi',
        width: 150,
      },
      {
        title: "P.no",
        dataIndex: 'panelNo',
        width: 100,
      },
      {
        title: "物料名称",
        dataIndex: 'boardName',
        width: 100,
      },
      {
        title: "优化类型",
        dataIndex: 'optimizationType',
        width: 100,
      },
      {
        title: "花色",
        dataIndex: 'colorName',
        width: 100,
      },
      {
        title: "材质",
        dataIndex: 'materialTypeName',
        width: 100,
      },
      {
        title: "封边信息",
        dataIndex: 'edgeInfo',
        width: 100,
      },
      {
        title: "数量",
        dataIndex: 'quantity',
        width: 80,
      },
      {
        title: "单位",
        dataIndex: 'uom',
        width: 80,
      },
      {
        title: "开料长",
        dataIndex: 'clength',
        width: 80,
      },
      {
        title: "开料宽",
        dataIndex: 'cwidth',
        width: 80,
      },
      {
        title: "开料厚",
        dataIndex: 'cthickness',
        width: 80,
      },
      {
        title: "成品长",
        dataIndex: 'flength',
        width: 80,
      },
      {
        title: "成品宽",
        dataIndex: 'fwidth',
        width: 80,
      },
      {
        title: "成品厚",
        dataIndex: 'fthickness',
        width: 80,
      },
      {
        title: "正面编码",
        dataIndex: 'cncBarcode1',
        width: 100,
      },
      {
        title: "反面编码",
        dataIndex: 'cncBarcode2',
        width: 100,
      },
      {
        title: "不合格原因类别",
        dataIndex: 'meaning',
        width: 100,
      },
      {
        title: "不合格原因明细",
        dataIndex: 'badReasonDetails',
        width: 100,
      },
      {
        title: "责任人",
        dataIndex: 'responsible',
        width: 100,
      },
      {
        title: "责任工序",
        dataIndex: 'standardOpName',
        width: 150,
      },
    ];
    return bidBondColumns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <React.Fragment>
        <Table
          bordered
          rowKey="tenderDocId"
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
        />
      </React.Fragment>
    );
  }
}