import React, {Component, Fragment} from "react";
import {filterNullValueObject} from 'utils/utils';
import {Row, Col} from "hzero-ui";
import {Header, Content} from 'components/Page';
import {Bind} from 'lodash-decorators';
import {isUndefined} from 'lodash';
import moment from 'moment';
import {connect} from 'dva';
import EquMachiningHeadTable from "../../components/equipmentMachiningPage/EquMachiningHeadTable";
import EquMachiningLineTable from "../../components/equipmentMachiningPage/EquMachiningLineTable";
import Search from "../../components/equipmentMachiningPage/search";
import holikeLoading from "../../components/holikeLoading";

@connect(({equipmentMachining, loading}) => ({
  equMachiningHeadLoading: loading.effects["equipmentMachining/fetchEquMachiningHead"],
  equMachiningLineLoading: loading.effects["equipmentMachining/fetchEquMachiningLine"],
  equipmentMachining,
}))
export default class EquipmentMachining extends Component {
  form;

  constructor(props) {
    super(props);
  }

  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 查询设备加工头
   * @param {*} params
   */
  @Bind()
  getEquMachiningHead(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'equipmentMachining/fetchEquMachiningHead',
      payload: {
        ...params,
      },
    });
  }

  /**
   * 查询设备加工明细
   * @param {*} params
   */
  @Bind()
  getEquMachiningLine(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'equipmentMachining/fetchEquMachiningLine',
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
    const startDate = fieldValues.startDate ? moment(fieldValues.startDate).format('YYYY-MM-DD HH:mm:ss') : null;
    const endDate = fieldValues.endDate ? moment(fieldValues.endDate).format('YYYY-MM-DD HH:mm:ss') : null;
    console.log(fieldValues);
    const searchParams = {
      ...fieldValues,
      startDate,
      endDate
    };
    if (startDate != null && endDate != null) {
      this.getEquMachiningHead(searchParams);
    }
  }
  @Bind()
  handleClick(record) {
    const wkcId = record.wkcId;
    const equKid = record.equKid;
    const searchParams = {
      wkcId,
      equKid,
    };
    this.getEquMachiningLine(searchParams);
  }
  render() {
    const {equipmentMachining, equMachiningHeadLoading,equMachiningLineLoading} = this.props;
    const {
      startDate,
      equMachiningHead,
      equMachiningLine
    } = equipmentMachining;
    const searchProps = {
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const machiningHead = {
      onClick: this.handleClick,
      loading: {spinning: !!equMachiningHeadLoading, indicator: holikeLoading},
      dataSource: equMachiningHead,
    };
    const machiningLine = {
      loading: {spinning: !!equMachiningLineLoading, indicator: holikeLoading},
      dataSource: equMachiningLine,
      startDate,
    };
    return (
      <Fragment>
        <Header title="设备加工报表" />
        <Content>
          <Search {...searchProps} />
          <Row>
            <Col span={24} style={{padding: '20px'}}>
              <EquMachiningHeadTable {...machiningHead} />
            </Col>
            <Col span={24} style={{padding: '20px'}}>
              <EquMachiningLineTable {...machiningLine} />
            </Col>
          </Row>
        </Content>
      </Fragment>
    );
  }
};
