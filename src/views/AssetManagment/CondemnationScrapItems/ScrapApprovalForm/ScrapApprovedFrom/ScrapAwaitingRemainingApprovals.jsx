import { Box, Chip, CircularProgress, Table } from '@mui/joy'
import React, { useCallback, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ApproveRejectScrapForm from '../ApproveRejectScrapForm';
import { taskColor } from 'src/color/Color';

const ScrapAwaitingRemainingApprovals = ({ isLoading, ScrapsAwaitingAllApproval, EmployeeScrapLevelForm, id }) => {

    const level_no = EmployeeScrapLevelForm?.[0]?.level_no ?? null;


    const [formFlag, setFormFlag] = useState(0)
    const [formOpen, setFormOpen] = useState(true)
    const [scrapDetails, setScrapDetails] = useState([])
    const [view, setView] = useState(0)

    const EditReview = useCallback((val) => {
        setScrapDetails(val)
        setFormFlag(1)
        setFormOpen(true)
    }, [])

    const Review = useCallback((val) => {
        setScrapDetails(val)
        setFormFlag(1)
        setFormOpen(true)
        setView(1)
    }, [])



    return (
        <Box sx={{ px: 1, pt: 2 }}>

            {formFlag === 1 ?
                <Box>
                    <ApproveRejectScrapForm formFlag={formFlag} setFormFlag={setFormFlag} formOpen={formOpen} setFormOpen={setFormOpen}
                        scrapDetails={scrapDetails} view={view} setView={setView}
                        EmployeeScrapLevelForm={EmployeeScrapLevelForm} id={id} />
                </Box> : null}

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
            ) : ScrapsAwaitingAllApproval?.length > 0 ? (
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
                        {ScrapsAwaitingAllApproval?.map((val, index) => {
                            const Reviewed = val.level_state === "A" ? "APPROVED" : val.level_state === "R" ? "REJECTED" : "Pending"
                            const Reviewstate = val.level_no === level_no ? 1 : 0
                            return (
                                <tr key={index}>
                                    <td style={{ width: 150, textAlign: 'center' }}>{`${val.scrap_condemn_Form_no}/${val.scrap_condemn_Form_slno}`}</td>
                                    <td style={{ width: 180, textAlign: 'center' }}>

                                        {Reviewstate === 1 ?

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
                                                onClick={() => EditReview(val)}
                                            >
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
                                    <td style={{ width: 'auto', }}>{val.yard_name}</td>
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

export default ScrapAwaitingRemainingApprovals