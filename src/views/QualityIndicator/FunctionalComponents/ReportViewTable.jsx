import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, useEffect, useState } from 'react'

const ReportViewTable = ({ tableData, headerNames1, headerNames2 }) => {


    const [calculateTotal, setCalculateTotal] = useState({
        totData1: 0,
        totData2: 0,
        totData3: 0

    })
    const { totData1, totData2, totData3 } = calculateTotal

    useEffect(() => {
        const tot1 = tableData?.map(val => val.data1).reduce((prev, next) => Number(prev) + Number(next));
        const tot2 = tableData?.map(val => val.data2).reduce((prev, next) => Number(prev) + Number(next));
        const tot3 = tableData?.map(val => val.data3).reduce((prev, next) => Number(prev) + Number(next));
        const fromdata = {
            totData1: tot1,
            totData2: tot2,
            totData3: tot3
        }

        setCalculateTotal(fromdata)
    }, [tableData])

    // style={{
    //     width: 270,
    //     borderColor: '#898A8B',
    //     cursor: 'pointer',
    //     ":hover": {
    //         borderColor: 'orange',
    //         boxShadow: 5,
    //     }
    // }}

    return (
        <Fragment>
            <Box variant="none" sx={{ height: '20vw', overflow: 'auto', padding: 'none' }}>
                <CssVarsProvider>
                    <Table borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 50, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Date</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', textTransform: 'capitalize', fontSize: 15 }}>{headerNames1}</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', textTransform: 'capitalize', fontSize: 15 }}>{headerNames2}</th>
                                <th size='sm' style={{ width: 50, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Result</th>
                            </tr>
                        </thead>
                        <tbody size='small' style={{ maxHeight: 0.5 }}>
                            {tableData?.map((val, index) => {
                                return (
                                    < tr key={val.slno} size='small'
                                        style={{
                                            maxHeight: 2,


                                        }}  >

                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.date}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.data1}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.data2}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.data3}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr >
                                <th style={{ textAlign: 'center', fontSize: 14, color: 'darkgreen', backgroundColor: '#DBE8D8' }} scope="row">Total</th>
                                <td style={{ textAlign: 'center', fontSize: 14, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totData1.toFixed(2)}</td>
                                <td style={{ textAlign: 'center', fontSize: 14, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totData2.toFixed(2)}</td>
                                <td style={{ textAlign: 'center', fontSize: 14, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totData3.toFixed(2)}</td>
                            </tr>
                        </tfoot>

                    </Table>
                </CssVarsProvider>
            </Box>
        </Fragment>
    )
}

export default ReportViewTable