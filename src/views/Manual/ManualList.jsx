import { Box, Typography } from '@mui/material'
import React, { useState, memo, useCallback } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import Button from '@mui/material/Button'
import PdfviewNas from './PdfviewNas'
import { axioslogin } from '../Axios/Axios'
import { PUBLIC_NAS_FOLDER } from '../Constant/Static'
import { useNavigate } from 'react-router-dom'

const ManualList = () => {
  const history = useNavigate()
  const [pdfDis, setPdfDis] = useState(0)
  const [uploadedImages, setUploadedImages] = useState([])

  const employeeGuide = () => {
    setPdfDis(1)
  }

  const lasa2023 = () => {
    setPdfDis(2)
  }
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
        const fileUrls = fileNames.map((fileName) => {
          return `${PUBLIC_NAS_FOLDER}/fileshows/HOSPITAL MANUAL/${fileName}`
        })
        const savedFiles = fileUrls.map((val) => {
          const parts = val.split('/')
          const fileNamePart = parts[parts.length - 1]
          const obj = {
            imageName: fileNamePart,
            url: val,
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
        const fileUrls = fileNames.map((fileName) => {
          return `${PUBLIC_NAS_FOLDER}/fileshows/STANDARD TREATMENT GUIDLINE/${fileName}`
        })
        const savedFiles = fileUrls.map((val) => {
          const parts = val.split('/')
          const fileNamePart = parts[parts.length - 1]
          const obj = {
            imageName: fileNamePart,
            url: val,
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
        <Box sx={{ width: '100%', p: 1 }}>
          <Typography sx={{ fontSize: 15, font: 'Roboto', textTransform: 'capitalize' }}>
            NABH GuideLines
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => employeeGuide()}
              >
                {' '}
                Employee Guide
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              {/* <Button size="small" sx={{ pt: 1.5, pl: 2, pb: 1, fontSize: 15, font: 'Roboto', textTransform: "capitalize" }}
                                    onClick={() => lasa2023()}> LASA </Button> */}
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Sound()}
              >
                Sound Alike Drugs
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => sradhapolicy()}
              >
                Sradha Antibiotic Policy{' '}
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => safety()}
              >
                MSDS Handbook_E1{' '}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => meddef()}
              >
                MEDF
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Abbreviation()}
              >
                Abbreviation
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Fridge()}
              >
                Fridge Medicines
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => High()}
              >
                High Risk Drugs
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Alike()}
              >
                Look Alike
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Psychotropic()}
              >
                Psychotropic Drugs
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Hospital()}
              >
                Hospital Manual
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                flex: 1,
              }}
            >
              <Button
                size="small"
                sx={{
                  pt: 1.5,
                  pl: 2,
                  pb: 1,
                  fontSize: 15,
                  font: 'Roboto',
                  textTransform: 'capitalize',
                }}
                onClick={() => Standard()}
              >
                Standard Treatment Guidline
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <PdfviewNas pdfDis={pdfDis} uploadedImages={uploadedImages} />
      )}
    </CardCloseOnly>
  )
}

export default memo(ManualList)
