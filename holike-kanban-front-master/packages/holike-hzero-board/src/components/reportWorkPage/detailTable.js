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
      if (Object.keys(row).includes("numOfB01")) {
        return text;
      }
      return {
        children: text,
        props: {
          colSpan: 0,
        },
      };
    };

    const renderContent2 = (text, row) => {
      if ((Object.keys(row).includes("summaryGroupPmoCount") || Object.keys(row).includes("numOfB01")) && Object.keys(row).includes("worker")) {
        return text;
      }
      return {
        children: text,
        props: {
          colSpan: 0,
        },
      };
    };
    const bidBondColumns = [
      {
        title: "报工人",
        dataIndex: 'worker',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("worker") && Object.keys(row).includes("numOfB01")) {
            return text;
          } else if (Object.keys(row).includes("worker") && !Object.keys(row).includes("numOfB01")) {
            return {
              children: text,
              props: {
                colSpan: 50,
              },
            };
          } else if (Object.keys(row).includes("numOfB01") && !Object.keys(row).includes("worker")) {
            if (Object.keys(row).includes("summaryGroupPmoCount")) {
              return {
                props: {
                  colSpan: 8,
                },
              };
            } else {
              return {
                props: {
                  colSpan: 12,
                },
              };
            }
          }
          else {
            return {
              children: text,
              props: {
                colSpan: 50,
              },
            };
          }
        },
      },
      {
        title: "报工日期(扫描时间)",
        dataIndex: 'scanTime',
        width: 150,
        render: renderContent2,
      },
      {
        title: "车间",
        dataIndex: 'workShopName',
        width: 150,
        render: renderContent2,
      },
      {
        title: "工序",
        dataIndex: 'standardOpType',
        width: 150,
        render: renderContent2,
      },
      {
        title: "订单服务类型",
        dataIndex: 'orderServiceType',
        width: 150,
        render: renderContent2,
      },
      {
        title: "订单类型",
        dataIndex: 'orderType',
        width: 150,
        render: renderContent2,
      },
      {
        title: "PO",
        dataIndex: 'poCode',
        width: 150,
        render: renderContent2,
      },
      {
        title: "订单号",
        dataIndex: 'soCode',
        width: 150,
        render: renderContent2,
      },
      {
        title: "子订单号",
        dataIndex: 'pmoCode',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("numOfB01") && !Object.keys(row).includes("summaryGroupPmoCount") && Object.keys(row).includes("worker")) {
            return text;
          } else if (Object.keys(row).includes("numOfB01") && Object.keys(row).includes("summaryGroupPmoCount") && !Object.keys(row).includes("worker")) {
            return {
              children: `单数：${row.summaryGroupPmoCount}`,
            };
          }
          return {
            children: text,
            props: {
              colSpan: 0,
            },
          };
        },
      },
      {
        title: "经销商",
        dataIndex: 'dealerName',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("numOfB01") && !Object.keys(row).includes("summaryGroupPmoCount") && Object.keys(row).includes("worker")) {
            return text;
          } else if (Object.keys(row).includes("numOfB01") && Object.keys(row).includes("summaryGroupPmoCount") && !Object.keys(row).includes("worker")) {
            return {
              children: text,
              colSpan: 3,
            };
          }
          return {
            children: text,
            props: {
              colSpan: 0,
            },
          };
        },
      },
      {
        title: "订单交期",
        dataIndex: 'deliveryDate',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("numOfB01") && !Object.keys(row).includes("summaryGroupPmoCount") && Object.keys(row).includes("worker")) {
            return text;
          } else if (Object.keys(row).includes("numOfB01") && Object.keys(row).includes("summaryGroupPmoCount") && !Object.keys(row).includes("worker")) {
            return {
              children: text,
              colSpan: 0,
            };
          }
          return {
            children: text,
            props: {
              colSpan: 0,
            },
          };
        },
      },
      {
        title: "柜身主花色",
        dataIndex: 'masterColorOfB01',
        width: 150,
        render: (text, row) => {
          if (Object.keys(row).includes("numOfB01") && !Object.keys(row).includes("summaryGroupPmoCount") && Object.keys(row).includes("worker")) {
            return text;
          } else if (Object.keys(row).includes("numOfB01") && Object.keys(row).includes("summaryGroupPmoCount") && !Object.keys(row).includes("worker")) {
            return {
              children: text,
              colSpan: 0,
            };
          }
          return {
            children: text,
            props: {
              colSpan: 0,
            },
          };
        },
      },
      {
        title: "柜身数量",
        dataIndex: 'numOfB01',
        width: 100,
        render: renderContent,
      },
      {
        title: "柜身面积",
        dataIndex: 'areaOfB01',
        width: 100,
        render: renderContent,
      },
      {
        title: "移门(扇)",
        dataIndex: 'numOfB02',
        width: 100,
        render: renderContent,
      },
      {
        title: "木框门(扇)",
        dataIndex: 'numOfB03',
        width: 100,
        render: renderContent,
      },
      {
        title: "铝框门(扇)",
        dataIndex: 'numOfB04',
        width: 100,
        render: renderContent,
      },
      {
        title: "吸塑面积",
        dataIndex: 'areaOfB05',
        width: 100,
        render: renderContent,
      },
      {
        title: "吸塑数量",
        dataIndex: 'numOfB05',
        width: 100,
        render: renderContent,
      },
      {
        title: "背板数量",
        dataIndex: 'numOfB06',
        width: 100,
        render: renderContent,
      },
      {
        title: "背板面积",
        dataIndex: 'areaOfB06',
        width: 100,
        render: renderContent,
      },
      {
        title: "装饰件数量",
        dataIndex: 'numOfB07',
        width: 100,
        render: renderContent,
      },
      {
        title: "B08五金(包)",
        dataIndex: 'packageOfB08',
        width: 100,
        render: renderContent,
      },
      {
        title: "TA铝框门(扇)",
        dataIndex: 'numOfB10',
        width: 100,
        render: renderContent,
      },
      {
        title: "欧式铝框门(扇)",
        dataIndex: 'numOfB11',
        width: 100,
        render: renderContent,
      },
      {
        title: "欧式木框门(扇)",
        dataIndex: 'numOfB12',
        width: 100,
        render: renderContent,
      },
      {
        title: "蒙特利安门(扇)",
        dataIndex: 'numOfB13',
        width: 100,
        render: renderContent,
      },
      {
        title: "LMZ铝框门(扇)",
        dataIndex: 'numOfB14',
        width: 100,
        render: renderContent,
      },
      {
        title: "激光封边数量",
        dataIndex: 'numOfB15',
        width: 100,
        render: renderContent,
      },
      {
        title: "激光封边面积",
        dataIndex: 'areaOfB15',
        width: 100,
        render: renderContent,
      },
      {
        title: "圆弧门(扇)",
        dataIndex: 'numOfB16',
        width: 100,
        render: renderContent,
      },
      {
        title: "FG掩门(扇)",
        dataIndex: 'numOfB17',
        width: 100,
        render: renderContent,
      },
      {
        title: "瓦尔登湖(扇)",
        dataIndex: 'numOfB18',
        width: 100,
        render: renderContent,
      },
      {
        title: "百叶类(支)",
        dataIndex: 'numOf101',
        width: 100,
        render: renderContent,
      },
      {
        title: "百叶类(包)",
        dataIndex: 'packageOf101',
        width: 100,
        render: renderContent,
      },
      {
        title: "板材类(张)",
        dataIndex: 'numOf102',
        width: 100,
        render: renderContent,
      },
      {
        title: "板材类(包)",
        dataIndex: 'packageOf102',
        width: 100,
        render: renderContent,
      },
      {
        title: "封边条(卷)",
        dataIndex: 'numOf104',
        width: 100,
        render: renderContent,
      },
      {
        title: "封边条(包)",
        dataIndex: 'packageOf104',
        width: 100,
        render: renderContent,
      },
      {
        title: "软装类(包)",
        dataIndex: 'packageOf105',
        width: 100,
        render: renderContent,
      },
      {
        title: "106五金(包)",
        dataIndex: 'packageOf106',
        width: 100,
        render: renderContent,
      },
      {
        title: "型材类(包)",
        dataIndex: 'packageOf107',
        width: 100,
        render: renderContent,
      },
      {
        title: "硬装类(包)",
        dataIndex: 'packageOf108',
        width: 100,
        render: renderContent,
      },
      {
        title: "边胶封边条(包)",
        dataIndex: 'packageOf109',
        width: 150,
        render: renderContent,
      },
      {
        title: "B单装饰件(支)",
        dataIndex: 'numOf110',
        width: 150,
        render: renderContent,
      },
      {
        title: "B单装饰件(包)",
        dataIndex: 'packageOf110',
        width: 150,
        render: renderContent,
      },
      {
        title: "工件数",
        dataIndex: 'numOfBoard',
        width: 150,
        render: renderContent,
      },
      {
        title: "工件长度",
        dataIndex: 'lenOfBoard',
        width: 150,
        render: renderContent,
      },
      {
        title: "工件面积",
        dataIndex: 'areaOfBoard',
        width: 150,
        render: renderContent,
      },
      {
        title: "门型名称",
        dataIndex: 'boardName',
        width: 150,
        render: renderContent,
      },
    ];
    return bidBondColumns;
  }

  /**
   * 渲染个人产能表
   * @param {*} obj 表头数据
   * @returns
   */
  renderPersonColumns(obj) {
    const columns = [
      {
        title: `${obj.plantName}${obj.workShopName}${obj.productType}个人产能汇总表${obj.timeBegin}${obj.timeEnd}`,
        children: [
          {
            title: "序号",
            dataIndex: "index",
          },
          {
            title: "工号",
            dataIndex: "jobCode",
          },
          {
            title: "主机手",
            dataIndex: "worker",
          },
          {
            title: "工序",
            dataIndex: "processCategory",
          },
          {
            title: "班次",
            dataIndex: "shiftDes",
          },
          {
            title: "正常单",
            children: [
              {
                title: "子单号(个)",
                dataIndex: "pmoNumof0",
              },
              {
                title: "产量m²",
                dataIndex: "areaOF0",
              },
              {
                title: "扇数",
                dataIndex: "fanNumof0",
              },
            ],
          },
          {
            title: "售后单",
            children: [
              {
                title: "子单号(个)",
                dataIndex: "pmoNumof1",
              },
              {
                title: "产量m²",
                dataIndex: "areaOF1",
              },
              {
                title: "扇数",
                dataIndex: "fanNumof1",
              },
            ],
          },
          {
            title: "小计",
            children: [
              {
                title: "子单号(个)",
                dataIndex: "pmoNumof2",
              },
              {
                title: "产量m²",
                dataIndex: "areaOF2",
              },
              {
                title: "扇数",
                dataIndex: "fanNumof2",
              },
            ],
          },
          {
            title: "签名确认",
            dataIndex: "qianming",
          },
        ],
      },
    ];
    return columns;
  }

  /**
   * 修改个人产能表格数据
   * @param {*} data
   */
  formatData(data) {
    return data.map((item, index) => {
      const tempItem = item;
      tempItem.index = index + 1;
      return tempItem;
    });
  }

  render() {
    const { loading, dataSource, personCapacity } = this.props;
    const newDataSource = JSON.parse(JSON.stringify(dataSource));
    let data = [];
    if (Object.keys(newDataSource).length > 0 && newDataSource.completeQueryTableData.length > 0) {
      data = newDataSource.completeQueryTableData.map((item, index) => {
        // eslint-disable-next-line no-shadow
        const tempList = item.completeQueryVo1List.map((i, j) => {
          return { key: `${index}-${j}-${j}`, ...i };
        });
        // eslint-disable-next-line no-param-reassign
        item.children = tempList;
        // eslint-disable-next-line no-param-reassign
        delete item.completeQueryVo1List;
        item.children.push({
          key: `${index}-${index}-g`,
          "summaryGroupPmoCount": item.completeQuerySummaryLine.summaryGroupPmoCount,
          "numOfB01": item.completeQuerySummaryLine.summaryGroupNumOfB01,
          "areaOfB01": item.completeQuerySummaryLine.summaryGroupAreaOfB01,
          "numOfB02": item.completeQuerySummaryLine.summaryGroupNumOfB02,
          "numOfB03": item.completeQuerySummaryLine.summaryGroupNumOfB03,
          "numOfB04": item.completeQuerySummaryLine.summaryGroupNumOfB04,
          "areaOfB05": item.completeQuerySummaryLine.summaryGroupAreaOfB05,
          "numOfB05": item.completeQuerySummaryLine.summaryGroupNumOfB05,
          "numOfB06": item.completeQuerySummaryLine.summaryGroupNumOfB06,
          "areaOfB06": item.completeQuerySummaryLine.summaryGroupAreaOfB06,
          "numOfB07": item.completeQuerySummaryLine.summaryGroupNumOfB07,
          "packageOfB08": item.completeQuerySummaryLine.summaryGroupPackageOfB08,
          "numOfB10": item.completeQuerySummaryLine.summaryGroupNumOfB10,
          "numOfB11": item.completeQuerySummaryLine.summaryGroupNumOfB11,
          "numOfB12": item.completeQuerySummaryLine.summaryGroupNumOfB12,
          "numOfB13": item.completeQuerySummaryLine.summaryGroupNumOfB13,
          "numOfB14": item.completeQuerySummaryLine.summaryGroupNumOfB14,
          "numOfB15": item.completeQuerySummaryLine.summaryGroupNumOfB15,
          "areaOfB15": item.completeQuerySummaryLine.summaryGroupAreaOfB15,
          "numOfB16": item.completeQuerySummaryLine.summaryGroupNumOfB16,
          "numOfB17": item.completeQuerySummaryLine.summaryGroupNumOfB17,
          "numOfB18": item.completeQuerySummaryLine.summaryGroupNumOfB18,
          "numOf101": item.completeQuerySummaryLine.summaryGroupNumOf101,
          "packageOf101": item.completeQuerySummaryLine.summaryGroupPackageOf101,
          "numOf102": item.completeQuerySummaryLine.summaryGroupNumOf102,
          "packageOf102": item.completeQuerySummaryLine.summaryGroupPackageOf102,
          "numOf104": item.completeQuerySummaryLine.summaryGroupNumOf104,
          "packageOf104": item.completeQuerySummaryLine.summaryGroupPackageOf104,
          "packageOf105": item.completeQuerySummaryLine.summaryGroupPackageOf105,
          "packageOf106": item.completeQuerySummaryLine.summaryGroupPackageOf106,
          "packageOf107": item.completeQuerySummaryLine.summaryGroupPackageOf107,
          "packageOf108": item.completeQuerySummaryLine.summaryGroupPackageOf108,
          "packageOf109": item.completeQuerySummaryLine.summaryGroupPackageOf109,
          "numOf110": item.completeQuerySummaryLine.summaryGroupNumOf110,
          "packageOf110": item.completeQuerySummaryLine.summaryGroupPackageOf110,
          "numOfBoard": item.completeQuerySummaryLine.summaryNumOfBoard,
          "lenOfBoard": item.completeQuerySummaryLine.summaryLenOfBoard,
          "areaOfBoard": item.completeQuerySummaryLine.summaryAreaOfBoard,
        });
        return item;
      });
      data.push({
        key: "xxx",
        "numOfB01": newDataSource.completeQueryTotalVo.summaryNumOfB01,
        "areaOfB01": newDataSource.completeQueryTotalVo.summaryAreaOfB01,
        "numOfB02": newDataSource.completeQueryTotalVo.summaryNumOfB02,
        "numOfB03": newDataSource.completeQueryTotalVo.summaryNumOfB03,
        "numOfB04": newDataSource.completeQueryTotalVo.summaryNumOfB04,
        "areaOfB05": newDataSource.completeQueryTotalVo.summaryAreaOfB05,
        "numOfB05": newDataSource.completeQueryTotalVo.summaryNumOfB05,
        "numOfB06": newDataSource.completeQueryTotalVo.summaryNumOfB06,
        "areaOfB06": newDataSource.completeQueryTotalVo.summaryAreaOfB06,
        "numOfB07": newDataSource.completeQueryTotalVo.summaryNumOfB07,
        "packageOfB08": newDataSource.completeQueryTotalVo.summaryPackageOfB08,
        "numOfB10": newDataSource.completeQueryTotalVo.summaryNumOfB10,
        "numOfB11": newDataSource.completeQueryTotalVo.summaryNumOfB11,
        "numOfB12": newDataSource.completeQueryTotalVo.summaryNumOfB12,
        "numOfB13": newDataSource.completeQueryTotalVo.summaryNumOfB13,
        "numOfB14": newDataSource.completeQueryTotalVo.summaryNumOfB14,
        "numOfB15": newDataSource.completeQueryTotalVo.summaryNumOfB15,
        "areaOfB15": newDataSource.completeQueryTotalVo.summaryAreaOfB15,
        "numOfB16": newDataSource.completeQueryTotalVo.summaryNumOfB16,
        "numOfB17": newDataSource.completeQueryTotalVo.summaryNumOfB17,
        "numOfB18": newDataSource.completeQueryTotalVo.summaryNumOfB18,
        "numOf101": newDataSource.completeQueryTotalVo.summaryNumOf101,
        "packageOf101": newDataSource.completeQueryTotalVo.summaryPackageOf101,
        "numOf102": newDataSource.completeQueryTotalVo.summaryNumOf102,
        "packageOf102": newDataSource.completeQueryTotalVo.summaryPackageOf102,
        "numOf104": newDataSource.completeQueryTotalVo.summaryNumOf104,
        "packageOf104": newDataSource.completeQueryTotalVo.summaryPackageOf104,
        "packageOf105": newDataSource.completeQueryTotalVo.summaryPackageOf105,
        "packageOf106": newDataSource.completeQueryTotalVo.summaryPackageOf106,
        "packageOf107": newDataSource.completeQueryTotalVo.summaryPackageOf107,
        "packageOf108": newDataSource.completeQueryTotalVo.summaryPackageOf108,
        "packageOf109": newDataSource.completeQueryTotalVo.summaryPackageOf109,
        "numOf110": newDataSource.completeQueryTotalVo.summaryNumOf110,
        "packageOf110": newDataSource.completeQueryTotalVo.summaryPackageOf110,
        "numOfBoard": newDataSource.completeQueryTotalVo.summaryNumOfBoard,
        "lenOfBoard": newDataSource.completeQueryTotalVo.summaryLenOfBoard,
        "areaOfBoard": newDataSource.completeQueryTotalVo.summaryAreaOfBoard,
      });
    }
    const tempData = data.map((item, index) => { return { ...item, key: `${index}-${index}` }; });
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
          dataSource={tempData}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {tempData.length > 0 && (
          <Table
            id="report-work-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            rowKey={(record, index) => { return `${record.key}${index}`; }}
            columns={this.renderColumns()}
            dataSource={tempData}
            pagination={false}
          />
        )}
        {personCapacity.length > 0 && (
          <div id="person-capacity" style={{ display: "none" }}>
            {
              personCapacity.map((item, index) => {
                return (
                  <Table
                    uncontrolled
                    bordered
                    rowKey={(record, i) => { return `${index}-${i}`; }}
                    columns={this.renderPersonColumns(item.completeQueryExportHeadVo)}
                    dataSource={this.formatData(item.exportTableVoList)}
                    pagination={false}
                  />
                );
              })
            }
          </div>
        )}
      </React.Fragment>
    );
  }
}
