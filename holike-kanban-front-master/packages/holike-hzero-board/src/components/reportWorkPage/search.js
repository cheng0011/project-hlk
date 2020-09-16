import React, { PureComponent } from 'react';
import { Form, Input, Button, Select, Row, Col, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

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
      expandForm: false,
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
   * 选择车间并重置工序和员工
   */
  @Bind()
  handleSelectWorkShop(value) {
    const { onSelectWorkShop, form: { resetFields } } = this.props;
    onSelectWorkShop(value);
    resetFields(["standardOpTypeList", "userId"]);
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
      workShopList,
      peopleList,
      partsList,
      opList,
      form: { getFieldDecorator, getFieldValue, getFieldError, getFieldsError, isFieldTouched },
    } = this.props;
    const { expandForm } = this.state;
    const completeTimeFromError = isFieldTouched('completeTimeFrom') && getFieldError('completeTimeFrom');
    const completeTimeToError = isFieldTouched('completeTimeTo') && getFieldError('completeTimeTo');
    const workShopIdError = isFieldTouched('workShopId') && getFieldError('workShopId');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={completeTimeFromError ? 'error' : ''}
                    help={completeTimeFromError || ''}
                  >
                    {getFieldDecorator('completeTimeFrom', {
                      rules: [{ required: false, message: '请输入报工开始日期!' }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="报工日期从"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('completeTimeTo') &&
                          moment(getFieldValue('completeTimeTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={completeTimeToError ? 'error' : ''}
                    help={completeTimeToError || ''}
                  >
                    {getFieldDecorator('completeTimeTo', {
                      rules: [{ required: false, message: "请输入报工结束日期!" }],
                    })(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('completeTimeFrom') &&
                          moment(getFieldValue('completeTimeFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="报工日期至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                    validateStatus={workShopIdError ? 'error' : ''}
                    help={workShopIdError || ''}
                  >
                    {getFieldDecorator('workShopId', {
                      rules: [{ required: true, message: "请输入车间!" }],
                    })(
                      <Select
                        placeholder="车间"
                        onSelect={this.handleSelectWorkShop}
                      >
                        {
                          workShopList.length > 0 && workShopList.map((item) => (<Option value={item.workShopId}>{item.workShopName}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('levelCode')(
                      <Select
                        allowClear
                        showSearch
                        filterOption={(inputValue, option) =>
                          option.props.children.includes(inputValue)
                        }
                        placeholder="部件"
                      >
                        {partsList.length > 0 && partsList.map((item) => (<Option value={item.levelCdoe}>{item.levelDesc}</Option>))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('standardOpTypeList')(
                      <Select
                        allowClear
                        showSearch
                        mode="multiple"
                        placeholder="工序"
                      >
                        {
                          opList.length > 0 && opList.map((item) => (<Option value={item.standardOpType}>{item.meaning}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('userId')(
                      <Select
                        showSearch
                        allowClear
                        filterOption={(inputValue, option) =>
                          option.props.children.join("").includes(inputValue)
                        }
                        placeholder="员工"
                      >
                        {
                          peopleList.length > 0 && peopleList.map((item) => (<Option value={item.userId}>{item.userName}-{item.trueName}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('pmoList')(<Input.TextArea placeholder="生产子订单号" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('poList')(<Input.TextArea placeholder="PO" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchNoList')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
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