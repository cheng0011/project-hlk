import React from "react";
import styled from "styled-components";
import machineGray from "../../assets/icons/machine-gray.png";
import personGray from "../../assets/icons/person-gray.png";
import materielGray from "../../assets/icons/materiel-gray.png";
import faGray from "../../assets/icons/fa-gray.png";
import huanGray from "../../assets/icons/huan-gray.png";
import safeGray from "../../assets/icons/safe-gray.png";
import bad from "../../assets/icons/bad.png";
import good from "../../assets/icons/good.png";

const Inspect = ({ className, inspectList }) => {
  const inspectListData = [
    {
      eventCode: "LM01",
      name: "人",
      errorUrl: personGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
    {
      eventCode: "LM02",
      name: "机",
      errorUrl: machineGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
    {
      eventCode: "LM03",
      name: "料",
      errorUrl: materielGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
    {
      eventCode: "LM04",
      name: "法",
      errorUrl: faGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
    {
      eventCode: "LM05",
      name: "环",
      errorUrl: huanGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
    {
      eventCode: "LM06",
      name: "安全",
      errorUrl: safeGray,
      dayEventNum: 0,
      nightEventNum: 0,
    },
  ];
  if (inspectList) {
    inspectList.forEach((item) => {
      inspectListData.forEach((ii) => {
        if (item.eventCode === ii.eventCode) {
          if (item.shiftDesc === "晚") {
            // eslint-disable-next-line no-param-reassign
            ii.nightEventNum = item.eventNum;
          } else if (item.shiftDesc === "白") {
            // eslint-disable-next-line no-param-reassign
            ii.dayEventNum = item.eventNum;
          }
        }
      });
    });
  }
  return (
    <div className={className}>
      <div className="icon-wrap">
        <div className="icon-content">
          <img style={{ visibility: "hidden" }} alt="" />
          <span>
            SS
          </span>
        </div>
        {
          inspectListData.map((item, index) => {
            return (
              <div className={`icon-content icon-content-${index}`}>
                <img
                  src={item.errorUrl}
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
      <div className="icon-wrap">
        <div className="shift-day shift-content shift-content-1">

          <span>
            白班
          </span>
        </div>
        {
          inspectListData.map((item, index) => {
            return (
              <div className={`shift-day shift-content shift-content-${index}`} title={`${item.name}：${item.dayEventNum}`}>
                <img
                  src={item.dayEventNum > 0 ? bad : good}
                  alt=""
                />
              </div>
            );
          })
        }
      </div>
      <div className="icon-wrap">
        <div className="shift-content">
          <span>
            晚班
          </span>
        </div>
        {
          inspectListData.map((item, index) => {
            return (
              <div className={`shift-content shift-content-${index}`} title={`${item.name}：${item.nightEventNum}`}>
                <img
                  src={item.nightEventNum > 0 ? bad : good}
                  alt=""
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

const InspectStyle = styled(Inspect)`
  & {
    padding-top: 10px;
    .icon-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      .icon-content {
        border: 1px solid gray;
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
      .shift-content {
        border: 1px solid gray;
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          white-space:nowrap;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
      .icon-content-0,.icon-content-2,.icon-content-4 {
        border-left: none;
        border-right: none;
      }
      .shift-content-0,.shift-content-2,.shift-content-4 {
        border-left: none;
        border-right: none;
      }
      .shift-day {
        border-top: none;
        border-bottom: none;
      }
    }
  }
`;

export default InspectStyle;