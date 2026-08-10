import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { logoBase64 as snow } from '../Token/LogoBase64'

pdfMake.vfs = pdfFonts && pdfFonts.vfs ? pdfFonts.vfs : pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : null;

export const generateIndentPdf = (row, indentData) => {

    // Formatting chemicals table
    const chemicalsBody = [
        [
            { text: 'Chemical Name', style: 'tableHeader' },
            { text: 'Quantity', style: 'tableHeader' }
        ]
    ];

    if (indentData.chemicals && indentData.chemicals.length > 0) {
        indentData.chemicals.forEach((chem) => {
            chemicalsBody.push([
                { text: chem.chemical_name || '', style: 'tableRow' },
                { text: chem.quantity || '', style: 'tableRow' }
            ]);
        });
    } else {
        chemicalsBody.push([
            { text: 'N/A', style: 'tableRow' },
            { text: 'N/A', style: 'tableRow' }
        ]);
    }

    const suppliersList = indentData.suppliers && indentData.suppliers.length > 0
        ? indentData.suppliers.map((s, idx) => `${idx + 1}. ${s.supplier_name}`).join('\n')
        : 'N/A';

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [30, 30, 30, 30], // Standard comfortable margins
        content: [
            // 1. Header Section
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
                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1.5, lineColor: '#1F2937' }],
                margin: [0, 10, 0, 10]
            },

            // 2. Title & Token
            {
                columns: [
                    { text: `Token No: ${row.tokenNo || row.tokenno || row.token_number || 'N/A'}`, style: 'boldLabel', alignment: 'left', width: '30%' },
                    { text: 'INDENT FOR NEW DRUG / SURGICALS', style: 'mainTitle', alignment: 'center', width: '*' },
                    { text: `Date: ${new Date().toLocaleDateString()}`, style: 'boldLabel', alignment: 'right', width: '30%' }
                ],
                margin: [0, 0, 0, 15]
            },

            // 3. Drug Details Box (Standard Grid)
            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [
                            { text: 'Trade Name / Specification:', style: 'gridLabel' },
                            { text: indentData.tradeName || 'N/A', style: 'gridValue' },
                            { text: 'Therapeutic Class:', style: 'gridLabel' },
                            { text: indentData.therapeuticClass || 'N/A', style: 'gridValue' }
                        ],
                        [
                            { text: 'Manufacturer Name:', style: 'gridLabel' },
                            { text: indentData.manufacturer || 'N/A', style: 'gridValue', colSpan: 3 },
                            {}, {}
                        ],
                        [
                            { text: 'Suppliers:', style: 'gridLabel' },
                            { text: suppliersList, style: 'gridValue', colSpan: 3 },
                            {}, {}
                        ],
                        [
                            { text: 'Recommended Qty (1 Month):', style: 'gridLabel' },
                            { text: '', style: 'gridValue', colSpan: 3 },
                            {}, {}
                        ]
                    ]
                },
                layout: 'lightHorizontalLines',
                margin: [0, 0, 0, 15]
            },

            // 4. Chemical Composition
            { text: 'Chemical Composition:', style: 'sectionTitle' },
            {
                table: {
                    widths: ['70%', '30%'],
                    headerRows: 1,
                    body: chemicalsBody
                },
                layout: 'lightHorizontalLines',
                margin: [0, 0, 0, 15]
            },

            // 5. Applicant Pre-Declaration Text
            { text: 'TO BE FILLED BY THE APPLICANT', style: 'sectionTitleCenter', margin: [0, 0, 0, 5] },
            { text: 'Proposed indications for use:\n', style: 'fieldLabel', margin: [0, 0, 0, 10] },
            { text: 'Reason for suggesting this brand:\n', style: 'fieldLabel', margin: [0, 0, 0, 10] },

            // 6. Applicant Section (Boxed for neatness)
            {
                style: 'sectionBox',
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'APPLICANT DECLARATION & DETAILS', style: 'sectionTitleCenter' },
                                    { text: 'To The Medical Director', style: 'fieldLabel', margin: [0, 5, 0, 5] },
                                    {
                                        text: 'The above-mentioned drug/surgical is Standard/Monopoly. We regularly prescribe these drugs for the above-mentioned indication. So I recommend and request you to make the same available at the lowest rate in the hospital pharmacy for the patients. I will take care of the stock clearance of the above product before 6 months of its expiry.',
                                        style: 'declarationText'
                                    },
                                    {
                                        columns: [
                                            { text: "Applicant's Name & Signature\n\nDate: __________________", style: 'signatureBlock' },
                                            { text: "Name & Signature of Unit Chief/HOD\n\nDate: __________________", style: 'signatureBlock', alignment: 'right' }
                                        ],
                                        margin: [0, 15, 0, 5]
                                    }
                                ],
                                border: [true, true, true, true],
                                paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                            }
                        ]
                    ]
                },
                margin: [0, 0, 0, 10]
            },

            // 6. Representative Section (Boxed for neatness)
            {
                style: 'sectionBox',
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'MANUFACTURER / REPRESENTATIVE DECLARATION', style: 'sectionTitleCenter' },
                                    {
                                        text: 'We are quoting the lowest rate of the above medicine as Rs .............. (Inclusive of all tax). We are stocking the minimum quantity of Strip/Nos. The payment of the drugs has to be made only after the sale of the first supplied quantity. We are sure the above drug will be sold within one month otherwise we will return these drugs at our expense. We will not claim or argue with the hospital management for any payment regarding the above drug. Hence, we request you to issue the supply order of the above drug.',
                                        style: 'declarationText',
                                        margin: [0, 5, 0, 15]
                                    },
                                    {
                                        columns: [
                                            {
                                                text: [
                                                    { text: "Representative Name: ", bold: true }, `${indentData.representativeName || ''}\n`,
                                                    { text: "Phone Number: ", bold: true }, `${indentData.contactNo || ''}\n\n`,
                                                    { text: "Signature: __________________\n" }
                                                ],
                                                style: 'signatureBlock'
                                            },
                                            {
                                                text: [
                                                    { text: "Manufacturer Name: ", bold: true }, `${indentData.manufacturer || ''}\n\n\n`,
                                                    { text: "Authorized Signature: __________________\n" }
                                                ],
                                                style: 'signatureBlock', alignment: 'right'
                                            }
                                        ]
                                    }
                                ],
                                border: [true, true, true, true],
                                paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                            }
                        ]
                    ]
                }
            }
        ],
        images: {
            snow: snow
        },
        styles: {
            hospitalName: { fontSize: 12, bold: true, color: '#111827', marginBottom: 2 },
            hospitalAddress: { fontSize: 8.5, color: '#4B5563', marginBottom: 1 },
            mainTitle: { fontSize: 12, bold: true, color: '#111827', decoration: 'underline' },
            boldLabel: { fontSize: 10, bold: true, color: '#111827' },
            gridLabel: { fontSize: 9, bold: true, color: '#4B5563', fillColor: '#F3F4F6', margin: [2, 2, 2, 2] },
            gridValue: { fontSize: 9, color: '#111827', margin: [2, 2, 2, 2] },
            sectionTitle: { fontSize: 10, bold: true, color: '#111827', marginBottom: 5 },
            sectionTitleCenter: { fontSize: 10, bold: true, color: '#111827', alignment: 'center', decoration: 'underline' },
            tableHeader: { fontSize: 9, bold: true, color: '#111827', fillColor: '#F3F4F6', margin: [2, 2, 2, 2] },
            tableRow: { fontSize: 9, color: '#111827', margin: [2, 2, 2, 2] },
            fieldLabel: { fontSize: 9, color: '#4B5563', italics: true },
            declarationText: { fontSize: 8.5, color: '#374151', alignment: 'justify', lineHeight: 1.3 },
            signatureBlock: { fontSize: 9, color: '#111827', lineHeight: 1.4 }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };

    try {
        pdfMake.createPdf(docDefinition).download(`Indent_Form_${row.tokenNo || row.tokenno || row.token_number || 'N/A'}.pdf`);
    } catch (err) {
        console.error("PDF generation failed:", err);
    }
}
