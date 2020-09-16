import React from "react";
import styled from "styled-components";
import machineSuccess from "../../assets/icons/machine-success.png";
import machineError from "../../assets/icons/machine-error.png";
import personSuccess from "../../assets/icons/person-success.png";
import personError from "../../assets/icons/person-error.png";
import materielSuccess from "../../assets/icons/materiel-success.png";
import materielError from "../../assets/icons/materiel-error.png";
import faSuccess from "../../assets/icons/fa-success.png";
import faError from "../../assets/icons/fa-error.png";
import huanSuccess from "../../assets/icons/huan-success.png";
import huanError from "../../assets/icons/huan-error.png";
import safeSuccess from "../../assets/icons/safe-success.png";
import safeError from "../../assets/icons/safe-error.png";

const Inspect = ({ className, inspectList }) => {
  const inspectListData = [
    {
      eventCode: "LM01",
      name: "人",
      errorUrl: personError,
      successUrl: personSuccess,
      eventNum: 0,
    },
    {
      eventCode: "LM02",
      name: "机",
      errorUrl: machineError,
      successUrl: machineSuccess,
      eventNum: 0,
    },
    {
      eventCode: "LM03",
      name: "料",
      errorUrl: materielError,
      successUrl: materielSuccess,
      eventNum: 0,
    },
    {
      eventCode: "LM04",
      name: "法",
      errorUrl: faError,
      successUrl: faSuccess,
      eventNum: 0,
    },
    {
      eventCode: "LM05",
      name: "环",
      errorUrl: huanError,
      successUrl: huanSuccess,
      eventNum: 0,
    },
    {
      eventCode: "LM06",
      name: "安全",
      errorUrl: safeError,
      successUrl: safeSuccess,
      eventNum: 0,
    },
  ];
  if (inspectList) {
    inspectList.forEach((item) => {
      inspectListData.forEach((ii) => {
        if (item.eventCode === ii.eventCode) {
          // eslint-disable-next-line no-param-reassign
          ii.eventNum = item.eventNum;
        }
      });
    });
  }
  return (
    <div className={className}>
      {
        inspectListData.map((item) => {
          return (
            <div className="icon-content" title={`${item.name}：${item.eventNum}`}>
              <img
                src={item.eventNum > 0 ? item.errorUrl : item.successUrl}
                alt={item.name}
              />
              <span>
                {item.name}
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

const InspectStyle = styled(Inspect)`
  & {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .icon-content {
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #D9D9D9;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default InspectStyle;