import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import AmDeptSecLocationSelect from 'src/views/CommonSelectCode/AmDeptSecLocationSelect'
import EmployeeSelectJoyAutoComp from 'src/views/CommonSelectCode/EmployeeSelectJoyAutoComp'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ScrapLevelApproveMastTable from './ScrapLevelApproveMastTable'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'


const ScrapLevelApproveMaster = () => {

    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const history = useNavigate()
    const [deptSec, setDeptSec] = useState(0)
    const [employee, setEmployee] = useState(0)
    const [value, setValue] = useState(0)


    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [formData, setFormData] = useState({
        level_slno: '',
        levelNo: '',
        levelName: '',
        billGenPay: false,
        gatePassGen: false,
        gatePassApprv: false,
        clearanceLevel: false,
        status: true,
    })

    const { level_slno, levelNo, levelName, billGenPay, gatePassGen, gatePassApprv, clearanceLevel, status } = formData

    useEffect(() => {
        dispatch(getDeptsection())
    }, [dispatch])

    useEffect(() => {
        if (deptSec !== 0) {
            dispatch(getDepartSecemployee(deptSec))
        }
    }, [deptSec, dispatch])



    const updateField = useCallback(
        (e) => {
            let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (e.target.type === 'text') {
                value = value.toUpperCase();
            }
            setFormData({ ...formData, [e.target.name]: value });
        },
        [formData],
    );


    const [initialLevelNo, setInitialLevelNo] = useState(null);




    const RowSelect = useCallback((val) => {
        const { level_no, level_name, emp_id, bill_generation_payment, gate_pass_generation,
            gate_pass_approval, clearance_level, level_status, sec_id, level_slno
        } = val

        setValue(1)
        const frmdata = {
            levelNo: level_no,
            levelName: level_name,
            billGenPay: bill_generation_payment === 1 ? true : false,
            gatePassGen: gate_pass_generation === 1 ? true : false,
            gatePassApprv: gate_pass_approval === 1 ? true : false,
            clearanceLevel: clearance_level === 1 ? true : false,
            status: level_status === 1 ? true : false,
            level_slno: level_slno,
        }
        setFormData(frmdata)
        setEmployee(emp_id)
        setDeptSec(sec_id)
        setInitialLevelNo(level_no);
    }, [])


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])



    const reset = useCallback(() => {
        const frmdata = {
            levelNo: '',
            levelName: '',
            billGenPay: false,
            gatePassGen: false,
            gatePassApprv: false,
            clearanceLevel: false,
            status: true,
        }
        setFormData(frmdata)

        setValue(0)
        setDeptSec(0)
        setEmployee(0)
    }, [])


    const getscrapActiveFormLevels = async () => {
        const { data } = await axioslogin.get('condemMasters/getScrapActivelevels')
        if (data.success === 2) {
            return data.data
        } else {
            return
        }
    }

    const { data: ScrapActiveformlevel } = useQuery({
        queryKey: ['getscrapActiveLevel'],
        queryFn: () => getscrapActiveFormLevels(),
    });

    const postdata = useMemo(() => ({
        level_no: levelNo,
        level_name: levelName,
        emp_id: employee,
        bill_generation_payment: billGenPay === true ? 1 : 0,
        gate_pass_generation: gatePassGen === true ? 1 : 0,
        gate_pass_approval: gatePassApprv === true ? 1 : 0,
        clearance_level: clearanceLevel === true ? 1 : 0,
        level_status: status === true ? 1 : 0,
        create_user: id
    }), [levelNo, levelName, employee, billGenPay, gatePassGen, gatePassApprv, clearanceLevel, status, id]);


    const patchdata = useMemo(() => ({
        level_no: levelNo,
        level_name: levelName,
        emp_id: employee,
        bill_generation_payment: billGenPay === true ? 1 : 0,
        gate_pass_generation: gatePassGen === true ? 1 : 0,
        gate_pass_approval: gatePassApprv === true ? 1 : 0,
        clearance_level: clearanceLevel === true ? 1 : 0,
        level_status: status === true ? 1 : 0,
        level_slno: level_slno,
        edit_user: id

    }), [levelNo, levelName, employee, billGenPay, gatePassGen, gatePassApprv, clearanceLevel, status, level_slno, id]);


    const submitScrapLevelApprove = useCallback(
        (e) => {
            e.preventDefault();

            const insertScrapLevels = async (postdata) => {
                const result = await axioslogin.post('/condemMasters/scraplevelInsert', postdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    queryClient.invalidateQueries('getScrapFormApprovalLevels');
                    reset();
                } else {
                    infoNotify(message || "Insert failed");
                }
            };

            const updateScrapLevels = async (patchdata) => {
                const result = await axioslogin.patch('/condemMasters/scraplevelUpdate', patchdata);
                const { message, success } = result.data;
                if (success === 2) {
                    succesNotify(message);
                    queryClient.invalidateQueries('getScrapFormApprovalLevels');
                    reset();
                } else {
                    infoNotify(message || "Update failed");
                }
            };

            if (levelNo === '') {
                infoNotify("Please enter scrap level number");
                return;
            }

            // If the level_no hasn't changed, skip the duplicate check
            const levelNoChanged = initialLevelNo !== levelNo;

            const isDuplicate = ScrapActiveformlevel?.some((item) => {
                const itemLevelNo = Number(item.level_no);
                const itemSlno = Number(item.level_slno);
                if (value === 0) {
                    // INSERT: block if any row has same level_no
                    return itemLevelNo === Number(levelNo);
                } else {
                    // UPDATE: block only if another row has the same level_no, and it's not the same row
                    return levelNoChanged && itemLevelNo === Number(levelNo) && itemSlno !== Number(level_slno);
                }
            });

            if (isDuplicate) {
                infoNotify("Level Number already exists");
                return;
            }

            // Proceed with insert or update
            if (value === 0) {
                insertScrapLevels(postdata);
            } else {
                updateScrapLevels(patchdata);
            }
        },
        [postdata, patchdata, value, levelNo, level_slno, initialLevelNo, queryClient, ScrapActiveformlevel]
    );


    return (
        <Box>
            <CardMaster
                title="Scrap Form Level Approve"
                submit={submitScrapLevelApprove}
                close={backtoSetting}
                refresh={reset}
            >
                <Box sx={{ height: '100%', flex: 1, }}>
                    <Box sx={{ flex: 1, px: 1, display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                        <TextFieldCustom
                            style={{ width: 150 }}
                            startDecorator={"Level No. "}
                            type='number'
                            size="sm"
                            value={levelNo}
                            name='levelNo'
                            onchange={updateField}
                        />
                        <TextFieldCustom
                            style={{ width: 250 }}
                            placeholder="Level Name"
                            type="text"
                            name="levelName"
                            size="sm"
                            value={levelName}
                            onchange={updateField}
                        />

                        <Box sx={{ width: 300 }}>
                            <AmDeptSecLocationSelect location={deptSec} setLocation={setDeptSec} />
                        </Box>

                        <Box sx={{ width: 300 }}>
                            <EmployeeSelectJoyAutoComp employee={employee} setEmployee={setEmployee} />
                        </Box>

                    </Box>`

                    <Box sx={{ flex: 1, py: 2, pl: 1, display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                        <CusCheckBox
                            label="Bill generation and payment"
                            color="primary"
                            size="md"
                            name="billGenPay"
                            value={billGenPay}
                            checked={billGenPay}
                            onCheked={updateField}
                        />
                        &nbsp;
                        <CusCheckBox
                            label="Gate Pass generation"
                            color="primary"
                            size="md"
                            name="gatePassGen"
                            value={gatePassGen}
                            checked={gatePassGen}
                            onCheked={updateField}

                        />
                        &nbsp;
                        <CusCheckBox
                            label="Gate Pass Approval"
                            color="primary"
                            size="md"
                            name="gatePassApprv"
                            value={gatePassApprv}
                            checked={gatePassApprv}
                            onCheked={updateField}
                        />
                        &nbsp;
                        <CusCheckBox
                            label="Clearance Level"
                            color="primary"
                            size="md"
                            name="clearanceLevel"
                            value={clearanceLevel}
                            checked={clearanceLevel}
                            onCheked={updateField}
                        />
                        &nbsp;
                        <CusCheckBox

                            label="Level Status"
                            color="primary"
                            size="md"
                            name="status"
                            value={status}
                            checked={status}
                            onCheked={updateField}
                        />
                    </Box>
                </Box>
            </CardMaster>
            <Box sx={{ flex: 1, p: .5 }}>
                <ScrapLevelApproveMastTable RowSelect={RowSelect} />
            </Box>
        </Box>
    )
}

export default memo(ScrapLevelApproveMaster)
