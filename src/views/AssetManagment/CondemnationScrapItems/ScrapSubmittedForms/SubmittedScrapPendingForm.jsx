import React, { memo, useCallback, useState } from 'react'
import { Box, Chip, CircularProgress, Table } from '@mui/joy'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditsubmittedScrapForm from './EditsubmittedScrapForm';
import { taskColor } from 'src/color/Color';
import ViewSubmittedScrapForm from './ViewSubmittedScrapForm';

const SubmittedScrapPendingForm = ({ submittedPendingScarps, isLoading }) => {

    const [editForm, seteditForm] = useState(0)
    const [editFormOpen, setEditFormOpen] = useState(true)
    const [scrapDetails, setScrapDetails] = useState([])
    const [view, setView] = useState(0)
    const [viewOpen, setviewOpen] = useState(false)

    const EditReview = useCallback((val) => {
        setScrapDetails(val)
        seteditForm(1)
        setEditFormOpen(true)
    }, [])

    const Review = useCallback((val) => {
        setScrapDetails(val)
        setviewOpen(true)
        setView(1)
    }, [])

    return (
        <Box sx={{ p: 1 }}>
            {editForm === 1 ?
                <EditsubmittedScrapForm seteditForm={seteditForm} setEditFormOpen={setEditFormOpen}
                    scrapDetails={scrapDetails} setView={setView} editFormOpen={editFormOpen}
                    view={view} />
                : null}
            {view === 1 ?
                <ViewSubmittedScrapForm seteditForm={seteditForm} setviewOpen={setviewOpen}
                    scrapDetails={scrapDetails} setView={setView} viewOpen={viewOpen}
                    view={view} />
                : null}

            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                    }}
                >
                    <CircularProgress size="lg" variant="soft" />
                </Box>
            ) : submittedPendingScarps?.length > 0 ? (
                <Table
                    aria-label="pending-condemnation"
                    stickyHeader
                    borderAxis='both'
                    sx={{
                        fontSize: 12,
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 130, textAlign: 'center' }}>Form No.</th>
                            <th style={{ width: 180, textAlign: 'center' }}>Review</th>
                            <th style={{ width: 180, textAlign: 'center' }}>Status</th>
                            <th style={{ width: 'auto', }}>Scrap Location</th>
                            <th style={{ width: 'auto', }}>Supplier</th>
                            <th style={{ width: 'auto', }}>Recipient Name</th>
                            <th style={{ width: 150, textAlign: 'center' }}>Total Scrap Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedPendingScarps?.map((val, index) => {
                            const Reviewed = val.level_state === "A" ? "APPROVED" : val.level_state === "R" ? "REJECTED" : "Pending"
                            return (
                                <tr key={index}>
                                    <td style={{ width: 150, textAlign: 'center', fontWeight: 700 }}>{`${val.scrap_condemn_Form_no} #${val.scrap_condemn_Form_slno}`}</td>
                                    <td style={{ width: 180, textAlign: 'center' }}>
                                        {val.level_no < 1 ?
                                            <Chip
                                                startDecorator={<ModeEditIcon sx={{ color: taskColor.darkPurple, mt: 0.1 }} />}
                                                sx={{
                                                    border: 1,
                                                    color: taskColor.darkPurple,
                                                    textAlign: 'center',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    fontSize: 13,
                                                    px: 2
                                                }}
                                                onClick={() => EditReview(val)}>
                                                Edit
                                            </Chip>
                                            :
                                            <Chip
                                                sx={{
                                                    border: 1,
                                                    color: taskColor.darkPurple,
                                                    textAlign: 'center',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    fontSize: 13,
                                                    px: 2
                                                }}
                                                onClick={() => Review(val)}
                                            >
                                                View
                                            </Chip>
                                        }
                                    </td>
                                    <td style={{ width: 180, textAlign: 'center' }}>
                                        <Chip variant='soft'
                                            color={val.level_state === "A" ? 'success' : val.level_state === "R" ? 'danger' : 'primary'}
                                            sx={{
                                                fontSize: 12, P: 1,
                                                minWidth: 150,
                                                cursor: 'pointer', color: 'black'
                                            }}>
                                            {val.level_name} {Reviewed}
                                        </Chip>
                                    </td>
                                    <td style={{ width: 'auto', }}>{val.yard_names}</td>
                                    <td style={{ width: 'auto', }}>{val.it_supplier_name}</td>
                                    <td style={{ width: 'auto', }}> {val.recipient_name}</td>
                                    <td style={{ width: 150, textAlign: 'center', }}>
                                        <Chip variant='soft' sx={{ color: 'darkred' }}>
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                minimumFractionDigits: val.total_rate % 1 === 0 ? 0 : 2,
                                                maximumFractionDigits: 2,
                                            }).format(val.total_rate)}
                                        </Chip>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            ) : (
                <Box sx={{
                    fontSize: 26,
                    pt: 10,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "65vh",
                    width: "100%",
                    textAlign: "center",
                    color: 'lightgrey'
                }}>
                    Empty List
                </Box>
            )}
        </Box>

    )
}

export default memo(SubmittedScrapPendingForm)