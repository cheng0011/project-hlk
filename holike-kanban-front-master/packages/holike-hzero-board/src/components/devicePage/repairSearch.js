import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, DatePicker } from 'hzero-ui';
import { isFunction } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';
import { filterNullValueObject } from 'utils/utils';

import { SEARCH_FORM_ROW_LAYOUT } from 'utils/constants';
import Lov from 'components/Lov';
import intl from 'utils/intl';

import ExportExcelButton from "../exportButton";

const FormItem = Form.Item;

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

  /**
   * onClick - 查询按钮事件
   */
  @Bind()
  onClick() {
    const { onClickModalSearch, form: { getFieldsValue } } = this.props;
    const fieldValues = filterNullValueObject(getFieldsValue());
    if (isFunction(onClickModalSearch)) {
      onClickModalSearch(fieldValues);
    }
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
      form: { getFieldDecorator, getFieldValue, getFieldsError },
    } = this.props;
    // 导出按钮
    const exportButtonprops = {
      tables: [
        {
          id: "device-repair-table",
          sheetName: "sheet1",
        },
        {
          id: "device-one-repair-table",
          sheetName: "sheet2",
        },
        {
          id: "device-two-repair-table",
          sheetName: "sheet3",
        },
        {
          id: "device-three-repair-table",
          sheetName: "sheet4",
        },
        {
          id: "device-four-repair-table",
          sheetName: "sheet5",
        },
      ],
      excelName: "设备MTBF&MTTR设备报修",
    };
    return (
      <div style={{ display: "flex" }}>
        <Form layout="inline" className="more-fields-search-form" style={{ width: "100%", overflow: "hidden" }}>
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col span={18}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="设备"
                  >
                    {getFieldDecorator('equipmentId')(
                      <Lov
                        lovOptions={
                          {
                            valueField: 'kid',
                            displayField: 'equipmentName',
                          }
                        }
                        code="HOLIKE.KANBAN.EQUIPMENT"
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
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('startDate')(
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
                <Col span={6}>
                  <Form.Item
                    {...noLabelFormItemLayout}
                  >
                    {getFieldDecorator('endDate')(
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
                <ExportExcelButton {...exportButtonprops} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
