import { Box } from '@mui/material'
import React, { Fragment,useState,useCallback,memo } from 'react'
import DashBoardFloor from './DashBoardFloor'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import tmc from '../../../../src/assets/images/tmc.jpg'
import tmch from '../../../../src/assets/images/tmch.jpg'
import tnc from '../../../../src/assets/images/tnc.jpg'
import dentalclg from '../../../../src/assets/images/vue.jpg'
import stfc from '../../../../src/assets/images/staff_cotters.jpg'
import dc from '../../../../src/assets/images/doctor.jpg'
import pgh from '../../../../src/assets/images/pgcottage.jpg'
import mbbsm from '../../../../src/assets/images/mbbsboys.jpg'
import mbbsg from '../../../../src/assets/images/mbbsgirls.jpg'
import nurse_staff from '../../../../src/assets/images/nuse_staff.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const DashBoardMain = () => {
  const Floordatas = React.lazy(() => import('../DashBoard/DashBoardFloor'))
  const history = useHistory()
  const [floorList, setFoolrList] = useState(0)
  const [buildNo, setBuildNo] = useState(0)
  const [campusName, setCampusName] = useState('')

  const floorTMCH = useCallback((e) => {
    setBuildNo(1)
    setCampusName(' Travancore Medicity')
    setFoolrList(1)
  }, [])

  const floorTMC = useCallback((e) => {
    setBuildNo(2)
    setCampusName('  Travancore Medical College ')
    setFoolrList(1)
  }, [])
  const floorTNC = useCallback((e) => {
    setBuildNo(3)
    setCampusName('   Travancore Nursing College ')
    setFoolrList(1)
  }, [])
  const floorDNTL = useCallback((e) => {
    setBuildNo(4)
    setCampusName('  Travancore Dental College ')
    setFoolrList(1)
  }, [])

  const floorSTFC = useCallback((e) => {
    setBuildNo(5)
    setCampusName('Staff cotters')
    setFoolrList(1)
  }, [])
  const floorDC = useCallback((e) => {
    setBuildNo(6)
    setCampusName('  Doctors cotters ')
    setFoolrList(1)
  }, [])
  const floorPG = useCallback((e) => {
    setBuildNo(7)
    setCampusName('  PG Cottage ')
    setFoolrList(1)
  }, [])
  const floorMBBSM = useCallback((e) => {
    setBuildNo(8)
    setCampusName('  MBBS Boys Hostel ')
    setFoolrList(1)
  }, [])
  const floorMBBSL = useCallback((e) => {
    setBuildNo(9)
    setCampusName('  MBBs Girls Hostel ')
    setFoolrList(1)
  }, [])
  const floorNS = useCallback((e) => {
    setBuildNo(10)
    setCampusName('  Bsc Nursing and Staff Hostel ')
    setFoolrList(1)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      {floorList === 1 ? (
        <Floordatas buildNo={buildNo} setFoolrList={setFoolrList} campusName={campusName} />
      ) : (
        <CardMasterClose title="Quilon Medical Trust" close={backtoSetting}>
          <Box>
            <Box sx={{ display: 'flex', height: '230px' }}>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tmch}
                    alt="react logo"
                    onClick={floorTMCH}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tmc}
                    alt="TMC"
                    onClick={floorTMC}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tnc}
                    alt="tnc"
                    onClick={floorTNC}
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                Travancore Medicity
              </Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                Travancore Medical College
              </Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                Travancore Nursing College
              </Box>
            </Box>

            <Box sx={{ display: 'flex', height: '230px' }}>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={dentalclg}
                    alt="dental collage"
                    onClick={floorDNTL}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={stfc}
                    alt="staff cotters"
                    onClick={floorSTFC}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={dc}
                    alt="doctors cotters"
                    onClick={floorDC}
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                Travancore dental college
              </Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>Staff cotters</Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>Doctors cotters</Box>
            </Box>

            <Box sx={{ display: 'flex', height: '230px' }}>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={pgh}
                    alt="pg hostel"
                    onClick={floorPG}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={mbbsm}
                    alt="mbbs men's hostel"
                    onClick={floorMBBSM}
                    loading="lazy"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '33%' }}>
                <Box
                  sx={{
                    width: '350px',
                    height: '220px',
                    backgroundColor: 'grey',
                    margin: 'auto',
                    boxShadow: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={mbbsg}
                    alt="mbbs ladies hostel"
                    onClick={floorMBBSL}
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>Pg hostel</Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                MBBS boys hostel
              </Box>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                MBBS girls hostel
              </Box>
            </Box>

            <Box sx={{ width: '33%' }}>
              <Box
                sx={{
                  width: '350px',
                  height: '220px',
                  backgroundColor: 'grey',
                  margin: 'auto',
                  boxShadow: 10,
                  borderRadius: 5,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={nurse_staff}
                  alt="nurse and staff girls hostel"
                  onClick={floorNS}
                  loading="lazy"
                />
              </Box>
              {floorList === 1 ? <DashBoardFloor /> : null}
            </Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', fontWeight: 600 }}>
                Bsc. Nursing and staff hostel
              </Box>
            </Box>
          </Box>
        </CardMasterClose>
      )}
    </Fragment>
  )
}

export default memo(DashBoardMain)
