import React, { PureComponent } from 'react';
import { Form, Input, Button, Select, Row, Col, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';

import { SEARCH_FORM_ROW_LAYOUT, SEARCH_FORM_ITEM_LAYOUT } from 'utils/constants';
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
    this.state = {
      expandForm: false,
      newWorkShopList: [],
      newProdLineList: [],
    };
  }

  /**
   * 选择工厂
   * @param {*} value
   */
  @Bind()
  handleSelectPlant(value) {
    this.setState({
      newWorkShopList: this.props.workShopList.filter((item) => item.plantId === value),
    });
  }

  /**
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectWorkShop(value) {
    this.setState({
      newProdLineList: this.props.prodLineList.filter((item) => item.workShopId === value),
    });
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

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      defPlantId,
      plantList,
      defWorkShopList,
      workShopList,
      productType,
      functionType,
      orderServiceType,
    } = this.props;
    const { expandForm, newWorkShopList, newProdLineList } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  {plantList.length > 0 && defPlantId.length > 0 && (
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('plantId', {
                        initialValue: Number(defPlantId[0].def_plant_id),
                      })(
                        <Select
                          allowClear
                          onSelect={this.handleSelectPlant}
                          placeholder="工厂"
                        >
                          {plantList
                            .map(n => (
                              <Option value={n.plantId}>
                                {n.plantDesc}
                              </Option>
                            ))}
                        </Select>
                      )}
                    </FormItem>
                  )}
                </Col>
                <Col span={6}>
                  {workShopList.length > 0 && defPlantId.length > 0 && (
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('workShopId')(
                        <Select
                          allowClear
                          onSelect={this.handleSelectWorkShop}
                          placeholder="车间"
                        >
                          {
                            newWorkShopList.length === 0 && defWorkShopList.length > 0 && defWorkShopList
                              .map(n => (
                                <Option value={n.workShopId}>
                                  {n.workShopDesc}
                                </Option>
                              ))
                          }
                          {newWorkShopList.length > 0 && newWorkShopList
                            .map(n => (
                              <Option value={n.workShopId}>
                                {n.workShopDesc}
                              </Option>
                            ))}
                        </Select>
                      )}
                    </FormItem>
                  )}
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('prodLineId')(
                      <Select
                        mode="multiple"
                        placeholder="产线"
                        allowClear
                        disabled={!newProdLineList.length > 0}
                      >
                        {newProdLineList.length > 0 && newProdLineList.map(n => (
                          <Option key={n.prodLineId} value={n.prodLineId}>
                            {n.prodLineDesc}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('productType')(
                      <Select
                        placeholder="产品类别"
                        allowClear
                      >
                        {productType.length > 0 && productType.map(n => (
                          <Option key={n.lookupCode} value={n.lookupCode}>
                            {n.meaning}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('functionType')(
                      <Select
                        mode="multiple"
                        placeholder="功能类型"
                        allowClear
                      >
                        {functionType.length > 0 && functionType.map(n => (
                          <Option key={n.functionType} value={n.functionType}>
                            {n.functionType}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('orderServiceType')(
                      <Select
                        placeholder="订单服务类型"
                        allowClear
                      >
                        {orderServiceType.length > 0 && orderServiceType.map(n => (
                          <Option key={n.lookupCode} value={n.lookupCode}>
                            {n.meaning}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...formItemLayout}
                  >
                    {getFieldDecorator('startDate')(
                      <DatePicker
                        format="YYYY-MM-DD hh:mm:ss"
                        showTime
                        placeholder="开料时间从"
                        disabledDate={currentDate =>
                          getFieldValue('endDate') &&
                          moment(getFieldValue('endDate')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...formItemLayout}
                  >
                    {getFieldDecorator('endDate')(
                      <DatePicker
                        disabledDate={currentDate =>
                          getFieldValue('startDate') &&
                          moment(getFieldValue('startDate')).isAfter(currentDate, 'day')
                        }
                        showTime
                        format="YYYY-MM-DD hh:mm:ss"
                        placeholder="开料时间至"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('batchOrderNoList')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('poList')(<Input.TextArea placeholder="采购订单号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('parentMakeOrderNoList')(<Input.TextArea placeholder="子订单号" autosize={{ minRows: 2, maxRows: 6 }} maxLength={40} />)}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={6} className="search-btn-more">
              <FormItem>
                <Button type="primary" htmlType="submit" onClick={this.onClick}>
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
