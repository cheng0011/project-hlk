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
    const renderContent = (text, row) => {
      if (Object.keys(row).includes("province") && !Object.keys(row).includes("b01")) {
        return {
          props: {
            colSpan: 0,
          },
        };
      } else {
        return text;
      }
    };

    const renderContent2 = (text, row) => {
      if ((Object.keys(row).includes("province") && !Object.keys(row).includes("b01")) || Object.keys(row).includes("count")) {
        return {
          props: {
            colSpan: 0,
          },
        };
      } else {
        return text;
      };
    };
    const renderContent3 = (text, row) => {
      if (Object.keys(row).includes("count")) {
        return {
          children: `小计：`,
          props: {
            colSpan: 2,
            align: "right",
          },
        };
      } else if (Object.keys(row).includes("province") && !Object.keys(row).includes("b01")) {
        return {
          props: {
            colSpan: 0,
          },
        };
      } else {
        return text;
      };
    };
    const bidBondColumns = [
      {
        title: "经销商",
        dataIndex: 'province',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("province") && !Object.keys(row).includes("b01")) {
            return {
              children: `客户：${text}`,
              props: {
                colSpan: 22,
              },
            };
          } else if (Object.keys(row).includes("count")) {
            return {
              children: `小计：${row.count}个订单`,
              props: {
                align: "center",
                colSpan: 3,
              },
            };
          } else {
            return text;
          };
        },
      },
      {
        title: "采购单号",
        dataIndex: 'poCode',
        width: 250,
        render: renderContent2,
      },
      {
        title: "批次号",
        dataIndex: 'boList',
        width: 250,
        render: renderContent2,
      },
      {
        title: "客户",
        dataIndex: 'customer',
        width: 150,
        render: renderContent2,
      },
      {
        title: "合计",
        dataIndex: 'countPmo',
        width: 150,
        render: renderContent3,
      },
      {
        title: "柜身",
        dataIndex: 'b01',
        width: 150,
        render: renderContent,
      },
      {
        title: "移门",
        dataIndex: 'b02',
        width: 150,
        render: renderContent,
      },
      {
        title: "木框门",
        dataIndex: 'b03',
        width: 150,
        render: renderContent,
      },
      {
        title: "金属装饰框",
        dataIndex: 'b04',
        width: 150,
        render: renderContent,
      },
      {
        title: "吸塑",
        dataIndex: 'b05',
        width: 150,
        render: renderContent,
      },
      {
        title: "背板",
        dataIndex: 'b06',
        width: 150,
        render: renderContent,
      },
      {
        title: "装饰件",
        dataIndex: 'b07',
        width: 150,
        render: renderContent,
      },
      {
        title: "五金",
        dataIndex: 'b08',
        width: 100,
        render: renderContent,
      },
      {
        title: "TA铝框门",
        dataIndex: 'b10',
        width: 100,
        render: renderContent,
      },
      {
        title: "欧式铝框门",
        dataIndex: 'b11',
        width: 100,
        render: renderContent,
      },
      {
        title: "欧式木框门",
        dataIndex: 'b12',
        width: 100,
        render: renderContent,
      },
      {
        title: "蒙特利安门",
        dataIndex: 'b13',
        width: 100,
        render: renderContent,
      },
      {
        title: "LMZ铝框门",
        dataIndex: 'b15',
        width: 100,
        render: renderContent,
      },
      {
        title: "激光封边",
        dataIndex: 'b15',
        width: 100,
        render: renderContent,
      },
      {
        title: "圆弧门",
        dataIndex: 'b16',
        width: 100,
        render: renderContent,
      },
      {
        title: "FG掩门",
        dataIndex: 'b17',
        width: 100,
        render: renderContent,
      },
      {
        title: "瓦尔登湖",
        dataIndex: 'b18',
        width: 100,
        render: renderContent,
      },
    ];
    return bidBondColumns;
  }

  render() {
    const { loading, dataSource } = this.props;
    const newDataSource = JSON.parse(JSON.stringify(dataSource));
    let data = [];
    if (Object.keys(newDataSource).length > 0 && newDataSource.content.length > 0) {
      data = newDataSource.content.map((item, index) => {
        const tempList = item.content.map((i, j) => {
          return { key: `${index}-${j}-${j}`, ...i };
        });
        const tempItem = { children: tempList };
        tempItem.children.push({
          key: `${index}-${index}-g`,
          "count": item.count,
          "batchNoSubTotal": item.batchNoSubTotal,
          "b01": item.b01SubTotal,
          "b02": item.b02SubTotal,
          "b03": item.b03SubTotal,
          "b04": item.b04SubTotal,
          "b05": item.b05SubTotal,
          "b06": item.b06SubTotal,
          "b07": item.b07SubTotal,
          "b08": item.b08SubTotal,
          "b10": item.b10SubTotal,
          "b11": item.b11SubTotal,
          "b12": item.b12SubTotal,
          "b13": item.b12SubTotal,
          "b14": item.b13SubTotal,
          "b15": item.b15SubTotal,
          "b16": item.b16SubTotal,
          "b17": item.b17SubTotal,
          "b18": item.b18SubTotal,
        });
        tempItem.province = tempList[0].customer;
        tempItem.key = `${index}-${index}`;
        return tempItem;
      });
      data.push({
        key: `xxxx`,
        "count": newDataSource.count,
        "b01": newDataSource.b01Total,
        "b02": newDataSource.b02Total,
        "b03": newDataSource.b03Total,
        "b04": newDataSource.b04Total,
        "b05": newDataSource.b05Total,
        "b06": newDataSource.b06Total,
        "b07": newDataSource.b07Total,
        "b08": newDataSource.b08Total,
        "b10": newDataSource.b10Total,
        "b11": newDataSource.b11Total,
        "b12": newDataSource.b12Total,
        "b13": newDataSource.b12Total,
        "b14": newDataSource.b13Total,
        "b15": newDataSource.b15Total,
        "b16": newDataSource.b16Total,
        "b17": newDataSource.b17Total,
        "b18": newDataSource.b18Total,
      });
    }
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
          dataSource={data}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {data.length > 0 && (
          <Table
            id="auto-packing-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${record.key}${index}`; }}
            columns={this.renderColumns()}
            scroll={{ x: scrollX }}
            dataSource={data}
            pagination={false}
          />
        )}
      </React.Fragment>
    );
  }
}