import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardTwo from 'src/views/Components/CardTwo'
import CheckBox from 'src/views/Components/CheckBox'
import TextInput from 'src/views/Components/TextInput'
import ModuleTable from './ModuleTable'

const ModuleMaster = () => {

    const [count, setCount] = useState(0)
    const history = useHistory()
    //Initializing
    const [module, setModule] = useState({
        module_name: '',
        module_status: false
    })

    //Destructuring
    const { module_name, module_status } = module;
    const updateModule = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setModule({ ...module, [e.target.name]: value })
    }

    //submitt data
    const postdata = {
        module_name: module_name,
        module_status: module_status === true ? 1 : 0
    }
    //reset from
    const formreset = {
        module_name: '',
        module_status: false
    }
    //Form Submitting
    const submitModule = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/modulemaster', postdata)
        const { message, success } = result.data;
        if (success === 1) {
            succesNotify(message)
            setCount(count + 1);
            setModule(formreset);
        } else if (success === 0) {
            infoNotify(message.sqlMessage);
        } else {
            infoNotify(message)
        }
    }
    const backtoSetting = () => {
        history.push('/Home/Settings')
    }


    return (

        <CardTwo
            heading="Module Master"
            submit={submitModule}
            close={backtoSetting}
        >
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <div className="col-md-12">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="Module Name"
                                aria-label=".form-control-sm"
                                fullWidth
                                name="module_name"
                                value={module_name}
                                autoComplete="off"
                                changeTextValue={(e) => updateModule(e)}
                            />
                        </div>
                        <div className="col-md-12">
                            <CheckBox
                                name="module_status"
                                color="primary"
                                label="Status"
                                value={module_status}
                                checked={module_status}
                                onchange={(e) => updateModule(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <ModuleTable count={count} />
                    </div>
                </div>
            </div>



        </CardTwo>
    )
}

export default ModuleMaster