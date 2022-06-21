import React, { Fragment } from 'react'
import MaterialTable from 'material-table';
import { tableIcons } from '../Common/MaterialiCon';

const CustomMaterialTable = () => {
    return (
        <Fragment>
            <MaterialTable
                title="Test Table"
                icons={tableIcons}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1,
                    exportButton: true,
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    filtering: true
                }}
            />
        </Fragment>
    )
}

export default CustomMaterialTable