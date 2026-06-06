import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
  ModalDialog,
  Box,
} from "@mui/joy";
import { axioslogin } from "../Axios/Axios";
import { format } from "date-fns";
import { errorNotify, infoNotify, succesNotify } from "../Common/CommonCode";
import { useSelector } from "react-redux";
import { groupByDayAndType } from "./CommonData/CommonFun";
import DietPlanHeader from "./DietInpatientList/DietInpatientComponents/DietPlanHeader";
import DietPlanFooter from "./DietInpatientList/DietInpatientComponents/DietPlanFooter";
import DietPlanCurrentTable from "./DietInpatientList/DietInpatientComponents/DietPlanCurrentTable";
import NewDietPlanSection from "./DietInpatientList/DietInpatientComponents/NewDietPlanSection";
import { useAllFetchTemplateFoodDetail, usePatientPlanFoodDetails } from "./CommonData/UseQuery";


const DietPlan = ({
  open,
  setOpen,
  selectedPatientData,
  FetchPatientDietPlan,
  template
}) => {

  const {
    ptc_ptname,
    pt_no,
    ptc_sex,
    doc_name,
    fb_rmc_desc,
    ip_no,
    do_code,
    ipd_date,
    fb_ipd_disc,
    diet_history
  } = selectedPatientData || {};

  const id = useSelector((state) => state.LoginUserData.empid);

  const [dietType, setDietType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);

  // ONLY FOR DIETITIAN
  const [consultationRequired, setConsultationRequired] = useState(true);

  const hasActiveDiet = useMemo(() => diet_history?.find(val => val?.diet_status === "ACTIVE"),
    [diet_history]
  );

  const isPlanned = useMemo(() => diet_history?.some(val =>
    val?.diet_status &&
    val?.diet_status !== "STOPPED"
  ) ?? false,
    [diet_history]
  );

  const PlanId = hasActiveDiet?.plan_id;

  const { data: TemplateFoodDetail } = useAllFetchTemplateFoodDetail(PlanId);
  const { data: FetchPlanFoodDetail = [] } = usePatientPlanFoodDetails(PlanId);

  const groupedData = useMemo(() => groupByDayAndType(
    template,
    TemplateFoodDetail,
    FetchPlanFoodDetail
  ), [template, TemplateFoodDetail, FetchPlanFoodDetail]);

  const resetForm = useCallback(() => {
    setDietType("");
    setEditMode(false);
    setEditingPlanId(null);
    setConsultationRequired(true);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    setOpen(false);
  }, [resetForm, setOpen]);

  const handleEdit = useCallback((row) => {
    if (!row) return infoNotify("Data Missing Please Refresh");

    if (editMode && editingPlanId === row?.plan_id) {
      setEditMode(false);
      setEditingPlanId(null);
      return;
    }

    setEditMode(true);
    setEditingPlanId(row?.plan_id);
    setDietType(row?.diet_id || "");
    setConsultationRequired(true);

  }, [editMode, editingPlanId]);


  const formatDate = useCallback((date) => {
    if (!date) return null;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()))
      return null;
    return format(
      parsedDate,
      "yyyy-MM-dd HH:mm:ss"
    );
  }, []);

  
  const getGender = useCallback((sex) => {
    if (sex === "F") return "Female";
    if (sex === "M") return "Male";
    return "-";
  }, []);


  const validateForm = () => {
    if (!pt_no)
      return "Patient not selected";
    if (!ip_no)
      return "Admission ID missing";
    // Diet always required
    if (!dietType)
      return "Please select Diet";
    if (!do_code)
      return "Doctor Id is Missing!"
  };

  const handleSubmit = async (type = "save") => {
    try {
      const error = validateForm();
      if (error)
        return errorNotify(error);
      const isEdit = type === "update";
      const payload = {
        ...(isEdit && {
          plan_id: editingPlanId
        }),
        patient_id: pt_no,
        admission_id: ip_no,
        diet_id: dietType,
        is_consultation: consultationRequired ? 1 : 0,
        start_date: ipd_date
          ? formatDate(ipd_date)
          : null,
        end_date: fb_ipd_disc
          ? formatDate(fb_ipd_disc)
          : null,
        doctor_id: do_code || null,
        diet_status: "ACTIVE",
        ...(isEdit
          ? {
            is_active: 1,
            updated_by: id
          }
          : {
            created_by: id
          }),
      };

      const res = await axioslogin[
        isEdit ? "patch" : "post"
      ](
        isEdit
          ? `/patientdietplan/update`
          : `/patientdietplan/insert`,
        payload
      );

      const { success, message } = res.data;
      if (success !== 2)
        return errorNotify(message);
      succesNotify(message);
      FetchPatientDietPlan();
      resetForm();
      setOpen(false);
    } catch (err) {
      errorNotify(
        type === "update"
          ? "Error Updating Diet"
          : "Error Inserting Diet"
      );
    }
  };

  const hanldeStopDiet = async (planId) => {
    try {
      const payload = {
        plan_id: planId,
        diet_status: "STOPPED",
        is_active: 0,
        updated_by: id
      };
      const res = await axioslogin.patch(
        `/patientdietplan/update-status`,
        payload
      );
      const { success, message } = res.data;
      if (success !== 2)
        return errorNotify(message);
      succesNotify(message);
      FetchPatientDietPlan();
      resetForm();
      setOpen(false);
    } catch (err) {
      errorNotify("Error Updating Status");
    }
  };

  return (

    <Modal
      open={open}
      onClose={() => {
        resetForm();
        setOpen(false);
      }}
    >

      <ModalDialog
        sx={{
          width: isPlanned ? '52%' : '45%',
          borderRadius: 10,
          p: 0,
          overflow: 'hidden',
          boxShadow: 'xl',
          bgcolor: '#f7f8fc'
        }}
      >
        <DietPlanHeader
          ptc_ptname={ptc_ptname}
          pt_no={pt_no}
          ptc_sex={ptc_sex}
          fb_rmc_desc={fb_rmc_desc}
          doc_name={doc_name}
          isPlanned={isPlanned}
          ActiveDiet={hasActiveDiet}
          getGender={getGender}
        />

        {/* BODY */}
        <Box
          sx={{
            p: 3,
            maxHeight: '78vh',
            overflow: 'auto',

            scrollbarWidth: 'none',
            msOverflowStyle: 'none',

            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >

          {/* EXISTING PLAN */}
          <DietPlanCurrentTable
            isPlanned={isPlanned}
            patient={selectedPatientData}
            handleEdit={handleEdit}
            hanldeStopDiet={hanldeStopDiet}
            editMode={editMode}
            groupedData={groupedData}
          />

          <NewDietPlanSection
            isPlanned={isPlanned}
            editMode={editMode}
            consultationRequired={consultationRequired}
            setConsultationRequired={setConsultationRequired}
            dietType={dietType}
            ActiveDiet={hasActiveDiet}
            setDietType={setDietType}
          // dietecian={dietecian}
          // setDietecian={setDietecian}
          />

        </Box>

        {/* FOOTER */}

        <DietPlanFooter
          HandleClose={handleClose}
          handleSubmit={handleSubmit}
          editMode={editMode}
          isPlanned={isPlanned}
        />

      </ModalDialog>

    </Modal>
  );
};

export default DietPlan;