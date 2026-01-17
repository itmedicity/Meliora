// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';

export const staffDetail = {
    name: "Dr. Arjun Menon",
    staffId: "STF123456",
    designation: "Senior Consultant",
    email: "arjun.menon@hospital.com",
    department: "Cardiology",
    dob: "1978-09-12",
    doj: "2010-06-01"
};


export const InPatientDetail = {
    fb_ipad_slno: '6984',
    fb_ip_no: '2500037466',
    fb_ipd_date: '2025-07-19 15:15:39',
    fb_ipd_date_new: null,
    fb_pt_no: 'P-00039074',
    fb_ptc_name: 'SANJU K VARGHESE',
    fb_ptc_sex: 'M',
    fb_ptd_dob: '1982-09-11 00:00:00',
    fb_ptd_dob_new: null,
    fb_ptn_dayage: '8',
    fb_ptn_monthage: '10',
    fb_ptn_yearage: '42',
    fb_ptc_loadd1: 'KARINGOTTU V V PUTHEN VEEDU',
    fb_ptc_loadd2: 'VALIYELA',
    fb_ptc_loadd3: 'KULATHUPUZHA PO',
    fb_ptc_loadd4: 'KOLLAM',
    fb_ptc_lopin: null,
    fb_rc_code: 'B001',
    fb_bd_code: '7712',
    fb_do_code: '0012',
    fb_rs_code: 'G001',
    fb_ipd_disc: null,
    fb_ipd_disc_new: null,
    fb_ipc_status: null,
    fb_dmc_slno: null,
    fb_dmd_date: null,
    fb_dmd_date_new: null,
    fb_ptc_mobile: '9048984512',
    fb_ipc_mhcode: '00',
    fb_doc_name: 'AFFIN A REG.39586',
    create_date: '2025-07-19 15:30:01',
    edit_date: '2025-07-19 15:30:01',
    fb_ipc_curstatus: 'ADM',
    fb_dep_desc: 'GENERAL SURGERY'
};

export const staffFullDetail = {
    staff_id: 'STF12345',
    staff_name: 'Dr. John Doe',
    gender: 'Male',
    designation: 'Consultant',
    department: 'Cardiology',
    mobile: '9876543210',
    email: 'johndoe@hospital.org',
    location: 'Ward 4A',
    joining_date: '2022-01-15',
    employment_type: 'Full-time',
    is_active: true,
    shift: 'Morning'
}

export const relatedOptions = [
    { label: 'Patient', symbol: 'P' },
    { label: 'Staff', symbol: 'S' },
    { label: 'Visitors', symbol: 'V' },
    { label: 'Hospital Properties', symbol: 'HP' },
];

export const symbolToLabel = {
    P: 'Patient',
    S: 'Staff',
    V: 'Visitors',
    HP: 'Hospital Properties'
};


export const HospitalProperty = {
    custodian_department: 'Department',
    item_type: 'Item Type',
    description: 'Description',
    estimated_cost: 'Estimated Cost',
    item_location: 'Item Location'
};


export const textAreaStyle = {
    width: "100%",
    // maxWidth: "600px",
    minHeight: '100px',
    maxHeight: "160px",
    padding: "8px",
    fontFamily: "var(--roboto-font)",
    border: "1.5px solid #d8dde2ff",
    borderRadius: "4px",
    outline: "none",
    resize: "none",
    fontSize: "15px",
    fontWeight: "400",
    overflow: "scroll",
    scrollbarWidth: "none",
};


export const textAreaStyleFivewhy = {
    width: "100%",
    minHeight: '20px',
    padding: "8px",
    fontFamily: "var(--roboto-font)",
    border: "1.5px solid #d8dde2ff",
    borderRadius: "4px",
    outline: "none",
    resize: "none",
    fontSize: "12px",
    fontWeight: "400",
    overflow: "scroll",
    scrollbarWidth: "none",
};


export const inputStyles = {
    border: '1.5px solid #d8dde2ff',
    borderRadius: '6px',
    boxShadow: 'none',
    outline: 'none',
    '&:focus': {
        border: '1.5px solid #d8dde2ff',
        boxShadow: 'none',
        outline: 'none',
    },
    '&:focus-visible': {
        border: '1.5px solid #d8dde2ff',
        boxShadow: 'none',
        outline: 'none',
    },
    '&.Mui-focused': {
        border: '1.5px solid #d8dde2ff',
        boxShadow: 'none',
        outline: 'none',
    },
    '&.focusVisible': {
        border: '1.5px solid #d8dde2ff',
        boxShadow: 'none',
        outline: 'none',
    },
    '& input': {
        boxShadow: 'none !important',
        outline: 'none !important',
        backgroundColor: 'transparent',
    },
};
export const dummyData = {
    MATERIAL: 'Low-quality raw materials',
    MACHINE: 'Frequent breakdown of conveyor',
    MAN: 'Inadequate training',
    MILIEU: 'Noisy environment',
    METHOD: 'Unclear standard operating procedures',
    MEASUREMENT: 'Faulty sensors'
};


export const getStatusInfo = (val, level) => {

    const hasDirectLevel =
        val?.level_slno !== null && val?.level_slno !== undefined &&
        val?.level_review_state !== null && val?.level_review_state !== undefined &&
        val?.level_name !== null && val?.level_name !== undefined;

    /*
      IF 3 DIRECT FIELDS EXIST — USE THEM
    */
    if (hasDirectLevel) {

        const levelName = val.level_name.trim();
        const reviewState = (val.level_review_state || "").trim();

        if (reviewState === "A") {
            return { text: `${levelName} APPROVED` };
        }

        if (reviewState === "R") {
            return { text: `${levelName} REJECTED` };
        }

        return { text: `${levelName} PENDING` };
    }


    /*
      FALLBACK → USE OLD LOGIC
    */
    if (!Array.isArray(level) || !val) {
        return { text: "INCIDENT REGISTERED" };
    }

    const currentLevel = level.find(
        item => Number(item.level_no) === Number(val.inc_current_level)
    );

    if (!currentLevel) {
        return { text: "INCIDENT REGISTERED" };
    }

    const reviewState = (val.inc_current_level_review_state || "").trim();

    if (reviewState === "A") {
        return { text: `${currentLevel.level_name} APPROVED` };
    }

    if (reviewState === "R") {
        return { text: `${currentLevel.level_name} REJECTED` };
    }

    return { text: `${currentLevel.level_name} PENDING` };
};



export const allowedFileType = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];