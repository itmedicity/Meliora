import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
export const ExportToExcel = async (reportData, fileName, excelflag) => {
    if (!reportData) {
        console.error('reportData is undefined or null');
        return;
    }
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(reportData);
    if (excelflag === 1) {
        XLSX.utils.sheet_add_aoa(ws, [["Backup Date", "Backup Type", "Backup Name", "Backup Location", "Schedule Type", "Schedule Time",
            "Backup Taken Date & Time", "Backup Size Before", "Backup Size After", "Employee", "Remarks"]], { origin: "A1" });
    }
    else if (excelflag === 2) {
        XLSX.utils.sheet_add_aoa(ws, [["Backup Week", "Backup Type", "Backup Name", "Backup Location", "Schedule Type",
            "Backup Taken Date & Time", "Backup Size Before", "Backup Size After", "Employee", "Remarks"]], { origin: "A1" });
    }
    else if (excelflag === 3) {
        XLSX.utils.sheet_add_aoa(ws, [["Backup Month", "Backup Type", "Backup Name", "Backup Location", "Schedule Type",
            "Backup Taken Date & Time", "Backup Size Before", "Backup Size After", "Employee", "Remarks"]], { origin: "A1" });
    }
    else if (excelflag === 4) {
        XLSX.utils.sheet_add_aoa(ws, [["Backup Year", "Backup Type", "Backup Name", "Backup Location", "Schedule Type",
            "Backup Taken Date & Time", "Backup Size Before", "Backup Size After", "Employee", "Remarks"]], { origin: "A1" });
    }
    else {
        XLSX.utils.sheet_add_aoa(ws, [["Backup Date", "Backup DueDate", "Backup Type", "Backup Name", "Backup Location", "Schedule Type",
            "Schedule Time", "Backup Taken Date & Time", "Backup Size Before", "Backup Size After", "Employee", "Remarks"]], { origin: "A1" });
    }
    const wb = {
        Sheets: { data: ws },
        SheetNames: ["data"]
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}
