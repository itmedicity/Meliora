import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        headerFontSize: {
            // fontSize: 17,
            fontFamily: "Segoe UI",
            fontWeight: 500,
            color: '#5a5e63',
            fontSize: {
                sm: 17,
                xs: 17,
                md: 17,
                lg: 17,
                xl: 17,
            },
        }
    },
})

export default theme;