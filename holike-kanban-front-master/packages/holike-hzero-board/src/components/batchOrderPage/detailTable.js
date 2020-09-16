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
        title: "订单信息",
        children: [
          {
            title: "物料标识",
            dataIndex: "wubs",
          },
          {
            title: "批次号",
            dataIndex: "pch",
          },
          {
            title: "子订单号",
            dataIndex: "zddh",
          },
          {
            title: "板件名称",
            dataIndex: "bjmc",
          },
          {
            title: "生产订单号",
            dataIndex: "scddh",
          },
          {
            title: "板件类型",
            dataIndex: "bjlx",
          },
          {
            title: "UPI",
            dataIndex: "upi",
          },
          {
            title: "花色",
            dataIndex: "hs",
          },
          {
            title: "孔位信息1",
            dataIndex: "kwxx1",
          },
          {
            title: "孔位信息2",
            dataIndex: "kwxx2",
          },
          {
            title: "数量",
            dataIndex: "sl",
          },
          {
            title: "开槽打锣做型",
            dataIndex: "kcdlzx",
          },
          {
            title: "封边信息",
            dataIndex: "fbxx",
          },
          {
            title: "成品长",
            dataIndex: "cpc",
          },
          {
            title: "成品宽",
            dataIndex: "cpk",
          },
          {
            title: "成品厚",
            dataIndex: "cpk",
          },
        ],
      },
      {
        title: "开料",
        children: [
          {
            title: "普通板件",
            dataIndex: "ptbj",
          },
          {
            title: "抽屉",
            dataIndex: "ct",
          },
          {
            title: "线条",
            dataIndex: "xt",
          },
          {
            title: "总工时",
            dataIndex: "zgs1",
          },
        ],
      },
      {
        title: "打锣",
        children: [
          {
            title: "拉槽",
            dataIndex: "lc",
          },
          {
            title: "拉手",
            dataIndex: "ls",
          },
          {
            title: "铣型",
            dataIndex: "xx",
          },
          {
            title: "总工时",
            dataIndex: "zgs2",
          },
        ],
      },
      {
        title: "封边",
        children: [
          {
            title: "联机封边",
            dataIndex: "ljfb",
          },
          {
            title: "单机封边",
            dataIndex: "djfb",
          },
          {
            title: "手动封边",
            dataIndex: "sdfb",
          },
          {
            title: "NG板件分拣",
            dataIndex: "ngbjfj",
          },
          {
            title: "总工时",
            dataIndex: "zgs3",
          },
        ],
      },
      {
        title: "打孔",
        children: [
          {
            title: "普通板件",
            dataIndex: "ptbj",
          },
          {
            title: "做型板件",
            dataIndex: "zxbxj",
          },
          {
            title: "小件",
            dataIndex: "xj",
          },
          {
            title: "门板",
            dataIndex: "mb",
          },
          {
            title: "NG板件",
            dataIndex: "NGbanjian",
          },
          {
            title: "分拣",
            dataIndex: "fgan",
          },
          {
            title: "总工时",
            dataIndex: "zgs4",
          },
        ],
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
          rowKey={(record, index) => { return `${record.key}${index}`; }}
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {dataSource.length > 0 && (
          <Table
            id="batch-order-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${record.key}${index}`; }}
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