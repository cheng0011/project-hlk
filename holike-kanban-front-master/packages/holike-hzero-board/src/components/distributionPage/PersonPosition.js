import React from "react";
import styled, { css } from "styled-components";

import standPerson from "../../assets/icons/stand-person.svg";
import contentBackground from "../../assets/icons/content-background.png";

const PersonPosition = ({ className, kanbanData }) => {
  return (
    <div className={className}>
      <img src={standPerson} alt="" />
      <div className="line" />
      <div className="person-Info">
        <div className="info">
          <div title={kanbanData.name}>姓名：{kanbanData.name}</div>
          <div title={kanbanData.tel}>电话：{kanbanData.tel}</div>
          <div title={kanbanData.address}>位置：{kanbanData.address}</div>
          <div title={kanbanData.equipmentNam}>设备：{kanbanData.equipmentNam}</div>
        </div>
      </div>
    </div>
  );
};

const PersonPositionStyle = styled(PersonPosition)`
${(props) => {
    if(props.mapPoint){
      var  pointX = props.mapPoint.pointX||200;
      var  pointY = props.mapPoint.pointY||200;
    }
    return css`
    & {
    position: absolute;
    left: ${pointX}%;
    top: ${pointY}%;
    img {
      position: absolute;
      transform: translate(-50%,-50%);
      width: 30px;
    }
    .line {
      position: absolute;
      left: 15px;
      width: 80px;
      transform: rotate(-30deg) translate(0,-22px);
      border-bottom: 1px solid #70AD47;
    }
    .person-Info {
      width: 200px;
      padding:8px 10px 10px 10px;
      /* border-left: 1px solid #70AD47; */
      background-image: url(${contentBackground});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      left:79px;
      top: -68px;
      .info {
        padding:10px 0 0 10px;
        border: 1px solid #70AD47;
        div{
          color: white;
          font-weight: bold;
          font-size: 13px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow-x: hidden;
        }
        min-height: 100px;
      }
    }
  }
    `;
  }}

`;

export default PersonPositionStyle;
