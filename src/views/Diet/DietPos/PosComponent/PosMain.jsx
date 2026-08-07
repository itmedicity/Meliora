import React, { memo, useState } from 'react'
import { Box } from '@mui/joy'
import MenuIcon from '@mui/icons-material/Menu'
// import PosViewWrapper from './Components/PosViewWrapper'
import CanteenContextDrawer from '../../CanteenOrderConfirmation/CanteenContextDrawer'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import PosViewWrapper from './PosViewWrapper'

const DRAWER_WIDTH = 280

const PosMain = ({
    orders = [],
    selectedStations,
    setSelectedStations,
    activeTab
}) => {

    const [open, setOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);



    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '65vh',
                maxHeight: '75vh',
                mt: 1,
                bgcolor: '#f6f6f6d9',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'md'
            }}
        >

            {!open && (
                <MenuIcon
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 20,
                        fontSize: 18,
                        cursor: 'pointer'
                    }}
                />
            )}

            <Box
                onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
                sx={{
                    height: '100%',
                    px: 2,
                    pl: open ? `${DRAWER_WIDTH + 20}px` : '26px',
                    transition: 'padding-left 0.3s ease',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 22,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: isScrolled ? '#fffffff2' : '#f6f6f6d9',
                        boxShadow: isScrolled ? 'md' : ''
                    }}
                >
                    <DietTextComponent
                        size={22}
                        value="POINT OF SALES"
                    />
                </Box>

                <PosViewWrapper
                    orders={orders}
                    activeTab={activeTab}
                />

            </Box>

            {/* CONTEXT DRAWER */}
            <CanteenContextDrawer
                open={open}
                onClose={() => setOpen(false)}
                width={DRAWER_WIDTH}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />

        </Box>
    )
}

export default memo(PosMain)