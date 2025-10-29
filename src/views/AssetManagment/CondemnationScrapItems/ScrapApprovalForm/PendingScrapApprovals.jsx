import { Box, Chip, CircularProgress, Table } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import ApproveRejectScrapForm from './ApproveRejectScrapForm'
import { useQuery } from '@tanstack/react-query'
import { taskColor } from 'src/color/Color'

const PendingScrapApprovals = ({ EmployeeScrapLevelForm, id }) => {

    const [formFlag, setFormFlag] = useState(0)
    const [formOpen, setFormOpen] = useState(true)
    const [scrapDetails, setScrapDetails] = useState([])
    const [view, setView] = useState(0)

    const levelNo = EmployeeScrapLevelForm?.length > 0 && EmployeeScrapLevelForm?.[0]?.level_no;

    const levelId = useMemo(() => {
        return levelNo - 1;
    }, [levelNo]);

    const getEmployeeScrapApprovalLevel = async () => {
        const { data } = await axioslogin.get(`AssetCondemnation/getEmployeeScrapApprovalLevel/${levelId}`);
        return data.success === 1 ? data.data : null;
    };

    const { data: ScrapsUnderLevel, isLoading } = useQuery({
        queryKey: ['getEmployeeScrapApprovallvl', levelId],
        queryFn: getEmployeeScrapApprovalLevel,
        enabled: levelId != null,
    });

    const ApproveRejectScrap = useCallback((val) => {
        setScrapDetails(val)
        setFormFlag(1)
        setFormOpen(true)
    }, [])

    return (
        <Box sx={{ p: .5 }}>
            {formFlag === 1 ?
                <Box>
                    <ApproveRejectScrapForm formFlag={formFlag} setFormFlag={setFormFlag} formOpen={formOpen} setFormOpen={setFormOpen}
                        scrapDetails={scrapDetails} EmployeeScrapLevelForm={EmployeeScrapLevelForm} id={id} view={view} setView={setView} />
                </Box>
                :
                null}
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
            ) : ScrapsUnderLevel?.length > 0 ? (
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
                            <th style={{ width: 130, textAlign: 'center' }}>Review</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Status</th>
                            <th style={{ width: 'auto', }}>Scrap Location</th>
                            <th style={{ width: 'auto', }}>Supplier</th>
                            <th style={{ width: 'auto', }}>Recipient Name</th>
                            <th style={{ width: 150, textAlign: 'center' }}>Total Scrap Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ScrapsUnderLevel?.map((val, index) => {
                            const Reviewed = val.level_state === "A" ? "APPROVED" : val.level_state === "R" ? "REJECTED" : "Pending"
                            return (
                                <tr key={index}>
                                    <td style={{ width: 100, textAlign: 'center', fontWeight: 700 }}>{val.scrap_condemn_Form_no} #{val.scrap_condemn_Form_slno}</td>
                                    <td style={{ width: 100, textAlign: 'center' }}>
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
                                            onClick={() => ApproveRejectScrap(val)}>
                                            Review
                                        </Chip>
                                    </td>
                                    <td style={{ width: 'auto', textAlign: 'center' }}>
                                        <Chip variant='soft'
                                            color={val.level_state === "A" ? 'success' : val.level_state === "R" ? 'danger' : 'primary'}
                                            sx={{ px: 2, cursor: 'pointer', fontSize: 12 }}>
                                            {val.level_name ? `${val.level_name} ${Reviewed}` : "Submitted"}
                                        </Chip>
                                    </td>
                                    <td style={{ width: 'auto', fontSize: 13 }}>{val.yard_names} </td>
                                    <td style={{ width: 'auto', }}>{val.it_supplier_name}</td>
                                    <td style={{ width: 'auto', }}>{val.recipient_name}</td>
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

export default memo(PendingScrapApprovals)