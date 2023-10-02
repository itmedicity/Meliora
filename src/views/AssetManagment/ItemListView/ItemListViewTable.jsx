import React, { useEffect, memo, useCallback, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Paper } from '@mui/material';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import ItemQrDisplayModel from './ItemQrDisplayModel';

const ItemListViewTable = ({ displayarry }) => {

    const [disArry, setDisArry] = useState([])
    const ref = useRef();
    useEffect(() => {
        if (displayarry.length !== 0) {
            const xx = displayarry.map((val) => {
                const obj = {
                    am_item_map_slno: val.am_item_map_slno,
                    item_creation_slno: val.item_creation_slno,
                    item_dept_slno: val.item_dept_slno,
                    item_deptsec_slno: val.item_deptsec_slno,
                    deptname: val.deptname,
                    secname: val.secname,
                    item_custodian_dept: val.item_custodian_dept,
                    am_custodian_name: val.am_custodian_name,
                    item_name: val.item_name,
                    item_asset_no: val.item_asset_no,
                    item_asset_no_only: val.item_asset_no_only,
                    assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0')
                }
                return obj
            })
            setDisArry(xx)
        }
    }, [displayarry])

    const [flag, setFlag] = useState(0)
    const [assetNo, setassetNo] = useState('')

    const [open, setOpen] = useState(false)
    const modeldisplay = useCallback((val) => {

        console.log(val);
        const { assetno } = val
        setassetNo(assetno)
        setFlag(1)
        console.log("hjhj");
        setOpen(true)
    }, [])

    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])
    return (
        <Paper sx={{ height: 600, overflow: 'auto' }}>

            {flag === 1 ? <ItemQrDisplayModel open={open} handleClose={handleClose} assetNo={assetNo} /> : null}
            < CssVarsProvider >
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', align: "center" }}>Sl No</th>
                            <th style={{ width: '25%', align: "center" }}>Department</th>
                            <th style={{ width: '25%', align: "center" }}>Department Section</th>
                            <th style={{ width: '20%', align: "center" }}>Asset No</th>
                            <th style={{ width: '50%', align: "center" }}>Item Name</th>
                            <th style={{ width: '10%', align: "center" }}>Print QR</th>

                        </tr>
                    </thead>
                    <tbody>

                        {disArry && disArry.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {index + 1}</td>
                                <td> {val.deptname}</td>
                                <td> {val.secname}</td>
                                <td>{val.assetno} </td>
                                <td> {val.item_name}</td>
                                <td>
                                    <PublishedWithChangesOutlinedIcon size={6} onClick={() => modeldisplay(val)} />
                                </td>
                                {/* <td><DeleteOutlineIcon size={6} onClick={() => deleteitem(val)} /></td> */}
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>


            {

                flag === 1 ?
                    <div>
                        <div ref={ref} style={{ display: 'flex', flexDirection: 'row' }} >
                            {/* <Barcode width={1} height={40} value={value} /> */}
                            {/* <QRCodeCanvas value="https://reactjs.org/" /> */}
                            <div>
                                <QRCodeSVG
                                    value={assetNo}
                                    size={100}
                                    level='Q'
                                    includeMargin={false}
                                    style={{
                                        marginTop: 15,
                                        height: 80,
                                        width: 145,
                                    }}
                                />
                                <div
                                    style={{
                                        width: 145,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        fontFamily: 'initial',
                                        textAlign: 'center',
                                        marginTop: -2
                                    }}
                                >{assetNo}</div>
                            </div>
                            <div>
                                <QRCodeSVG
                                    value={assetNo}
                                    size={100}
                                    level='Q'
                                    includeMargin={false}
                                    style={{
                                        marginTop: 15,
                                        height: 80,
                                        width: 110,
                                    }}
                                />
                                <div
                                    style={{
                                        width: 110,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        fontFamily: 'initial',
                                        textAlign: 'center',
                                        marginTop: -2
                                    }}
                                >{assetNo}</div>
                            </div>
                        </div>
                        {/* <button onClick={setValueBarcode} >Generate Barcode</button> */}
                        <button onClick={handlePrint} >Print Barcode</button>
                        {/* <ReactToPrint trigger={() => <button> Print</button>} content={() => ref.current} /> */}

                    </div>

                    : null
            }
        </Paper >
    )
}

export default memo(ItemListViewTable)