import React, {PureComponent} from "react";
import styled, {css} from "styled-components";
import {Form, Input, Button, Row, Col, DatePicker, Select} from 'hzero-ui';
import Lov from 'components/Lov';
import {isFunction} from 'lodash';
import "./index.less";

import header from "../../assets/icons/header.png";
import backgroundImg from "../../assets/img/bk.png";

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};

@Form.create({fieldNameProp: null})
export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    if (isFunction(props.onRef)) {
      props.onRef(this);
    }
  }

  render() {
    const {
      children, headerRight = null,
      form: {getFieldDecorator},
      onSelect,
    } = this.props;
    return (
      <div className="content1">
        <div className="header" style={{'background-image': `url(${header})`}}>
          <div className="center-wrap">
            <div className="title">
              <span>
                {`好莱客车间排钻数采看板`}
              </span>
            </div>
          </div>

          <Form.Item
            {...formItemLayout}
            className="right-wrap"
            style={{right: '18%'}}
          >
            {getFieldDecorator('workShopCode')(
              <Lov
                lovOptions={
                  {
                    valueField: 'workShopCode',
                    displayField: 'descriptions',
                  }
                }
                onChange={onSelect}
                code="HOLIKE.KANBAN.WORK.SHOP"
              />
            )}
          </Form.Item>


          {headerRight && (
            <div className="right-wrap">
              {headerRight}
            </div>
          )}
        </div>
        <div className="content-wrap" style={{'background-image': `url(${backgroundImg})`}}>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
