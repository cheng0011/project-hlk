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
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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
      expandForm: false,
      newProdLineList: [],
    };
  }

  /**
   * 选择车间
   * @param {*} value
   */
  @Bind()
  handleSelectWorkShop(value) {
    this.setState({
      // selectWorkShopId: value,
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
      defProdLineList,
      workShopList,
    } = this.props;
    const { expandForm, newProdLineList } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  {workShopList.length > 0 && defPlantId.length > 0 && (
                    <FormItem
                      {...formItemLayout}
                      label="车间"
                    >
                      {getFieldDecorator('workShop', {
                        initialValue: workShopList.filter((item) => item.plantId === Number(defPlantId[0].def_plant_id))[0].workShopId,
                      })(
                        <Select
                          allowClear
                          onSelect={this.handleSelectWorkShop}
                        >
                          {workShopList
                            .filter(item => item.plantId === Number(defPlantId[0].def_plant_id))
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
                  <FormItem {...formItemLayout} label='产线'>
                    {getFieldDecorator('prodLine')(
                      <Select
                        mode="multiple"
                        allowClear
                      >
                        {newProdLineList.length === 0 && defProdLineList.map(n => (
                          <Option key={n.prodLineId} value={n.prodLineId}>
                            {n.prodLineDesc}
                          </Option>
                        ))}
                        {newProdLineList.map(n => (
                          <Option key={n.prodLineId} value={n.prodLineId}>
                            {n.prodLineDesc}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('packingTimeFrom')(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="包装时间从"
                        disabledDate={currentDate =>
                          getFieldValue('packingTimeTo') &&
                          moment(getFieldValue('packingTimeTo')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('packingTimeTo')(
                      <DatePicker
                        disabledDate={currentDate =>
                          getFieldValue('packingTimeFrom') &&
                          moment(getFieldValue('packingTimeFrom')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD"
                        placeholder="包装时间至"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    label="PO"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('poText')(<Input.TextArea autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='子订单'
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('childText')(<Input.TextArea autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='批次号'
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('batchNoListText')(<Input.TextArea autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </Form.Item>
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