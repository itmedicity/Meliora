import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import DashBoardFloor from './DashBoardFloor'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import tmc from '../../../../src/assets/images/tmc.jpg'
import tmch from '../../../../src/assets/images/tmch.jpg'
import tnc from '../../../../src/assets/images/tnc.jpg'
import vue from '../../../../src/assets/images/vue.jpg'
import pg from '../../../../src/assets/images/pg.jpg'
import girls from '../../../../src/assets/images/girls.jpg'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { memo } from 'react'

const DashBoardMain = () => {
  const history = useHistory()
  const [floorList, setFoolrList] = useState(0)
  const [buildNo, setBuildNo] = useState(0)

  const floorTMCH = useCallback((e) => {
    setBuildNo(1)
    setFoolrList(1)
  }, [])

  const floorTMC = useCallback((e) => {
    setBuildNo(2)
    setFoolrList(1)
  }, [])
  const floorTNC = useCallback((e) => {
    setBuildNo(3)
    setFoolrList(1)
  }, [])
  const floorDNTL = useCallback((e) => {
    setBuildNo(4)
    setFoolrList(1)
  }, [])
  const floorPG = useCallback((e) => {
    setBuildNo(5)
    setFoolrList(1)
  }, [])
  const floorGRL = useCallback((e) => {
    setBuildNo(6)
    setFoolrList(1)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      {floorList === 1 ? (
        <DashBoardFloor buildNo={buildNo} setFoolrList={setFoolrList} />
      ) : (
        <CardMasterClose title="Quilon Medical Trust" close={backtoSetting}>
          <Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>TMCH</Box>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>TMC</Box>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>TNC</Box>
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tmch}
                    alt="react logo"
                    onClick={floorTMCH}
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tmc}
                    alt="angular"
                    onClick={floorTMC}
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={tnc}
                    alt="tnc"
                    onClick={floorTNC}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '60px' }}>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>DENTAL COLLEGE</Box>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>PG COTTAGE</Box>
              <Box sx={{ width: '33%', textAlign: 'center', pt: '25px' }}>LADIES HOSTEL</Box>
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={vue}
                    alt="vue"
                    onClick={floorDNTL}
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={pg}
                    alt="pg"
                    onClick={floorPG}
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
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={girls}
                    alt="girls"
                    onClick={floorGRL}
                  />
                </Box>
                {floorList === 1 ? <DashBoardFloor /> : null}
              </Box>
            </Box>
          </Box>
        </CardMasterClose>
      )}
    </Fragment>
  )
}

export default memo(DashBoardMain)
