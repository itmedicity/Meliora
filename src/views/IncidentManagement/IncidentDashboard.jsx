import React, {
    memo, useCallback,
    //  useMemo,
    useState
} from 'react';
import {
    Avatar, Box,
} from '@mui/joy';
import { Typography } from '@mui/material';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ItemcountPiechart from './Components/ItemcountPiechart';
import DetailCardIncident from './Components/DetailCardIncident';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IncidentTextComponent from './Components/IncidentTextComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashBoardAgeGrid from './Components/DashBoardAgeGrid';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedActionButton from './Components/AnimatedActionButton';
import { useCurrentCompanyData, useIncidentDashBoardData } from './CommonComponent/useQuery';
import {
    useIncidentStats
} from './CommonComponent/CommonFun';
import IncidentFilterBox from './Components/IncidentFilterBox';
import TableSkeleton from './SkeletonComponent/TableSkeleton';

const IncidentDashboard = () => {

    const [type, setType] = useState("All");
    const [searchinput, setSearchInput] = useState("")
    const navigate = useNavigate();

    const {
        data: DashboardIncidents,
        isLoading: loadingDashBoardData
    } = useIncidentDashBoardData();

    const {
        data: CurrrentComapny,
        isLoading: loadingCurrentCompany
    } = useCurrentCompanyData();


    const {
        totalCount,
        newCount,
        processingCount,
        closedCount,
        yesterdayTotal,
        yesterdayNew,
        yesterdayProcessing,
        yesterdayClosed,
    } = useIncidentStats(DashboardIncidents);

    //Navigate to the Register Page
    const hanldeNavigateRegisterPage = useCallback(() => {
        navigate('/Home/IncidentReg')
    }, []);


    // Calculating the Total Resolved Incidents
    const ShowCaseresolvedPercentage = totalCount > 0
        ? Math.round((closedCount / totalCount) * 100) + "%"
        : "0%";

    const pieData = [
        { id: 0, value: totalCount },
        { id: 1, value: closedCount },
    ];

    return (
        <Box sx={{
            width: '100%',
            flex: 1
        }}>
            {/* Dashboard Header */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <DashboardTwoToneIcon sx={{ color: 'var(--true-blue-800)', fontSize: 16 }} />
                <IncidentTextComponent text={"DashBoard"} color={'#2f2e2eff'} size={12} weight={300} />
            </Box>

            {/* Create Task */}
            <Box sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IncidentTextComponent text={"Incident Mangement"} color={'#151414ff'} size={28} weight={400} />
                <AnimatedActionButton
                    title="Register Incident"
                    onClick={hanldeNavigateRegisterPage}
                    icon={AddCircleOutlineIcon}
                />
            </Box>

            {/* Dashboard Cards */}
            <Box sx={{
                width: '100%',
                height: 150,
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1
            }}>

                {/* right side */}
                <Box sx={{
                    width: '35%',
                    bgcolor: 'white',
                    height: '100%',
                    boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                    borderRadius: 5
                }}>
                    <Box sx={{ display: 'flex', height: '100%', p: 2 }}>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRight: 2,
                            borderColor: 'lightgray',
                            position: 'relative'
                        }}>

                            <ItemcountPiechart data={pieData} />

                            <Typography sx={{
                                fontSize: 24,
                                fontWeight: 600,
                                color: '#343a40',
                                ml: 1,
                                fontFamily: 'var(--roboto-font)',
                                mb: 2
                            }}>{ShowCaseresolvedPercentage}</Typography>
                            <Typography sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: '#343a40',
                                fontFamily: 'var(--roboto-font)',
                                textAlign: 'center',
                                position: "absolute",
                                bottom: 0
                            }}>Resolved</Typography>
                        </Box>


                        <Box sx={{
                            flex: 1,
                            // borderRight: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            borderColor: '#dadee3ff',
                            flexDirection: 'column',
                            px: 2,
                            position: 'relative'
                        }}>
                            <Box sx={{ width: '90%', borderBottom: 2, height: '30%', borderColor: '#dadee3ff', mb: 1 }}>
                                <IncidentTextComponent text={`Total ${totalCount}`} size={22} weight={600} color="#343a40" />
                            </Box>
                            <Box sx={{ width: '90%', height: '30%', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar size="sm" variant='soft' color='neutral'><AutorenewIcon color='primary' sx={{ fontSize: 25 }} /></Avatar>
                                <IncidentTextComponent text={processingCount} size={22} weight={800} color="#343a40" />
                                <IncidentTextComponent text={`Active`} size={22} weight={800} color="#343a40" />
                            </Box>
                            <Box sx={{ width: '90%', height: '30%', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar size="sm" variant='soft' color='success'><CheckCircleOutlineIcon sx={{ fontSize: 25 }} /></Avatar>
                                <IncidentTextComponent text={closedCount} size={22} weight={800} color="#343a40" />
                                <IncidentTextComponent text={`Closed`} size={22} weight={800} color="#343a40" />
                            </Box>
                        </Box>
                    </Box>
                </Box>


                {/* left side */}
                <Box sx={{
                    width: '64%',
                    bgcolor: 'white',
                    height: '100%',
                    boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                    borderRadius: 5
                }}>
                    <Box sx={{ display: 'flex', height: '100%', py: 2 }}>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                icon={<ErrorOutlineIcon sx={{ fontSize: 35, color: 'blue', fontWeight: 600 }} />}
                                color='primary'
                                Maintext={"All Incident"}
                                count={totalCount}
                                yesterday={`+${yesterdayTotal}`}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='warning'
                                icon={<LockOpenIcon sx={{ fontSize: 35, color: 'orange', fontWeight: 600 }} />}
                                Maintext={"New Incident "}
                                count={newCount}
                                yesterday={`+${yesterdayNew}`}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='success'
                                icon={<CheckCircleOutlineIcon sx={{ fontSize: 35, color: 'green', fontWeight: 600 }} />}
                                Maintext={"Open "}
                                count={processingCount}
                                yesterday={`+${yesterdayProcessing}`}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='danger'
                                icon={<PublishedWithChangesIcon sx={{ fontSize: 35, color: 'red', fontWeight: 600 }} />}
                                Maintext={"Closed"}
                                count={closedCount}
                                yesterday={`+${yesterdayClosed}`}
                                pending={"from yesterday"}
                            />

                        </Box>
                    </Box>

                </Box>
            </Box>


            {/* Filtering Content */}

            <Box sx={{
                width: '100%',
                height: 40,
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex'
                }}>

                    <ToggleButtonGroup
                        sx={{
                            display: 'flex',
                            boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                            width: '100%',
                        }}
                        value={type}
                        onChange={(event, newValue) => setType(newValue || "Incident")}
                    >
                        {
                            ["All", "New", "Open", "Rejected", "Closed"].map((item) => {
                                return (
                                    <Button key={item} value={item} fullWidth sx={{ flex: 1 }}>{item}</Button>
                                )
                            })
                        }
                    </ToggleButtonGroup>
                </Box>

                {/* Incident Filter Box */}
                <IncidentFilterBox setSearchInput={setSearchInput} />
            </Box>
            {/* age grid table component Here */}
            <Box sx={{
                width: '100%',
                minHeight: innerHeight * 55 / 100,
                bgcolor: 'white',
                boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                display: 'flex',
                mt: 1
            }}>
                {
                    (loadingDashBoardData || loadingCurrentCompany) ?
                        <TableSkeleton rows={15} cols={7} /> :
                        <DashBoardAgeGrid
                            CurrrentComapny={CurrrentComapny}
                            DashboardIncidents={DashboardIncidents}
                            type={type}
                            keyword={searchinput}
                        />
                }

            </Box>

        </Box>
    )
}

export default memo(IncidentDashboard);