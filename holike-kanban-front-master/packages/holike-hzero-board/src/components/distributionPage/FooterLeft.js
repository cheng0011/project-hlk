import React from "react";
import styled from "styled-components";
import footerLeft from "../../assets/icons/footer-left.png";
import sitPerson from "../../assets/icons/sit-person.svg";

const FooterRight = ({ className, machineUserList }) => {
  return (
    <div className={className}>
      <h2>机修房</h2>
      <div className="wrap">
        {
          machineUserList.length > 0 && machineUserList.map((item) => {
            return (
              <div className="person" title={item.name}>
                <img src={sitPerson} alt={item.machineUser} />
                <span>{item.machineUser}</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

const FooterRightStyle = styled(FooterRight)`
  &{
    padding-top: 20px;
    width: 260px;
    min-height: 160px;
    background-image: url(${footerLeft});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2 {
      text-align: center;
      color: white;
    }
    .wrap {
      display: flex;
      flex-wrap: wrap;
      .person {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 25%;
        }
        span {
          padding-left: 10%;
          font-size: 15px;
          white-space: nowrap;
          color: white;
        }
      }
    }
  }
`;

export default FooterRightStyle;