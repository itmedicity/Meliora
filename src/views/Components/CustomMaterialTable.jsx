import React, { Fragment, memo } from 'react'
import MaterialTable from 'material-table';

const CustomMaterialTable = (props) => {
    const { title, columns, data, actions, icons } = props
    return (
        <Fragment>
            <MaterialTable
                title={title}
                columns={columns}
                icons={icons}
                data={data}
                actions={actions}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0,
                    exportButton: true,
                    // rowStyle: {
                    //     backgroundColor: '#EEE',
                    // },
                    // headerStyle: {
                    //     backgroundColor: bgcolrheading,
                    //     color: '#FFF'
                    // },
                    // filtering: true
                }}
            />
        </Fragment>
    )
}

export default memo(CustomMaterialTable)