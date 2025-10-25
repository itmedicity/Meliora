import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import edsign from '../../../assets/images/ed/signature.jpg'
import snow from '../../../assets/images/logo.png'
import mdsign from '../../../assets/images/md/signature.jpg'

pdfMake.vfs = pdfFonts.vfs

// helper: converts imported image URLs to Base64 for pdfMake
const toDataURL = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.onerror = reject
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

export const CrfPdfWithDetails = async (val, reqDetails, dataa) => {
  // convert all images to base64 first
  const [base64Snow, base64MdSign, base64EdSign] = await Promise.all([
    toDataURL(snow),
    toDataURL(mdsign),
    toDataURL(edsign)
  ])

  const {
    dept_name,
    req_deptsec,
    req_slno,
    req_date,
    actual_requirement,
    needed,
    category,
    location,
    md_approve,
    md,
    md_approve_remarks,
    md_approve_date,
    md_user,
    ed_approve,
    ed,
    ed_approve_remarks,
    ed_approve_date,
    ed_user,
    company_name
  } = val

  const reqno = `CRF/${company_name}/` + req_slno.toString().padStart(6, '0')
  const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'
  const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'
  const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'

  var doc = {
    background: function () {
      return [
        {
          canvas: [
            { type: 'rect', x: 0, y: 0, w: 0, h: 0, color: 'white', lineWidth: 0 }
          ]
        }
      ]
    },

    pageMargins: [30, 130, 130, 40],
    header: {
      margin: 15,
      columns: [
        {
          table: {
            widths: ['50%', 'auto'],
            heights: ['auto'],
            body: [
              [
                {
                  image: 'snow',
                  fit: [150, 150],
                  margin: [25, 15, 0, 0]
                }
              ]
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
            text: currentPage.toString() + ' of ' + pageCount,
            alignment: 'center'
          }
        ]
      }
    },

    content: [
      {
        fontSize: 12,
        margin: [180, 0, 0, 0],
        text: 'CENTRAL REQUEST FORM(CRF)',
        bold: true
      },
      {
        style: 'tableExample',
        margin: [0, 10, 0, 0],
        table: {
          widths: [70, 160, 100, 170],
          body: [
            [
              { text: 'Request No', fontSize: 10 },
              { text: reqno, fontSize: 11, bold: true },
              { text: 'Date', fontSize: 10 },
              { text: reqdate, fontSize: 11, bold: true }
            ],
            [
              { text: 'Department', fontSize: 10 },
              {
                text: dept_name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                fontSize: 11,
                bold: true
              },
              { text: 'Department Section', fontSize: 10 },
              {
                text: req_deptsec.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                fontSize: 11,
                bold: true
              }
            ],
            [
              { text: 'Category', fontSize: 10 },
              {
                text:
                  category !== null ? category.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
                fontSize: 11,
                bold: true
              },
              { text: 'Location', fontSize: 10 },
              {
                text:
                  location !== null ? location.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
                fontSize: 11,
                bold: true
              }
            ]
          ]
        }
      },
      {
        margin: [0, 10, 0, 0],
        style: 'tableExample',
        table: {
          widths: [25, 158, 50, 30, 40, 125, 45],
          body: [
            [
              { colSpan: 7, text: 'Materials Requested', alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
              '', '', '', '', '', ''
            ],
            [
              { text: 'Sl.No', fontSize: 10, bold: true },
              { text: 'Item Description', fontSize: 10, bold: true },
              { text: 'Brand \n(if any)', fontSize: 10, bold: true },
              { text: 'Unit', fontSize: 10, bold: true },
              { text: 'Quantity', fontSize: 10, bold: true },
              { text: 'Specification', fontSize: 10, bold: true },
              { text: 'Approx.\ncost', fontSize: 10, bold: true }
            ]
          ].concat(
            reqDetails?.map(val => [
              { text: val.item_slno, fontSize: 11 },
              { text: val.item_desc, fontSize: 11 },
              { text: val.item_brand, fontSize: 11 },
              { text: val.uom_name, fontSize: 11 },
              { text: val.item_qnty, fontSize: 11 },
              { text: val.item_specification, fontSize: 11 },
              { text: val.aprox_cost, fontSize: 11 }
            ])
          )
        }
      },
      {
        margin: [0, 10, 0, 0],
        style: 'tableExample',
        table: {
          widths: [527, 650],
          body: [
            [{ text: 'Actual Requirement:\n', fontSize: 10, bold: true }],
            [{ text: actual_requirement || 'Not Provided', fontSize: 10 }],
            [{ text: 'Justification for the need:\n', fontSize: 10, bold: true }],
            [{ text: needed || 'Not Provided', fontSize: 10 }]
          ]
        },
        layout: {
          hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 1 : 0)
        }
      },
      {
        margin: [0, 10, 0, 0],
        style: 'tableExample',
        table: {
          widths: [25, 158, 50, 30, 40, 125, 45],
          body: [
            [
              { colSpan: 7, text: 'Materials Approved', alignment: 'center', fillColor: '#eeeeee', fontSize: 10 },
              '', '', '', '', '', ''
            ],
            [
              { text: 'Sl.No', fontSize: 10, bold: true },
              { text: 'Item Description', fontSize: 10, bold: true },
              { text: 'Brand \n(if any)', fontSize: 10, bold: true },
              { text: 'Unit', fontSize: 10, bold: true },
              { text: 'Quantity', fontSize: 10, bold: true },
              { text: 'Specification', fontSize: 10, bold: true },
              { text: 'Approx.\ncost', fontSize: 10, bold: true }
            ]
          ].concat(
            dataa?.map((val, index) => [
              { text: index + 1, fontSize: 11 },
              { text: val.approve_item_desc, fontSize: 11 },
              { text: val.approve_item_brand, fontSize: 11 },
              { text: val.apprv_uom, fontSize: 11 },
              { text: val.item_qnty_approved, fontSize: 11 },
              { text: val.approve_item_specification, fontSize: 11 },
              { text: val.approve_aprox_cost, fontSize: 11 }
            ])
          )
        }
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: [110, 185, 184, 20],
          body: [
            [
              {
                colSpan: 4,
                text: [
                  { text: 'Medical Director Status: ', bold: true, fontSize: 10 },
                  { text: md_approve ? ' ' + md : 'Not Updated', fontSize: 11 }
                ]
              },
              '', '', ''
            ],
            [
              { text: 'Remarks', bold: true, fontSize: 10 },
              { text: md_approve_remarks, fontSize: 11 },
              {
                colSpan: 2,
                rowSpan: 3,
                alignment: 'center',
                table: {
                  headerRows: 1,
                  body: [
                    [{ text: 'Signature', fontSize: 9 },
                    { image: 'mdsign', alignment: 'center', fit: [50, 75] }]
                  ]
                },
                layout: 'noBorders'
              },
              ''
            ],
            [{ text: 'User', bold: true, fontSize: 10 }, { text: md_user, fontSize: 11 }, '', ''],
            [{ text: 'Date', bold: true, fontSize: 10 }, { text: mddate, fontSize: 11 }, '', '']
          ]
        }
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: [110, 185, 184, 20],
          body: [
            [
              {
                colSpan: 4,
                text: [
                  { text: 'Executive Director Status: ', bold: true, fontSize: 10 },
                  { text: ed_approve ? ' ' + ed : 'Not Updated', fontSize: 11 }
                ]
              },
              '', '', ''
            ],
            [
              { text: 'Remarks', bold: true, fontSize: 10 },
              { text: ed_approve_remarks, fontSize: 11 },
              {
                colSpan: 2,
                rowSpan: 3,
                alignment: 'center',
                table: {
                  headerRows: 1,
                  body: [
                    [{ text: 'Signature', fontSize: 9 },
                    { image: 'edsign', alignment: 'center', fit: [50, 75] }]
                  ]
                },
                layout: 'noBorders'
              },
              ''
            ],
            [{ text: 'User', bold: true, fontSize: 10 }, { text: ed_user, fontSize: 11 }, '', ''],
            [{ text: 'Date', bold: true, fontSize: 10 }, { text: eddate, fontSize: 11 }, '', '']
          ]
        }
      }
    ],

    images: {
      snow: base64Snow,
      mdsign: base64MdSign,
      edsign: base64EdSign
    }
  }

  pdfMake.createPdf(doc).open()
}

// import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// import { format } from 'date-fns'
// import edsign from '../../../assets/images/ed/signature.jpg'
// import snow from '../../../assets/images/logo.png'
// import mdsign from '../../../assets/images/md/signature.jpg'

// // pdfMake.vfs = pdfFonts.pdfMake.vfs
// pdfMake.vfs = pdfFonts.vfs

// export const CrfPdfWithDetails = (val, reqDetails, dataa) => {
//   const {
//     dept_name,
//     req_deptsec,
//     req_slno,
//     req_date,
//     actual_requirement,
//     needed,
//     category,
//     location,
//     md_approve,
//     md,
//     md_approve_remarks,
//     md_approve_date,
//     md_user,
//     ed_approve,
//     ed,
//     ed_approve_remarks,
//     ed_approve_date,
//     ed_user,
//     company_name
//   } = val

//   const reqno = `CRF/${company_name}/` + req_slno.toString().padStart(6, '0')
//   const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'
//   // const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
//   const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'
//   const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'

//   var doc = {
//     background: function () {
//       return [
//         {
//           canvas: [
//             {
//               type: 'rect',
//               x: 0,
//               y: 0,
//               w: 0, // 0 width removes rectangle
//               h: 0,
//               color: 'white',
//               lineWidth: 0
//             }
//           ]
//         }
//       ];
//     },

//     pageMargins: [30, 130, 130, 40],
//     header: {
//       margin: 15,
//       columns: [
//         {
//           table: {
//             widths: ['50%', 'auto'],
//             heights: ['auto'],
//             body: [
//               [
//                 {
//                   image: 'snow',
//                   fit: [150, 150],

//                   margin: [25, 15, 0, 0]
//                 }
//                 // { text: reqno, alignment: 'center', fontSize: 9, bold: true, font: 'Roboto' }
//               ]
//             ]
//           },
//           layout: 'noBorders'
//         }
//       ]
//     },
//     footer: function (currentPage, pageCount) {
//       return {
//         margin: 5,
//         columns: [
//           {
//             fontSize: 9,
//             text: [
//               {
//                 text: currentPage.toString() + ' of ' + pageCount
//               }
//             ],
//             alignment: 'center'
//           }
//         ]
//       }
//     },

//     content: [
//       {
//         fontSize: 12,
//         margin: [180, 0, 0, 0],//for centering
//         text: 'CENTRAL REQUEST FORM(CRF)',
//         style: 'header',
//         bold: true,
//         // alignment: 'center'
//       },

//       {
//         style: 'tableExample',
//         margin: [0, 10, 0, 0],
//         table: {
//           widths: [70, 160, 100, 170],
//           body: [
//             [
//               { text: 'Request No', fontSize: 10, font: 'Roboto' },
//               { text: reqno, fontSize: 11, bold: true, font: 'Roboto' },
//               { text: 'Date', fontSize: 10, font: 'Roboto' },
//               { text: reqdate, fontSize: 11, bold: true, font: 'Roboto' }
//             ],
//             [
//               { text: 'Department', fontSize: 10, font: 'Roboto' },
//               {
//                 text: dept_name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
//                 fontSize: 11,
//                 bold: true,
//                 font: 'Roboto'
//               },
//               { text: 'Department Section', fontSize: 10, font: 'Roboto' },
//               {
//                 text: req_deptsec.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
//                 fontSize: 11,
//                 bold: true,
//                 font: 'Roboto'
//               }
//               // { text: dept_name, fontSize: 9, bold: true, font: 'Roboto' },
//               // { text: req_deptsec, fontSize: 8, bold: true, font: 'Roboto', textTransform: 'capitalize' }
//             ],
//             [
//               { text: 'Category', fontSize: 10, font: 'Roboto' },
//               {
//                 text:
//                   category !== null ? category.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
//                 textTransform: 'capitalize',
//                 fontSize: 11,
//                 bold: true,
//                 font: 'Roboto'
//               },
//               { text: 'Location', fontSize: 10, font: 'Roboto' },
//               {
//                 text:
//                   location !== null ? location.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
//                 textTransform: 'capitalize',
//                 fontSize: 11,
//                 bold: true,
//                 font: 'Roboto'
//               }
//             ]
//           ]
//         }
//       },
//       {
//         margin: [0, 10, 0, 0],
//         style: 'tableExample',
//         table: {
//           widths: [25, 158, 50, 30, 40, 125, 45],
//           body: [
//             [
//               {
//                 colSpan: 7,
//                 text: 'Materials Requested',
//                 alignment: 'center',
//                 fillColor: '#eeeeee',
//                 fontSize: 10
//               },
//               '',
//               '',
//               '',
//               '',
//               '',
//               ''
//             ],

//             [
//               { text: 'Sl.No', fontSize: 10, bold: true },
//               { text: 'Item Description', fontSize: 10, bold: true },
//               { text: 'Brand \n(if any)', fontSize: 10, bold: true },
//               { text: 'Unit', fontSize: 10, bold: true },
//               { text: 'Quantity', fontSize: 10, bold: true },
//               { text: 'Specification', fontSize: 10, bold: true },
//               { text: 'Approx.\ncost', fontSize: 10, bold: true }
//             ]
//           ].concat(
//             reqDetails &&
//             reqDetails.map(val => [
//               { text: val.item_slno, fontSize: 11 },
//               { text: val.item_desc, fontSize: 11 },
//               { text: val.item_brand, fontSize: 11 },
//               { text: val.uom_name, fontSize: 11 },
//               { text: val.item_qnty, fontSize: 11 },
//               { text: val.item_specification, fontSize: 11 },
//               { text: val.aprox_cost, fontSize: 11 }
//             ])
//           )
//         }
//       },
//       {
//         margin: [0, 10, 0, 0],
//         style: 'tableExample',
//         table: {
//           widths: [527, 650],
//           body: [
//             [
//               {
//                 text: 'Actual Requirement:\n',
//                 fontSize: 10,
//                 bold: true,
//                 font: 'Roboto'
//               }
//             ],
//             [
//               {
//                 text: actual_requirement !== null ? actual_requirement.toLowerCase() : 'Not Provide',
//                 textTransform: 'capitalize',
//                 fontSize: 10,
//                 font: 'Roboto'
//               }
//             ],
//             [
//               {
//                 text: 'Justification for the need:\n',
//                 fontSize: 10,
//                 bold: true,
//                 font: 'Roboto'
//               }
//             ],
//             [
//               {
//                 text: needed !== null ? needed.toLowerCase() : 'Not Provide',
//                 textTransform: 'capitalize',
//                 fontSize: 10,
//                 font: 'Roboto'
//               }
//             ]
//           ]
//         },
//         layout: {
//           hLineWidth: function (i, node) {
//             return i === 0 || i === node.table.body.length ? 1 : 0
//           }
//         }
//       },
//       {
//         margin: [0, 10, 0, 0],
//         style: 'tableExample',
//         table: {
//           widths: [25, 158, 50, 30, 40, 125, 45],
//           body: [
//             [
//               {
//                 colSpan: 7,
//                 text: 'Materials Approved',
//                 alignment: 'center',
//                 fillColor: '#eeeeee',
//                 fontSize: 10
//               },
//               '',
//               '',
//               '',
//               '',
//               '',
//               ''
//             ],
//             [
//               { text: 'Sl.No', fontSize: 10, bold: true },
//               { text: 'Item Description', fontSize: 10, bold: true },
//               { text: 'Brand \n(if any)', fontSize: 10, bold: true },
//               { text: 'Unit', fontSize: 10, bold: true },
//               { text: 'Quantity', fontSize: 10, bold: true },
//               { text: 'Specification', fontSize: 10, bold: true },
//               { text: 'Approx.\ncost', fontSize: 10, bold: true }
//             ]
//           ].concat(
//             dataa &&
//             dataa.map((val, index) => [
//               { text: index + 1, fontSize: 11 },
//               { text: val.approve_item_desc, fontSize: 11 },
//               { text: val.approve_item_brand, fontSize: 11 },
//               { text: val.apprv_uom, fontSize: 11 },
//               { text: val.item_qnty_approved, fontSize: 11 },
//               { text: val.approve_item_specification, fontSize: 11 },
//               { text: val.approve_aprox_cost, fontSize: 11 }
//             ])
//           )
//         }
//       },
//       {
//         margin: [0, 10, 0, 0],
//         style: 'tableExample',
//         table: {
//           widths: [110, 185, 184, 20],
//           body: [
//             [
//               {
//                 colSpan: 4,
//                 text: [
//                   { text: 'Medical Director Status: ', bold: true, fontSize: 10, font: 'Roboto' },
//                   {
//                     text:
//                       md_approve !== null
//                         ? '            ' + md.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
//                         : ' Not Updated',
//                     fontSize: 11,
//                     font: 'Roboto'
//                   }
//                 ]
//               },
//               '',
//               '',
//               ''
//             ],

//             [
//               { text: 'Remarks', bold: true, fontSize: 10, font: 'Roboto' },
//               { text: md_approve_remarks, fontSize: 11, font: 'Roboto' },
//               {
//                 colSpan: 2,
//                 rowSpan: 3,
//                 text: 'Signature',
//                 style: [{ alignment: 'right' }],
//                 alignment: 'center',
//                 table: {
//                   headerRows: 1,
//                   body: [
//                     [
//                       { text: 'Signature', fontSize: 9, font: 'Roboto' },
//                       { image: 'mdsign', alignment: 'center', fit: [50, 75] }
//                     ]
//                   ]
//                 },
//                 layout: 'noBorders'
//               },
//               ''
//             ],
//             [
//               { text: 'User', bold: true, fontSize: 10, font: 'Roboto' },
//               {
//                 text: md_user.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
//                 textTransform: 'capitalize',
//                 fontSize: 11,
//                 font: 'Roboto'
//               },
//               '',
//               ''
//             ],
//             [
//               { text: 'Date', bold: true, fontSize: 10, font: 'Roboto' },
//               { text: mddate, fontSize: 11, font: 'Roboto' },
//               '',
//               ''
//             ]
//           ]
//         }
//       },
//       {
//         margin: [0, 10, 0, 0],
//         style: 'tableExample',
//         table: {
//           widths: [110, 185, 184, 20],
//           body: [
//             [
//               {
//                 colSpan: 4,
//                 text: [
//                   { text: 'Executive Director Status: ', bold: true, fontSize: 10, font: 'Roboto' },
//                   {
//                     text:
//                       ed_approve !== null
//                         ? '          ' + ed.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
//                         : 'Not Updated',
//                     fontSize: 11,
//                     font: 'Roboto'
//                   }
//                 ]
//               },
//               '',
//               '',
//               ''
//             ],
//             [
//               { text: 'Remarks', bold: true, fontSize: 10, font: 'Roboto' },
//               { text: ed_approve_remarks, fontSize: 11, font: 'Roboto' },

//               {
//                 colSpan: 2,
//                 rowSpan: 3,
//                 text: 'Signature',
//                 style: [{ alignment: 'right' }],
//                 alignment: 'center',
//                 table: {
//                   headerRows: 1,
//                   body: [
//                     [
//                       { text: 'Signature', fontSize: 9, font: 'Roboto' },
//                       { image: 'edsign', alignment: 'center', fit: [50, 75] }
//                     ]
//                   ]
//                 },
//                 layout: 'noBorders'
//               },
//               ''
//             ],
//             [
//               { text: 'User', bold: true, fontSize: 10, font: 'Roboto' },
//               {
//                 text: ed_user.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
//                 textTransform: 'capitalize',
//                 fontSize: 11,
//                 font: 'Roboto'
//               },
//               '',
//               ''
//             ],
//             [
//               { text: 'Date', bold: true, fontSize: 10, font: 'Roboto' },
//               { text: eddate, fontSize: 11, font: 'Roboto' },
//               '',
//               ''
//             ]
//           ]
//         }
//       }
//     ],

//     images: {
//       snow: snow,
//       mdsign: mdsign,
//       edsign: edsign
//     }
//   }

//   pdfMake.createPdf(doc).open()
// }



