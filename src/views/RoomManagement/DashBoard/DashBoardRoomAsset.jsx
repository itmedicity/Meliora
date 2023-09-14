import { Box, Button,  } from '@mui/material'
import React, { useCallback,  } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose'
const DashBoardRoomAsset = ({ campusName, buildblockname, floorName, roomName,setAssetList,blockName }) => {
    const CloseRoom = useCallback(() => {
        setAssetList(0)
    }, [setAssetList])     
  return (
      <CardMasterClose
          title={campusName + '/' + buildblockname?.toLowerCase() + '/' + floorName?.toLowerCase() + '/'+ blockName?.toLowerCase() + '/' + roomName?.toLowerCase()}
          close={CloseRoom}
      >          
          <Box sx={{ width: '100%',height:'100px',boxShadow:3 }}>uuu</Box>
          <Box sx={{ width: '100%', display: 'flex',mt:4 }}> 
            
              <Box sx={{ width: '48%', height: '230px', boxShadow: 3, }}>
                  <Box       sx={{
                      backgroundColor: 'ButtonFace',
                      textTransform: 'capitalize',
                      fontFamily: 'cursive',
                      fontSize: 13,
                      textAlign: 'left',
                      pl: 2,
                      border: 0.2,
                      borderColor: 'transparent',
                      borderBottomColor: 'lightgrey',
                    }}>FIXED ASSETS </Box>
                  
                  </Box>
              <Box sx={{ width: '48%', height: '230px', boxShadow: 3, ml: 7 }}>
              <Box       sx={{
                      backgroundColor: 'ButtonFace',
                      textTransform: 'capitalize',
                      fontFamily: 'cursive',
                      fontSize: 13,
                      textAlign: 'left',
                      pl: 2,
                      border: 0.2,
                      borderColor: 'transparent',
                      borderBottomColor: 'lightgrey',
                    }}>MOVABLE ASSETS </Box>                  
              </Box>      
               </Box>
          <Box sx={{ width: '100%', display: 'flex',mt:4 }}> 
            
              <Box sx={{ width: '48%', height: '230px', boxShadow: 3 }}>
              <Box       sx={{
                      backgroundColor: 'ButtonFace',
                      textTransform: 'capitalize',
                      fontFamily: 'cursive',
                      fontSize: 13,
                      textAlign: 'left',
                      pl: 2,
                      border: 0.2,
                      borderColor: 'transparent',
                      borderBottomColor: 'lightgrey',
                    }}>N</Box>                
            </Box>
              <Box sx={{ width: '48%', height: '230px', boxShadow: 3, ml: 7 }}>
              <Box       sx={{
                      backgroundColor: 'ButtonFace',
                      textTransform: 'capitalize',
                      fontFamily: 'cursive',
                      fontSize: 13,
                      textAlign: 'left',
                      pl: 2,
                      border: 0.2,
                      borderColor: 'transparent',
                      borderBottomColor: 'lightgrey',
                    }}>COMPLAINTS </Box>                
            </Box>
          </Box>
          <Box sx={{mt:2}}>
          <Button variant="contained">add Asset</Button>
              </Box>          
    </CardMasterClose> 
    )
}
export default DashBoardRoomAsset