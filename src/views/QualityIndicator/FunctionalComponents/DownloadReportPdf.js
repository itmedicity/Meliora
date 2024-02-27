import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const DownloadReportPdf = async (reportName, tableData, headerNames1, headerNames2) => {
    const viewPdf = {
        content: [
            {
                text: reportName,
                style: 'header',
                fontSize: 11,
                bold: true,
                alignment: 'center',
            },

            {
                style: 'tableExample',
                table: {
                    widths: [50, 150, 150, 60],
                    heights: 10,
                    body: [

                        [
                            { text: 'Date', style: 'tableHeader' },
                            { text: headerNames1, style: 'tableHeader' },
                            { text: headerNames2, style: 'tableHeader' },
                            { text: 'Result', style: 'tableHeader' }

                        ]
                    ].concat(tableData?.map((val) => [

                        { text: val.date, fontSize: 8, alignment: 'center' },
                        { text: val.data1, fontSize: 8, alignment: 'center' },
                        { text: val.data2, fontSize: 8, alignment: 'center' },
                        { text: val.data3, fontSize: 8, alignment: 'center' },
                    ]))
                }
            }
        ],
        styles: {
            header: {
                fontSize: 11,
                alignment: 'center',
                fontFamily: 'Calibri',
                bold: true,
                lineHeight: 1,

            },
            tableExample: {
                lineHeight: 1,
                pageMargins: [100, 0, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 9,
                color: 'black',
                alignment: 'center',

            }
        }
    }
    pdfMake.createPdf(viewPdf).open();
}
