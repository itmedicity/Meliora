import { format } from 'date-fns';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { logoBase64 as snow } from '../Token/LogoBase64';

pdfMake.vfs = pdfFonts && pdfFonts.vfs ? pdfFonts.vfs : pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : null;

export const exportToCSV = (approvedMedicines) => {
    if (!approvedMedicines || approvedMedicines.length === 0) return;
    const headers = [
        "Token No", "Appointment Date", "Medical Rep", "Medicine Name", 
        "Company Name", "Contents", "Tax Percentage", "Offer Details", 
        "Purchase Rate", "MRP"
    ];
    
    const rows = approvedMedicines.map(medicine => [
        medicine.full_token_no || medicine.tokenno,
        medicine.appointmentdate ? format(new Date(medicine.appointmentdate), 'dd MMM yyyy') : '-',
        medicine.rep_name || '-',
        medicine.medicinename || '-',
        medicine.companyname || '-',
        medicine.description || '-',
        medicine.taxpercentage ? `${medicine.taxpercentage}%` : '-',
        medicine.offerdetails || '-',
        medicine.purchaserate || '-',
        medicine.mrp || '-'
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.map(item => `"${(item || '').toString().replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "approved_medicines.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToPDF = (approvedMedicines) => {
    if (!approvedMedicines || approvedMedicines.length === 0) return;
    const body = [
        [
            { text: 'Token No', style: 'tableHeader' },
            { text: 'Appt Date', style: 'tableHeader' },
            { text: 'Medical Rep', style: 'tableHeader' },
            { text: 'Medicine Name', style: 'tableHeader' },
            { text: 'Company Name', style: 'tableHeader' },
            { text: 'Contents', style: 'tableHeader' },
            { text: 'Tax %', style: 'tableHeader' },
            { text: 'Offer Details', style: 'tableHeader' },
            { text: 'Rate', style: 'tableHeader' },
            { text: 'MRP', style: 'tableHeader' }
        ]
    ];

    approvedMedicines.forEach(medicine => {
        body.push([
            medicine.full_token_no || medicine.tokenno || '-',
            medicine.appointmentdate ? format(new Date(medicine.appointmentdate), 'dd/MM/yyyy') : '-',
            medicine.rep_name || '-',
            medicine.medicinename || '-',
            medicine.companyname || '-',
            medicine.description || '-',
            medicine.taxpercentage ? `${medicine.taxpercentage}%` : '-',
            medicine.offerdetails || '-',
            medicine.purchaserate || '-',
            medicine.mrp || '-'
        ]);
    });

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [30, 30, 30, 30],
        images: { snow: snow },
        content: [
            {
                columns: [
                    {
                        image: 'snow',
                        width: 120,
                        alignment: 'left'
                    },
                    {
                        stack: [
                            { text: 'TRAVANCORE MEDICAL COLLEGE HOSPITAL', style: 'hospitalName' },
                            { text: 'N H Bypass, Mylapore, Thattamala P.o, Kollam 691020', style: 'hospitalAddress' },
                            { text: 'T: 0474 2729393, 2726161 | F: 0474 2724411', style: 'hospitalAddress' },
                            { text: 'E: tmc@tmc.ac.in | www.tmc.ac.in', style: 'hospitalAddress' }
                        ],
                        alignment: 'right',
                        margin: [0, 5, 0, 0]
                    }
                ]
            },
            {
                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 780, y2: 0, lineWidth: 1.5, lineColor: '#1F2937' }],
                margin: [0, 10, 0, 15]
            },
            { 
                text: 'APPROVED MEDICINE DETAILS', 
                style: 'mainTitle', 
                alignment: 'center',
                margin: [0, 0, 0, 15]
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto', '*', '*', '*', 'auto', '*', 'auto', 'auto'],
                    body: body
                },
                layout: 'lightHorizontalLines'
            }
        ],
        styles: {
            hospitalName: {
                fontSize: 14,
                bold: true,
                color: '#1e3a8a',
                marginBottom: 2
            },
            hospitalAddress: {
                fontSize: 10,
                color: '#475569',
                marginBottom: 2
            },
            mainTitle: {
                fontSize: 14,
                bold: true,
                color: '#0f172a',
                decoration: 'underline'
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: '#1e293b',
                fillColor: '#f1f5f9',
                margin: [0, 4, 0, 4]
            }
        },
        defaultStyle: {
            fontSize: 9,
            color: '#334155'
        }
    };

    pdfMake.createPdf(docDefinition).download('approved_medicines.pdf');
};
