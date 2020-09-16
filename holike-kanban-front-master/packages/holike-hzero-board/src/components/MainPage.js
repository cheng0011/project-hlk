import React from "react";
import styled, { css } from "styled-components";

import header from "../assets/icons/header.png";
import backgroundImg from "../assets/img/bk.png";


const mainPage = ({ className, children, headerRight = null, chineseTitle, englishTitle, footerLeft = null, footerRight = null }) => {
  return (
    <div className={className}>
      <div className="header">
        <div className="center-wrap">
          <div className="title">
            <span>
              {`好莱客智能制造 ${chineseTitle}看板`}
            </span>
            <span>
              {`${englishTitle} Kanban of Holike`}
            </span>
          </div>
        </div>
        {headerRight && (
          <div className="right-wrap">
            {headerRight}
          </div>
        )}
      </div>
      <div className="content-wrap">
        <div className="content">
          {children}
          <div className="content-footer">
            <div className="footer-left">
              {footerLeft}
            </div>
            <div className="footer-Right">
              {footerRight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainPageStyle = styled(mainPage)`
  &{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(${backgroundImg});
    .header {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 12%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url(${header});
      background-color:rgba(0,0,0,0.5);
      .center-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            background: linear-gradient(to bottom, #fff, #62c0db);
            -webkit-background-clip: text;
            color: transparent;
            font-weight: bold;
          }
          span:first-child {
            font-size: 25px;
          }
          span:last-child {
            font-size: 15px;
          }
        }
      }
      .right-wrap {
        position: absolute;
        right: 3%;
        bottom: 15%;
      }
    }
    .content-wrap {
      height: 88%;
      ${(props) => {
    if (props.imageUrl) {
      return css`
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-image: url(${props.imageUrl});
          `;
    }
  }}
      .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: rgba(52,152,219,0.3);
        .content-footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          .footer-left {
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .footer-Right {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 10px 20px;
          }
        }
      }
    }
  }
`;

export default MainPageStyle;