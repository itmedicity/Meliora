
import { useRef } from "react";

const usePrintBill = () => {
    const billRef = useRef();

    const printBill = () => {
        if (!billRef.current) return;

        const printContents = billRef.current.innerHTML;

        const win = window.open("", "", "width=400,height=600");
        win.document.write(`
            <html>
            <head>
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
                    }, 120);
                </script>
            </body>
            </html>
            `);
        win.document.close();
    };

    return { billRef, printBill };
};

export default usePrintBill;