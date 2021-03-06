import React from "react";
import styled from "styled-components";

const Title = ({ className, imgUrl, title, target }) => {
  return (
    <div className={className}>
      <img src={imgUrl} alt={title} />
      <span>{title}</span>
      {target && target.length > 0 && <span style={{color: "#92D050"}}>{target[0].targetValue*100}%</span>}
    </div>
  );
};

const TitleStyle = styled(Title)`
  height: 30px;
  border-bottom: 1px solid #3398DB;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    font-weight: bold;
    margin-left: 5px;
  }
`;

export default TitleStyle;