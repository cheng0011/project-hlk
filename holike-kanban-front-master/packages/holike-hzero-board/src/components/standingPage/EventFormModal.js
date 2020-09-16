import React from "react";
import { Modal, Select, Button, Input, Form, Row, Col } from "hzero-ui";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import { filterNullValueObject, getCurrentUser } from 'utils/utils';
import Upload from 'components/Upload/index';
// import Lov from 'components/Lov';

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
@Form.create({ fieldNameProp: null })
@connect(({ eventForm }) => ({
  eventForm,
  loginName: getCurrentUser().loginName,
}))
class EventFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectPlantId: null,
      selectProdLineId: null,
      selectItemGroupId: null,
      responsibilityUserLevel: null,
      responsibilityUserLevelDesc: null,
    };
  }

  // 获取工厂下拉列表
  @Bind()
  getPlantList(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchPlantList",
      payload: {
        userName,
      },
    });
  }

  // 获取默认工厂
  @Bind()
  getDefPlant(userName) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchDefPlantList",
      payload: {
        userName,
      },
    }).then((res) => {
      const { defPlantId } = res[0];
      if (defPlantId) {
        this.setState({
          selectPlantId: defPlantId,
        });
        this.getProdLineList(userName, defPlantId);
      }
    });
  }

  // 获取产线下拉列表数据
  @Bind()
  getProdLineList(userName, plantId) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchProdLineList",
      payload: {
        userName,
        plantId,
      },
    }).then(res => {
      if (res && res.length === 0) {
        this.setState({
          selectProdLineId: null,
        });
      }
    });
  }

  // 获取工序下拉列表数据
  @Bind()
  getOpList(userName, plantId, prodLineId) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchOpList",
      payload: {
        userName,
        plantId,
        prodLineId,
      },
    });
  }

  // 获取项目组
  @Bind()
  getItemGroup(prodLineId) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchItemGroup",
      payload: {
        prodLineId,
      },
    });
  }

  // 获取项目
  @Bind()
  getItem(itemGroupId) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchItem",
      payload: {
        itemGroupId,
      },
    });
  }

  // 获取优先级
  @Bind()
  getPriority() {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchPriority",
    });
  }

  // 获取责任人
  @Bind()
  getResponsibility(prodLineId) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/fetchResponsibility",
      payload: {
        prodLineId,
      },
    });
  }

  // 保存事件
  @Bind()
  saveEvent(dto) {
    const { dispatch } = this.props;
    dispatch({
      type: "eventForm/saveEvent",
      payload: {
        dto,
      },
    });
  }

  // 选择工厂
  @Bind()
  handleSelectPlant(value) {
    const { loginName, form: { resetFields } } = this.props;
    resetFields(["prodLineId", "standardOpId", "groupId", "responsorId"]);
    this.setState({
      selectPlantId: value,
    });
    if (value) {
      // 重新获取产线列表数据
      this.getProdLineList(loginName, value);
    }
  }

  // 选择产线
  @Bind()
  handleSelectProdLine(value) {
    const { form: { resetFields } } = this.props;
    resetFields(["standardOpId", "groupId", "responsorId"]);
    const { loginName } = this.props;
    this.setState({
      selectProdLineId: value,
    });
    if (value) {
      this.getOpList(loginName, this.state.selectPlantId, value);
      // 获取项目组
      this.getItemGroup(value);
      // 获取责任人
      this.getResponsibility(value);
    }
  }

  @Bind()
  handleSelectItemGroup(value) {
    this.setState({
      selectItemGroupId: value,
    });
    if (value) {
      this.getItem(value);
    }
  }

  /**
   *选择责任人
   * @param {*} value
   */
  @Bind()
  handleResponsibility(value) {
    const { eventForm: { responsibilityList } } = this.props;
    responsibilityList.forEach((item) => {
      if (item.responsibilityUserId === value) {
        this.setState({
          responsibilityUserLevel: item.responsibilityUserLevel,
          responsibilityUserLevelDesc: item.responsibilityUserLevelDesc,
        });
      }
    });

  }

  // 提交表单
  @Bind()
  handleSubmit() {
    const { form, form: { getFieldsValue } } = this.props;
    const fieldValues = isUndefined(form)
      ? {}
      : filterNullValueObject(getFieldsValue());
    const {
      eventDescription,
      eventLevel,
      uuid,
      standardOpId,
      responsorId,
      groupId,
      lineId,
      prodLineId,
    } = fieldValues;
    const params = {
      eventDTO: {
        eventDescription,
        eventId: null,
        eventLevel,
        eventName: "",
        recId: 0,
        status: 'NEW',
        uuid,
        time: new Date(),
        standardOpId,
        responsorId,
      },
      groupId,
      lineId,
      prodLineId,
      recId: 0,
      status: 'NEW',
      time: new Date(),
    };
    this.saveEvent(params);
  }

  // 重置表单
  @Bind()
  handleReset() {
    const { form: { resetFields } } = this.props;
    resetFields();
    this.setState({
      selectProdLineId: null,
      selectItemGroupId: null,
    });
  }

  componentDidMount() {
    const { loginName } = this.props;
    this.getDefPlant(loginName);
    this.getPlantList(loginName);
    this.getPriority();
  }

  render() {
    const {
      form,
      showNewEvent,
      onCancel,
      eventForm,
    } = this.props;
    const {
      plantList, // 工厂下拉列表
      defPlant, // 默认工厂
      prodLineList, // 产线列表
      opList, // 工序列表
      itemGroupList, // 项目组列表
      itemList, // 项目列表
      priorityList, // 优先级列表
      responsibilityList, // 责任人列表
    } = eventForm;
    const {
      getFieldDecorator,
    } = form;

    return (
      <Modal
        width={800}
        title="新建事件"
        visible={showNewEvent}
        onCancel={onCancel}
        footer={[
          <Button icon="save" key="submit" type="primary" onClick={this.handleSubmit}>
            保存
          </Button>,
          <Button icon="reload" key="reset" type="primary" onClick={this.handleReset}>
            刷新
          </Button>,
        ]}
      >
        <Form>
          <Row>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="工厂"
              >
                {getFieldDecorator('plant', {
                  initialValue: defPlant && defPlant.defPlantId,
                })(
                  <Select
                    onSelect={this.handleSelectPlant}
                    onChange={this.handleSelectPlant}
                    // allowClear
                    placeholder="请选择"
                  >
                    {
                      plantList && plantList.map((item) => {
                        return (<Option value={item.plantId}>{item.plantDesc}</Option>);
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="产线"
              >
                {getFieldDecorator('prodLineId')(
                  <Select
                    allowClear
                    placeholder="请选择"
                    disabled={!this.state.selectPlantId}
                    onSelect={this.handleSelectProdLine}
                    onChange={this.handleSelectProdLine}
                  >
                    {
                      prodLineList.length > 0 && prodLineList.map((item) => (<Option value={item.prodLineId}>{item.prodLineDesc}</Option>))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="工序"
              >
                {getFieldDecorator('standardOpId')(
                  <Select
                    allowClear
                    disabled={!this.state.selectProdLineId}
                    placeholder="请选择"
                  >
                    {
                      opList.length > 0 && opList.map((item) => (<Option value={item.opId}>{item.opDesc}</Option>))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="项目组"
              >
                {getFieldDecorator('groupId')(
                  <Select
                    placeholder="请选择"
                    onSelect={this.handleSelectItemGroup}
                    onChange={this.handleSelectItemGroup}
                    disabled={!this.state.selectProdLineId}
                  >
                    {itemGroupList.length > 0 && itemGroupList.map((item) => (<Option value={item.itemGroupId}>{item.itemGroupName}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="项目"
              >
                {getFieldDecorator('lineId')(
                  <Select
                    placeholder="请选择"
                    disabled={!this.state.selectItemGroupId}
                  >
                    {itemList.length > 0 && itemList.map((item) => (<Option value={item.itemId}>{item.itemName}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="优先级"
              >
                {getFieldDecorator('eventLevel')(
                  <Select
                    placeholder="请选择"
                  >
                    {priorityList.length > 0 && priorityList.map((item) => (<Option value={item.priorityCode}>{item.priorityDesc}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="责任人"
              >
                {getFieldDecorator('responsorId')(
                  <Select
                    placeholder="请选择"
                    disabled={!this.state.selectProdLineId}
                    onSelect={this.handleResponsibility}
                  >
                    {responsibilityList.length > 0 && responsibilityList.map((item) => (<Option value={item.responsibilityUserId}>{item.responsibilityUserName}</Option>))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...formItemLayout}
                label="LM级别"
              >
                {getFieldDecorator('jibie', {
                  initialValue: this.state.responsibilityUserLevel,
                })(
                  <Select disabled>
                    <Option value={this.state.responsibilityUserLevel}>{this.state.responsibilityUserLevelDesc}</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="问题描述"
              >
                {
                  getFieldDecorator("eventDescription")(
                    <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="上传图片"
              >
                {getFieldDecorator('uuid')(
                  <Upload
                    accept="image/jpeg;image/png"
                    bucketName="event-bucket"
                    description="不超过9张图片"
                    btnText="点击上传"
                    title="添加图片"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

    );
  }

};

export default Form.create()(EventFormModal);