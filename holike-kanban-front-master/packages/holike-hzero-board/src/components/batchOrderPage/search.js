import React, { PureComponent } from 'react';
import { Form, Button, Select, Row, Col, Input, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT, SEARCH_FORM_ITEM_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

// const { RangePicker } = DatePicker;

const noLabelFormItemLayout = {
  // labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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


  /**
   * 选择工厂
   * @param {*} value
   */
  @Bind()
  handleSelectPlant(value) {
    const { form: { resetFields }, selectPlant } = this.props;
    resetFields(["workShopId", "prodLineId"]);
    if (value) {
      selectPlant(value);
    }
  }

  /**
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectWorkShop(value) {
    const { form: { getFieldValue, resetFields }, selectWorkShop } = this.props;
    resetFields(["prodLineId"]);
    const plantId = getFieldValue("plantId");
    if (value) {
      selectWorkShop(plantId, value);
    }
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {
      plant,
      workShop,
      prodLine,
      form: { getFieldDecorator, getFieldValue, isFieldTouched, getFieldError, getFieldsError },
    } = this.props;
    const { expandForm } = this.state;
    const creationDateFromError = isFieldTouched('creationDateFrom') && getFieldError('creationDateFrom');
    const creationDateToError = isFieldTouched('creationDateTo') && getFieldError('creationDateTo');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="工厂"
                  >
                    {getFieldDecorator('plantId')(
                      <Select
                        allowClear
                        onSelect={this.handleSelectPlant}
                        onChange={this.handleSelectPlant}
                      >
                        {
                          plant.length > 0 && plant.map((item) => (<Option value={item.plantId}>{item.descriptions}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="车间"
                  >
                    {getFieldDecorator('workShopId')(
                      <Select
                        allowClear
                        disabled={!getFieldValue("plantId")}
                        onSelect={this.handleSelectWorkShop}
                        onChange={this.handleSelectWorkShop}
                      >
                        {
                          workShop.length > 0 && workShop.map((item) => (<Option value={item.workShopId}>{item.workShopName}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="产线"
                  >
                    {getFieldDecorator('prodLineId')(
                      <Select
                        allowClear
                        disabled={!getFieldValue("plantId") || !getFieldValue("workShopId")}
                      >
                        {
                          prodLine.length > 0 && prodLine.map((item) => (<Option value={item.prodLineId}>{item.descriptions}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={creationDateFromError ? 'error' : ''}
                    help={creationDateFromError || ''}
                  >
                    {getFieldDecorator('creationDateFrom', {
                      rules: [{ required: true, message: "请选择批次创建时间从!" }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="批次创建时间从"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={currentDate =>
                          getFieldValue('creationDateTo') &&
                          moment(getFieldValue('creationDateTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={creationDateToError ? 'error' : ''}
                    help={creationDateToError || ''}
                  >
                    {getFieldDecorator('creationDateTo', {
                      rules: [{ required: true, message: "请选择批次创建时间至!" }],
                    })(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('creationDateFrom') &&
                          moment(getFieldValue('creationDateFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="批次创建至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('batchOrderNo')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('parentMakeOrderNo')(<Input.TextArea placeholder="子订单号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
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