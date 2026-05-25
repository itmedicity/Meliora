import React, { memo } from 'react'
import {
    Box,
    CssVarsProvider,
    Modal,
    ModalDialog,
    ModalClose,
    Typography
} from '@mui/joy'
import Table from '@mui/joy/Table'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const BillSupplerListOracleModal = ({
    open,
    onClose,
    OracleList,
    SuppAddMeliora
}) => {
    return (
        <CssVarsProvider>
            <Modal open={open} onClose={onClose}>
                <ModalDialog
                    layout="center"
                    size="lg"
                    sx={{
                        width: '100%',
                        maxWidth: 900
                    }}
                >
                    <ModalClose />
                    <Typography level="h4" sx={{ mb: 1 }}>
                        Supplier List
                    </Typography>

                    <Box
                        sx={{
                            overflow: 'auto',
                            border: 1,
                            borderColor: 'grey',
                            px: 1
                        }}
                    >
                        <Table stickyHeader size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                    <th style={{ width: '25%', textAlign: 'center' }}>
                                        Supplier Name
                                    </th>
                                    <th style={{ width: '25%', textAlign: 'center' }}>
                                        Address
                                    </th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>
                                        Number
                                    </th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>
                                        Contact Person
                                    </th>
                                    <th style={{ width: '7%', textAlign: 'center' }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {OracleList &&
                                    OracleList?.map((val, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{val?.SUC_NAME}</td>
                                            <td>{val?.SUC_ADD1}</td>
                                            <td>{val?.SUC_MOBILE}</td>
                                            <td>{val?.SUC_PERSON}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <AddCircleOutlineIcon
                                                    sx={{ color: 'brown', cursor: 'pointer' }}
                                                    onClick={() => SuppAddMeliora(val)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Box>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    )
}

export default memo(BillSupplerListOracleModal)
