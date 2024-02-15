
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExporttoExcel = async (reportName, excelData, headerNames1, headerNames2, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.sheet_add_aoa(ws, [["Date", headerNames1, headerNames2, "Result"]], { origin: "A1", skipHeader: true });
    const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"]
    };
    // ws[reportName] = { t: 'l', v: reportName };
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}



// const sheet = XLSX.utils.json_to_sheet([{}], {
//     header: [reportName],
// });
// XLSX.utils.sheet_add_json(sheet, data, { origin: 'A3' });
// XLSX.utils.book_append_sheet(workbook, sheet);
// XLSX.writeFile(workbook, 'fileName.xls');