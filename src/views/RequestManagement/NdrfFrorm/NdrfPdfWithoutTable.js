import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns'
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export const pdfdownload = (data, hodsign) => {
    const { req_slno, reqdate, actual_requirement, needed, location, expdate, req_dept,
        approve_incharge, incharge_remarks, hod_remarks, remarks, total_approx_cost,
        approve_hod, manag_operation_approvs, manag_operation_remarks, senior_manage_approvs,
        senior_manage_remarks, category, incharge_apprv_date, om_approv_date, caouser, req_user,
        hod_approve_date, som_aprrov_date, inch_user, hoduser, om_user, smo_user, cao_approves,
        cao_approv_date, cao_approve_remarks, ed_approves, ed_approve_remarks, ed_approve_date, eduser
    } = data[0]

    const req_date = reqdate !== null ? format(new Date(reqdate), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const exp_date = expdate !== null ? format(new Date(expdate), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const hoddate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not updated"
    const ed_user = eduser !== null ? eduser : "Not updated"

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
                text: 'NEW DEMAND REQUEST FORM(NDRF)',
                style: 'header', bold: true,
                alignment: 'center',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [50, 150, 110, 168],
                    body: [
                        [{ text: 'Department', fontSize: 8, font: 'Roboto' },
                        { text: req_dept, fontSize: 8, font: 'Roboto' },
                        { text: 'Category', fontSize: 8, font: 'Roboto' },
                        { text: category, fontSize: 8, font: 'Roboto' }],
                        [{ text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: req_date, fontSize: 8, font: 'Roboto' },
                        { text: 'Request No', fontSize: 8, font: 'Roboto' },
                        { text: req_slno, fontSize: 8, font: 'Roboto' }]
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
                                text: actual_requirement.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: 'Justification for the need:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: needed.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: 'Location:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: location.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: 'Remarks:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            { text: [{ text: 'Approximate Amount ', bold: true, fontSize: 8, font: 'Roboto' }, { text: total_approx_cost, fontSize: 8, font: 'Roboto' },] }

                        ],
                        [
                            { text: [{ text: 'Expected Date: ', bold: true, fontSize: 8, font: 'Roboto' }, { text: exp_date, fontSize: 8, font: 'Roboto' },] }

                        ],
                        [
                            {
                                text: [{ text: 'Requested By: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: req_user, fontSize: 8, font: 'Roboto' },]
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
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Incharge Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: approve_incharge, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by Incharge\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: incharge_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: inch_user.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: inchadate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            },

            {
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'HOD Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: approve_hod, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by HOD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: hod_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: hoduser.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: hoddate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            },
            {
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Manager Operation Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: manag_operation_approvs, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: manag_operation_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: om_user.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: omdate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            },
            {
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Senior Manager Operations Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: senior_manage_approvs, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by Senior Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: senior_manage_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: smo_user.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: smodate, fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            },
            {
                margin: [0, 3, 0, 0,],
                style: 'tableExample',
                // pageBreak: 'after',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'CAO/COO/MS Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: cao_approves, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by CAO/COO/MS\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: cao_approve_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: caouser.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: caodate, fontSize: 8, font: 'Roboto' },
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
                                text: [{ text: 'ED/MD Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ed_approves, fontSize: 8, font: 'Roboto' },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by ED/MD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ed_approve_remarks.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ed_user.toLowerCase(), textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'hsign', alignment: 'center', fit: [50, 75], },

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
            snow: 'http://192.168.10.170/NAS/logo/logo.png',
            // pic: 'http://192.168.10.170/NAS/2119/signature/signature.jpg',
            hsign: hodsign
        }
    }

    pdfMake.createPdf(doc).open();

}

