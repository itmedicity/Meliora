import React, { useState, memo, useCallback } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import PdfviewNas from './PdfviewNas'
import { axioslogin } from '../Axios/Axios'
import { PUBLIC_NAS_FOLDER } from '../Constant/Static'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/joy'

const ManualList = () => {
  const history = useNavigate()
  const [pdfDis, setPdfDis] = useState(0)
  const [uploadedImages, setUploadedImages] = useState([])

  const employeeGuide = () => {
    setPdfDis(1)
  }

  // const lasa2023 = () => {
  //   setPdfDis(2)
  // }
  const sradhapolicy = () => {
    setPdfDis(3)
  }

  const safety = () => {
    setPdfDis(4)
  }

  const meddef = () => {
    setPdfDis(5)
  }

  const Abbreviation = () => {
    setPdfDis(6)
  }
  const Fridge = () => {
    setPdfDis(7)
  }
  const High = () => {
    setPdfDis(8)
  }
  const Alike = () => {
    setPdfDis(9)
  }
  const Psychotropic = () => {
    setPdfDis(10)
  }
  const Sound = () => {
    setPdfDis(11)
  }
  const Hospital = () => {
    setPdfDis(12)
    const getImage = async () => {
      const result = await axioslogin.get(`/newCRFRegisterImages/crfNabhImageGet`)
      const { success, data } = result.data
      if (success === 1) {
        const fileNames = data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/fileshows/HOSPITAL MANUAL/${fileName}`
        })
        const savedFiles = fileUrls.map(val => {
          const parts = val.split('/')
          const fileNamePart = parts[parts.length - 1]
          const obj = {
            imageName: fileNamePart,
            url: val
          }
          return obj
        })
        setUploadedImages(savedFiles)
      } else {
        setUploadedImages([])
      }
    }
    getImage()
  }
  const Standard = () => {
    setPdfDis(13)
    const getImage = async () => {
      const result = await axioslogin.get(`/newCRFRegisterImages/crfNabhGuidImageGet`)
      const { success, data } = result.data
      if (success === 1) {
        const fileNames = data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/fileshows/STANDARD TREATMENT GUIDLINE/${fileName}`
        })
        const savedFiles = fileUrls.map(val => {
          const parts = val.split('/')
          const fileNamePart = parts[parts.length - 1]
          const obj = {
            imageName: fileNamePart,
            url: val
          }
          return obj
        })
        setUploadedImages(savedFiles)
      } else {
        setUploadedImages([])
      }
    }
    getImage()
  }
  const backToSettings = useCallback(() => {
    history(`/Home/Manual`)
    setPdfDis(0)
  }, [history])

  return (
    <CardCloseOnly title="Documents" close={backToSettings}>
      {pdfDis === 0 ? (
        <Box sx={{ width: '100%', p: 2, maxHeight: '75vh', overflowY: 'auto' }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Roboto', mb: 2, textTransform: 'capitalize' }}
          >
            NABH Guidelines
          </Typography>

          {/* Button Helper to keep design consistent */}
          {[
            { label: 'Employee Guide', action: employeeGuide },
            { label: 'Sound Alike Drugs', action: Sound },
            { label: 'Sradha Antibiotic Policy', action: sradhapolicy },
            { label: 'MSDS Handbook_E1', action: safety },
            { label: 'MEDF', action: meddef },
            { label: 'Abbreviation', action: Abbreviation },
            { label: 'Fridge Medicines', action: Fridge },
            { label: 'High Risk Drugs', action: High },
            { label: 'Look Alike', action: Alike },
            { label: 'Psychotropic Drugs', action: Psychotropic },
            { label: 'Hospital Manual', action: Hospital },
            { label: 'Standard Treatment Guideline', action: Standard },
          ].map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{
                  textTransform: 'capitalize',
                  fontSize: 14,
                  fontFamily: 'Roboto',
                  justifyContent: 'flex-start',
                  px: 2,
                  py: 1.2,
                  borderRadius: 2,
                }}
                onClick={item.action}
              >
                <Typography level="body-sm" sx={{ color: 'var( --true-blue-600)' }}>{item.label}</Typography>
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <PdfviewNas pdfDis={pdfDis} uploadedImages={uploadedImages} />
      )}
    </CardCloseOnly>

  )
}

export default memo(ManualList)
