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
        title: "设备组",
        dataIndex: 'equipmentGroupName',
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
        title: "车间",
        dataIndex: 'workShopName',
        width: 150,
      },
      {
        title: "产线",
        dataIndex: 'productDescriptions',
        width: 150,
      },
      {
        title: "工位",
        dataIndex: 'workcellDescription',
        width: 300,
      },
      {
        title: "报修次数",
        dataIndex: 'brokenCount',
        width: 150,
      },
      {
        title: "累计故障时长",
        dataIndex: 'repairTotalTime',
        width: 150,
      },
      {
        title: "MTBF(平均故障间隔时间)(维度:天)",
        dataIndex: 'mtbf',
        width: 150,
      },
      {
        title: "MTTR(平均修复时间)(维度:小时)",
        dataIndex: 'mttr',
        width: 150,
      },
    ];
    return columns;
  }

  render() {
    const { loading, dataSource, onClick } = this.props;
    const newDataSource = JSON.parse(JSON.stringify(dataSource));
    const scrollX = sum(this.renderColumns().map(n => (isNumber(n.width) ? n.width : 0)));
    const newData = [];
    newDataSource.forEach(item => {
      if(item.equipmentInfoVOList.length===0){
        newData.push({
          equipmentId: item.equipmentId,
          workcellId: item.workcellId,
          equipmentGroupName: item.equipmentGroupName,
          equipmentGroupId: item.equipmentGroupId,
          brokenCount: item.brokenCount,
          mtbf: item.mtbf.toFixed(2),
          mttr: item.mttr.toFixed(2),
          repairTotalTime: item.repairTotalTime.toFixed(2),
        });
      }else {
        item.equipmentInfoVOList.forEach(i => {
          newData.push({
            equipmentId: item.equipmentId,
            workcellId: item.workcellId,
            equipmentGroupName: item.equipmentGroupName,
            equipmentGroupId: item.equipmentGroupId,
            equipmentName: i.equipmentName,
            innerAssetsCode: i.innerAssetsCode,
            productDescriptions: i.productDescriptions,
            workShopName: i.workShopName,
            workcellDescription: i.workcellDescription,
            brokenCount: item.brokenCount,
            mtbf: item.mtbf.toFixed(2),
            mttr: item.mttr.toFixed(2),
            repairTotalTime: item.repairTotalTime.toFixed(2),
          });
        });
      }
    });
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
          loading={loading}
          columns={this.renderColumns()}
          scroll={{ x: scrollX }}
          dataSource={newData}
          pagination={{ showSizeChanger: true, defaultPageSize: 100, pageSizeOptions: ["100", "200", "500"] }}
        />
        {newData.length > 0 && (
          <Table
            id="device-table"
            style={{ display: "none" }}
            defaultExpandAllRows
            uncontrolled
            bordered
            columns={this.renderColumns()}
            scroll={{ x: scrollX }}
            dataSource={newData}
            pagination={false}
          />
        )}
      </React.Fragment>
    );
  }
}
