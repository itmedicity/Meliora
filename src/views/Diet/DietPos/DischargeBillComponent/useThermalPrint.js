import { useRef } from "react";

const useThermalPrint = () => {

    const thermalBillRef = useRef(null);

    const printThermalBill = () => {

        if (!thermalBillRef.current) return;

        const printContents = thermalBillRef.current.innerHTML;

        const win = window.open("", "", "width=320,height=700");

        win.document.write(`
            <html>
                <head>
                    <title>Diet Thermal Bill</title>

                    <style>
                        @page {
                    size: 78mm auto;
                    margin: 0 !important;
                }

                        
                html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    font-family: monospace;
                }

                       body {
                    width: 260px;
                }

                #print-root {
                    padding-top: 2px;
                }

                hr {
                    border: none;
                    border-top: 1px dashed black;
                    margin: 4px 0;
                }
                    </style>
                </head>

                <body>
                    <div id="print-root">
                        ${printContents}
                    </div>

                    <script>
                        setTimeout(() => {
                            window.focus();
                            window.print();
                            window.close();
                        }, 150);
                    </script>
                </body>
            </html>
        `);

        win.document.close();
    };

    return {
        thermalBillRef,
        printThermalBill,
    };
};

export default useThermalPrint;