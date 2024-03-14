import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const CensusReportPdfView = async (tableData, dailyDate, calculateTotal) => {
    const { totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus,
        oraTotAdm, oraTotDis, oraTotDeath, oraTotal } = calculateTotal
    const viewPdf = {
        pageMargins: [15, 15, 15, 0],
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
                    widths: [19, 70, 38, 43, 43, 37, 37, 34, 34, 24, 25, 24, 24],
                    heights: 5,
                    body: [
                        [
                            { text: 'SlNo', style: 'tableHeader' },
                            { text: 'Nursing Station', style: 'tableHeader' },
                            { text: 'Yesterday Census', style: 'tableHeader' },
                            { text: 'Admissions', style: 'tableHeader' },
                            { text: 'HIS Admissions', style: 'tableHeader' },
                            { text: 'Discharge', style: 'tableHeader' },
                            { text: 'HIS Discharge', style: 'tableHeader' },
                            { text: 'Transfer In', style: 'tableHeader' },
                            { text: 'Transfer Out', style: 'tableHeader' },
                            { text: 'Death', style: 'tableHeader' },
                            { text: 'HIS Death', style: 'tableHeader' },
                            { text: 'Total', style: 'tableHeader' },
                            { text: 'HIS Total', style: 'tableHeader' },
                        ]
                    ]
                        .concat(tableData?.map((val, index) => [
                            { text: index + 1, fontSize: 7, alignment: 'center' },
                            { text: val.census_ns_name, fontSize: 6, bold: true, alignment: 'left' },
                            { text: val.yesterday_census, fontSize: 8, alignment: 'center' },
                            { text: val.total_admission, fontSize: 8, alignment: 'center' },
                            { text: val.ora_admission, fontSize: 8, alignment: 'center', fillColor: '#bdbdbd' },
                            { text: val.total_discharge, fontSize: 8, alignment: 'center' },
                            { text: val.ora_discharge, fontSize: 8, alignment: 'center', fillColor: '#bdbdbd' },
                            { text: val.transfer_in, fontSize: 8, alignment: 'center' },
                            { text: val.transfer_out, fontSize: 8, alignment: 'center' },
                            { text: val.total_death, fontSize: 8, alignment: 'center' },
                            { text: val.ora_death, fontSize: 8, alignment: 'center', fillColor: '#bdbdbd' },
                            { text: val.census_total, fontSize: 8, alignment: 'center' },
                            { text: val.ora_census_total, fontSize: 8, alignment: 'center', fillColor: '#bdbdbd' }
                        ])),
                },
            },
            {
                style: 'table2',
                table: {
                    widths: [19, 75, 38, 43, 43, 37, 38, 34, 34, 24, 25, 24, 24],
                    body: [
                        ['', 'Total', totYesterday, totAdmission, oraTotAdm, totDischarge, oraTotDis, totTransIn,
                            totTransOut, totDeath, oraTotDeath, totalcensus, oraTotal]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#bdbdbd' : null;
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
                fontSize: 8,
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

