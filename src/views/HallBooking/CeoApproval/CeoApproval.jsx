import { Box } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getHallbookDeotApprove } from 'src/redux/actions/HallbookingApproval'
import CeoApprovModel from './CeoApprovModel'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const CeoApproval = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(getHallbookDeotApprove())
    }, [dispatch, count])

    const tabledata = useSelector((state) => {
        return state.setdepthallbookApproval.HallbookApproveList
    })

    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])

    //Data set for edit
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)

    }, [])


    const [column] = useState([
        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {
                if (params.data.is_ceo_approved === 1) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <PublishedWithChangesOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => rowSelect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Approval">
                            <PublishedWithChangesOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        // { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
        { headerName: "slno", field: "h_approval_slno", minWidth: 100 },
        { headerName: "Event", field: "h_book_event", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Reason", field: "h_booking_reason", minWidth: 200 },
        { headerName: "Attendees", field: "h_book_attendees", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Start Time", field: "h_book_startdatetime", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "End Time", field: "h_book_enddatetime", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Inch.Appr.Status", field: "is_icharge_approves", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Inch.Remarks", field: "h_incharge_remark", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Hod.Appr.Status", field: "is_hod_approves", minWidth: 150 },
        { headerName: "Hod Remarks", field: "hod_remark", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "CEO Appr.Status", field: "is_ceo_approveds", minWidth: 150 },
        { headerName: "CEO Remarks", field: "ceo_remark", autoHeight: true, wrapText: true, minWidth: 200 },


    ])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <CardCloseOnly
            title="CAO/COO/MS Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <CeoApprovModel
                    open={open}
                    setOpen={setOpen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : null}

            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default CeoApproval
