import React from 'react'

const aDeletecom = () => {
    return (
        <Box sx={{
            width: "100%", display: "flex",
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
        }}>
            <CssVarsProvider>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    pl: 1, pt: 1,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap' }} >
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <AlignHorizontalLeftIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >CRF/TMC/{req_slno}</Typography>
                            <CalendarMonthIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{req_date}</Typography>
                        </Box>
                        <Box sx={{ pl: 4, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <ApartmentIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            {/* <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >{dept_name}</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography> */}
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{req_deptsec}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <AddLocationAltIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{location}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <CategoryIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='common.white' fontWeight={500} sx={{ pt: 0.5, pr: 0.6, textTransform: "capitalize" }} >CRF category</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{category}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <GppMaybeIcon fontSize='large' sx={{ mx: 0.5, color: 'red' }} />
                            <Typography
                                level="body-lg"
                                endDecorator={
                                    emergency_flag === 1 ?
                                        <Chip component="span" size="sm"
                                            startDecorator={<CheckIcon color='success' sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                                            sx={{
                                                "--Chip-minHeight": "9px",
                                                "--Chip-paddingInline": "10px",
                                                backgroundColor: '#F7D3D3'
                                            }}
                                        >
                                            Yes
                                        </Chip> :
                                        <Chip component="span" size="sm"
                                            startDecorator={<ClearOutlinedIcon sx={{ zIndex: 1, pointerEvents: 'none', color: 'green' }} />}
                                            sx={{
                                                "--Chip-minHeight": "9px",
                                                "--Chip-paddingInline": "10px",

                                                backgroundColor: '#D5F4B1'
                                            }}
                                        >
                                            No
                                        </Chip>
                                }
                                justifyContent="center"
                            >
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <NotificationsActiveIcon fontSize='large' sx={{ mx: 0.5, }} color='primary' />
                            <Typography level='body-sm' textColor='common.white' fontWeight={500} sx={{ pt: 0.5, pr: 0.6, textTransform: "capitalize" }} >Priority Type</Typography>
                            {
                                emergency_flag === 1 ?
                                    <Box sx={{ display: 'flex' }}>
                                        {/* <Typography color='warning' level="body-sm" variant="outlined" sx={{ ml: 1, borderRadius: 10, textTransform: 'capitalize' }} >{emer_type_name?.toLowerCase()}</Typography> */}
                                        <Typography
                                            level="body-lg"
                                            endDecorator={
                                                <Chip component="span" size="sm"
                                                    // startDecorator={<CheckIcon color='success' sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                                                    sx={{
                                                        "--Chip-minHeight": "9px",
                                                        "--Chip-paddingInline": "10px",
                                                        backgroundColor: '#F7D3D3',
                                                    }}
                                                >
                                                    {emer_type_name?.toLowerCase()}
                                                </Chip>
                                            }
                                            justifyContent="center"
                                            sx={{ width: '100%' }}
                                        >
                                        </Typography>
                                    </Box> : null
                            }
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <CalendarMonthIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, pr: 0.5 }} >CRF Expected Date</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{expdate}</Typography>
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', }}>
                            <AccountBalanceIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level="title-sm" sx={{ color: 'white' }}
                                endDecorator={<Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>} >
                                Requested Department</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{user_deptsection}</Typography>
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Person3Icon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level="title-sm" sx={{ color: 'white' }}
                                endDecorator={<Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>} >
                                Created User</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{em_name}</Typography>
                        </Box>
                    </Box>
                </Box >

                {/* 3rd Row */}
                < Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    pl: 1, pt: 0.5,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <RequestPageIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography level="title-sm" sx={{ color: 'white' }}
                            endDecorator={<KeyboardArrowRightOutlinedIcon />} >Requirement</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', }}>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >
                            {actual_requirement !== null ? actual_requirement : "Not Given"}</Typography>
                    </Box>
                </Box >
                < Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    pl: 1, pt: 0.5,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <BalanceIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography level="title-sm" sx={{ color: 'white' }}
                            endDecorator={<KeyboardArrowRightOutlinedIcon />} >Justification</Typography>
                    </Box>
                    <Box sx={{ width: "40%", display: 'flex', alignItems: 'center', }} >
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >
                            {needed !== null ? needed : "Not Given"}</Typography>
                    </Box>
                    {/* <Box sx={{ display: 'flex', bgcolor: '#E3EFF9', py: 0.5, flexWrap: 'wrap', }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', pr: 1 }}>
                        <RadioGroup
                            sx={{ pt: 1, flex: '1 1 auto', px: 3 }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={radiovalue}
                            onChange={(e) => updateRadioClick(e)}
                        >
                            <Badge
                                badgeContent={pendingData.length}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='1' sx={{}} control={
                                    <Radio
                                        sx={{
                                            color: 'orange',
                                            '&.Mui-checked': {
                                                color: 'orange',
                                            },
                                        }} />
                                } label="Pending" />
                            </Badge>
                            <Badge
                                badgeContent={donedata.length}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#0d47a1',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value='2' sx={{ pl: 3 }}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#0d47a1',
                                                '&.Mui-checked': {
                                                    color: '#0d47a1',
                                                },
                                            }}
                                        />
                                    }
                                    label="All List"
                                />
                            </Badge>
                            <Badge
                                badgeContent={closedata.length}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mr: 1,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#F83839',
                                        color: 'white',
                                        transform: 'translate(70%, -10%)',
                                    }
                                }}
                            >
                                <FormControlLabel value='3' sx={{ pl: 3, }} control={
                                    <Radio
                                        sx={{
                                            color: 'red',
                                            '&.Mui-checked': {
                                                color: 'red',
                                            },
                                        }}
                                    />} label="Closed" />
                            </Badge>
                        </RadioGroup>
                    </Box>
                    <Box sx={{ display: 'flex', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', }}>
                        <Box sx={{ m: 0.5, pt: 0.5, flex: '1 1 auto', pl: 0.5 }}>
                            <CssVarsProvider>
                                <Select defaultValue="0" sx={{ width: 200, border: '1px solid #bbdefb', height: 20, color: '#1565c0', fontSize: 14 }}
                                    slotProps={{
                                        listbox: { placement: 'bottom-start' },
                                    }}
                                    placeholder="Search By"
                                    value={searchFlag}
                                    onChange={changeSearchSelect}
                                >
                                    <Option value="1">Req. Date</Option>
                                    <Option value="2">CRF No.</Option>
                                    <Option value="3">Department Section</Option>
                                </Select>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ my: 0.7, pr: 1, }}>
                            <CssVarsProvider>
                                <IconButton
                                    variant="plain"
                                    sx={{
                                        color: '#0277bd',
                                        width: '100%',
                                        fontSize: 12,
                                        borderRadius: 5,
                                        height: '19px',
                                        lineHeight: '1',
                                    }}
                                    onClick={ClearSearch}
                                >
                                    <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0277bd', pr: 0.5, width: 30, height: 20 }} />
                                    Clear Filter
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                        {searchFlag === '1' ?
                            <Box sx={{ display: 'flex', pl: 0.5, flex: '1 1 auto' }}>
                                <Box sx={{ pt: 0.9, flex: '1 1 auto' }}>
                                    <CssVarsProvider>
                                        <CustomInputDateCmp
                                            StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                            className={{
                                                height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                                                color: '#0d47a1', fontSize: 14, width: 200,
                                            }}
                                            size={'md'}
                                            type='date'
                                            name={'startDate'}
                                            value={startDate}
                                            handleChange={startDateChange}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
                                    <CssVarsProvider>
                                        <CustomInputDateCmp
                                            StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                            className={{
                                                height: 35, borderRadius: 5, border: '1px solid #bbdefb',
                                                color: '#0d47a1', fontSize: 14, width: 200,
                                            }}
                                            size={'md'}
                                            type='date'
                                            name={'endDate'}
                                            value={endDate}
                                            handleChange={endDateChange}
                                        />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : searchFlag === '2' ?
                                <Box sx={{ flex: '1 1 auto', pt: 0.9, pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <CustomInputDateCmp
                                            StartIcon={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                                                <Typography sx={{ ml: 1, fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
                                            </Box>}
                                            className={{
                                                borderRadius: 6, border: '1px solid #bbdefb', width: 250, height: 35, color: '#1565c0'
                                            }}
                                            size={'md'}
                                            type='text'
                                            name={'searchCrf'}
                                            value={searchCrf}
                                            handleChange={changeCrfNo}
                                        />

                                    </CssVarsProvider>
                                </Box>
                                : searchFlag === '3' ?
                                    <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
                                        <CssVarsProvider>
                                            <Select
                                                defaultValue="0"
                                                sx={{
                                                    width: 280,
                                                    border: '1px solid #bbdefb',
                                                    height: 20,
                                                    color: '#1565c0',
                                                    fontSize: 13
                                                }}
                                                slotProps={{
                                                    listbox: { placement: 'bottom-start' },
                                                }}
                                                placeholder="Select Department Section"
                                                value={deptSec}
                                                onChange={(e, newValue) => setdeptSec(newValue)}
                                            >
                                                {authorizeDeptSec?.map((val) => (
                                                    <Option key={val.dept_section} value={val.dept_section} label={val.auth_deptsec}>
                                                        {val.auth_deptsec}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </CssVarsProvider>
                                    </Box>
                                    : null}
                        {(searchFlag === '1' || searchFlag === '2' || searchFlag === '3') ?
                            <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
                                <CssVarsProvider>
                                    <   CustomIconButtonCmp
                                        handleChange={SearchData}
                                    >
                                        Search
                                        <SearchTwoToneIcon sx={{
                                            height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2,
                                            '&:hover': {
                                                color: '#43B0F1'
                                            },
                                        }} />
                                    </CustomIconButtonCmp>
                                </CssVarsProvider>
                            </Box>
                            : null
                        }
                    </Box>


                </Box> */}

                </Box >
            </CssVarsProvider>
        </Box >
    )
}

export default aDeletecom