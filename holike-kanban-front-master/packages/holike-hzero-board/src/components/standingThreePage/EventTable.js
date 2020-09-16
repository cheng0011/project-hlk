import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Modal, Button } from "hzero-ui";
import { getCurrentUser } from 'utils/utils';

const EventTable = ({ className, trackMatter, closeTrackMatter }) => {
  // 获取用户名
  const { loginName } = getCurrentUser();

  const [selectEventId, setSelectEventId] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [des, setDes] = useState("111");
  const columns = [
    {
      title: '事件描述',
      dataIndex: 'eventDesc',
      width: 50,
      ellipsis: true,
    },
    {
      title: '责任人',
      dataIndex: 'respUser',
      width: 50,
      ellipsis: true,
    },
    {
      title: '计划完成时间',
      dataIndex: 'planCompleteDate',
      width: 50,
      ellipsis: true,
    },
    {
      title: '优先级',
      dataIndex: 'eventLevel',
      width: 10,
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'eventSort',
      width: 50,
      ellipsis: true,
    },
    {
      title: 'LM级别',
      dataIndex: 'userLevel',
      width: 40,
      ellipsis: true,
    },
  ];
  const data = trackMatter.map((item) => {
    return {
      eventId: item.eventId || "",
      eventDesc: item.eventDesc || "",
      respUser: item.respUser || "",
      planCompleteDate: item.planCompleteDate || "",
      eventLevel: item.eventLevel || "",
      eventSort: item.eventSort || "",
      userLevel: item.userLevel || "",
    };
  });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        setSelectEventId(selectedRows[0].eventId);
      } else {
        setSelectEventId("");
      }
    },
    getCheckboxProps: record => ({
      disabled: selectEventId && record.eventId !== selectEventId,
    }),
  };

  // 点击关闭
  function handleClose() {
    setVisible(true);
  }

  // 弹窗确认
  function handleOk(e) {
    setLoading(true);
    closeTrackMatter(selectEventId, des, loginName).then(() => {
      setLoading(false);
      setVisible(false);
    });
    e.preventDefault();
  }

  // 弹窗取消
  function handleCancel() {
    setVisible(false);
  }
  // 监听输入框输入的内容
  function handleChange(e) {
    setDes(e.target.value);
  }

  return (
    <div className={className}>
      <Table
        rowSelection={rowSelection}
        className="event-table"
        columns={columns}
        dataSource={data}
        scroll={{ y: 90 }}
        bordered
        pagination={false}
      // size="small"
      />
      <div className="button-wrap">
        <button disabled={!selectEventId} onClick={handleClose} type="button" className="close">
          关闭
        </button>
        <Modal
          title="原因分析描述"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              关闭
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              提交
            </Button>,
          ]}
        >
          <Input onChange={handleChange} />
        </Modal>
      </div>
    </div>
  );
};

const EventTableStyle = styled(EventTable)`
  & {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 10px;
    .event-table {
      width: 85%;
      /* height: 100%;
      .ant-spin-nested-loading,.ant-spin-container,.ant-table,.ant-table-content,.ant-table-scroll {
        height: 100%;
      } */
      /* tr{
        th:first-child {
          width: 10px!important;
        }
        td:first-child {
          width: 10px!important;
        }
      } */
      .ant-table-thead {
        .ant-table-selection {
          display: none;
        }
      }
    }
    .button-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 15%;
      button {
        width: 80%;
        height: 28px;
        border: none;
        border-radius: 2px;
        color: #fff;
      }
      .updata {    
        background-color: red;        
        margin-bottom: 10px;
        &:disabled {
          cursor: not-allowed;
        }
      }
      .close {
        background-color: #29BECE;
        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
`;

export default EventTableStyle;