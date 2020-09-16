import React, {PureComponent, useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col, DatePicker, Select} from 'hzero-ui';
import {isFunction} from 'lodash';
import moment from 'moment';
import {Bind} from 'lodash-decorators';

import {SEARCH_FORM_ROW_LAYOUT, SEARCH_FORM_ITEM_LAYOUT} from 'utils/constants';
import intl from 'utils/intl';
import Lov from 'components/Lov';

const FormItem = Form.Item;
// Option组件初始化
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};

@Form.create({fieldNameProp: null})
export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    if (isFunction(props.onRef)) {
      props.onRef(this);
    }
    this.state = {
      batchOrderList: [],
    };
  }

  /**
   * 判断表单条件是否有错
   * @param {*} fieldsError
   * @returns
   */
  hasErrors(fieldsError) {
    if (!this.props.form.getFieldValue('workShopCode')) {
      return true;
    }
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  /**
   * onClick - 查询按钮事件
   */
  @Bind()
  onClick() {
    const {onClick} = this.props;
    if (isFunction(onClick)) {
      onClick();
    }
  }

  /**
   * 获取批次号数据
   * @param {*} params
   */
  @Bind()
  getBatchOrderList(params) {
    console.log(this);
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankProduce/fetchBatchOrder',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 重置表单
   *
   * @memberof QueryForm
   */
  @Bind()
  handleFormReset() {
    this.props.form.resetFields();
  }


  render() {
    const {
      opType,
      dispatch,
      form: {getFieldDecorator, getFieldError, isFieldTouched, getFieldsError, getFieldValue},
    } = this.props;
    const startDateError = isFieldTouched('startDate') && getFieldError('startDate');
    const workShopCodeError = isFieldTouched('workShopCode') && getFieldError('workShopCode');
    const batchOrderList = this.state.batchOrderList;
    const that = this;

    function fetchBatchOrder(workShopCode, startDate) {
      if (startDate && workShopCode) {
        dispatch({
          type: 'doorPlankProduce/fetchBatchOrder',
          payload: {
            workShopCode, startDate,
          },
        }).then((res1) => {
          that.setState({
            batchOrderList: res1,
          });
        });
      }
    }

    function onSelectDate(value) {
      const workShopCode = getFieldValue('workShopCode');
      fetchBatchOrder(workShopCode, value.format('YYYY-MM-DD'));
    }

    function onSelectWhopCode(value) {
      const startDate = getFieldValue('startDate').format('YYYY-MM-DD');
      fetchBatchOrder(value, startDate);
    }

    return (
      <div style={{display: "flex"}}>
        <Form layout="inline" className="more-fields-search-form" style={{width: "100%", overflow: "hidden"}}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={4}>
                  <Form.Item
                    label="日期"
                    {...formItemLayout}
                    validateStatus={startDateError ? 'error' : ''}
                    help={startDateError || ''}
                  >
                    {getFieldDecorator('startDate', {
                      initialValue: moment(),
                      rules: [{required: true, message: '请输入日期!'}],
                    })(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="日期"
                        allowClear={false}
                        onChange={onSelectDate}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <FormItem
                    {...formItemLayout}
                    label="车间"
                    validateStatus={workShopCodeError ? 'error' : ''}
                    help={workShopCodeError || ''}
                  >
                    {getFieldDecorator('workShopCode', {
                      rules: [{required: true, message: '请选择车间!!'}],
                    })(
                      <Lov
                        lovOptions={
                          {
                            valueField: 'workShopCode',
                            displayField: 'descriptions',
                          }
                        }
                        code="HOLIKE.KANBAN.WORK.SHOP"
                        onChange={onSelectWhopCode}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    {...formItemLayout}
                    label="产线"
                  >
                    {getFieldDecorator('prodLineId')(
                      <Lov
                        lovOptions={
                          {
                            valueField: 'prodLineId',
                            displayField: 'descriptions',
                          }
                        }
                        code="HOLIKE.KANBAN.PRODUCT.LINE"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label='批次号'
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('batchNoListText')(
                      <Select
                        allowClear
                        placeholder="批次号"
                      >
                        {
                          batchOrderList && batchOrderList.length > 0 && batchOrderList.map((item) => (
                            <Select.Option value={item}>{item}</Select.Option>))
                        }
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <FormItem
                    {...formItemLayout}
                    label='工序'
                  >
                    {getFieldDecorator('opType')(
                      <Select
                        allowClear
                        mode="multiple"
                        placeholder="工序"
                      >
                        {
                          opType.length > 0 && opType.map((item) => (
                            <Select.Option value={item.lookupCode}>{item.meaning}</Select.Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={6} className="search-btn-more">
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.onClick}
                  disabled={this.hasErrors(getFieldsError())}
                >
                  {intl.get('hzero.common.button.search').d('查询')}
                </Button>
                <Button onClick={this.handleFormReset} icon="reload">
                  {intl.get('hzero.common.button.reset').d('重置')}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
