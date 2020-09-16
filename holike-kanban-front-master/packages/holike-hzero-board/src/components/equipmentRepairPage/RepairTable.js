import React from "react";
import styled from "styled-components";
import { isNumber, sum } from 'lodash';

import { Table } from 'hzero-ui';

import eqRepairBack from "../../assets/icons/eqRepairBack.png";
import eqRepairBackFooter from "../../assets/icons/eqRepairBackFooter.png";

const TableStyle = styled(Table)`
  & {
    .ant-table {
      color: white;
      /* width: 9%; */
      .ant-table-body {
        background-color: transparent!important;
      }
      .ant-table-fixed-right,
      .ant-table-content {
        border-top: 1px solid #1B4F7F;
      }
      .ant-table-thead {
        background-color: #21619B;
        tr {
          th{
            span {
              color: white;
            }
          }
        }
      }
    }
    .ant-table-row {
      td {
        background-color: #002060!important;
      }
    }
  }
`;

class RepairTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentList: [],
    };
    this.pre = 0;
    this.end = 10;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateList();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // 更新数据
  updateList() {
    if (this.pre + 10 > this.props.equipmentList.length && this.pre < this.props.equipmentList.length) {
      this.setState({
        equipmentList: this.props.equipmentList.slice(this.pre),
      });
      this.pre = 0;
      this.end = 10;
    } else {
      this.pre += 10;
      this.end += 10;
    }
    this.setState({
      equipmentList: this.props.equipmentList.slice(this.pre, this.end),
    });
  }

  render() {
    const columns = [
      {
        title: '报修单号',
        dataIndex: 'repairNum',
        width: 200,
        render: (value, record) => {
          return <p style={value.slice(0, 3)==='HEP'? {backgroundColor: '#8B008B'} : {backgroundColor: '#FFD700'}}>{value}</p>;
        },
      },
      {
        title: '报修时间',
        dataIndex: 'creationDate',
        width: 200,
      },
      {
        title: '车间',
        dataIndex: 'workshopName',
        width: 200,
      },
      {
        title: '工位',
        dataIndex: 'workcellName',
        width: 200,
      },
      {
        title: '设备名称',
        dataIndex: 'equipmentName',
        width: 200,
      },
      {
        title: '内部资产编码',
        dataIndex: 'innerAssetsCode',
        width: 200,
      },
      {
        title: '故障描述',
        dataIndex: 'failureDiscription',
        width: 200,
      },
      {
        title: '备注',
        dataIndex: 'note',
        width: 200,
      },
      {
        title: '报修人',
        dataIndex: 'applicantUser',
        width: 150,
      },
      {
        title: '联系人',
        dataIndex: 'applicantUserPhone',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (value, record) => {
          return <p style={value==='未接单'? {backgroundColor: 'red'} : null}>{value}</p>;
        },
      },
      {
        title: '接单人',
        dataIndex: 'orderUser',
        width: 150,
      },
      {
        title: '联系方式',
        dataIndex: 'phoneNumber',
        width: 150,
      },
    ];
    const { className } = this.props;
    const scrollX = sum(columns.map(n => (isNumber(n.width) ? n.width : 0)));
    return (
      <div className={className}>
        <div className="title">报修信息</div>
        <TableStyle
          columns={columns}
          dataSource={this.state.equipmentList.length > 0 ? this.state.equipmentList : this.props.equipmentList.slice(0, 10)}
          bordered
          scroll={{ x: scrollX }}
          pagination={false}
          size="small"
        />
        <img src={eqRepairBackFooter} alt="" />
      </div>
    );
  }
}

const RepairTableStyle = styled(RepairTable)`
  &{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 80px 20px 20px 20px;
    background: url(${eqRepairBack});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 98%;
    min-height: 95%;
    .title {
      position: absolute;
      top: 3.5%;
      font-size: 20px;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      color: white;
    }
    img {
      position: absolute;
      bottom: -3%;
      width: 9%;
      height: 20%;
      right: -0.5%;
      z-index: -1;
      transform: scale(0.78) rotate(0deg);
    }
  }
`;

export default RepairTableStyle;