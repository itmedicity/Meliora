import React, { memo, useCallback, useState ,useEffect,useMemo} from 'react'
import { Box, Typography, Table, CssVarsProvider } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchIcon from '@mui/icons-material/Search';
import {  Tooltip,Paper } from '@mui/material';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CachedIcon from '@mui/icons-material/Cached';

const WifiManageMentMains = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useHistory()
  const [tabledata, setTabledata] = useState([])
  const [selectedRow,setSelectedRow]=useState([])
  const [ipNumber, setipNumber] = useState({
        ip_slno: '',
        in_patient_no:'',        
        patient: false,
        bystander: false,
        extra: false,
  })  
      const { ip_slno, in_patient_no, patient,bystander,extra } = ipNumber
      const updateWifiManagement = useCallback(
        (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
          setipNumber({ ...ipNumber, [e.target.name]: value })
        },
        [ipNumber],
      )
    
      const patchdata = useMemo(() => {
        return {
          ip_slno: ip_slno,
          in_patient_no: in_patient_no,
          patient: patient === true ? 1 : 0,
          bystander: bystander === true ? 1 : 0,
          extra: extra === true ? 1 : 0
    
        }
      }, [ip_slno, in_patient_no, patient, bystander, extra])  
  
      useEffect(() => {
        const getdataMeliora = async (in_patient_no) => {     
                 const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
               const { success, data } = result.data
                    if (success === 2) {
                      setSelectedRow(data)
                                           
          }
        }        
        if (in_patient_no !== '' && count!==0) {
          getdataMeliora(in_patient_no)
        }
      },[in_patient_no,count])
  
  
  const searchIP = useCallback(() => {
    const getdata = async (in_patient_no) => {
      const result = await axiosellider.get(`/admission/getIpadmissChecks/${in_patient_no}`)
      return result.data
    }

    const insertdata = async (postdata) => {
      const result = await axioslogin.post('/wifiManagement/insert', postdata)
      return result.data
    }        
               

    const getdataMeliora = async(in_patient_no)=> {        
        const result = await axioslogin.get(`/wifiManagement/viewbyid/${in_patient_no}`)
              return result.data         
      }      
      

    getdata(in_patient_no).then((val) => {
      const { success} = val
      if (success === 1) {
        const postdata = {
          in_patient_no: in_patient_no,
          patient: 0,
          bystander: 0,
          extra: 0
        }



        getdataMeliora(in_patient_no).then((values) => {


          const { success,data} = values
            if (success === 2) {
              const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]

              const frmdata = {
                              ip_slno: ip_slno,
                              in_patient_no: in_patient_no,
                                patient: patient === 1 ? true : false,
                                bystander: bystander === 1 ? true : false,
                                extra: extra === 1 ? true : false,
                            }
              setipNumber(frmdata)
              
              setSelectedRow(data)


            }
            
            else {
            
        insertdata(postdata).then((values) => {
          const { success} = values
          if (success === 1) {

            getdataMeliora(in_patient_no).then((values) => {

              const { success,data} = values
              if (success === 2) {
                const { ip_slno, in_patient_no, patient, bystander, extra } = data[0]
  
                const frmdata = {
                                ip_slno: ip_slno,
                                in_patient_no: in_patient_no,
                                  patient: patient === 1 ? true : false,
                                  bystander: bystander === 1 ? true : false,
                                  extra: extra === 1 ? true : false,
                              }
                setipNumber(frmdata)
                
                setSelectedRow(data)
  
  
              }
            })
          }
        })  
            }
                      })

      }  

      else {
        warningNotify("pateint Discharged")
      }
    })
    
}, [in_patient_no])

    

      const submitWifiManagement = useCallback(
        (e) => {
          e.preventDefault()    
          const InsertWifiManagement = async (patchdata) => {
            const result = await axioslogin.patch('/wifiManagement/update', patchdata)    
            const { message, success } = result.data
            if (success === 2) {
              setCount(count + 1)
              succesNotify(message)
              
            } else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          }      
          if (value === 0) {
            if (in_patient_no !== '') {
                InsertWifiManagement(patchdata)
            }
            else {
              infoNotify("Please fill the feilds")
            }
          }       
        },
        [value,count,in_patient_no,patchdata],
      )
     
      const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
      }, [history])
   
  
  
      useEffect(() => {        
        if (selectedRow.length !== 0) {
                      const arr = selectedRow?.map((val) => {
                const obj = {
                  in_patient_no:val.in_patient_no,   
                  patient: val.patient===1?"Issued":"Not Issued",                                 
                  bystander: val.bystander===1?"Issued":"Not Issued",
                  extra: val.extra===1?"Issued":"Not Issued" 
                  
                 }
                return obj
              })
          setTabledata(arr)
         
        }

    }, [selectedRow,count])  
    const refreshWindow = useCallback(() => {
    const frmdata = {
      ip_slno: '',
      in_patient_no:'',        
      patient: false,
      bystander: false,
      extra: false,
    }
    setipNumber(frmdata)
      setValue(0)
      setTabledata([])
   
  }, [setipNumber])
  return (
    <CardMaster
      submit={submitWifiManagement}
      close={backtoSetting}
      refresh={refreshWindow}>
          <Box sx={{ display: 'flex',margin:'auto',pt:1,width:800}}>
              <Box sx={{pt:.5,}}>
                  
                  <Typography>
                      Enter IP Number  
                  </Typography>
              </Box>
              <Box sx={{ flex: .5,pl:2,}}>
              <TextFieldCustom
              placeholder="IP Number"
              type="integer"
              size="sm"
              name="in_patient_no"
              value={in_patient_no}
              onchange={updateWifiManagement}
            ></TextFieldCustom>
              </Box>
              <Box sx={{  pl: 1, pt: .5, color: '#9DBED1', cursor: 'pointer', }}>
              <Tooltip title="search" placement="top">
             <SearchIcon onClick={() => searchIP()}/>
            </Tooltip>
           
        </Box>
        
        <Box sx={{ flex: .5, pl: 1, pt: .5, color: '#9DBED1', cursor: 'pointer', }}>
              <Tooltip title="refresh" placement="top">
             <CachedIcon onClick={() => refreshWindow()}/>
            </Tooltip>
           
        </Box>
        

              
          </Box>
          <Box sx={{ display: 'flex',margin:'auto',pt:1,width:500}}>              
                  
              <Box sx={{ pt: 1,}}>
            <CusCheckBox
              label="Patient"
              color="primary"
              size="md"
              name="patient"
              value={patient}
              checked={patient}
              onCheked={updateWifiManagement}
            ></CusCheckBox>
          </Box>
              
            <Box sx={{ pt: 1,pl:3  }}>
            <CusCheckBox
              label="Bystander"
              color="primary"
              size="md"
              name="bystander"
              value={bystander}
              checked={bystander}
              onCheked={updateWifiManagement}
            ></CusCheckBox>
          </Box>
             
              <Box sx={{ pt: 1 ,pl:3}}>
            <CusCheckBox
              label="Extra"
              color="primary"
              size="md"
              name="extra"
              value={extra}
              checked={extra}
              onCheked={updateWifiManagement}
            ></CusCheckBox>
          </Box>        
                         
      </Box>
      
          <Paper variant="outlined" sx={{ maxHeight: 720, maxWidth: '100%', overflow: 'auto' ,margin:'auto',mt:3}}>
          <CssVarsProvider>
          
          <Table stickyHeader hoverRow>
                <thead>                         
                <tr >
                 {/* <th >SlNo</th> */}
                <th> IP address</th>         
                <th >Patient</th>
                <th >Bystander</th>            
                <th >Extra</th>
           </tr>
            </thead>
            <tbody>
            {tabledata.map((val,index) => {            
              return <tr
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                maxHeight: 50, 
                  minHeight: 5
              }}
              >        
               <td> {val.in_patient_no}</td>
              <td> {val.patient}</td>
              <td> {val.bystander}</td>          
              <td> {val.extra}</td>
             
             

               
              </tr>
            })}         
          </tbody>

                  </Table>
                  </CssVarsProvider>
                  </Paper>
             
                  </CardMaster>                
                  
 
  )
}

export default memo(WifiManageMentMains)