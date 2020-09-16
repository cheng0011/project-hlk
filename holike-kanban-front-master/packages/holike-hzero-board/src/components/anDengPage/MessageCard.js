import React from "react";
import { connect } from "dva";
import styled, { css } from "styled-components";

import Position from "../../assets/icons/position.png";

@connect()
class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
      status: false,
      detailList: [],
    };
  }

  componentDidMount() {
    clearInterval(this.interval);
    this.setState({
      status: false,
    });
    this.getInformation();
  }

  // 获取看板信息
  getInformation() {
    const { dispatch, nodeInfo } = this.props;
    if(!(nodeInfo.wkcId === null || nodeInfo.wkcId === '')){
      dispatch({
        type: 'anDeng/fetchInformation',
        payload: {
          wkcId: nodeInfo.wkcId,
        },
      }).then(res => {
        if (typeof res === "object") {
          if (res.rows) {
            this.setState({
              detailList: res.rows,
            });
          }
        }
      });
    }
  }

  handleNode() {
    clearInterval(this.interval);
    this.setState({
      status: !this.state.status,
    });
    this.interval = setInterval(() => {
      if (this.state.time > 0 && this.state.status && this.props.anDengType) {
        this.setState({
          time: this.state.time - 1,
        });
      } else {
        this.setState({
          time: 10,
          status: false,
        });
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleClose() {
    clearInterval(this.interval);
    this.setState({
      time: 10,
      status: false,
    });
  }

  render() {
    const {
      className,
      showClose = true,
      anDengType,
      nodeInfo: { description, showQty },
    } = this.props;
    return (
      <div className={className}>
        <div onClick={anDengType ? this.handleNode.bind(this) : () => { }} className="node" />
        <div className="node-right-wrap">
          <div className="right-top">
            <div className="station">
              <div />
              <span title={description}>工位：{description}</span>
            </div>
            <div className="capacity">
              <div />
              <span>产能：{showQty}</span>
            </div>
          </div>
          {this.state.status && anDengType && (
            <div className="message-card">
              {showClose && (
                <div className="time-close-wrap">
                  <span className="time">{this.state.time}</span>
                  <span onClick={this.handleClose.bind(this)} className="close">X</span>
                </div>
              )}
              <ul>
                {
                  this.state.detailList.length > 0 ? (
                    this.state.detailList.map((item) => (
                      <li className="detail">
                        <ul>
                          <li>安灯类型：{item.andonTypeDes}</li>
                          <li>安灯描述：{item.andonDes}</li>
                          <li>触发人：{item.triggerUser}</li>
                          <li>触发时间：{item.triggerTime}</li>
                          <li>联系方式：{item.phoneNumber}</li>
                        </ul>
                      </li>
                    ))
                  ) :
                    (
                      <li className="detail no-data">暂无数据</li>
                    )
                }

              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
};

// 样式
const MessageCardStyle = styled(MessageCard)`
${(props) => {
    const { nodeInfo: { pointX, pointY, color }, anDengType, powerType, informationList } = props;
    const colorDit = {
      "红色": "rgba(255,79,79,0.5)",
      "绿色": "rgba(55,175,78,0.5)",
      "黄色": "rgba(255,255,0,0.5)",
    };
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
        cursor: ${anDengType ? "pointer" : "not-allowed"};
      }
      .node-right-wrap {
        transform: translate(25px,-20px);
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        .right-top {
          position: relative;
          width: 200px;
          height: 50px;
          margin-bottom: 5px;
          padding-top: 5px;
          padding-left: 5px;
          border-radius: 5px;
          background-color: ${color ? colorDit[color] : "rgba(98,192,219,0.5)"};
          .station {
            display: flex;
            align-items: center;
            div {
              width:10px;
              height: 10px;
              border-radius: 50%;
              background-color: rgb(249,193,119);
              margin-right: 5px;
            }
            span {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow-x: hidden;
            }
          }
          .capacity {
            display: ${powerType ? "flex" : "none"};
            align-items: center;
            div {
              width:10px;
              height: 10px;
              border-radius: 50%;
              background-color: rgb(169,209,142);
              margin-right: 5px;
            }
          }
        }
        .message-card {
          position: relative;
          ${() => {
        if (informationList) {
          return css`
                width: 200px;
              `;
        } else {
          return css`
                li {
                  white-space:nowrap;
                  width: 200px;
                }
              `;
        }
      }}
          /* padding: 10px; */

          .time-close-wrap {
            position: absolute;
            top: 5px;
            right: 0;
            display: flex;
            .time,
            .close {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border: 1px solid #fff;
              border-radius: 50%;
              background-color: transparent;
              color: #fff;
              margin-right: 5px;
              cursor: pointer;
            }
          }
          ul,li {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .detail {
            padding: 10px;
            &:not(:first-child) {
              padding-top: 0;
            }
            &:nth-child(2n-1) {
              background-color: rgba(255,210,165,0.8);
            }
            &:nth-child(2n) {
              background-color: rgba(207,241,239,0.8);
            }
            &.no-data {
              /* padding-top: 30px; */
            }
          }
        }
      }
  `;
  }}

`;
export default MessageCardStyle;
