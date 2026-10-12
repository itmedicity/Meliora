import { useRef } from "react";

const useThermalPrint = () => {

    const thermalBillRef = useRef(null);

    const printThermalBill = () => {

        if (!thermalBillRef.current) return;

        const printContents =
            thermalBillRef.current.innerHTML;

        const win = window.open(
            "",
            "",
            "width=320,height=700"
        );

        if (!win) return;

        win.document.write(`
            <html>

                <head>

                    <title>Diet Thermal Bill</title>

                    <style>

                        @page {
                            size: 78mm auto;
                            margin: 0;
                        }

                        html,
                        body {
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 260px;
                            font-family: monospace;
                        }

                        body {
                            width: 260px;
                        }

                        #print-root {
                            width: 260px;
                            margin: 0;
                            padding: 0;
                        }

                        hr {
                            border: none;
                            border-top: 1px dashed #000;
                            margin: 5px 0;
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