
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const CrfPdfWithOutDetails = (val) => {
    const { dept_name, req_deptsec, req_slno, req_date, actual_requirement, needed,
        category, location, expected_date, em_name,
        md_approve, md, md_approve_remarks, md_approve_date, md_user, md_detial_analysis,
        ed_approve, ed, ed_approve_remarks, ed_approve_date, ed_user, ed_detial_analysis

    } = val

    const reqno = 'CRF/TMC/' + req_slno.toString().padStart(6, '0')
    const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"


    var doc = {


        background: function (currentPage, pageSize) {
            return {
                table: {
                    widths: [pageSize.width - 70],
                    heights: [pageSize.height - 70],
                    bold: true,
                    body: [['']]
                },
                margin: 30
            };
        },
        pageMargins: [40, 130, 130, 40],
        header: {
            margin: 20,
            columns: [
                {
                    table: {
                        widths: ['50%', 'auto'],
                        heights: ['auto'],
                        body: [
                            [
                                {
                                    image: 'snow', fit: [150, 150],

                                    margin: [25, 15, 0, 0],

                                },
                                // {
                                //     image: 'pic', fit: [150, 150],

                                //     margin: [25, 15, 0, 0],

                                // }
                            ],
                            [
                                {
                                    margin: [30, 0],
                                    text: 'A Unit of Quilon Medical Trust',
                                    fontSize: 11, italics: true,
                                    font: 'Roboto'
                                },
                                // {}
                            ],
                        ]
                    },
                    layout: 'noBorders'
                }

            ]
        },
        footer: function (currentPage, pageCount) {
            return {
                margin: 5,
                columns: [
                    {
                        fontSize: 9,
                        text: [
                            {
                                text: currentPage.toString() + ' of ' + pageCount,
                            }
                        ],
                        alignment: 'center'
                    }
                ]
            };
        },


        content: [
            {
                fontSize: 10,
                margin: [20, 0, 0, 0],
                text: 'CENTRAL REQUEST FORM(CRF)',
                style: 'header', bold: true,
                alignment: 'center',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [50, 150, 110, 168],
                    body: [
                        [{ text: 'Request No', fontSize: 8, font: 'Roboto' },
                        { text: reqno, fontSize: 8, font: 'Roboto' },
                        { text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: reqdate, fontSize: 8, font: 'Roboto' },],
                        [{ text: 'Department', fontSize: 8, font: 'Roboto' },
                        { text: dept_name, fontSize: 8, font: 'Roboto' },
                        { text: 'Department Section', fontSize: 8, font: 'Roboto' },
                        { text: req_deptsec, fontSize: 8, font: 'Roboto' }],
                        [{ text: 'Category', fontSize: 8, font: 'Roboto' },
                        {
                            text: category !== null ? category.toLowerCase() : "Not Given",
                            textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                        },
                        { text: 'Location', fontSize: 8, font: 'Roboto' },
                        {
                            text: location !== null ? location.toLowerCase() : "Not Given",
                            textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                        },
                        ],

                    ]
                }
            },
            {
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [505, 650],
                    body: [
                        [
                            {
                                text: 'Actual Requirement:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: actual_requirement !== null ? actual_requirement.toLowerCase() : "Not Given", textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: 'Justification for the need:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: needed !== null ? needed.toLowerCase() : "Not Given", textTransform: "capitalize", fontSize: 8, font: 'Roboto',

                            },
                        ],
                        [
                            {
                                text: 'Location:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: location !== null ? location.toLowerCase() : "Not Given", textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: [{ text: 'Expected Date: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: expdate, fontSize: 8, font: 'Roboto' },]
                            }

                        ],
                        [
                            {
                                text: [{ text: 'Requested By: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: em_name, fontSize: 8, font: 'Roboto' },]
                            }

                        ],

                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 0;
                    },

                }
            },
            {
                margin: [0, 5, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Medical Director  Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                {

                                    text: md_approve !== null ? md : "Not Updated",
                                    fontSize: 8, font: 'Roboto'
                                },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by MD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: md_approve_remarks !== null ? md_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Detailed Analysis by MD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: md_detial_analysis !== null ? md_detial_analysis.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: md_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'mdsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: mddate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            },
            {
                margin: [0, 5, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Executive Director Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                {

                                    text: ed_approve !== null ? ed : "Not Updated",
                                    fontSize: 8, font: 'Roboto'
                                },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by ED\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ed_approve_remarks !== null ? ed_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by ED\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ed_detial_analysis !== null ? ed_detial_analysis.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ed_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'edsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: eddate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            }
        ],






        images: {
            // snow: 'http://192.168.22.170/NAS/logo/logo.png',
            // pic: 'http://192.168.10.170/NAS/2119/signature/signature.jpg',
            snow: 'http://192.168.10.88:9090/Meliora/logo/logo.png',
            mdsign: 'http://192.168.10.88:9090/Meliora/md/signature/signature.jpg',
            edsign: 'http://192.168.10.88:9090/Meliora/ed/signature/signature.jpg',
        }


    }



    pdfMake.createPdf(doc).open();

}
