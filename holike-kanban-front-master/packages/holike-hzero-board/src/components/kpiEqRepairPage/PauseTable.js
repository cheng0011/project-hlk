import React from "react";
import { Table } from "hzero-ui";
import styled from "styled-components";

const PauseTable = ({ className, tableData }) => {
  const columns = [
    {
      title: '报修单',
      dataIndex: 'repairNum',
      width: 60,
      ellipsis: true,
    },
    {
      title: '内部资产编码',
      dataIndex: 'innerAssetsCode',
      width: 60,
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'equipmentName',
      width: 50,
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'suspendStartTime',
      width: 50,
      ellipsis: true,
    },
    {
      title: '时长',
      dataIndex: 'suspendTime',
      width: 50,
      ellipsis: true,
    },
    {
      title: '原因',
      dataIndex: 'reason',
      width: 50,
      ellipsis: true,
    },
  ];
  return (
    <div className={className}>
      <Table
        className="pause-table"
        columns={columns}
        dataSource={tableData}
        scroll={{ y: 90 }}
        bordered
        pagination={false}
      />
    </div>
  );
};

const PauseTableStyle = styled(PauseTable)`
  & {
    margin-top: 10px;
    .pause-table {
      .ant-table-content {
        border-top: 1px solid #FFD78C;
      }
      .ant-table-thead {
        background-color: #FFC000;
        tr {
          th{
            span {
              color: white;
            }
          }
        }
      }
    }
  }
`;

export default PauseTableStyle;