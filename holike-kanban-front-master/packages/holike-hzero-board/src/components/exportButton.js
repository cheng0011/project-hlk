import React from "react";
import { Button, message } from "hzero-ui";
import XLSX from 'xlsx/dist/xlsx.full.min';

// 导出报表按钮组件
const ExportExcelButton = (props) => {
  const { tables, excelName } = props;
  const buttonStyle = {
    borderColor: "#03A134",
    backgroundColor: "#03A134",
  };
  function exportTable() {
    const worksheetList = tables.map(item => {
      return { reportWorkTable: document.getElementById(`${item.id}`), name: item.sheetName };
    });
    const workbook = XLSX.utils.book_new();
    if (worksheetList.some(item => item.reportWorkTable)) {
      worksheetList.forEach(item => {
        if (item.reportWorkTable) {
          XLSX.utils.book_append_sheet(workbook, XLSX.utils.table_to_sheet(item.reportWorkTable), `${item.name}`);
        }
      });
      XLSX.writeFile(workbook, `${excelName}.xlsx`);
    } else {
      message.info("暂无要导出的数据!");
    }
  }

  return (
    <Button style={{ ...buttonStyle }} type="primary" onClick={exportTable}>导出</Button>
  );
};

export default ExportExcelButton;