import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { logoBase64 as snow } from './LogoBase64'
import moment from 'moment'

pdfMake.vfs = pdfFonts && pdfFonts.vfs ? pdfFonts.vfs : pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : null;

export const generateTokenPdf = (row, loginDetails) => {
    const repName = loginDetails && loginDetails.length > 0 ? (loginDetails[0].name || loginDetails[0].rep_name || loginDetails[0].medicalrep_name || loginDetails[0].emp_name || 'N/A') : 'N/A';
    const companyName = loginDetails && loginDetails.length > 0 ? (loginDetails[0].companyname || loginDetails[0].company_name || 'N/A') : 'N/A';
    const bookingDate = moment().format('DD MMM YYYY, hh:mm A');

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 50, 40, 50],
        content: [
            // Header Section
            {
                columns: [
                    {
                        image: 'snow',
                        width: 140,
                        alignment: 'left'
                    },
                    {
                        stack: [
                            { text: 'TRAVANCORE MEDICAL COLLEGE HOSPITAL', style: 'hospitalName' },
                            { text: 'N H Bypass Mylapore, Thattamala, P. O\nKollam, Kerala 691020', style: 'hospitalAddress' },
                            { text: 'Phone: 0474 272 9393 | Web: www.tmc.ac.in', style: 'hospitalContact' }
                        ],
                        alignment: 'right',
                        margin: [0, 8, 0, 0]
                    }
                ]
            },
            // Sleek Divider
            {
                canvas: [{ type: 'line', x1: 0, y1: 20, x2: 515, y2: 20, lineWidth: 1.5, lineColor: '#1F2937' }],
                margin: [0, 0, 0, 30]
            },
            // Title Box
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'MEDICAL REPRESENTATIVE VISITING PASS',
                                style: 'passTitle',
                                alignment: 'center',
                                fillColor: '#2563EB', // Professional Blue
                                color: '#FFFFFF',
                                margin: [0, 10, 0, 10],
                                border: [false, false, false, false]
                            }
                        ]
                    ]
                },
                margin: [0, 0, 0, 30]
            },
            // Main Details and QR Code
            {
                columns: [
                    // Details Table
                    {
                        width: '*',
                        table: {
                            widths: [130, '*'],
                            body: [
                                [
                                    { text: 'Visitor Name', style: 'label' },
                                    { text: repName, style: 'value' }
                                ],
                                [
                                    { text: 'Company', style: 'label' },
                                    { text: companyName, style: 'value' }
                                ],
                                [
                                    { text: 'Department to Visit', style: 'label' },
                                    { text: row.medicineName || 'N/A', style: 'value' }
                                ],
                                [
                                    { text: 'Appointment Date', style: 'label' },
                                    { text: row.appointmentDate || 'N/A', style: 'value' }
                                ],
                                [
                                    { text: 'Token Number', style: 'label' },
                                    { text: row.tokenNo || 'N/A', style: 'valueHighlight' }
                                ],
                                [
                                    { text: 'Booking Timestamp', style: 'label' },
                                    { text: bookingDate, style: 'value' }
                                ],
                                [
                                    { text: 'Validity', style: 'label' },
                                    { text: 'Valid only on the day of appointment', style: 'value' }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 0 : 0.5;
                            },
                            vLineWidth: function () {
                                return 0;
                            },
                            hLineColor: function () {
                                return '#E5E7EB';
                            },
                            paddingTop: function() { return 8; },
                            paddingBottom: function() { return 8; }
                        }
                    }
                ]
            },
            // Footer Note
            {
                text: 'IMPORTANT: Please present this pass along with a valid ID card at the security desk and the respective department. This pass is non-transferable and valid only for the scheduled date and department.',
                style: 'footerNote',
                margin: [0, 40, 0, 0]
            }
        ],
        images: {
            snow: snow
        },
        styles: {
            hospitalName: { fontSize: 12, bold: true, color: '#111827', marginBottom: 4 },
            hospitalAddress: { fontSize: 9, color: '#4B5563', lineHeight: 1.3, marginBottom: 3 },
            hospitalContact: { fontSize: 9, color: '#6B7280' },
            passTitle: { fontSize: 14, bold: true, letterSpacing: 1 },
            label: { fontSize: 10, bold: true, color: '#6B7280' },
            value: { fontSize: 11, color: '#111827', bold: true },
            valueHighlight: { fontSize: 13, color: '#2563EB', bold: true },
            footerNote: { fontSize: 9, color: '#6B7280', italics: true, alignment: 'justify', lineHeight: 1.4 }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };

    try {
        pdfMake.createPdf(docDefinition).download(`Visiting_Pass_${row.tokenNo}.pdf`);
    } catch (err) {
        console.error("PDF generation failed:", err);
    }
}
