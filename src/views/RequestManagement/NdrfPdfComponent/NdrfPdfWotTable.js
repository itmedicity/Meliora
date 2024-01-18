import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const ndrfpdfdownloadwithouttable = (data, inchargesign, hodsign, omsign, smosign, caosign, edsign) => {

    const { req_slno, reqcreate, ndrf_mast_slno, ndrfcreate, actual_requirement, needed, location, dept_name,
        total_approx_cost, remarks, expected_date, req_user, category,
        // incharge_approve,
        // incharge, incharge_remark, incharge_apprv_date, incharge_user,
        // hod_approve, hod, hod_remarks, hod_detial_analysis, hod_approve_date,
        // hod_user, dms_req, dms, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        // ms_approve_req, ms_approve, ms, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_user,
        // manag_operation_approv, om, manag_operation_remarks, om_detial_analysis, om_approv_date, manag_operation_user,
        // senior_manage_approv, smo, senior_manage_remarks, smo_detial_analysis, som_aprrov_date, senior_manage_user,
        // cao_approve, cao, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
        // md_approve, md, md_approve_remarks, md_detial_analysis, md_approve_date, ed_approve, ed,
        // ed_approve_remarks, ed_detial_analysis, md_user, ed_user, ed_approve_date, ed_approve_req,
        // md_approve_req, ndrf_om_remarks, ndrf_om_approv, ndrfom_approv_date, ndrf_om_user, ndrfOM,
        // ndrf_smo_approv, ndrfSMO, ndrf_smo_remarks, ndrf_som_aprrov_date, ndrf_smo_user, ndrf_cao_approve,
        // ndrf_cao_approve_remarks, ndrf_cao_approv_date, ndrfCOO, ndrf_cao_user,
        ndrf_md_approve, ndrf_md_approve_remarks, ndrfMD, ndrf_md_approve_date, ndrf_md_user,
        ndrf_ed_approve, ndrfED, ndrf_ed_approve_remarks, ndrf_ed_approve_date, ndrf_ed_user,
    } = data[0]
    const reqdate = reqcreate !== null ? format(new Date(reqcreate), 'dd-MM-yyyy') : "Not Updated"
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    // const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy') : "Not Updated"
    // const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy') : "Not Updated"
    // const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy') : "Not Updated"
    // const msApprovdate = ms_approve_date !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy') : "Not Updated"
    // const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

    const nrdfCreate = ndrfcreate !== null ? format(new Date(ndrfcreate), 'dd-MM-yyy') : "Not Updated"
    // const ndrfOmdate = ndrfom_approv_date !== null ? format(new Date(ndrfom_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const ndrfSmodate = ndrf_som_aprrov_date !== null ? format(new Date(ndrf_som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    // const ndrfCoodate = ndrf_cao_approv_date !== null ? format(new Date(ndrf_cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfEddate = ndrf_ed_approve_date !== null ? format(new Date(ndrf_ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const ndrfMddate = ndrf_md_approve_date !== null ? format(new Date(ndrf_md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"

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
                        { text: dept_name, fontSize: 8, font: 'Roboto' },
                        { text: 'Category', fontSize: 8, font: 'Roboto' },
                        { text: category, fontSize: 8, font: 'Roboto' }],
                        [{ text: 'Request No', fontSize: 8, font: 'Roboto' },
                        { text: req_slno, fontSize: 8, font: 'Roboto' },
                        { text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: reqdate, fontSize: 8, font: 'Roboto' },],
                        [{ text: 'NDRF No', fontSize: 8, font: 'Roboto' },
                        { text: ndrf_mast_slno, fontSize: 8, font: 'Roboto' },
                        { text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: nrdfCreate, fontSize: 8, font: 'Roboto' }
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
                                text: actual_requirement, textTransform: "capitalize", fontSize: 8, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: 'Justification for the need:\n', fontSize: 8, bold: true, font: 'Roboto',
                            },
                        ],
                        [
                            {
                                text: needed, textTransform: "capitalize", fontSize: 8, font: 'Roboto',
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
                                text: remarks !== null || remarks === '' ? remarks.toLowerCase() : "Not Given", textTransform: "capitalize", fontSize: 8, font: 'Roboto',
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
                                { text: expdate, fontSize: 8, font: 'Roboto' },]
                            }

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
            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Incharge Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: incharge_approve !== null ? incharge : "Not Updated", fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by Incharge\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: incharge_remark !== null ? incharge_remark.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: incharge_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'inchargesign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: inchargeApprovdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },

            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'HOD Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: hod_approve !== null ? hod : "Not Updated", fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by HOD\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: hod_remarks, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by HOD\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: hod_detial_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: hod_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'hsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: hodApprovdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },

            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'DMS Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: dms_req === 1 ? dms_approve !== null ? dms : "Not Updated" : "Not Require", fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],

            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by DMS\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: dms_remarks, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by DMS\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: dms_detail_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: dms_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'hsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: dmsApprovdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },

            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'MS Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: ms_approve_req === 1 ? ms_approve !== null ? ms : "Not Updated" : "Not Require", fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by MS\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ms_approve_remark, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by MS\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ms_detail_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ms_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'hsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: msApprovdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },



            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Manager Operation Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: manag_operation_approv !== null ? om : "Not Updated",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: manag_operation_remarks, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: om_detial_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: manag_operation_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'omsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: omdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },
            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Senior Manager Operations Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: senior_manage_approv !== null ? smo : "Not Updated",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by Senior Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: senior_manage_remarks, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by Senior Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: smo_detial_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: senior_manage_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'smosign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: smodate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },
            // {
            //     margin: [0, 3, 0, 0,],
            //     style: 'tableExample',
            //     // pageBreak: 'after',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'CAO/COO: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {
            //                         text: cao_approve !== null ? cao : "Not Updated", fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by CAO/COO\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: cao_approve_remarks, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by CAO/COO\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ceo_detial_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: cao_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'caosign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: caodate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },

            // {
            //     margin: [0, 5, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'MD Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {

            //                         text: md_approve_req === 1 ? md_approve !== null ? md : "Not Updated" : "Not Required",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by MD\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: md_approve_remarks !== null ? md_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by MD\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: md_detial_analysis !== null ? md_detial_analysis.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: md_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'edsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: mddate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },

            // {
            //     margin: [0, 5, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'ED Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {

            //                         text: ed_approve_req === 1 ? ed_approve !== null ? ed : "Not Updated" : "Not Required",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by ED\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ed_approve_remarks !== null ? ed_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Justification by ED\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ed_detial_analysis, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ed_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'edsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: eddate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },
            // {
            //     margin: [0, 5, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'NDRF Manager Operation Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {

            //                         text: ndrf_om_approv !== null ? ndrfOM : "Not Updated",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by Manager Operation\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ndrf_om_remarks !== null ? ed_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrf_om_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'edsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrfOmdate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // }
            // ,
            // {
            //     margin: [0, 5, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'NDRF Senior Manager Operations Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {

            //                         text: ndrf_smo_approv !== null ? ndrfSMO : "Not Updated",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by Senior Manager Operations \n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ndrf_smo_remarks !== null ? ndrf_smo_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrf_smo_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'edsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrfSmodate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },
            // {
            //     margin: [0, 5, 0, 0,],
            //     style: 'tableExample',
            //     table: {
            //         widths: [110, 175, 174, 20],
            //         body: [
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'NDRF CAO/COO Status: ', bold: true, fontSize: 8, font: 'Roboto' },
            //                     {

            //                         text: ndrf_cao_approve !== null ? ndrfCOO : "Not Updated",
            //                         fontSize: 8, font: 'Roboto'
            //                     },]

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 {
            //                     colSpan: 4,
            //                     text: [{ text: 'Remarks by  CAO/COO\n', bold: true, fontSize: 8, font: 'Roboto' },
            //                     { text: ndrf_cao_approve_remarks !== null ? ndrf_cao_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

            //                 },
            //                 '',
            //                 '',
            //                 ''
            //             ],
            //             [
            //                 { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrf_cao_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
            //                 {
            //                     colSpan: 2, rowSpan: 2,
            //                     text: 'Signature',
            //                     style: [{ alignment: 'right' }],
            //                     alignment: 'center',
            //                     table: {
            //                         headerRows: 1,
            //                         body: [
            //                             [{ text: 'Signature', fontSize: 8, font: 'Roboto' },
            //                             { image: 'edsign', alignment: 'center', fit: [50, 75], },

            //                             ],

            //                         ]
            //                     },
            //                     layout: 'noBorders'



            //                 },
            //                 ''
            //             ],
            //             [
            //                 { text: 'Date', bold: true, fontSize: 8, font: 'Roboto' },
            //                 { text: ndrfCoodate, fontSize: 8, font: 'Roboto' },
            //                 '',
            //                 ''
            //             ]
            //         ]
            //     }
            // },
            {
                margin: [0, 5, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [110, 175, 174, 20],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: [{ text: ' NDRF MD Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                {

                                    text: ndrf_md_approve !== null ? ndrfMD : "Not Updated",
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
                                { text: ndrf_md_approve_remarks !== null ? ndrf_md_approve_remarks.toLowerCase() : "Not Updated", textTransform: "capitalize", fontSize: 8, font: 'Roboto' },],

                            },
                            '',
                            '',
                            ''
                        ],
                        [
                            { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
                            { text: ndrf_md_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
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
                            { text: ndrfEddate, fontSize: 8, font: 'Roboto' },
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
                                text: [{ text: ' NDRF ED Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                                {

                                    text: ndrf_ed_approve !== null ? ndrfED : "Not Updated",
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
                            { text: ndrf_ed_user, textTransform: "capitalize", fontSize: 8, font: 'Roboto' },
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
                            { text: ndrfMddate, fontSize: 8, font: 'Roboto' },
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