import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { getLeaseDetailList } from 'src/api/AssetApis';
import FileView from '../../AssetFileView/FileView';
import { useQuery } from 'react-query';
import TextComponent from 'src/views/Components/TextComponent';
import { Box } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns';

const LeaseDetailsinCondem = ({ AssetDetails }) => {

    const { am_item_map_slno } = AssetDetails
    const [leaseAllDetails, setleaseAllDetails] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)

    const { data: LeaseDetailListData } = useQuery({
        queryKey: ['getLeaseDetailListz'],
        enabled: am_item_map_slno !== undefined,
        queryFn: () => getLeaseDetailList(am_item_map_slno),
    });

    const LeaseDetailList = useMemo(() => LeaseDetailListData, [LeaseDetailListData])


    useEffect(() => {
        if (LeaseDetailList) {
            setleaseAllDetails(LeaseDetailList);
        } else {
            setleaseAllDetails([]);
        }
    }, [LeaseDetailList]);

    const ViewLeaseDetailFile = useCallback((val) => {
        const { am_lease_mast_slno } = val
        const getImage = async (am_lease_mast_slno) => {
            const result = await axioslogin.get(`/AssetFileUpload/LeaseMasterImageView/${am_lease_mast_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/LeaseMaster/${am_lease_mast_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            } else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(am_lease_mast_slno)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    return (
        <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, px: 2, mt: .5 }}>
            {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <TextComponent
                text={"LEASE DETAILS LIST"}
                sx={{
                    flex: 1,
                    fontWeight: 500,
                    color: 'black',
                    fontSize: 15,
                }}
            />
            {leaseAllDetails.length === 0 ?
                <Box sx={{ height: 160, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 5 }}>
                    Empty Lease Details
                </Box>
                :
                <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex', borderTop: 1, borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .5, gap: .5 }}>
                        <Box sx={{ flex: .1, }}>
                            #
                        </Box>
                        <Box sx={{ flex: .3, }}>
                            Attachments
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            Supplier
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            From Date
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            To Date
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            Amount
                        </Box>
                        <Box sx={{ flex: .3, }}>
                            Status
                        </Box>
                    </Box>
                    <Virtuoso
                        style={{ height: '28vh' }}
                        totalCount={leaseAllDetails?.length}
                        itemContent={(index) => {
                            const sortedList = [...leaseAllDetails].sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0));
                            const val = sortedList[index];

                            return (
                                <Box key={index} sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .6 }}>
                                    <Box sx={{ flex: .1, fontWeight: 600 }}>
                                        {index + 1}
                                    </Box>
                                    <Box sx={{ flex: .3, fontWeight: 600, display: 'flex' }}>
                                        {val.lease_image === 1 ? (
                                            <FilePresentRoundedIcon sx={{ color: '#41729F', cursor: 'pointer' }}
                                                onClick={() => ViewLeaseDetailFile(val)}
                                            />
                                        ) : (
                                            <FilePresentRoundedIcon sx={{ color: 'grey', cursor: 'pointer' }} />
                                        )}
                                    </Box>
                                    <Box sx={{ flex: 1, fontWeight: 600 }}>
                                        {val.it_supplier_name}
                                    </Box>
                                    <Box sx={{ flex: .4, fontWeight: 600 }}>
                                        {val.lease_fromdate ? format(new Date(val.lease_fromdate), 'dd MMM yyyy') : ''}
                                    </Box>
                                    <Box sx={{ flex: .4, fontWeight: 600 }}>
                                        {val.lease_todate ? format(new Date(val.lease_todate), 'dd MMM yyyy') : ''}
                                    </Box>
                                    <Box sx={{ flex: .4, fontWeight: 600 }}>
                                        {val.lease_amount}
                                    </Box>
                                    <Box
                                        sx={{
                                            flex: 0.3,
                                            fontWeight: 600,
                                            color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                                        }}
                                    >
                                        {val.status === 1 ? "Active *" : val.status === 2 ? "Inactive" : val.status === 0 ? "Expired" : "NotUpdated"}
                                    </Box>
                                </Box>
                            );
                        }}
                    />

                </Box>}
        </Box>
    )
}

export default LeaseDetailsinCondem