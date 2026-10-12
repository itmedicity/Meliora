import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { useSelector } from "react-redux";



const DetailText = ({
    label,
    value,
}) => (

    <Typography
        sx={{
            fontSize: 12,
            mb: 0.5,
        }}
    >
        <b>{label}</b> {value}
    </Typography>

);



// const SignatureBox = ({
//     title
// }) => (

//     <Box
//         sx={{
//             width:180,
//             textAlign:"center",
//         }}
//     >

//         <Box
//             sx={{
//                 borderTop:"1px solid #000",
//                 pt:0.5,
//             }}
//         >

//             <Typography
//                 fontSize={12}
//                 fontWeight={600}
//             >
//                 {title}
//             </Typography>

//         </Box>

//     </Box>

// );



const DietBillFooter = () => {


    const empname = useSelector(
        state => state.LoginUserData.empname
    );


    return (

        <Box
            sx={{
                mt:5,
                borderTop:"1px dashed #636161",
                pt:2,
            }}
        >
            {/* Bill Information */}


            <Box
                sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    mb:6,
                }}
            >


                <Box>

                    <DetailText
                        label="Printed By :"
                        value={empname || "-"}
                    />


                    <DetailText
                        label="Printed On :"
                        value={
                            format(
                                new Date(),
                                "dd-MM-yyyy hh:mm a"
                            )
                        }
                    />

                </Box>




                <Box
                    textAlign="right"
                >

                    <DetailText
                        label="Bill Type :"
                        value="FINAL BILL"
                    />


                    <DetailText
                        label="Payment Status :"
                        value="GENERATED"
                    />

                </Box>


            </Box>




            {/* Signatures */}

{/* 
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    px:2,
                    mb:5,
                }}
            >

                <SignatureBox
                    title="Prepared By"
                />


                <SignatureBox
                    title="Authorized Signatory"
                />

            </Box> */}




            {/* Footer Note */}


            <Box
                sx={{
                    borderTop:"1px dashed #777",
                    pt:1.5,
                    textAlign:"center",
                }}
            >

                <Typography
                    fontSize={11}
                    color="text.secondary"
                >
                    This is a computer generated invoice and does not require a manual signature.
                </Typography>


                <Typography
                    fontSize={12}
                    fontWeight={700}
                    sx={{
                        mt:1,
                    }}
                >
                    Thank You for Choosing Travancore Medicity
                </Typography>


                <Typography
                    fontSize={11}
                    color="text.secondary"
                >
                    Diet & Nutrition Department
                </Typography>


            </Box>


        </Box>

    );

};


export default memo(DietBillFooter);