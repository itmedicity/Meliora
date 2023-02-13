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
        { headerName: "Hall booking no", field: "h_approval_slno", width: 300 },
        { headerName: "Event", field: "h_book_event", autoHeight: true, wrapText: true, width: 350, filter: "true" },
        { headerName: "No of attendees", field: "h_book_attendees", autoHeight: true, wrapText: true, width: 350, filter: "true" },
        { headerName: "Inch.Appr.Status", field: "is_icharge_approves", autoHeight: true, wrapText: true, width: 350, filter: "true" },
        { headerName: "Incharge Remarks", field: "h_incharge_remark", autoHeight: true, wrapText: true, width: 400, filter: "true" },
        { headerName: "Hod.Approve Status", field: "is_hod_approve", width: 350 },
        { headerName: "Hod Remarks", field: "hod_remark", width: 350 },
        { headerName: "CEO Approve Status", field: "is_ceo_approveds", width: 250 },
        { headerName: "CEO Remarks", field: "ceo_remark", width: 350 },
        { headerName: "Reason", field: "h_booking_reason", width: 400 },

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
