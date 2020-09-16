import React, { PureComponent } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'hzero-ui';
import { isFunction } from 'lodash';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;
const formItemLayout = {
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
   * 判断表单条件是否有错
   * @param {*} fieldsError
   * @returns
   */
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
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

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {
      form: { getFieldDecorator, isFieldTouched, getFieldError, getFieldsError },
    } = this.props;
    const batchOrderNoListError = isFieldTouched('batchOrderNoList') && getFieldError('batchOrderNoList');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                  >
                    {getFieldDecorator('type', {
                      initialValue: "BO",
                    })(
                      <Select
                        allowClear
                        placeholder="批次/子订单类型"
                      >
                        <Option value="BO">批次</Option>
                        <Option value="PMO">子订单</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                  >
                    {getFieldDecorator('dimension', {
                      initialValue: "OP_TYPE",
                    })(
                      <Select
                        allowClear
                        placeholder="汇总维度"
                      >
                        <Option value="OP_TYPE">工序类别</Option>
                        <Option value="OP_DTL">工序明细</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    validateStatus={batchOrderNoListError ? 'error' : ''}
                    help={batchOrderNoListError || ''}
                  >
                    {getFieldDecorator('batchOrderNoList', {
                      rules: [{ required: true, message: '请输入批次号!' }],
                    })(
                      <Input.TextArea placeholder="批次号" />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('poList')(
                      <Input.TextArea placeholder="PO" />
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
        </Form>
      </div>
    );
  }
}