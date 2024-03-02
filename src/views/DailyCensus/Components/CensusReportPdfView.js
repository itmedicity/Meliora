import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CensusReportPdfView = async (tableData, dailyDate, calculateTotal) => {
    const { totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus } = calculateTotal

    const viewPdf = {
        content: [
            {
                text: moment(new Date(dailyDate)).format('DD-MM-YYYY'),
                style: 'topheader',
            },
            {
                text: "Daily Census Report",
                style: 'header',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [25, 90, 78, 54, 48, 50, 55, 30, 30],
                    heights: 5,
                    body: [
                        [
                            { text: 'Sl.No', style: 'tableHeader' },
                            { text: 'Nursing Station', style: 'tableHeader' },
                            { text: 'Yesterday Census', style: 'tableHeader' },
                            { text: 'Admissions', style: 'tableHeader' },
                            { text: 'Discharge', style: 'tableHeader' },
                            { text: 'Transfer In', style: 'tableHeader' },
                            { text: 'Transfer Out', style: 'tableHeader' },
                            { text: 'Death', style: 'tableHeader' },
                            { text: 'Total', style: 'tableHeader' },
                        ]
                    ]
                        .concat(tableData?.map((val, index) => [
                            { text: index + 1, fontSize: 8, alignment: 'center' },
                            { text: val.census_ns_name, fontSize: 8, alignment: 'left' },
                            { text: val.yesterday_census, fontSize: 8, alignment: 'center' },
                            { text: val.total_admission, fontSize: 8, alignment: 'center' },
                            { text: val.total_discharge, fontSize: 8, alignment: 'center' },
                            { text: val.transfer_in, fontSize: 8, alignment: 'center' },
                            { text: val.transfer_out, fontSize: 8, alignment: 'center' },
                            { text: val.total_death, fontSize: 8, alignment: 'center' },
                            { text: val.census_total, fontSize: 8, alignment: 'center' },
                        ])),
                },
            },
            {
                style: 'table2',
                table: {
                    widths: [25, 90, 78, 54, 48, 50, 55, 30, 30],
                    body: [
                        ['', 'Total', totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus],
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#f5f5f5' : null;
                    }
                }
            },
        ],
        styles: {
            topheader: {
                fontSize: 11,
                alignment: 'right',
            },

            header: {
                alignment: 'center',
                fontSize: 16,
                fontFamily: 'Calibri',
                bold: true,
                margin: [0, 3, 0, 5]
            },
            tableExample: {
                alignment: 'center',
                margin: [0, 2, 2, 0]
            },
            tableHeader: {
                fontSize: 9,
                bold: true,
                color: 'black',

            },
            table2: {
                alignment: 'center',
                fontSize: 10,
                margin: [0, 2, 2, 0]
            },
        }
    }
    pdfMake.createPdf(viewPdf).open();
}

