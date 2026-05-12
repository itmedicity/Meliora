import React, { useMemo, useState, Suspense } from "react";
import {
  Modal,
  ModalDialog,
  Button,
  Stack,
  Box,
  Chip,
  Table,
  Divider
} from "@mui/joy";
import DietInputLabel from "../Master/DietMasters/DietComponent/DietInputLabel";
import SelectPatientDiet from "../CommonSelectCode/SelectPatientDiet";
import DietTextComponent from "./DietComponent/DietTextComponent";
import SelectDieticain from "../CommonSelectCode/SelectDieticain";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addDays, format } from "date-fns";
import DatePickerComponent from "./DietComponent/DatePickerComponent";
import { axioslogin } from "../Axios/Axios";
import { errorNotify, succesNotify } from "../Common/CommonCode";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from "react-redux";
import { groupByDayAndType } from "./CommonData/CommonFun";
import TemplateDetailsTable from "../NursingStation/Component/TemplateDetailsTable";

const DietPlan = ({ open, setOpen, selectedPatientData, FetchPatientDietPlan, template }) => {


  const {
    ptc_ptname,
    pt_no,
    ptc_sex,
    doc_name,
    fb_rmc_desc,
    fb_rtc_desc,
    status,
    ip_no,
    do_code,
    plan_id,
    diet_name,
    start_date,
    end_date,
    diet_status,
    Dietecian_name,
    template_name
  } = selectedPatientData || {};


  const id = useSelector((state) => state.LoginUserData.empid)
  const [dietType, setDietType] = useState("");
  const [dietecian, setDietecian] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [editMode, setEditMode] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);

  const isPlanned = status !== "NOT_PLANNED";


  const groupedData = groupByDayAndType(template);

  // console.log({ groupedData });

  const resetForm = () => {
    setDietType("");
    setDietecian("");
    setStartDate(new Date());
    setEndDate(addDays(new Date(), 1));
    setEditMode(false);
    setEditingPlanId(null);
  };

  const handleEdit = (row) => {
    if (editMode && editingPlanId === plan_id) {
      setEditMode(false);
      setEditingPlanId(null);
      return;
    }

    setEditMode(true);
    setEditingPlanId(plan_id);

    setDietType(row.diet_id || "");
    setDietecian(row.dietitian_id || "");
    setStartDate(new Date(row.start));
    setEndDate(new Date(row.end));
  };

  const formatDate = (date) =>
    date ? format(date, "yyyy-MM-dd HH:mm:ss") : null;

  const formatDisplayDate = (date) =>
    date ? format(new Date(date), "dd-MM-yyyy hh:mm a") : "-";

  const getGender = (sex) => {
    if (sex === "F") return "Female";
    if (sex === "M") return "Male";
    return "-";
  };


  const dietHistory = useMemo(() => {
    if (!plan_id) return [];

    return [
      {
        start: start_date,
        end: end_date,
        diet: diet_name,
        template_name: template_name,
        diet_id: selectedPatientData?.diet_id,
        dietitian_id: selectedPatientData?.dietitian_id,
        Dietecian_name: Dietecian_name,
        doctor: doc_name,
        status: diet_status,
      },
    ];
  }, [plan_id, start_date, end_date, diet_name, doc_name, diet_status, selectedPatientData, template_name]);


  const validateForm = () => {
    if (!pt_no) return "Patient not selected";
    if (!ip_no) return "Admission ID missing";
    if (!dietType) return "Please select Diet";
    if (!dietecian) return "Please select Dietitian";
    if (!startDate) return "Start date is required";
    if (!endDate) return "End date is required";
    if (new Date(endDate) < new Date(startDate))
      return "End date cannot be before start date";
    return null;
  };

  const isValid =
    !!dietType &&
    !!dietecian &&
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate);



  const handleSubmit = async (type = "save") => {
    try {
      const error = validateForm();
      if (error) return errorNotify(error);

      const isEdit = type === "update";

      const payload = {
        ...(isEdit && { plan_id: editingPlanId }),
        patient_id: pt_no,
        admission_id: ip_no,
        diet_id: dietType,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        doctor_id: do_code || null,
        dietitian_id: dietecian,
        diet_status: "ACTIVE",
        ...(isEdit
          ? { is_active: 1, updated_by: id }
          : { created_by: id }),
      };

      const res = await axioslogin[isEdit ? "patch" : "post"](
        isEdit ? `/patientdietplan/update` : `/patientdietplan/insert`,
        payload
      );

      const { success, message } = res.data;

      if (success !== 2) return errorNotify(message);

      succesNotify(message);
      FetchPatientDietPlan();

      // reset only for save
      if (!isEdit) {
        setDietType("");
        setDietecian("");
        setStartDate(new Date());
        setEndDate(addDays(new Date(), 1));
        resetForm()
      } else {
        setEditMode(false);
      }

      setOpen(false);
    } catch (err) {
      errorNotify(
        type === "update" ? "Error Updating Diet" : "Error in Inserting Data"
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
      const res = await axioslogin.patch(`/patientdietplan/update-status`, payload);
      const { success, message } = res.data;
      if (success !== 2) return errorNotify(message);
      succesNotify(message);
      FetchPatientDietPlan();
      resetForm()
      setOpen(false);
    } catch (err) {
      errorNotify("Error Updating Status");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();   // reset everything
        setOpen(false);
      }}>
      <ModalDialog
        sx={{
          width: '70%',
          borderRadius: "lg",
          p: 0,
          overflow: "hidden",
          boxShadow: "lg",
        }}>
        <Box sx={{ px: 3, py: 2, bgcolor: "neutral.softBg" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <DietTextComponent size={20} weight={700} value={ptc_ptname} />
              <DietTextComponent size={13} weight={600} color="gray"
                value={`IP No: ${pt_no || "N/A"}`} />
              <DietTextComponent size={13} weight={600} color="gray"
                value={getGender(ptc_sex)} />
              <DietTextComponent size={14} weight={600}
                value={`Doctor: ${doc_name || "-"}`} />
            </Box>

            {/* RIGHT */}
            <Stack alignItems="flex-end">
              <DietTextComponent size={13} weight={700} value={fb_rmc_desc} />
              <DietTextComponent size={12} weight={600} color="gray" value={fb_rtc_desc} />
            </Stack>
          </Stack>

          {/* STATUS */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Chip
              size="md"
              variant="soft"
              color={isPlanned ? "success" : "danger"}
            >
              {isPlanned ? "PLANNED" : "NOT PLANNED"}
            </Chip>
          </Box>
        </Box>


        <Box
          sx={{
            px: 3,
            py: 2,
            maxHeight: "80vh",
            overflow: "auto",

            // hide scrollbar (all browsers)
            scrollbarWidth: "none",       // Firefox
            msOverflowStyle: "none",      // IE/Edge
            "&::-webkit-scrollbar": {
              display: "none"             // Chrome/Safari
            }
          }}
        >
          {isPlanned && (
            <>
              <DietTextComponent size={14} weight={700} value="Diet Plan Details" />

              <Table size="sm" borderAxis="both" sx={{ mt: 1, mb: 2 }}>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Diet</th>
                    <th>Template</th>
                    <th>Dietecian</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Stop</th>
                  </tr>
                </thead>

                <tbody>
                  {dietHistory.map((row, i) => (
                    <tr key={i}>
                      <td><DietTextComponent size={12} value={formatDisplayDate(row.start)} /></td>
                      <td><DietTextComponent size={12} value={formatDisplayDate(row.end)} /></td>
                      <td><DietTextComponent size={12} value={row.diet || "-"} /></td>
                      <td><DietTextComponent size={12} value={row.template_name || "-"} /></td>
                      <td><DietTextComponent size={12} value={row.Dietecian_name || "-"} /></td>
                      <td><DietTextComponent size={12} value={row.doctor || "-"} /></td>
                      <td>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={row.status === "ACTIVE" ? "success" : "neutral"}
                        >
                          {row.status}
                        </Chip>
                      </td>
                      <td>
                        <Box
                          onClick={() => handleEdit(row)}
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: "pointer" }}
                        >
                          <EditIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                        </Box>
                      </td>

                      <td>
                        <Box
                          onClick={() => hanldeStopDiet(plan_id)}
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: "pointer" }}
                        >
                          <CancelIcon sx={{ fontSize: 16, color: "#d32f2f" }} />
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Divider />


              <TemplateDetailsTable groupedData={groupedData} />
            </>
          )}

          {/* ===== FORM (ONLY NOT PLANNED) ===== */}
          {(!isPlanned || editMode) && (
            <>
              <Box sx={{ mt: 2 }}>
                <DietInputLabel name="Select Diet Name" />
                <SelectPatientDiet value={dietType} setValue={setDietType} />
              </Box>

              <Box sx={{ mt: 2 }}>
                <DietInputLabel name="Select Dietitian" />
                <SelectDieticain value={dietecian} setValue={setDietecian} />
              </Box>

              {/* DATE */}
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Suspense fallback={null}>
                        <DatePickerComponent
                          label="Start Date"
                          value={startDate}
                          setValue={setStartDate}
                          maxDate={endDate}
                        />
                      </Suspense>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Suspense fallback={null}>
                        <DatePickerComponent
                          label="End Date"
                          value={endDate}
                          setValue={setEndDate}
                          minDate={startDate}
                        />
                      </Suspense>
                    </Box>
                  </Box>
                </LocalizationProvider>
              </Box>
            </>
          )}

        </Box>

        {/* ================= FOOTER ================= */}
        <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="plain" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="solid"
            disabled={!isValid}
            onClick={() => handleSubmit(editMode ? "update" : "save")}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </Box>

      </ModalDialog>
    </Modal>
  );
};

export default DietPlan;