import React, { useCallback, useState } from 'react'
import { Box, Button, CircularProgress, Input, Table } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import { taskColor } from 'src/color/Color';
import { useNavigate } from 'react-router-dom';


const AllDeviceCredentialList = () => {

    const [filterText, setFilterText] = useState("");
    const history = useNavigate()
    const NavigateToAdd = useCallback(() => {
        history('/Home/PasswordManagement')
    }, [history])

    const fetchMasterTable = async () => {
        const result = await axioslogin.get('PasswordManagementMain/masterView')
        return result.data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['masterTable'],
        queryFn: fetchMasterTable,
        refetchOnWindowFocus: false
    })


    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (isError) return <div>Error loading data</div>


    const tabledata = Array.isArray(data?.data) ? data.data : []


    const filteredData = tabledata.filter((row) =>
        Object.values(row ?? {})
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );



    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box sx={{ borderBottom: 0.1, borderColor: '#C5C5C5', p: .5 }}>
                <Box sx={{ color: taskColor.darkPurple }}>All Credential List</Box>
            </Box>
            <Box sx={{ position: 'absolute', right: 190, mt: 1 }}>
                <Input
                    autoComplete="off"
                    label="Search"
                    variant="outlined"
                    placeholder="Type here..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    startDecorator={
                        <Button variant="soft" color="neutral">
                            <SearchIcon /> Search
                        </Button>
                    }
                    sx={{ width: 300, mr: .5 }}
                />
            </Box>
            <Box sx={{ position: 'absolute', right: 10, mt: 1 }}>
                <Button size="md" variant='outlined' color="primary" onClick={NavigateToAdd}>
                    Add Device Credentials
                </Button>
            </Box>


            {filteredData.length !== 0 ? (
                <Box
                    sx={{

                        height: '70vh',       // container height
                        overflowX: 'auto',     // scroll only inside here
                        display: 'block',     // ensures table doesn't escape
                        maxWidth: '100%',
                        mt: 6

                    }}
                >
                    <Table
                        padding="none"
                        stickyHeader
                        borderAxis="both"
                        sx={{
                            minWidth: 2600,
                            tableLayout: "fixed",
                            "& th": { whiteSpace: "nowrap" },

                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 50 }}>SlNo</th>
                                <th style={{ width: 150 }}>Asset No.</th>
                                <th style={{ width: 'auto' }}>Category</th>
                                <th style={{ width: 'auto' }}>Group</th>
                                <th style={{ width: 160 }}>IP Number</th>
                                <th style={{ width: 'auto' }}>Device Name</th>
                                <th style={{ width: 'auto' }}>Port</th>
                                <th style={{ width: 'auto' }}>User Name</th>
                                <th style={{ width: 'auto' }}>Password</th>
                                <th style={{ width: 'auto' }}>Remarks</th>
                                <th style={{ width: 'auto' }}>Describtion</th>
                                <th style={{ width: 'auto' }}>Location</th>
                                <th style={{ width: 550 }}>Device Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {index + 1}</td>
                                        <td> {val.pswd_mast_asset_no || 'not given'}</td>
                                        <td> {val.category_name || 'not given'}</td>
                                        <td> {val.group_name || 'not given'}</td>
                                        <td> {val.psw_detail_ip_num || 'not given'}</td>
                                        <td> {val.item_name || 'not given'}</td>
                                        <td> {val.psw_detail_port || 'not given'}</td>
                                        <td> {val.psw_detail_username || 'not given'}</td>
                                        <td> {val.psw_detail_password || 'not given'}</td>
                                        <td> {val.psw_detail_remarks || 'not given'}</td>
                                        <td> {val.pswd_detail_description || 'not given'}</td>
                                        <td> {val.sec_name || 'not given'}</td>
                                        <td> {val.pswd_mast_description || 'not given'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>


                </Box>



            ) : (
                <Box sx={{ textAlign: 'center', mt: 15, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                    No data under section
                </Box>
            )}


        </Box>
    )
}

export default AllDeviceCredentialList