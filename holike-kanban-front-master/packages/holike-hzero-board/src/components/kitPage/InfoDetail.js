import React from "react";
import { connect } from "dva";
import styled, { css } from "styled-components";

import Position from "../../assets/icons/position.png";

@connect()
class InfoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      className,
      nodeInfo: { wkcId, additionCode, lookupCode, upperString, underString },
      colorDict,
      detailInfoList,
    } = this.props;
    return (
      <div className={className}>
        <div className="node" />
        <div className="node-right" style={{ backgroundColor: colorDict[additionCode] }}>
          <div className="station">
            <div />
            <span title={underString}>工位：{underString}</span>
          </div>
          <div className="order">
            <div />
            <span>工序：{upperString}</span>
          </div>
          {
            detailInfoList.map(item => {
              if (item.wkcId && item.wkcId === wkcId) {
                return (
                  <div className="status">
                    <div />
                    <span>状态：{item.showCount}</span>
                  </div>
                );
              } else if (!item.wkcId && item.lookupCode === lookupCode) {
                return (
                  <div className="status">
                    <div />
                    <span>状态：{item.showCount}</span>
                  </div>
                );
              }
              return ('');
            })
          }
        </div>
      </div>
    );
  }
};

// 样式
const InfoDetailStyle = styled(InfoDetail)`
${(props) => {
    const { nodeInfo: { pointX, pointY } } = props;
    return css`
      position: absolute;
      left: ${pointX}%;
      top: ${pointY}%;
      .node {
        position: absolute;
        width: 20px;
        height: 20px;
        background-image: url(${Position});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 0;
      }
      .node-right {
        position: absolute;
        width: 200px;
        height: 50px;
        margin-bottom: 5px;
        padding-top: 5px;
        padding-left: 5px;
        border-radius: 5px;
        transform: translate(25px, -20px);
        background-color: rgba(98,192,219,0.5);
        color: white;
        .station,.order,.status {
          display: flex;
          align-items: center;
          div {
            width:10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
          }
          span {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
          }
        }
        .station {
          div {
            background-color: rgb(249,193,119);
          }
        }
        .order {
          div {
            background-color: rgb(98,192,219);
          }
        }
        .status {
          div {
            background-color: rgb(169,209,142);
          }
        }
      }
  `;
  }}
  
`;
export default InfoDetailStyle;