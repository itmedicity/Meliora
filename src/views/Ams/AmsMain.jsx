import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Table } from '@mui/joy'
import { useQuery } from 'react-query';
import { Paper } from '@mui/material';
import CusIconButton from '../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import AmsAddPatientDetailsModal from './AmsAddPatientDetailsModal';
import { getAntibioticPatientDetailz } from 'src/api/AntibioticApi';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const AmsMain = () => {

  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState(null)
  const [addDetailsFlag, setaddDetailsFlag] = useState(0)
  const [addDetailsOpen, setaddDetailsOpen] = useState(false)
  const [patientDetail, setPatientDetail] = useState([])

  const {
    data: PatientData = [],
    isLoading,
  } = useQuery({
    queryKey: ['getAntibioticPatients'],
    queryFn: () => getAntibioticPatientDetailz(),
  });

  const PatientDetailsData = useMemo(() => PatientData, [PatientData])

  const OpenPatientDetailsModal = useCallback((val) => {
    setaddDetailsFlag(1)
    setaddDetailsOpen(true)
    setPatientDetail(val)
  }, [setaddDetailsFlag, setaddDetailsOpen])



  const closePage = useCallback(() => {
    history.push('/Home');
  }, [history]);

  return (
    <Paper sx={{ pb: .5 }}>
      <Box sx={{ flex: 1, height: 30, bgcolor: '#eff3f6', display: 'flex' }}>
        <Box sx={{ flex: 1, p: .5 }}>
          Antibiotic Prescription Patient Details
        </Box>
        <CusIconButton size="sm" variant="outlined" color="primary">
          <CloseIcon fontSize='small' onClick={closePage} />
        </CusIconButton>

      </Box>
      <CssVarsProvider>
        {addDetailsFlag === 1 ?
          <AmsAddPatientDetailsModal setaddDetailsFlag={setaddDetailsFlag} addDetailsOpen={addDetailsOpen} setaddDetailsOpen={setaddDetailsOpen} patientDetail={patientDetail}
            setPatientDetail={setPatientDetail} /> : null
        }
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              m: 1,
              height: '80vh',
              overflow: 'auto',
              border: 1,
              borderColor: 'lightgrey',
              '&::-webkit-scrollbar': {
                height: '12px',
                width: '12px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '6px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            <Table
              borderAxis="bothBetween"
              // size='sm'
              sx={{
                // All headers sticky on Y-axis
                '& thead th': {
                  position: 'sticky',
                  top: 0,
                  zIndex: 3,
                  backgroundColor: 'background.surface',
                },
                // First column (header + body) sticky on X-axis
                '& thead th:first-of-type': {
                  left: 0,
                  zIndex: 4,
                  boxShadow: '1px 0 var(--TableCell-borderColor)',
                },
                '& tbody td:first-of-type': {
                  position: 'sticky',
                  left: 0,
                  zIndex: 2,
                  backgroundColor: 'background.surface',
                  boxShadow: '1px 0 var(--TableCell-borderColor)',
                },
                // Second column (header + body) sticky on X-axis
                '& thead th:nth-of-type(2)': {
                  left: 60, // Adjust based on actual width of first column
                  zIndex: 4,
                  boxShadow: '1px 0 var(--TableCell-borderColor)',
                },
                '& tbody td:nth-of-type(2)': {
                  position: 'sticky',
                  left: 60, // Match above
                  zIndex: 2,
                  backgroundColor: 'background.surface',
                  boxShadow: '1px 0 var(--TableCell-borderColor)',
                },
                // Selected row highlight
                '& tr.selected': {
                  backgroundColor: '#eff3f6',
                },
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: 60, textAlign: 'center' }}>Edit</th>
                  <th style={{ width: 160, textAlign: 'center' }}>Mrd No.</th>
                  <th style={{ width: 180, textAlign: 'center' }}>IP No.</th>
                  <th style={{ width: 250, textAlign: 'center' }}>Patient Name</th>
                  <th style={{ width: 60, textAlign: 'center' }}>Age</th>
                  <th style={{ width: 100, textAlign: 'center' }}>Gender</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Location</th>
                  <th style={{ width: 100, textAlign: 'center' }}>Bed No.</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Consultant Department</th>
                  <th style={{ width: 250, textAlign: 'center' }}>Consultant Doctor</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Clinical Assessment </th>
                  <th style={{ width: 180, textAlign: 'center' }}>Sample ID</th>
                  <th style={{ width: 200, textAlign: 'center' }}> Date of Collection</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Whether Sample Collected For Antibiotic</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Date of issue of Report</th>
                  <th style={{ width: 200, textAlign: 'center' }}>ABST Culture Report </th>
                  <th style={{ width: 300, textAlign: 'center' }}> Empirical Antibiotic Date of Start </th>
                  <th style={{ width: 300, textAlign: 'center' }}> Empirical Antibiotic Compliance to policy </th>
                  <th style={{ width: 300, textAlign: 'center' }}> Escalation/De-escalation IV to Oral Switch</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Compliance to Pathogen Directed Therapy</th>
                  <th style={{ width: 100, textAlign: 'center' }}>Lab No.</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Specimen</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Fluid Type</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Sample Type</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Investigation</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Growth</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Growth Remark 1</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Growth Remark 2</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Growth Remark 3</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Cultural Details Remark</th>
                  <th style={{ width: 300, textAlign: 'center' }}>Physician And Ams Comments</th>
                  <th style={{ width: 200, textAlign: 'center' }}>Patient Out Come</th>
                </tr>
              </thead>
              <tbody>
                {PatientDetailsData.map((val, index) => (
                  <tr key={index}
                    onClick={() => setSelectedRow(index)}
                    style={{ cursor: 'pointer' }}
                    className={selectedRow === index ? 'selected' : ''}>
                    <td style={{ width: 50, P: 0, textAlign: 'center' }} >
                      <Button variant='soft' size='sm' style={{ width: 40, }} onClick={() => OpenPatientDetailsModal(val)}>
                        Add
                      </Button>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{val.mrd_no}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{val.patient_ip_no}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{val.patient_name}</td>
                    <td style={{ textAlign: 'center', }}>{val.patient_age}</td>
                    <td style={{ textAlign: 'center', }}>{val.patient_gender}</td>
                    <td style={{ textAlign: 'center' }}>{val.patient_location}</td>
                    <td style={{ textAlign: 'center' }}>{val.bed_code}</td>
                    <td style={{ textAlign: 'center' }}>{val.consultant_department}</td>
                    <td style={{ textAlign: 'center' }}>{val.doc_name} </td>
                    <td style={{ textAlign: 'center' }}>{val.clinical_assesment}</td>
                    <td style={{ textAlign: 'center' }}>{val.sample_id}</td>
                    <td style={{ textAlign: 'center' }}>{val.date_of_collection}</td>
                    <td style={{ textAlign: 'center' }}>{val.samp_collect_for_antibiotic === 1 ? "yes" : "No"}</td>
                    <td style={{ textAlign: 'center' }}>{val.date_of_issue_of_report}</td>
                    <td style={{ textAlign: 'center' }}>{val.abst_culture_report}</td>
                    <td style={{ textAlign: 'center' }}>{val.emprical_antibio_date_of_start}</td>
                    <td style={{ textAlign: 'center' }}>{val.emprical_antibio_complaince_policy === 1 ? "yes" : "No"}</td>
                    <td style={{ textAlign: 'center' }}>{val.escal_descal_iv_oral_switich}</td>
                    <td style={{ textAlign: 'center' }}>{val.compliance_pathogen_directed_therapy === 1 ? "yes" : "No"}</td>
                    <td style={{ textAlign: 'center' }}>{val.lab_no}</td>
                    <td style={{ textAlign: 'center' }}>{val.specimen}</td>
                    <td style={{ textAlign: 'center' }}>{val.fluid_type}</td>
                    <td style={{ textAlign: 'center' }}>{val.sample_type}</td>
                    <td style={{ textAlign: 'center' }}>{val.investigation}</td>
                    <td style={{ textAlign: 'center' }}>{val.growth} </td>
                    <td style={{ textAlign: 'center' }}>{val.growth_remark_one}</td>
                    <td style={{ textAlign: 'center' }}>{val.growth_remark_two}</td>
                    <td style={{ textAlign: 'center' }}>{val.growth_remark_three}</td>
                    <td style={{ textAlign: 'center' }}>{val.culture_details_remarks}</td>
                    <td style={{ textAlign: 'center' }}>{val.physician_ams_comments}</td>
                    <td style={{ textAlign: 'center' }}>{val.patient_outcome}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>)}
      </CssVarsProvider>
    </Paper >

  )
}

export default AmsMain