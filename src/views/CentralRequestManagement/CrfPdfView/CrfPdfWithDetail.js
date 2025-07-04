import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { edsign, mdsign, snow } from 'src/views/Constant/Static'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export const CrfPdfWithDetails = (val, reqDetails, dataa) => {
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
  // const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
  const mddate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'
  const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : 'Not Updated'

  var doc = {
    background: function (currentPage, pageSize) {
      return {
        table: {
          widths: [pageSize.width - 70],
          heights: [pageSize.height - 80],
          bold: true,
          body: [['']]
        },
        margin: 30
      }
    },
    pageMargins: [40, 130, 130, 40],
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
                // { text: reqno, alignment: 'center', fontSize: 9, bold: true, font: 'Roboto' }
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
            text: [
              {
                text: currentPage.toString() + ' of ' + pageCount
              }
            ],
            alignment: 'center'
          }
        ]
      }
    },

    content: [
      {
        fontSize: 10,
        margin: [10, 0, 0, 0],
        text: 'CENTRAL REQUEST FORM(CRF)',
        style: 'header',
        bold: true,
        alignment: 'center'
      },

      {
        style: 'tableExample',
        table: {
          widths: [50, 150, 110, 168],
          body: [
            [
              { text: 'Request No', fontSize: 8, font: 'Roboto' },
              { text: reqno, fontSize: 9, bold: true, font: 'Roboto' },
              { text: 'Date', fontSize: 8, font: 'Roboto' },
              { text: reqdate, fontSize: 8, bold: true, font: 'Roboto' }
            ],
            [
              { text: 'Department', fontSize: 8, font: 'Roboto' },
              {
                text: dept_name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                fontSize: 9,
                bold: true,
                font: 'Roboto'
              },
              { text: 'Department Section', fontSize: 8, font: 'Roboto' },
              {
                text: req_deptsec.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                fontSize: 8,
                bold: true,
                font: 'Roboto'
              }
              // { text: dept_name, fontSize: 9, bold: true, font: 'Roboto' },
              // { text: req_deptsec, fontSize: 8, bold: true, font: 'Roboto', textTransform: 'capitalize' }
            ],
            [
              { text: 'Category', fontSize: 9, font: 'Roboto' },
              {
                text:
                  category !== null ? category.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
                textTransform: 'capitalize',
                fontSize: 8,
                bold: true,
                font: 'Roboto'
              },
              { text: 'Location', fontSize: 9, font: 'Roboto' },
              {
                text:
                  location !== null ? location.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : 'Not Given',
                textTransform: 'capitalize',
                fontSize: 9,
                bold: true,
                font: 'Roboto'
              }
            ]
          ]
        }
      },
      {
        margin: [0, 3, 0, 0],
        style: 'tableExample',
        table: {
          widths: [25, 140, 50, 30, 40, 120, 45],
          body: [
            [
              {
                colSpan: 7,
                text: 'Materials Requested',
                alignment: 'center',
                fillColor: '#eeeeee',
                fontSize: 10
              },
              '',
              '',
              '',
              '',
              '',
              ''
            ],

            [
              { text: 'Sl.No', fontSize: 8, bold: true },
              { text: 'Item Description', fontSize: 8, bold: true },
              { text: 'Brand \n(if any)', fontSize: 8, bold: true },
              { text: 'Unit', fontSize: 8, bold: true },
              { text: 'Quantity', fontSize: 8, bold: true },
              { text: 'Specification', fontSize: 8, bold: true },
              { text: 'Approx.\ncost', fontSize: 8, bold: true }
            ]
          ].concat(
            reqDetails &&
              reqDetails.map(val => [
                { text: val.item_slno, fontSize: 8 },
                { text: val.item_desc, fontSize: 8 },
                { text: val.item_brand, fontSize: 8 },
                { text: val.uom_name, fontSize: 8 },
                { text: val.item_qnty, fontSize: 8 },
                { text: val.item_specification, fontSize: 8 },
                { text: val.aprox_cost, fontSize: 8 }
              ])
          )
        }
      },
      {
        margin: [0, 3, 0, 0],
        style: 'tableExample',
        table: {
          widths: [505, 650],
          body: [
            [
              {
                text: 'Actual Requirement:\n',
                fontSize: 8,
                bold: true,
                font: 'Roboto'
              }
            ],
            [
              {
                text: actual_requirement !== null ? actual_requirement.toLowerCase() : 'Not Provide',
                textTransform: 'capitalize',
                fontSize: 8,
                font: 'Roboto'
              }
            ],
            [
              {
                text: 'Justification for the need:\n',
                fontSize: 8,
                bold: true,
                font: 'Roboto'
              }
            ],
            [
              {
                text: needed !== null ? needed.toLowerCase() : 'Not Provide',
                textTransform: 'capitalize',
                fontSize: 8,
                font: 'Roboto'
              }
            ]
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 1 : 0
          }
        }
      },
      {
        margin: [0, 3, 0, 0],
        style: 'tableExample',
        table: {
          widths: [25, 140, 50, 30, 40, 120, 45],
          body: [
            [
              {
                colSpan: 7,
                text: 'Materials Approved',
                alignment: 'center',
                fillColor: '#eeeeee',
                fontSize: 10
              },
              '',
              '',
              '',
              '',
              '',
              ''
            ],
            [
              { text: 'Sl.No', fontSize: 8, bold: true },
              { text: 'Item Description', fontSize: 8, bold: true },
              { text: 'Brand \n(if any)', fontSize: 8, bold: true },
              { text: 'Unit', fontSize: 8, bold: true },
              { text: 'Quantity', fontSize: 8, bold: true },
              { text: 'Specification', fontSize: 8, bold: true },
              { text: 'Approx.\ncost', fontSize: 8, bold: true }
            ]
          ].concat(
            dataa &&
              dataa.map((val, index) => [
                { text: index + 1, fontSize: 8 },
                { text: val.approve_item_desc, fontSize: 8 },
                { text: val.approve_item_brand, fontSize: 8 },
                { text: val.apprv_uom, fontSize: 8 },
                { text: val.item_qnty_approved, fontSize: 8 },
                { text: val.approve_item_specification, fontSize: 8 },
                { text: val.approve_aprox_cost, fontSize: 8 }
              ])
          )
        }
      },
      {
        margin: [0, 5, 0, 0],
        style: 'tableExample',
        table: {
          widths: [110, 175, 174, 20],
          body: [
            [
              {
                colSpan: 4,
                text: [
                  { text: 'Medical Director Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                  {
                    text:
                      md_approve !== null
                        ? '            ' + md.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
                        : ' Not Updated',
                    fontSize: 8,
                    font: 'Roboto'
                  }
                ]
              },
              '',
              '',
              ''
            ],

            [
              { text: 'Remarks', bold: true, fontSize: 8, font: 'Roboto' },
              { text: md_approve_remarks, fontSize: 8, font: 'Roboto' },
              {
                colSpan: 2,
                rowSpan: 3,
                text: 'Signature',
                style: [{ alignment: 'right' }],
                alignment: 'center',
                table: {
                  headerRows: 1,
                  body: [
                    [
                      { text: 'Signature', fontSize: 8, font: 'Roboto' },
                      { image: 'mdsign', alignment: 'center', fit: [50, 75] }
                    ]
                  ]
                },
                layout: 'noBorders'
              },
              ''
            ],
            [
              { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
              {
                text: md_user.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                textTransform: 'capitalize',
                fontSize: 8,
                font: 'Roboto'
              },
              '',
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
        margin: [0, 5, 0, 0],
        style: 'tableExample',
        table: {
          widths: [110, 175, 174, 20],
          body: [
            [
              {
                colSpan: 4,
                text: [
                  { text: 'Executive Director Status: ', bold: true, fontSize: 8, font: 'Roboto' },
                  {
                    text:
                      ed_approve !== null
                        ? '          ' + ed.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
                        : 'Not Updated',
                    fontSize: 8,
                    font: 'Roboto'
                  }
                ]
              },
              '',
              '',
              ''
            ],
            [
              { text: 'Remarks', bold: true, fontSize: 8, font: 'Roboto' },
              { text: ed_approve_remarks, fontSize: 8, font: 'Roboto' },

              {
                colSpan: 2,
                rowSpan: 3,
                text: 'Signature',
                style: [{ alignment: 'right' }],
                alignment: 'center',
                table: {
                  headerRows: 1,
                  body: [
                    [
                      { text: 'Signature', fontSize: 8, font: 'Roboto' },
                      { image: 'edsign', alignment: 'center', fit: [50, 75] }
                    ]
                  ]
                },
                layout: 'noBorders'
              },
              ''
            ],
            [
              { text: 'User', bold: true, fontSize: 8, font: 'Roboto' },
              {
                text: ed_user.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
                textTransform: 'capitalize',
                fontSize: 8,
                font: 'Roboto'
              },
              '',
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
      snow: snow,
      mdsign: mdsign,
      edsign: edsign
    }
  }

  pdfMake.createPdf(doc).open()
}
