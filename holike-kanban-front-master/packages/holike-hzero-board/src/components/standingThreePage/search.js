import React, { PureComponent } from 'react';
import { Form, Button, Select, Row, Col, DatePicker } from 'hzero-ui';
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
   * 选择工厂
   */
  @Bind()
  handleSelectPlant(value) {
    const { form: { resetFields, getFieldValue }, selectPlant, selectWorkShop, handleSelectProdLine } = this.props;
    selectPlant(value);
    resetFields(["workShopId", "prodLineId"]);
    selectWorkShop(getFieldValue("workShopId"));
    handleSelectProdLine(getFieldValue("prodLineId"));
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
   * 选择车间
   */
  @Bind()
  handleSelectWorkShop(value) {
    const { selectWorkShop, handleSelectProdLine, form: { resetFields, getFieldValue } } = this.props;
    selectWorkShop(value);
    resetFields(["prodLineId"]);
    handleSelectProdLine(getFieldValue("prodLineId"));
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
      defPlantIdList,
      plantList,
      workShopList,
      prodLineList,
      handleChangeDateTime,
      handleSelectTime,
      handleSelectProdLine,
      form: { getFieldDecorator, getFieldValue, getFieldError, getFieldsError, isFieldTouched },
      // exportExcel,
    } = this.props;
    // tenantId
    const workShopIdError = isFieldTouched('workShopId') && getFieldError('workShopId');
    // source = []
    return (
      <div style={{ display: "flex", transform: "translateY(5px)" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", marginBottom: 0 }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={22}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={5}>
                  {defPlantIdList.length > 0 && (
                    <Form.Item
                      {...noLabelFormItemLayout}
                    >
                      {getFieldDecorator('plantId', {
                        initialValue: defPlantIdList.length > 0 && defPlantIdList[0].defPlantId,
                      })(
                        <Select
                          onSelect={this.handleSelectPlant}
                          onChange={this.handleSelectPlant}
                          placeholder="工厂"
                        >
                          {
                            plantList.length > 0 && plantList.map((item) => {
                              return (<Option value={item.plantId}>{item.plantDesc}</Option>);
                            })
                          }
                        </Select>
                      )}
                    </Form.Item>
                  )}
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                    validateStatus={workShopIdError ? 'error' : ''}
                    help={workShopIdError || ''}
                  >
                    {getFieldDecorator('workShopId', {
                      rules: [{ required: true, message: "请选择车间！" }],
                    })(
                      <Select
                        allowClear
                        placeholder="选择车间"
                        disabled={!getFieldValue("plantId")}
                        onSelect={this.handleSelectWorkShop}
                        onChange={this.handleSelectWorkShop}
                      >
                        {
                          workShopList.length > 0 && workShopList.map((item) => (<Option value={item.workShopId}>{item.workShopDesc}</Option>))
                        }
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('prodLineId')(
                      <Select
                        onSelect={handleSelectProdLine}
                        onChange={handleSelectProdLine}
                        allowClear
                        disabled={!getFieldValue("workShopId")}
                        placeholder="选择产线"
                      >
                        {
                          prodLineList.length > 0 && prodLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('selectDate', {
                      initialValue: moment(new Date(), "YYYY-MM-DD"),
                    })(
                      <DatePicker
                        allowClear={false}
                        onChange={handleChangeDateTime}
                        format="YYYY-MM-DD"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem {...noLabelFormItemLayout}>
                    {getFieldDecorator('time', {
                      initialValue: "DAY",
                    })(
                      <Select
                        onSelect={handleSelectTime}
                        placeholder="天/周/月"
                      >
                        <Option value="DAY">天</Option>
                        <Option value="WEEK">周</Option>
                        <Option value="MONTH">月</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={2} className="search-btn-more">
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.hasErrors(getFieldsError())}
                  onClick={this.onClick}
                >
                  {intl.get('hzero.common.button.search').d('查询')}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}