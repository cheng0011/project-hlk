import React from "react";
import styled from "styled-components";

import andon from "../../assets/icons/andon.png";
import andonError from "../../assets/icons/andon-error.png";

const Andon = ({ className, andonList }) => {
  const andonListData = [
    {
      andonTypeCode: "PD",
      name: "生产",
      andonNum: 0,
    },
    {
      andonTypeCode: "HD",
      name: "设备",
      andonNum: 0,
    },
    {
      andonTypeCode: "SYS",
      name: "系统",
      andonNum: 0,
    },
    {
      andonTypeCode: "QM",
      name: "品质",
      andonNum: 0,
    },
  ];
  if (andonList) {
    andonList.forEach((item) => {
      andonListData.forEach((ii) => {
        if (item.andonTypeCode === ii.andonTypeCode) {
          // eslint-disable-next-line no-param-reassign
          ii.andonNum = item.andonNum;
        }
      });
    });
  }

  return (
    <div className={className}>
      {
        andonListData.map((item) => {
          return (
            <div className="icon-content" title={`${item.name}：${item.andonNum}`}>
              <img
                src={item.andonNum > 0 ? andonError : andon}
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

const AndonStyle = styled(Andon)`
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

export default AndonStyle;
