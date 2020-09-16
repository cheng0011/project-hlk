import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, Input, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;

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
    this.state = {
      expandForm: true,
    };
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

  // 查询条件展开/收起
  @Bind()
  toggleForm() {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
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
      form: { getFieldDecorator, getFieldValue, getFieldError, getFieldsError, isFieldTouched },
    } = this.props;
    const { expandForm } = this.state;
    const startDateTimeError = isFieldTouched('startDateTime') && getFieldError('startDateTime');
    const endDateTimeError = isFieldTouched('endDateTime') && getFieldError('endDateTime');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={startDateTimeError ? 'error' : ''}
                    help={startDateTimeError || ''}
                  >
                    {getFieldDecorator('startDateTime', {
                      rules: [{ required: true, message: '请输入开始时间!' }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="创建开始时间"
                        format="YYYY-MM-DD"
                        disabledDate={currentDate =>
                          getFieldValue('endDateTime') && (
                            moment(getFieldValue('endDateTime')).isBefore(currentDate, 'day') ||
                            moment(getFieldValue('endDateTime')).subtract(6, "days").isAfter(currentDate, "days")
                          )
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={endDateTimeError ? 'error' : ''}
                    help={endDateTimeError || ''}
                  >
                    {getFieldDecorator('endDateTime', {
                      rules: [{ required: true, message: "请输入结束时间!" }],
                    })(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('startDateTime') && (
                            moment(getFieldValue('startDateTime')).isAfter(currentDate, 'day') ||
                            moment(getFieldValue('startDateTime')).add(6, "days").isBefore(currentDate, "days")
                          )
                        }
                        format="YYYY-MM-DD"
                        placeholder="创建结束时间"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('workOrderId')(<Input.TextArea placeholder="物料标识" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchOrderNo')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </Form.Item>
                </Col>

              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('parentMakeOrderNo')(<Input.TextArea placeholder="子订单号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('upi')(<Input.TextArea placeholder="UPI" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6} className="search-btn-more">
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
                <Button onClick={this.toggleForm}>
                  {expandForm
                    ? intl.get('hzero.common.button.collected').d('收起查询')
                    : intl.get(`hzero.common.button.viewMore`).d('更多查询')}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}