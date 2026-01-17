import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Checkbox,
  Textarea,
  Button,
  Stack,
  Box,
  Chip,
  Table,
  Divider
} from "@mui/joy";

import DeitMastComponent from "./DeitCommonComponents/DietMastComponent";

const DietPlan = ({ open, setOpen, selectedPatientData, dietTypes }) => {
  const {
    ptc_ptname,
    pt_no,
    status,
    mrdNo,
    gender,
    age,
    doctor,
    location,
  } = selectedPatientData || {};

  const [dietType, setDietType] = useState("");
  const [consultRequired, setConsultRequired] = useState(false);
  const [remarks, setRemarks] = useState("");

  const rows = [
    {
      date: "2025-12-17 09:30 AM",
      dietType: "Regular",
      plannedUser: "Dietician A",
      DietPlanstatus: "Active",
    },
    {
      date: "2025-12-16 11:30 AM",
      dietType: "High Protein",
      plannedUser: "Dietician B",
      DietPlanstatus: "Inactive",
    },
    {
      date: "2025-12-15 08:30 AM",
      dietType: "Diabetic Diet",
      plannedUser: "Dietician C",
      DietPlanstatus: "Inactive",
    },
  ];

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          width: 700,
          borderRadius: "lg",
          p: 0,
          overflow: "hidden",
          boxShadow: "lg",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            bgcolor: "neutral.softBg",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" >
            <Box>
              <Typography level="h4" fontWeight={700}>
                {ptc_ptname}
              </Typography>
              <Typography level="body-sm" fontWeight={600} color="text.secondary">
                MRD No: {mrdNo} • IP No: {pt_no || "N/A"}
              </Typography>
              <Typography level="body-sm" fontWeight={600} color="text.secondary">
                {gender} • {age} yrs
              </Typography>
              <Typography level="body-md" fontWeight={600} mt={0.5}>
                {doctor}
              </Typography>
            </Box>

            <Stack alignItems="flex-end" spacing={0.5}>
              <Typography level="body-sm" fontWeight={700}>
                {location}
              </Typography>
              <Typography level="body-sm" fontWeight={700}>
                H084NR
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              size="md"
              variant="soft"
              color={status === 1 ? "success" : "danger"}
              sx={{
                fontWeight: 800,
                px: 2,
                py: 1,
                fontSize: 15,
              }}
            >
              {status === 1 ? "PLANNED" : "NOT PLANNED"}
            </Chip>
          </Box>
        </Box>

        <Box sx={{ px: 3, py: 2 }}>
          {status === 1 ? <Box>
            <Typography level="title-sm" fontWeight={700} mb={1}>
              Diet Plan History
            </Typography>
            <Table
              size="sm"
              borderAxis="both"
              sx={{
                mb: 2,
                "--TableCell-paddingY": "8px",
                "--TableCell-paddingX": "10px",
              }}
            >
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Diet Type</th>
                  <th>Planned By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.dietType}</td>
                    <td>{row.plannedUser}</td>
                    <td>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={row.DietPlanstatus === "Active" ? "success" : "neutral"}
                      >
                        {row.DietPlanstatus}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider sx={{ my: 2 }} />
          </Box> : null}

          <Typography level="title-sm" fontWeight={700} mb={1}>
            Change Diet Plan
          </Typography>
          <Box sx={{ mb: 1 }}>
            <DeitMastComponent
              setDietType={setDietType}
              dietType={dietType}
              dietTypes={dietTypes}
            />
          </Box>
          <FormControl orientation="horizontal" sx={{ alignItems: "center", mb: 1 }}>
            <Checkbox
              checked={consultRequired}
              onChange={(e) => setConsultRequired(e.target.checked)}
            />
            <FormLabel sx={{ ml: 1 }}>Consultation Required</FormLabel>
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Remarks</FormLabel>
            <Textarea
              minRows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter clinical or dietary remarks"
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.level1",
          }}
        >
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                console.log({ dietType, consultRequired, remarks });
                setOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
export default DietPlan;
