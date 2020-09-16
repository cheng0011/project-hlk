import React, { Component, Fragment } from "react";
import { Bind } from 'lodash-decorators';
import { isUndefined } from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import {
  filterNullValueObject,
  // getCurrentUser
} from 'utils/utils';
import { Header, Content } from 'components/Page';

import holikeLoading from "../../components/holikeLoading";
import Search from "../../components/boardAttrPage/search";
import DetailTable from "../../components/boardAttrPage/detailTable";
import ExportExcelButton from "../../components/exportButton";

// const { loginName } = getCurrentUser();

@connect(({ boardAttr, loading }) => ({
  tableLoading: loading.effects["boardAttr/fetchBoardAttr"],
  boardAttr,
}))
export default class BoardAttrPage extends Component {
  form;

  /**
   * 设置Form
   * @param {object} ref - Search组件引用
   */
  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 获取板件属性报表数据
   * @param {*} params
   */
  @Bind()
  getBoardAttr(params) {
    const { dispatch } = this.props;
    dispatch({
      type: "boardAttr/fetchBoardAttr",
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
    const startDateTime = fieldValues.startDateTime ? moment(fieldValues.startDateTime).format('YYYY-MM-DD HH:mm:ss') : null;
    const endDateTime = fieldValues.endDateTime ? moment(fieldValues.endDateTime).format('YYYY-MM-DD HH:mm:ss') : null;
    // const poTextFormat = fieldValues.poList ? fieldValues.poList.split("\n") : null;
    // const childTextFormat = fieldValues.pmoList ? fieldValues.pmoList.split("\n") : null;
    const searchParams = {
      ...fieldValues,
      startDateTime,
      endDateTime,
    };
    this.getBoardAttr(searchParams);
  }

  render() {
    const { boardAttr, tableLoading } = this.props;
    const {
      boardAttrData,
    } = boardAttr;
    const searchProps = {
      onClick: this.handleQuery,
      onRef: this.handleBindRef,
    };
    const tableProps = {
      loading: { spinning: !!tableLoading, indicator: holikeLoading },
      dataSource: boardAttrData,
    };
    const exportButtonprops = {
      tables: [
        {
          id: "board-attr-table",
          sheetName: "板件属性表",
        },
      ],
      excelName: "板件属性报表",
    };
    return (
      <Fragment>
        <Header title="板件属性">
          <ExportExcelButton {...exportButtonprops} />
        </Header>
        <Content>
          <Search {...searchProps} />
          <DetailTable {...tableProps} />
        </Content>
      </Fragment>
    );
  }
};