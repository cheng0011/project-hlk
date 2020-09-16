import React, { PureComponent } from 'react';
import { Form, Input, Button, Select, Row, Col, DatePicker, Checkbox } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

// const { RangePicker } = DatePicker;

const noLabelFormItemLayout = {
  // labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};

@Form.create({ fieldNameProp: null })
export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    if (isFunction(props.onRef)) {
      props.onRef(this);
    }
  }

  /**
   * onClick - 查询按钮事件
   */
  @Bind()
  onClick() {
    const { onClick } = this.props;
    if (isFunction(onClick)) {
      onClick();
    }
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

  /**
   * 判断表单条件是否有错
   * @param {*} fieldsError
   * @returns
   */
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {
      orderServiceType,
      plant,
      form: { getFieldDecorator, getFieldValue, getFieldsError },
    } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={24}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('startDeliveryDate')(
                      <DatePicker
                        showTime
                        placeholder="起始交期"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('endDeliveryDate') &&
                          moment(getFieldValue('endDeliveryDate')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('endDeliveryDate')(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('startDeliveryDate') &&
                          moment(getFieldValue('startDeliveryDate')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束交期"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('orderCreationDateFrom')(
                      <DatePicker
                        showTime
                        placeholder="订单创建日期从"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('orderCreationDateTo') &&
                          moment(getFieldValue('orderCreationDateTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('orderCreationDateTo')(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('orderCreationDateFrom') &&
                          moment(getFieldValue('orderCreationDateFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="订单创建日期至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('orderServiceType')(
                      <Select
                        allowClear
                        placeholder="订单服务类型"
                      >
                        {orderServiceType.length > 0 && orderServiceType.map((item) => (<Option value={item.levelCdoe}>{item.levelDesc}</Option>))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchCreationDateFrom')(
                      <DatePicker
                        showTime
                        placeholder="批次创建日期从"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('batchCreationDateTo') &&
                          moment(getFieldValue('batchCreationDateTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchCreationDateTo')(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('batchCreationDateFrom') &&
                          moment(getFieldValue('batchCreationDateFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="批次创建日期至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('auditDateTimeFrom')(
                      <DatePicker
                        showTime
                        placeholder="批次审批日期从"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('auditDateTimeTo') &&
                          moment(getFieldValue('auditDateTimeTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('auditDateTimeTo')(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('auditDateTimeFrom') &&
                          moment(getFieldValue('auditDateTimeFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="批次审批日期至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('plantId')(
                      <Select
                        placeholder="工厂"
                      >
                        {
                          plant.length > 0 && plant.map((item) => (<Option value={item.plantId}>{item.plantDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchOrderNoList')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('originalPoList')(<Input.TextArea placeholder="PO" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('dealerNameList')(<Input.TextArea placeholder="经销商" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('orSoUrgen')(
                      <Checkbox
                        checkedValue={1}
                        unCheckedValue={0}
                      >
                        是否加急
                      </Checkbox>
                    )}
                  </FormItem>
                </Col>
                <Col span={5} className="search-btn-more">
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={this.hasErrors(getFieldsError())}
                      onClick={this.onClick}
                    >
                      {intl.get('hzero.common.button.search').d('查询')}
                    </Button>
                    <Button onClick={this.handleFormReset} icon="reload">
                      {intl.get('hzero.common.button.reset').d('重置')}
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}