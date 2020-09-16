import React, { PureComponent } from 'react';
import { Form, Button, Select, Row, Col, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import intl from 'utils/intl';

const FormItem = Form.Item;
// Option组件初始化
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const noLabelFormItemLayout = {
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
  }

  render() {
    const {
      checkList,
      form: { getFieldDecorator, getFieldValue, getFieldsError },
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
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('startDate',{
                      rules: [{ required: true, message: '请输入开始日期!' }],
                    })(
                      <DatePicker
                        showTime
                        placeholder="开始日期"
                        format="YYYY-MM-DD HH:mm:ss"
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
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('endDate',{
                      rules:[{required:true,message:'请输入结束日期'}]
                    })(
                      <DatePicker
                        disabledDate={currentDate =>
                          getFieldValue('startDate') &&
                          moment(getFieldValue('startDate')).isAfter(currentDate, 'day')
                        }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束日期"
                        showTime
                      />
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