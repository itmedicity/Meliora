import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import CardPrimary from '../Components/CardPrimary'
import CardSecondary from '../Components/CardSecondary'
import CardTertiary from '../Components/CardTertiary'
import CusCheckBox from '../Components/CusCheckBox'
import CusIconButton from '../Components/CusIconButton'
import FoucCheckBocSecondary from '../Components/FoucCheckBocSecondary'
import FoucuCheckBox from '../Components/FoucuCheckBox'
import OverRelayCheckBox from '../Components/OverRelayCheckBox'
import UnCheckedIcon from '../Components/UnCheckedIcon'
import GitHubIcon from '@mui/icons-material/GitHub'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import TextFieldCustom from '../Components/TextFieldCustom'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Button } from '@mui/joy'
import TextFeildPrimary from '../Components/TextFeildPrimary'
import SelectBasic from '../Components/SelectBasic'

const Home = () => {
    return (
        <Fragment>
            {/* <CommonReport /> */}
            {/* <CommonReportFormOne /> */}
            {/* <CusCard /> */}
            {/* <div>
                <CustomAgGrid />
                // <CardOne />
                <CusCard />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CardTwo />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CardThree />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CustomMaterialTable />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CustomAgGrid />
            </div> */}
            <Grid container spacing={1} >
                <Grid item xl={6} lg={6}>
                    <CardPrimary title="Check Box Samples" >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-evenly",

                        }} >
                            <Grid container spacing={1}>
                                <Grid item container lg={12} xl={12} justifyContent="space-between"  >
                                    <CusCheckBox label="SM" color="success" size="sm" variant="outlined" />
                                    <CusCheckBox label="MD" color="success" size="md" variant="outlined" />
                                    <CusCheckBox label="LG" color="success" size="lg" variant="outlined" />
                                </Grid>
                                <Grid item container lg={12} xl={12} justifyContent="space-between" >
                                    <UnCheckedIcon label="CheckBox1" color="success" size="sm" variant="outlined" />
                                    <UnCheckedIcon label="CheckBox1" color="success" size="md" variant="outlined" />
                                    <UnCheckedIcon label="CheckBox1" color="success" size="lg" variant="outlined" />
                                </Grid>
                                <Grid item container lg={12} xl={12} justifyContent="space-between"  >
                                    <FoucuCheckBox
                                        label="Focus with Label"
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item container lg={12} xl={12} justifyContent="space-between"  >
                                    <FoucCheckBocSecondary
                                        label="Focus Box Only"
                                        color="success"
                                        size="sm"
                                        variant="outlined"
                                    />
                                    <FoucCheckBocSecondary
                                        label="Focus Box Only"
                                        color="success"
                                        size="md"
                                        variant="outlined"
                                    />
                                    <FoucCheckBocSecondary
                                        label="Focus Box Only"
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item container lg={12} xl={12} justifyContent="space-between"  >
                                    <OverRelayCheckBox
                                        label="OverRelay Checkbox"
                                        color="success"
                                        size="lg"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardPrimary>
                </Grid>
                <Grid item xl={6} lg={6}>
                    <CardSecondary title={`Icon Button Examples`} >
                        <Box >
                            <Grid container spacing={1} >
                                <Grid item lg={1} xl={1} >
                                    <CusIconButton size="sm" variant="outlined" >
                                        <GitHubIcon />
                                    </CusIconButton>
                                </Grid>
                                <Grid item lg={1} xl={1} >
                                    <CusIconButton size="sm" variant="outlined">
                                        <FavoriteBorder />
                                    </CusIconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardSecondary>
                </Grid>
                <Grid item xl={6} lg={6}>
                    <CardTertiary title={`TextFeild Examples`} >
                        <Grid container spacing={0.500} >
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="-- sm size Text Feild"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="md"
                                    placeholder="-- md size Text Feild with number"
                                    type="number"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="lg"
                                    placeholder="-- lg size Text Feild"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    placeholder="-- Default Size -- md"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- Start"
                                    type="password"
                                    startDecorator={<KeyRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- End"
                                    type="text"
                                    endDecorator={<VisibilityRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- Start and End"
                                    type="text"
                                    startDecorator={<KeyRoundedIcon />}
                                    endDecorator={<VisibilityRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFieldCustom
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Button"
                                    type="text"
                                    endDecorator={
                                        <Button variant="soft" size="sm">
                                            Subscribe
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>

                    </CardTertiary>
                </Grid>
                <Grid item xl={6} lg={6}>
                    <CardTertiary title={`TextFeild Examples`} >
                        <Grid container spacing={0.500} >
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="-- sm size Text Feild"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="md"
                                    placeholder="-- md size Text Feild"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="lg"
                                    placeholder="-- lg size Text Feild"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    placeholder="-- Default Size -- md"
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- Start"
                                    type="password"
                                    startDecorator={<KeyRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- End"
                                    type="text"
                                    endDecorator={<VisibilityRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Icon -- Start and End"
                                    type="text"
                                    startDecorator={<KeyRoundedIcon />}
                                    endDecorator={<VisibilityRoundedIcon />}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12} >
                                <TextFeildPrimary
                                    style={{ mx: 0 }}
                                    size="sm"
                                    placeholder="With Button"
                                    type="text"
                                    endDecorator={
                                        <Button variant="soft" size="sm">
                                            Subscribe
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardTertiary>
                </Grid>
                <Grid item xl={6} lg={6}>
                    <CardTertiary title={`TextFeild Examples`} >
                        <Grid container spacing={0.500} >
                            <Grid item lg={12} xl={12} >
                                <SelectBasic />
                            </Grid>

                        </Grid>
                    </CardTertiary>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Home
