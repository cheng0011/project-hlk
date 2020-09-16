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
      form: { getFieldDecorator, getFieldValue },
      workShop,
      prodLine,
      completeType,
      selectWorkShop,
    } = this.props;
    const { expandForm } = this.state;
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
                    {getFieldDecorator('workshopId')(
                      <Select
                        onSelect={selectWorkShop}
                        placeholder="车间"
                        allowClear
                      >
                        {workShop
                          .map(n => (
                            <Option value={n.workshopId}>
                              {n.workshopName}
                            </Option>
                          ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('prodLineId')(
                      <Select
                        mode="multiple"
                        placeholder="产线"
                        allowClear
                      >
                        {prodLine.map(n => (
                          <Option key={n.prodLineId} value={n.prodLineId}>
                            {n.prodLineName}
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
                    {getFieldDecorator('logEventsTo')(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="记录时间从"
                        disabledDate={currentDate =>
                          getFieldValue('logEventsFrom') &&
                          moment(getFieldValue('logEventsFrom')).isBefore(currentDate, 'day')
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...formItemLayout}
                  >
                    {getFieldDecorator('logEventsFrom')(
                      <DatePicker
                        disabledDate={currentDate =>
                          getFieldValue('logEventsTo') &&
                          moment(getFieldValue('logEventsTo')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD"
                        placeholder="记录时间至"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }} {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('lookupCode')(
                      <Select
                        placeholder="不合格类型"
                        allowClear
                      >
                        {completeType.length > 0 && completeType.map(n => (
                          <Option key={n.lookupCode} value={n.lookupCode}>
                            {n.meaning}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('batchNo')(<Input.TextArea placeholder="批次号" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('parentMakeOrderNo')(<Input.TextArea placeholder="生产订单编号" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('po')(<Input.TextArea placeholder="PO" autosize={{ minRows: 2, maxRows: 4 }} maxLength={1000} />)}
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