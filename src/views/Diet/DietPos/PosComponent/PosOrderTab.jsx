import React from 'react'
import { Box } from '@mui/joy'
import DietTextComponent from '../../DietComponent/DietTextComponent'

const PosOrderTab = ({
    activeTab,
    setActiveTab
}) => {

    /* LEFT TABS */
    const tabs = [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'BILLED', value: 'BILLED' }
    ]

    return (
        <Box
            sx={{
                width: '100%',
                height: 40,
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5
            }}
        >

            {/* LEFT TABS */}
            <Box sx={{ display: 'flex', width: '50%', gap: 1 }}>
                {tabs?.map(tab => (
                    <Box
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer',
                            bgcolor: 'var(--royal-purple-400)',
                            borderRadius: 1,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            minWidth: '15%',
                            py: 0.5,
                            px: 1,
                            alignItems: 'center',
                            borderBottom:
                                activeTab === tab.value
                                    ? '3px solid #000'
                                    : '3px solid transparent',
                            transition: 'border-bottom .2s'
                        }}
                    >
                        <DietTextComponent
                            size={13}
                            value={tab.label}
                            color="#fff"
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default PosOrderTab