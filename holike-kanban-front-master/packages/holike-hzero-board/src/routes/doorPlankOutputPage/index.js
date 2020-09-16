import React, {Component, Fragment} from "react";
import {filterNullValueObject} from 'utils/utils';
import {Row, Col} from "hzero-ui";
import {Header, Content} from 'components/Page';
import {Bind} from 'lodash-decorators';
import {isUndefined} from 'lodash';
import moment from 'moment';
import {connect} from 'dva';
import AttendanceAndOutputTable from "../../components/doorPlankOutputPage/AttendanceAndOutputTable";
import PersonaOutputTable from "../../components/doorPlankOutputPage/PersonaOutputTable";
import Search from "../../components/doorPlankOutputPage/search";
import holikeLoading from "../../components/holikeLoading";

@connect(({doorPlankOutput, loading}) => ({
  outputLoading: loading.effects["doorPlankOutput/fetchOutput"],
  personOutputLoading: loading.effects["doorPlankOutput/fetchPersonOutput"],
  doorPlankOutput,
}))
export default class DoorPlankPage extends Component {
  form;

  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 获取工序
   */
  @Bind()
  getOpType() {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankOutput/fetchOpType',
    });
  }

  /**
   * 查询班组出勤/人均产能
   * @param {*} params
   */
  @Bind()
  getOutput(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankOutput/fetchOutput',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 查询个人产能明细
   * @param {*} params
   */
  @Bind()
  getPersonOutput(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'doorPlankOutput/fetchPersonOutput',
      payload: {
        ...params,
      },
    });
  }

  @Bind()
  handleQuery() {
    const fieldValues = isUndefined(this.form)
      ? {}
      : filterNullValueObject(this.form.getFieldsValue());
    const startDate = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD') : null;
    const searchParams = {
      ...fieldValues,
      startDate,
    };
    if (startDate != null) {
      this.props.doorPlankOutput.startDate = searchParams.startDate;
      this.getOutput(searchParams);
      this.getPersonOutput(searchParams);
    }
  }

  componentDidMount() {
    this.getOpType();
  }

  render() {
    const {doorPlankOutput, personOutputLoading} = this.props;
    const {
      opType, // 工序
      outputData,
      personOutputData,
      startDate,
    } = doorPlankOutput;
    const searchProps = {
      opType,
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const outputProps = {
      loading: {spinning: false, indicator: holikeLoading},
      dataSource: outputData,
    };
    const personOutputProps = {
      loading: {spinning: !!personOutputLoading, indicator: holikeLoading},
      dataSource: personOutputData,
      startDate,
    };
    return (
      <Fragment>
        <Header title="门板产能看板" />
        <Content>
          <Search {...searchProps} />
          <Row>
            <Col span={24} style={{padding: '20px'}}>
              <AttendanceAndOutputTable {...outputProps} />
            </Col>
            <Col span={24} style={{padding: '20px'}}>
              <PersonaOutputTable {...personOutputProps} />
            </Col>
          </Row>
        </Content>
      </Fragment>
    );
  }
};
