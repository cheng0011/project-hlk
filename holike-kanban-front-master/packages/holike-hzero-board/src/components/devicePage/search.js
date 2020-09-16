import React, { PureComponent } from 'react';
import { Form, Button, Select, Row, Col, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import Lov from 'components/Lov';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
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
    const { form: { getFieldDecorator} } = this.props;
    // 添加不存在的字段
    getFieldDecorator('equipmentGroupName');
    getFieldDecorator('equipmentName')
  }

  render() {
    const {
      defPlantIdList,
      plant,
      form: { getFieldDecorator, getFieldValue, getFieldError, getFieldsError, isFieldTouched,setFieldsValue },
    } = this.props;
    const { expandForm } = this.state;
    const equipmentIdError = isFieldTouched('equipmentId') && getFieldError('equipmentId');
    const equipmentGroupIdError = isFieldTouched('equipmentGroupId') && getFieldError('equipmentGroupId');
    const startDateError = isFieldTouched('startDate') && getFieldError('startDate');
    const endDateError = isFieldTouched('endDate') && getFieldError('endDate');
    const wdError = isFieldTouched('wd') && getFieldError('wd');
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={4}>
                  <FormItem
                    {...{
                      labelCol: { span: 8 },
                      wrapperCol: { span: 16 },
                    }}
                    validateStatus={wdError ? 'error' : ''}
                    help={wdError || ''}
                    label="维度"
                  >
                    {getFieldDecorator('wd', {
                      initialValue: "sbz",
                      rules: [{ required: true, message: "请选择维度!" }],
                    })(
                      <Select
                        onSelect={this.handleSelectWorkShop}
                        onChange={() => {
                          console.log("change start ----->",getFieldValue('equipmentGroupName'))
                          setFieldsValue({
                            'equipmentGroupId': '',
                            'equipmentGroupName' : '',
                            'equipmentId': '',
                            'equipmentName': '',
                          })
                          console.log("change end ----->",getFieldValue('equipmentGroupName'))}
                        }
                      >
                        <Option value="sbz">设备组</Option>
                        <Option value="sb">设备</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...{
                      labelCol: { span: 8 },
                      wrapperCol: { span: 16 },
                    }}
                    validateStatus={getFieldValue("wd") === "sbz" && equipmentGroupIdError ? 'error' : ''}
                    help={equipmentGroupIdError || ''}
                    label="设备组"
                  >
                    {getFieldDecorator('equipmentGroupId', {
                      rules: getFieldValue("wd") === "sbz" && [{ required: false, message: '请选择设备组!' }],
                    })(
                      <Lov
                        disabled={getFieldValue("wd") === "sb"}
                        lovOptions={
                          {
                            valueField: 'equipmentGroupId',
                            displayField: 'equipmentGroupName',
                          }
                        }
                        textValue={getFieldValue('equipmentGroupName')}
                        code="HOLIKE.KANBAN.EQUIPMENT.GROUP"
                        onChange={(_, obj) => {
                          setFieldsValue({
                            'equipmentGroupName': obj.equipmentGroupName
                          })
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...{
                      labelCol: { span: 6 },
                      wrapperCol: { span: 18 },
                    }}
                    label="设备"
                    validateStatus={getFieldValue("wd") === "sb" && equipmentIdError ? 'error' : ''}
                    help={equipmentIdError || ''}
                  >
                    {getFieldDecorator('equipmentId', {
                      rules: getFieldValue("wd") === "sb" && [{ required: false, message: '请选择设备!' }],
                    })(
                      <Lov
                        disabled={getFieldValue("wd") === "sbz"}
                        lovOptions={
                          {
                            valueField: 'kid',
                            displayField: 'equipmentName',
                          }
                        }
                        textValue={getFieldValue('equipmentName')}
                        code="HOLIKE.KANBAN.EQUIPMENT"
                        onChange={(_, obj) => {
                          setFieldsValue({
                            'equipmentName': obj.equipmentName
                          })
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={startDateError ? 'error' : ''}
                    help={startDateError || ''}
                  >
                    {getFieldDecorator('startDate', {
                      initialValue: moment().subtract(1, 'months'),
                      rules: [{ required: true, message: '请输入开始日期!' }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="开始日期"
                        format="YYYY-MM-DD"
                        disabledDate={currentDate =>
                          getFieldValue('endDate') &&
                          moment(getFieldValue('endDate')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={endDateError ? 'error' : ''}
                    help={endDateError || ''}
                  >
                    {getFieldDecorator('endDate', {
                      initialValue: moment(),
                      rules: [{ required: true, message: "请输入结束日期!" }],
                    })(
                      <DatePicker
                        showTime
                        disabledDate={currentDate =>
                          getFieldValue('startDate') &&
                          moment(getFieldValue('startDate')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD"
                        placeholder="结束日期"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="工厂"
                  >
                    {getFieldDecorator('plantId', {
                      initialValue: defPlantIdList.length > 0 && Number(defPlantIdList[0].def_plant_id),
                    })(
                      <Select>
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
                  >
                    {getFieldDecorator('workShopId')(
                      <FormItem
                        {...formItemLayout}
                        label="车间"
                      >
                        {getFieldDecorator('workShopId')(
                          <Lov
                            lovOptions={
                              {
                                valueField: 'workShopId',
                                displayField: 'descriptions',
                              }
                            }
                            code="HOLIKE.KANBAN.WORK.SHOP"
                          />
                        )}
                      </FormItem>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
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
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="工位"
                  >
                    {getFieldDecorator('workcellId')(
                      <Lov
                        lovOptions={
                          {
                            valueField: 'workcellId',
                            displayField: 'description',
                          }
                        }
                        code="HOLIKE.KANBAN.WORK.WORKCELL"
                      />
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
