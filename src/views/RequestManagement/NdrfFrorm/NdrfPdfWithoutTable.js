import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownload = (data, inchargesign, hodsign, omsign, smosign, caosign, edsign) => {
    const { req_slno, actual_requirement, needed, location, req_dept, incharge_approve,
        incharge_remarks, incharge_apprv_date, hod_approve, hod_remarks, hod_approve_date,
        expected_date, remarks, reqdate, ndrf_om_approv, ndrf_om_remarks, ndrfom_approv_date,
        ndrf_smo_approv, ndrf_smo_remarks, ndrf_som_aprrov_date, ndrf_cao_approve,
        ndrf_cao_approve_remarks, ndrf_cao_approv_date, ndrf_ed_approve,
        ndrf_ed_approve_remarks, ndrf_ed_approve_date, inchuser, hoduser, omuser, smouser,
        caouser, requser, category, total_approx_cost, eduser,
    } = data[0]

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
                        { text: reqdate !== null ? format(new Date(reqdate), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                text: 'Remarks:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: remarks !== null ? remarks.toLowerCase() : "Not Given", textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: [{ text: 'Approximate Amount ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: total_approx_cost !== null ? total_approx_cost : "Not Given", fontSize: 8, font: 'Roboto' },]
                            }

                        ],
                        [
                            {
                                text: [{ text: 'Expected Date: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy hh:mm:ss') : "Not Given", fontSize: 8, font: 'Roboto' },]
                            }

                        ],
                        [
                            {
                                text: [{ text: 'Requested By: ', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: requser, fontSize: 8, font: 'Roboto' },]
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
                                {
                                    text: incharge_approve !== null ? incharge_approve === 1 ? "Apporved" :
                                        incharge_approve === 2 ? "Reject" : "Onhold" : "Not Updated", fontSize: 8, font: 'Roboto'
                                },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by Incharge\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: incharge_remarks !== null ? incharge_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: inchuser !== null ? inchuser.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'inchargesign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                {
                                    text: hod_approve !== null ? hod_approve === 1 ? "Approved" :
                                        hod_approve === 2 ? "Rejected" : "OnHold" : "Not Updated", fontSize: 8, font: 'Roboto'
                                },]

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [{ text: 'Remarks by HOD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: hod_remarks !== null ? hod_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: hoduser !== null ? hoduser.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
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
                            { text: hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                {
                                    text: ndrf_om_approv !== null ? ndrf_om_approv === 1 ? "Approved" :
                                        ndrf_om_approv === 2 ? "Reject" : "OnHold" : "Not Updated",
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
                                text: [{ text: 'Remarks by Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ndrf_om_remarks !== null ? ndrf_om_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: omuser !== null ? omuser.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'omsign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ndrfom_approv_date !== null ? format(new Date(ndrfom_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                {
                                    text: ndrf_smo_approv !== null ? ndrf_smo_approv === 1 ? "Approved" :
                                        ndrf_smo_approv === 2 ? "Reject" : "OnHold" : "Not Updated",
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
                                text: [{ text: 'Remarks by Senior Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ndrf_smo_remarks !== null ? ndrf_smo_remarks.toLowerCase() : "Not updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: smouser !== null ? smouser.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'smosign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ndrf_som_aprrov_date !== null ? format(new Date(ndrf_som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                {
                                    text: ndrf_cao_approve !== null ? ndrf_cao_approve === 1 ? "Approved" :
                                        ndrf_cao_approve === 2 ? "Reject" : "OnHold" : "Not Updated",
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
                                text: [{ text: 'Remarks by CAO/COO/MS\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ndrf_cao_approve_remarks !== null ? ndrf_cao_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: caouser !== null ? caouser.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
                            {
                                colSpan: 2, rowSpan: 2,
                                text: 'Signature',
                                style: [{ alignment: 'right' }],
                                alignment: 'center',
                                table: {
                                    headerRows: 1,
                                    body: [
                                        [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
                                        { image: 'caosign', alignment: 'center', fit: [50, 75], },

                                        ],

                                    ]
                                },
                                layout: 'noBorders'



                            },
                            ''
                        ],
                        [
                            { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ndrf_cao_approv_date !== null ? format(new Date(ndrf_cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
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
                                {

                                    text: ndrf_ed_approve !== null ? ndrf_ed_approve === 1 ? "Approved" :
                                        ndrf_ed_approve === 2 ? "Reject" : "OnHold" : "Not Updated",
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
                                text: [{ text: 'Remarks by ED/MD\n', bold: true, fontSize: 8, font: 'Roboto' },
                                { text: ndrf_ed_approve_remarks !== null ? ndrf_ed_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: eduser !== null ? eduser.toLowerCase() : "No Upadated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
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
                            { text: ndrf_ed_approve_date !== null ? format(new Date(ndrf_ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated", fontSize: 8, font: 'Roboto' },
                            '',
                            ''
                        ]
                    ]
                }
            }
        ],

        images: {
            snow: 'http://192.168.22.170/NAS/logo/logo.png',
            // pic: 'http://192.168.10.170/NAS/2119/signature/signature.jpg',
            inchargesign: inchargesign,
            hsign: hodsign,
            omsign: omsign,
            smosign: smosign,
            caosign: caosign,
            edsign: edsign,
        }
    }

    pdfMake.createPdf(doc).open();

}

