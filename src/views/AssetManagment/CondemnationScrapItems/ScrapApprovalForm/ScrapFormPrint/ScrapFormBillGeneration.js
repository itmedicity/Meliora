


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns';
import { snow } from "src/views/Constant/Static";

pdfMake.vfs = pdfFonts.vfs;

export const ScrapFormBillGeneration = (scrapDetails,formattedGroups,groupedItems) => {


    

  const {
    amount_collected,
    form_submit_date,
    gate_pass_generated_date,
    gate_pass_request_no,
    payment_mode,
    recipient_contact_number,
    recipient_name,
    recipient_vehicle_no,
    scrap_condemn_Form_no,
    scrap_condemn_Form_slno,
    total_rate,
    it_supplier_name,
    gate_pass_ackowledge,
    payemnt_acknowledge_by,
    payment_acknowledge_date,
    yard_names
  } = scrapDetails;



  var doc = {
    pageMargins: [40, 80, 40, 40],
    header: {
      margin: [20, 20, 20, 0],
      columns: [
        {
          image: 'snow',
          fit: [100, 100],
          margin: [0, 10, 0, 0],
        }
      ]
    },
    footer: (currentPage, pageCount) => ({
      margin: 10,
      alignment: 'center',
      text: `${currentPage} of ${pageCount}`,
      fontSize: 9
    }),

    content: [
      {
        text: 'SCRAP CONDEMNATION',
        alignment: 'center',
        bold: true,
        fontSize: 11,
        margin: [0, 3, 0, 0],
      },
               
      
      {
                style: 'tableExample',
                   margin: [0, 4, 0, 0,],
                table: {
                    widths: [100, 139, 100, 139],
                    body: [
                 
                        [
                        { text: 'Request No', fontSize: 10, font: 'Roboto',  margin: [1, 1, 1, 1] },
                        { text: `${scrap_condemn_Form_no}/${scrap_condemn_Form_slno}`, fontSize: 10, bold: true, font: 'Roboto' , margin: [1, 1, 1, 1]},
                        { text: 'Request Date', fontSize: 10, font: 'Roboto' , margin: [1, 1, 1, 1]},
                            {
                                                text: form_submit_date
                                                    ? format(new Date(form_submit_date), 'dd MMM yyyy, hh:mm a')
                                                    : 'Invalid Date',
                                                fontSize: 10,
                                                bold: true,
                                                font: 'Roboto',
                                                margin: [1, 1, 1, 1]
                             }

                        ],
                         [
                            {
                              
                                text: 'Scrap Location',                                                          
                                fontSize: 10
                            },                        
                             { text:yard_names, colSpan: 3,fontSize: 10, font: 'Roboto' },
                            '',
                            '',
                           

                        ],
                       
                    ]
                }
            },

             {
                margin: [0, 4, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [50, 229, 99, 100],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: 'Items Under Scrap',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 11,
                                margin: [1, 1, 1, 1]

                            },
                            '',
                            '',
                            ''
                           

                        ],

                        [{ text: 'Sl.No', fontSize: 10, bold: true,   margin: [1, 1, 1, 1] },
                        { text: 'Items', fontSize: 10, bold: true ,  margin: [1, 1, 1, 1]},
                        { text: 'Quantity', fontSize: 10, bold: true, margin: [1, 1, 1, 1] },
                        { text: 'Rate', fontSize: 10, bold: true,  margin: [1, 1, 1, 1] }
                   
                        ],
                          // .concat(reqDetails && reqDetails.map((val) => [
                        //     { text: val.item_slno, fontSize: 9 },
                        //     { text: val.item_desc, fontSize: 9 },
                        //     { text: val.item_brand, fontSize: 9 },
                        //     { text: val.uom_name, fontSize: 9 },
                        //     { text: val.item_qnty, fontSize: 9 },
                        //     { text: val.item_specification, fontSize: 9 },
                        //     { text: val.aprox_cost, fontSize: 9 },


                        // ]))
                        [
                            {
                                colSpan: 3,
                                text: 'Total Rate',                                                          
                                fontSize: 10
                            },
                            '',
                            '',
                            {
                            fontSize: 10,
                            font: 'Roboto',
                            text: `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(total_rate)} Rs.`
                            }

                           

                        ],

                    ]
                      
                        

                        
                }
            },
            {
                margin: [0, 4, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [100, 139, 100, 139],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: 'Vendor Details',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 11
                            },
                            '',
                            '',
                            '',
                            
                            

                        ],
                         [
                        { text: 'Vendor ', fontSize: 10, font: 'Roboto',          margin: [1, 1, 1, 1] },
                        { text: it_supplier_name, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1] },
                        { text: 'Recipient Name', fontSize: 10, font: 'Roboto',          margin: [1, 1, 1, 1] },
                        { text: recipient_name, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1] }
                        ],
                        [
                         { text: 'Contact Number', fontSize: 10, font: 'Roboto',          margin: [1, 1, 1, 1] },
                         {  text: recipient_contact_number, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1]}   ,            
                          { text: 'Vehicle Number', fontSize: 10, font: 'Roboto',          margin: [1, 1, 1, 1] },
                         {  text: recipient_vehicle_no, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1]}                        
                        ],

                    ]
                }
            },
            {
                margin: [0, 4, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [100, 139, 100, 139],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: 'Payment Details',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 11
                            },
                            '',
                            '',
                            '',
                            
                            

                        ],
                         [
                        { text: 'Mode of Payment', fontSize: 10, font: 'Roboto' ,          margin: [1, 1, 1, 1]},
                        { text: payment_mode, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1] },
                        { text: 'Payment Date', fontSize: 10, font: 'Roboto' ,          margin: [1, 1, 1, 1]},   
                        { text:  {
                        text: payment_acknowledge_date
                            ? format(new Date(payment_acknowledge_date), 'dd MMM yyyy, hh:mm a')
                            : ' ',
                        fontSize: 10,
                        bold: true,
                        font: 'Roboto'
                        }, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1] }
                        ],
                        [
                         {  text: 'Acknowledge', fontSize: 10, font: 'Roboto' ,          margin: [1, 1, 1, 1]},
                         {  text: payemnt_acknowledge_by, fontSize: 10, bold: true, font: 'Roboto',          margin: [1, 1, 1, 1]}   ,            
                          { text: 'Payed Amount', fontSize: 10, font: 'Roboto',          margin: [1, 1, 1, 1] },
                           {
                            fontSize: 10,
                            font: 'Roboto',          margin: [1, 1, 1, 1],
                            text: `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(amount_collected)} Rs.`
                            }
                                
                        ],
                        

                    ]
                }
            },
                        {
                margin: [0, 4, 0, 0,],
                style: 'tableExample',
                table: {
                    widths: [100, 139, 100, 139],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: 'Gate Pass Details',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 11
                            },
                            '',
                            '',
                            '',
                            
                            

                        ],
                         [
                        { text: 'Gate Pass No.', fontSize: 10, font: 'Roboto' },
                        {
                        text: `GP-${String(gate_pass_request_no).padStart(6, '0')}`,
                        fontSize: 10,
                        bold: true,
                        font: 'Roboto'
                        },

                        { text: 'Gate Pass Req Date', fontSize: 10, font: 'Roboto' },
                        {
                        text: gate_pass_generated_date
                            ? format(new Date(gate_pass_generated_date), 'dd MMM yyyy, hh:mm a')
                            : ' ',
                        fontSize: 10,
                        bold: true,
                        font: 'Roboto'
                        }

                        ],
                        [
                         { text: 'Acknowledge', fontSize: 10, font: 'Roboto' },
                         {  text: gate_pass_ackowledge, fontSize: 10, bold: true, font: 'Roboto'}   ,            
                          { text: 'Gate Pass', fontSize: 10, font: 'Roboto' },
                         {  text: 'sfdf', fontSize: 10, bold: true, font: 'Roboto'}                        
                        ],

                    ]
                }
            },
        


  



 
    ],

    images: {
      snow: snow,
    }
  };

  pdfMake.createPdf(doc).open();
};
