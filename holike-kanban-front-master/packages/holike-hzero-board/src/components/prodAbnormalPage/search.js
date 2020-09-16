import React, { PureComponent } from 'react';
import { Form, Button, Select, Row, Col, Radio, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

const RadioGroup = Radio.Group;

const noLabelFormItemLayout = {
  // labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
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
   */
  @Bind()
  handleSelectPlant(value) {
    const { form: { resetFields }, onSelectPlant } = this.props;
    resetFields(["workshopId"]);
    onSelectPlant(value);
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {
      defPlantId,
      plant,
      workShopList,
      onChange,
      form: { getFieldDecorator, getFieldValue, getFieldError, getFieldsError, isFieldTouched },
    } = this.props;
    const { expandForm } = this.state;
    const plantIdError = isFieldTouched('plantId') && getFieldError('plantId');
    const workShopIdError = isFieldTouched('workshopId') && getFieldError('workshopId');
    const upiError = isFieldTouched('upi') && getFieldError('upi');
    const startDateError = isFieldTouched('startDate') && getFieldError('startDate');
    const endDateError = isFieldTouched('endDate') && getFieldError('endDate');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={startDateError ? 'error' : ''}
                    help={startDateError || ''}
                  >
                    {getFieldDecorator('startDate', {
                      initialValue: moment().startOf('month'),
                      rules: [{ required: true, message: '请输入开始时间!' }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="时间周期从"
                        format="YYYY-MM-DD"
                        disabledDate={currentDate =>
                          getFieldValue('endDate') && (
                            moment(getFieldValue('endDate')).isBefore(currentDate, 'day')
                          )
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={endDateError ? 'error' : ''}
                    help={endDateError || ''}
                  >
                    {getFieldDecorator('endDate', {
                      initialValue: moment(),
                      rules: [{ required: true, message: "请输入结束时间!" }],
                    })(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('startDate') && (
                            moment(getFieldValue('startDate')).isAfter(currentDate, 'day')
                          )
                        }
                        format="YYYY-MM-DD"
                        placeholder="时间周期至"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                    validateStatus={plantIdError ? 'error' : ''}
                    help={plantIdError || ''}
                  >
                    {getFieldDecorator('plantId', {
                      initialValue: defPlantId.length > 0 && Number(defPlantId[0].def_plant_id),
                      rules: defPlantId.length > 0 && [{ required: true, message: '请输入工厂!' }],
                    })(
                      <Select
                        placeholder="工厂"
                        onSelect={this.handleSelectPlant}
                      >
                        {
                          plant.length > 0 && plant.map((item) => (<Option value={item.plantId}>{item.plantDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...noLabelFormItemLayout}
                    validateStatus={workShopIdError ? 'error' : ''}
                    help={workShopIdError || ''}
                  >
                    {getFieldDecorator('workshopId', {
                      rules: [{ required: true, message: '请输入车间!' }],
                    })(
                      <Select
                        allowClear
                        disabled={!getFieldValue("plantId")}
                        placeholder="实体车间"
                      >
                        {
                          workShopList.length > 0 && workShopList.map((item) => (<Option value={item.workShopId}>{item.workShopDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="工序"
                  >
                    {getFieldDecorator('opId')(
                      <Lov
                        lovOptions={
                          {
                            valueField: 'opId',
                            displayField: 'description',
                          }
                        }
                        code="HOLIKE.KANBAN.WORK.PROCEDURE"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={18}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={upiError ? 'error' : ''}
                    help={upiError || ''}
                  >
                    {getFieldDecorator('type', {
                      initialValue: "creationDate",
                    })(
                      <RadioGroup
                        onChange={onChange}
                      >
                        <Radio value="creationDate">日</Radio>
                        <Radio value="weekOfMonth">周</Radio>
                        <Radio value="month">月</Radio>
                        <Radio value="planStopTypeMeaning">计划停产</Radio>
                        <Radio value="problemType">异常分类</Radio>
                        <Radio value="responsibleDepartmnet">责任部门</Radio>
                      </RadioGroup>
                    )}
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