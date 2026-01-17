import React, {
    memo,
    useMemo,
    useState,
    Suspense,
    useEffect,
    useCallback
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { getYear, parse } from 'date-fns';

import {
    useCurrentCompanyData,
    useIncidentDetailDashBoard
} from '../CommonComponent/useQuery';

import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import IncidentViewModal from '../IncidentModals/IncidentViewModal';

import {
    useHighLevelApprovals,
    useIncidentCardHandlers,
    useIncidentFiles,
    useLevelActionDetails
} from '../CommonComponent/CommonFun';

/* ---------------------------------------------
   SAFETY FUNCTION – ALWAYS RETURN ARRAY
---------------------------------------------- */
const parseArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
        return JSON.parse(value);
    } catch (error) {
        console.error('Array parse failed:', value);
        return [];
    }
};

const IncidentCommonView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    /*
     MODAL STATE 
     */
    const [open, setOpen] = useState(true);

    /* DATA STATES */
    const [uploadedfiles, setUploadedFiles] = useState([]);
    const [approvaldetails, setApprovalDetails] = useState([]);
    const [levelactionreview, setLevelActionReview] = useState([]);

    /* CLOSE MODAL */
    const handleClose = () => {
        setOpen(false);
        navigate('/Home/IncidentDashboard');
    };

    /*  INCIDENT DATA */
    const {
        data: IncidentDetail,
        refetch: FetchAllIncidentDetails
    } = useIncidentDetailDashBoard(id);

    const incident = IncidentDetail?.[0] || null;

    /*  FILE / APPROVAL / ACTION HOOKS  */
    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();
    const { FetchAllHigLevelApprovals, loadingapprovals } = useHighLevelApprovals();
    const { FetchAllActionReviewDetails, loadingactionsreviewdetail } =
        useLevelActionDetails();

    const { fetchAllData } = useIncidentCardHandlers({
        fetchIncidentFiles,
        FetchAllHigLevelApprovals,
        FetchAllActionReviewDetails
    });

    /*FETCH MODAL DATA */
    const handleIncidentViewDetail = useCallback(async () => {
        if (!incident) return;

        const {
            files,
            approvalDetail,
            levelActionDetail
        } = await fetchAllData(
            incident.inc_register_slno,
            incident.file_status
        );

        setUploadedFiles(parseArray(files));
        setApprovalDetails(parseArray(approvalDetail));
        setLevelActionReview(parseArray(levelActionDetail));
    }, [incident, fetchAllData]);

    useEffect(() => {
        if (incident) {
            handleIncidentViewDetail();
        }
    }, [incident, handleIncidentViewDetail]);

    /* COMPANY INFO */
    const { data: CurrrentComapny } = useCurrentCompanyData();

    const CompanyNumber =
        CurrrentComapny?.length > 0
            ? CurrrentComapny[0]?.company_slno
            : null;

    const CompanyName = useMemo(() => {
        if (!CompanyNumber) return '';
        return Number(CompanyNumber) === 1
            ? 'IRN/TMCH/'
            : 'IRN/KMCH/';
    }, [CompanyNumber]);

    /*INCIDENT YEAR*/
    const CurrentYear = incident?.create_date
        ? getYear(
            parse(
                incident.create_date,
                'yyyy-MM-dd HH:mm:ss',
                new Date()
            )
        )
        : '';

    /* NORMALIZE INCIDENT OBJECT */
    const normalizedIncident = useMemo(() => {
        if (!incident) return null;

        return {
            ...incident,
            nature_of_inc: parseArray(incident?.nature_of_inc),
            data_collection_details: parseArray(incident?.data_collection_details),
            inc_action_detail: parseArray(incident?.inc_action_detail),
            inc_root_cause: parseArray(incident?.inc_root_cause)
        };
    }, [incident]);

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog sx={{ borderRadius: 'lg' }}>
                <ModalClose onClick={handleClose} />

                <Suspense
                    fallback={
                        <CustomeIncidentLoading text="Loading Incident Data..." />
                    }
                >
                    {normalizedIncident && (
                        <IncidentViewModal
                            items={normalizedIncident}
                            loading={
                                loadingFiles ||
                                loadingapprovals ||
                                loadingactionsreviewdetail
                            }
                            IncidentFiles={uploadedfiles}
                            fetchAgain={FetchAllIncidentDetails}
                            setOpenModal={setOpen}
                            level="COMMON"
                            highlevelapprovals={approvaldetails || []}
                            levelitems={[]}   // SAFE DEFAULT
                            levelactionreview={levelactionreview || []}
                            CompanyName={CompanyName}
                            CurrentYear={CurrentYear}
                        />
                    )}
                </Suspense>
            </ModalDialog>
        </Modal>
    );
};

export default memo(IncidentCommonView);
