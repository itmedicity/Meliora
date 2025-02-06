import { Box, Grid, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import FileViewSingle from 'src/views/Components/FileViewSingle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InsertPhotoSharpIcon from '@mui/icons-material/InsertPhotoSharp';

const DocumentsList = ({ serviceDetails, flags }) => {
    const { am_bill_no, am_bill_date, am_bill_amount, address, ph_two, ph_one, troll_free, wargar_to_date, wargar_from_date, bill_supplier_name,
        lease_suppliername, lease_amount, lease_todate, amc_cmc_suppliername, to_date, from_date, lease_fromdate, guarenty_status, warrenty_status,
        am_lease_mast_slno, am_bill_mastslno, item_asset_no, amccmc_slno, am_item_wargar_slno } = serviceDetails

    const [leaseDocuments, setleaseDocuments] = useState([])
    const [billdetailsView, setBilldetailsView] = useState([])
    const [amcCmcDocuments, setamcCmcDocuments] = useState([])
    const [wargarDocument, setwargarDocument] = useState([])

    useEffect(() => {
        const getleaseDocuments = async () => {
            try {
                if (am_lease_mast_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/LeaseMasterImageView/${am_lease_mast_slno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/LeaseMaster/${am_lease_mast_slno}/${fileName}`;
                        });
                        setleaseDocuments(fileUrls);
                    } else {
                        setleaseDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setleaseDocuments([]);
            }
        };
        getleaseDocuments();
    }, [am_lease_mast_slno]);


    useEffect(() => {
        const getDocumentViewBill = async () => {
            try {
                if (am_bill_mastslno) {
                    const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${am_bill_mastslno}`);
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${am_bill_mastslno}/${fileName}`;
                        });
                        setBilldetailsView(fileUrls);
                    } else {
                        setBilldetailsView([]);
                    }
                } else {

                }
            } catch (error) {
                warningNotify(error);
                setBilldetailsView([]);
            }
        };

        getDocumentViewBill();
    }, [am_bill_mastslno]);

    useEffect(() => {
        const getamcCmcDocuments = async () => {
            try {
                if (amccmc_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${amccmc_slno}`)
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${amccmc_slno}/${fileName}`;
                        });
                        setamcCmcDocuments(fileUrls);
                    } else {
                        setamcCmcDocuments([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setamcCmcDocuments([]);
            }
        };

        getamcCmcDocuments();
    }, [amccmc_slno]);



    useEffect(() => {
        const getWarrentyImage = async () => {
            try {
                if (am_item_wargar_slno) {
                    const result = await axioslogin.get(`/AssetFileUpload/GaurenteeWarrenteefileView/${am_item_wargar_slno}`)
                    const { success, data } = result.data;
                    if (success === 1 && data && Array.isArray(data)) {
                        const fileNames = data;
                        const fileUrls = fileNames.map((fileName) => {
                            return `${PUBLIC_NAS_FOLDER}/Asset/GuaranteeWarranty/${am_item_wargar_slno}/${fileName}`;
                        });
                        setwargarDocument(fileUrls);
                    } else {
                        setwargarDocument([]);
                    }
                }
            } catch (error) {
                warningNotify(error);
                setwargarDocument([]);
            }
        };

        getWarrentyImage();
    }, [am_item_wargar_slno]);

    const [imageShowsingleFlag, setImagesingle] = useState(0)
    const [imageShowSingle, setImageShowSingle] = useState(false)
    const [uploadedFile, setUplodedFile] = useState({ url: "", type: "" });


    const SingleView = useCallback((file) => {
        const fileType = file.url
            ? file.url.endsWith(".pdf")
                ? "pdf"
                : "image"
            : file.type && file.type.includes("application/pdf")
                ? "image"
                : "pdf";

        const fileUrl = file.url || URL.createObjectURL(file);
        setUplodedFile({ url: fileUrl, type: fileType });
        setImageShowSingle(true);
        setImagesingle(1);

        const modalElement = document.querySelector('.MuiModal-root');
        if (modalElement && modalElement.hasAttribute('aria-hidden') && modalElement.getAttribute('aria-hidden') === 'true') {
            document.activeElement.blur();
        }
    }, []);

    const CloseSingleFile = useCallback(() => {
        setImagesingle(0)
        setImageShowSingle(false)
    }, [])

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: .5,
            mt: 1
        }}>

            <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, display: 'flex' }}>
                <Box sx={{ height: 100, width: 100, cursor: 'pointer', border: 1, borderRadius: 4, borderColor: '#E0E1E3', p: .5 }} >
                    {imageShowsingleFlag === 1 ?
                        < Box >
                            <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                        </Box> : null
                    }
                    {billdetailsView.length !== 0 ? (
                        <Grid container spacing={.5}>
                            {billdetailsView.map((url, index) => {
                                const isPdf = url.toLowerCase().endsWith('.pdf');
                                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            flex: 1,
                                            pb: 1
                                        }}
                                    >
                                        {isImage ? (
                                            <img
                                                src={url}
                                                alt={`Complaint file ${index}`}
                                                style={{
                                                    width: 85,
                                                    height: 70,
                                                    color: "#e53935",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => SingleView({ url })}
                                            />
                                        ) : isPdf ? (
                                            <PictureAsPdfIcon
                                                sx={{
                                                    width: 85,
                                                    height: 70,
                                                    color: "#e53935",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => SingleView({ url })}
                                            />
                                        ) : (
                                            <InsertDriveFileIcon
                                                sx={{
                                                    width: 85,
                                                    height: 70,
                                                    color: "#e53935",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => SingleView({ url })}
                                            />
                                        )}
                                        <Box
                                            sx={{
                                                fontSize: 14,
                                                color: "#333",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                width: 90,
                                            }}
                                        >
                                            {url.split('/').pop() || "N/A"}
                                        </Box>

                                    </Box>
                                )
                            })}
                        </Grid>
                    )
                        : (
                            <Box
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                <InsertPhotoSharpIcon
                                    sx={{
                                        width: 85,
                                        height: 85,
                                        color: '#E3E8F0',
                                        cursor: "default",
                                    }}
                                />
                            </Box>
                        )}


                </Box>
                <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            color: '#394060',
                            fontSize: 13
                        }}
                    >
                        Purchase Bills
                    </Typography>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Typography sx={{ width: 100, fontSize: 13 }}>
                            Bill No.
                        </Typography>
                        <Typography sx={{ flex: 1, fontSize: 13 }}>
                            {am_bill_no || "Not Updated"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Typography sx={{ width: 100, fontSize: 13 }}>
                            Bill Date
                        </Typography>
                        <Typography sx={{ flex: 1, fontSize: 13 }}>
                            {am_bill_date || "Not Updated"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Typography sx={{ width: 100, fontSize: 13 }}>
                            Bill Amount
                        </Typography>
                        <Typography sx={{ flex: 1, fontSize: 13 }}>
                            {am_bill_amount || "Not Updated"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Typography sx={{ width: 100, fontSize: 13 }}>
                            Supplier
                        </Typography>
                        <Typography sx={{ flex: 1, fontSize: 13 }}>
                            {bill_supplier_name || "Not Updated"}
                        </Typography>
                    </Box>
                </Box>
            </Box>


            {item_asset_no !== undefined ?
                <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, display: 'flex' }}>
                    <Box sx={{ height: 100, width: 100, cursor: 'pointer', border: 1, borderRadius: 4, borderColor: '#E0E1E3', p: .5 }}>
                        <Box sx={{ flex: 1, mr: 1, my: .5, ml: .5 }}>
                            {imageShowsingleFlag === 1 ?
                                < Box >
                                    <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                                </Box> : null
                            }
                            {amcCmcDocuments.length !== 0 ? (
                                <Grid container spacing={.5}>
                                    {amcCmcDocuments.map((url, index) => {
                                        const isPdf = url.toLowerCase().endsWith('.pdf');
                                        const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
                                        return (
                                            <Box key={index} sx={{
                                                flex: 1,
                                                pb: 1
                                            }}>
                                                {isImage ? (
                                                    <img
                                                        src={url}
                                                        alt={`Complaint file ${index}`}
                                                        style={{
                                                            width: 85,
                                                            height: 70,
                                                            color: "#e53935",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => SingleView({ url })}
                                                    />
                                                ) : isPdf ? (
                                                    <PictureAsPdfIcon
                                                        sx={{
                                                            width: 85,
                                                            height: 70,
                                                            color: "#e53935",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => SingleView({ url })}
                                                    />
                                                ) : (
                                                    <InsertDriveFileIcon
                                                        sx={{
                                                            width: 85,
                                                            height: 70,
                                                            color: "#e53935",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => SingleView({ url })}
                                                    />
                                                )}
                                                <Box
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "#333",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        width: 90,
                                                    }}
                                                >
                                                    {url.split('/').pop() || "N/A"}
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Grid>
                            )
                                : (
                                    <Box sx={{
                                        alignItems: "center",
                                    }}>
                                        <InsertPhotoSharpIcon
                                            sx={{
                                                width: 85,
                                                height: 85,
                                                color: '#E3E8F0',
                                                cursor: "default",
                                            }}
                                        />
                                    </Box>
                                )}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, pl: 1 }}>
                        <Box
                            sx={{
                                flex: 1,
                                fontWeight: 600,
                                color: '#394060',
                                fontSize: 13
                            }}
                        >
                            AMC/CMC Details

                        </Box>
                        <Box sx={{ fontSize: 13, color: '#0B6BCB', fontWeight: 600 }}>
                            {flags.amc_status === 1 ? "AMC" : flags.cmc_status === 1 ? "CMC" : "Not Updated"}
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, }}>
                            <Typography sx={{ width: 100, fontSize: 13 }}>
                                From Date
                            </Typography>
                            <Typography sx={{ flex: 1, fontSize: 13 }}>
                                {from_date || 'Not Updated'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, }}>
                            <Typography sx={{ width: 100, fontSize: 13 }}>
                                To Date
                            </Typography>
                            <Typography sx={{ flex: 1, fontSize: 13 }}>
                                {to_date || 'Not Updated'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, }}>
                            <Typography sx={{ width: 100, fontSize: 13 }}>
                                Supplier
                            </Typography>
                            <Typography sx={{ flex: 1, fontSize: 13 }}>
                                {amc_cmc_suppliername || 'Not Updated'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                : null}

            {
                item_asset_no !== undefined ?
                    <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, display: 'flex' }}>
                        <Box sx={{ height: 100, width: 100, cursor: 'pointer', border: 1, borderRadius: 4, borderColor: '#E0E1E3', p: .5 }}>
                            <Box sx={{ flex: 1, mr: 1, my: .5, ml: .5 }}>
                                {imageShowsingleFlag === 1 ?
                                    < Box >
                                        <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                                    </Box> : null
                                }
                                {leaseDocuments.length !== 0 ? (
                                    <Grid container spacing={.5}>
                                        {leaseDocuments.map((url, index) => {
                                            const isPdf = url.toLowerCase().endsWith('.pdf');
                                            const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

                                            return (

                                                <Box key={index} sx={{
                                                    flex: 1,
                                                    pb: 1
                                                }}>
                                                    {isImage ? (
                                                        <img
                                                            src={url}
                                                            alt={`Complaint file ${index}`}
                                                            style={{
                                                                width: 85,
                                                                height: 70,
                                                                color: "#e53935",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => SingleView({ url })}
                                                        />
                                                    ) : isPdf ? (
                                                        <PictureAsPdfIcon
                                                            sx={{
                                                                width: 85,
                                                                height: 70,
                                                                color: "#e53935",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => SingleView({ url })}
                                                        />
                                                    ) : (
                                                        <InsertDriveFileIcon
                                                            sx={{
                                                                width: 85,
                                                                height: 70,
                                                                color: "#e53935",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => SingleView({ url })}
                                                        />
                                                    )}

                                                    <Box
                                                        sx={{
                                                            fontSize: 14,
                                                            color: "#333",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            width: 90,
                                                        }}
                                                    >
                                                        {url.split('/').pop() || "N/A"}
                                                    </Box>
                                                </Box>

                                            );
                                        })}
                                    </Grid>
                                )
                                    : (

                                        <Box
                                            sx={{
                                                alignItems: "center",


                                            }}
                                        >
                                            <InsertPhotoSharpIcon
                                                sx={{
                                                    width: 85,
                                                    height: 85,
                                                    color: '#E3E8F0',
                                                    cursor: "default",
                                                }}
                                            />
                                        </Box>

                                    )}
                            </Box>

                        </Box>

                        <Box sx={{ flex: 1, pl: 1 }}>
                            <Typography
                                sx={{
                                    flex: 1,
                                    fontWeight: 600,
                                    color: '#394060',
                                    fontSize: 13
                                }}
                            >
                                Lease Details
                            </Typography>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13 }}>
                                    From Date
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13 }}>
                                    {lease_fromdate || 'Not Updated'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13 }}>
                                    To Date
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13 }}>
                                    {lease_todate || 'Not Updated'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13 }}>
                                    Lease Amount
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13 }}>
                                    {lease_amount || 'Not Updated'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13 }}>
                                    Supplier
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13 }}>
                                    {lease_suppliername || 'Not Updated'}
                                </Typography>
                            </Box>

                        </Box>

                    </Box> : null
            }

            <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1, display: 'flex' }}>
                <Box sx={{ height: 100, width: 100, cursor: 'pointer', border: 1, borderRadius: 4, borderColor: '#E0E1E3', p: .5 }}>
                    <Box sx={{ flex: 1, mr: 1, my: .5, ml: .5 }}>
                        {imageShowsingleFlag === 1 ?
                            < Box >
                                <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                            </Box> : null
                        }
                        {wargarDocument.length !== 0 ? (
                            <Grid container spacing={.5}>
                                {wargarDocument.map((url, index) => {
                                    const isPdf = url.toLowerCase().endsWith('.pdf');
                                    const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
                                    return (
                                        <Box key={index} sx={{
                                            flex: 1,
                                            pb: 1,
                                        }}>
                                            {isImage ? (
                                                <img
                                                    src={url}
                                                    alt={`Complaint file ${index}`}
                                                    style={{
                                                        width: 85,
                                                        height: 70,
                                                        color: "#e53935",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => SingleView({ url })}
                                                />
                                            ) : isPdf ? (
                                                <PictureAsPdfIcon
                                                    sx={{
                                                        width: 85,
                                                        height: 70,
                                                        color: "#e53935",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => SingleView({ url })}
                                                />
                                            ) : (
                                                <InsertDriveFileIcon
                                                    sx={{
                                                        width: 85,
                                                        height: 70,
                                                        color: "#e53935",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => SingleView({ url })}
                                                />
                                            )}
                                            <Box
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#333",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    width: 90,
                                                }}
                                            >
                                                {url.split('/').pop()}
                                            </Box>
                                        </Box>

                                    );
                                })}
                            </Grid>
                        )
                            : (

                                <Box
                                    sx={{
                                        alignItems: "center",


                                    }}
                                >
                                    <InsertPhotoSharpIcon
                                        sx={{
                                            width: 85,
                                            height: 85,
                                            color: '#E3E8F0',
                                            cursor: "default",
                                        }}
                                    />
                                </Box>

                            )}

                    </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            color: '#394060',
                        }}
                    >
                        Warrenty/Guarantee Details
                    </Typography>
                    <Box sx={{ fontSize: 13, color: '#0B6BCB', fontWeight: 600 }}>
                        {warrenty_status === 1 ? "Warrenty" : guarenty_status === 1 ? "Guarentee" : "Not Updated"}
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    From Date
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {wargar_from_date || "Not Updated"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    To Date
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {wargar_to_date || "Not Updated"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    Toll Free No.
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {troll_free || "Not Updated"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    Contact No. 1
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {ph_one || "Not Updated"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    Contact No. 2
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {ph_two || "Not Updated"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, }}>
                                <Typography sx={{ width: 100, fontSize: 13, }}>
                                    Address
                                </Typography>
                                <Typography sx={{ flex: 1, fontSize: 13, }}>
                                    {address || "Not Updated"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box >
    )
}

export default memo(DocumentsList)