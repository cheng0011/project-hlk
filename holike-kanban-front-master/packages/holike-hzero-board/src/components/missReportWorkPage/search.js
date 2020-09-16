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

  render() {
    const {
      defPlantId,
      plant,
      workShopList,
      prodLineList,
      opType,
      onSelectPlant,
      onSelectWorkShop,
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { expandForm } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('plantId', {
                      initialValue: defPlantId.length > 0 && Number(defPlantId[0].def_plant_id),
                    })(
                      <Select
                        placeholder="工厂"
                        onSelect={onSelectPlant}
                      >
                        {
                          plant.length > 0 && plant.map((item) => (<Option value={item.plantId}>{item.plantDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('workShopId')(
                      <Select
                        allowClear
                        placeholder="车间"
                        onSelect={onSelectWorkShop}
                        onChange={onSelectWorkShop}
                      >
                        {
                          workShopList.length > 0 && workShopList.map((item) => (<Option value={item.workShopId}>{item.workShopDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('prodLineId')(
                      <Select
                        allowClear
                        placeholder="产线"
                      >
                        {
                          prodLineList.length > 0 && prodLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('opType')(
                      <Select
                        allowClear
                        placeholder="工序"
                      >
                        {
                          opType.length > 0 && opType.map((item) => (<Option value={item.lookupCode}>{item.meaning}</Option>))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <Form.Item
                    {...formItemLayout}
                  >
                    {getFieldDecorator('receiveDateBegin')(
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="接单时间从"
                        disabledDate={currentDate =>
                          getFieldValue('receiveDateEnd') &&
                          moment(getFieldValue('receiveDateEnd')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...formItemLayout}
                    label=''
                  >
                    {getFieldDecorator('receiveDateEnd')(
                      <DatePicker
                        showTime
                        placeholder="接单时间至"
                        disabledDate={currentDate =>
                          getFieldValue('receiveDateBegin') &&
                          moment(getFieldValue('receiveDateBegin')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('batchOrderNo')(
                      <Input.TextArea
                        autosize={{ minRows: 2, maxRows: 2 }}
                        maxLength={1000}
                        placeholder="批次号"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('parentMakeOrderNo')(
                      <Input.TextArea
                        autosize={{ minRows: 2, maxRows: 2 }}
                        maxLength={1000}
                        placeholder="子订单号"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('poList')(
                      <Input.TextArea
                        autosize={{ minRows: 2, maxRows: 2 }}
                        maxLength={1000}
                        placeholder="PO"
                      />
                    )}
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