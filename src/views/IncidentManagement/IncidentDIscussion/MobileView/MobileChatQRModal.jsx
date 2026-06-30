import React, { memo, useEffect, useRef, useState } from 'react';
import {
    Modal,
    ModalDialog,
    Box,
    Stack,
    Typography,
    IconButton,
    Divider,
    Button,
} from '@mui/joy';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { QRCodeCanvas } from 'qrcode.react';
import ChatIcon from '@mui/icons-material/Chat';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';

const EXPIRY_SECONDS = 1 * 60;

const MobileChatQRModal = ({
    open,
    onClose,
    chatTitle = 'Incident Chat',
    selectedChat,
    incidentNo = '',
    mode = "INCIDENT",
    onRefresh,
    mobileConnected
}) => {



    const { empid } = useSelector(state => state.LoginUserData);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
    const [isExpired, setIsExpired] = useState(false);
    const intervalRef = useRef(null);

    const isConnected = !!mobileConnected && Number(mobileConnected.empId) === Number(empid);

    useEffect(() => {
        if (mobileConnected) {
            setSecondsLeft(EXPIRY_SECONDS);
            setIsExpired(false);
            clearInterval(intervalRef.current);
        }
    }, [mobileConnected]);

    // In MobileChatQRModal.jsx

    const getAccessToken = async () => {
        try {
            setLoading(true);
            const response = await axioslogin.get('/user/get-access-token', {
                withCredentials: true
            });
            setToken(response.data.accessToken);
            setLoading(false);
        } catch (error) {
            console.error('Failed to get token:', error);
            setToken(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && !token) {
            getAccessToken();
        }
    }, [open]);

    const SingleId = selectedChat?.conversation_id;
    const MergedId = selectedChat?.mergedConversationIds;
    const GroupChat = selectedChat?.is_group_chat;


    //  Generate URL with all parameters
    const getMobileChatURL = () => {
        const baseUrl = window.location.origin;
        const pathname = '/mobile/chat';

        const params = new URLSearchParams({
            SingleId: SingleId,
            MergedId: MergedId,
            employee_id: empid,
            chat_title: chatTitle,
            access_token: token,
            group_chat: GroupChat,
            mode: mode,
            incidentNo: incidentNo
        });
        const url = `${baseUrl}${pathname}?${params.toString()}`;
      
        return url;
    };

    const startTimer = () => {
        setSecondsLeft(EXPIRY_SECONDS);
        setIsExpired(false);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setIsExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (open && !isConnected) {
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            setSecondsLeft(EXPIRY_SECONDS);
            setIsExpired(false);
        }
        return () => clearInterval(intervalRef.current);
    }, [open, isConnected]);

    const handleRefresh = () => {
        startTimer();
        onRefresh?.();
    };

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');



    if (loading && !token) {
        return <Typography>Loading...</Typography>;
    }

    // Show error if no token
    if (open && !token && !loading) {
        return <Typography color="error"> No access token found. Please login again. </Typography>
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                sx={{
                    p: 0,
                    width: { xs: '95vw', sm: 720 },
                    maxWidth: 720,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'xl',
                }}
            >

                <Box
                    sx={{
                        bgcolor: '#860c88',
                        px: 3,
                        py: 1.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,255,255,0.18)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ChatIcon sx={{ color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography level="title-sm" sx={{ color: '#fff', fontWeight: 700 }}>
                                Open Chat on Mobile
                            </Typography>
                            <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {mode === "INCIDENT" ? "Incident Discussion" : "External Chat"} - {chatTitle}
                            </Typography>
                        </Box>
                    </Stack>
                    <IconButton
                        size="sm"
                        onClick={onClose}
                        sx={{
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.12)',
                            borderRadius: '50%',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' },
                        }}
                    >
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* ── Two-column body ───────────────────────────── */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        bgcolor: '#fff',
                    }}
                >
                    {/* LEFT — steps */}
                    <Box
                        sx={{
                            flex: 1,
                            p: { xs: 3, sm: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            level="h3"
                            sx={{
                                fontWeight: 300,
                                fontSize: 22,
                                color: '#41525d',
                                mb: 2.5,
                                lineHeight: 1.3,
                            }}
                        >
                            Use the chat app on your phone
                        </Typography>



                        <Stack spacing={2.2}>
                            <StepRow number={1}>
                                Open your <strong style={{ color: '#111b21' }}>Scanner</strong> on your phone
                            </StepRow>

                            <StepRow number={2}>
                                Select <strong style={{ color: '#111b21' }}>Chat</strong>{' '}
                                <TextsmsIcon /> on Meliora, or{' '}
                                <strong style={{ color: '#111b21' }}>Related Module</strong>{' '}
                                <ViewModuleIcon /> on System
                            </StepRow>

                            <StepRow number={3}>
                                Tap <strong style={{ color: '#111b21' }}>QrCode </strong> on the{' '}
                                <strong style={{ color: '#111b21' }}>device</strong>
                            </StepRow>

                            <StepRow number={4}>
                                Point your phone at this screen to capture the QR code
                            </StepRow>
                        </Stack>

                        {/* Live timer */}
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: isExpired ? '#e74c3c' : '#25d366',
                                    flexShrink: 0,
                                    animation: isExpired ? 'none' : 'pulse 1.5s infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0.25 },
                                    },
                                }}
                            />
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: isExpired ? '#e74c3c' : '#667781',
                                    fontWeight: 500,
                                }}
                            >
                                {isConnected ? 'Connected Successfully' : isExpired
                                    ? 'QR code expired — click Refresh QR'
                                    : `Code expires in ${mm}:${ss}`}
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Vertical divider */}
                    <Divider
                        orientation="vertical"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    />

                    {/* RIGHT — QR */}




                    <Box
                        sx={{
                            width: { xs: '100%', sm: 260 },
                            p: { xs: 3, sm: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            bgcolor: '#f0f2f5',
                        }}
                    >
                        {isConnected ? (
                            <>
                                <Box
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: '50%',
                                        bgcolor: '#e8f5e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        animation: 'pop .3s ease',
                                        '@keyframes pop': {
                                            '0%': { transform: 'scale(0.5)', opacity: 0 },
                                            '100%': { transform: 'scale(1)', opacity: 1 }
                                        }
                                    }}
                                >
                                    <ChatIcon
                                        sx={{
                                            fontSize: 48,
                                            color: '#25d366'
                                        }}
                                    />
                                </Box>

                                <Typography
                                    level="title-md"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#25d366',
                                        textAlign: 'center'
                                    }}
                                >
                                    Mobile Connected
                                </Typography>

                                <Typography
                                    level="body-sm"
                                    sx={{
                                        color: '#667781',
                                        textAlign: 'center'
                                    }}
                                >
                                    Chat opened successfully on your mobile device.
                                </Typography>
                            </>
                        ) : (
                            <Box
                                sx={{
                                    width: { xs: '100%', sm: 260 },
                                    p: { xs: 3, sm: 4 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    bgcolor: '#f0f2f5',
                                }}
                            >
                                {/* QR box */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: 190,
                                        height: 190,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        bgcolor: '#fff',
                                        p: '10px',
                                        boxSizing: 'border-box',
                                        border: '1px solid #e9edef',
                                    }}
                                >
                                    <QRCodeCanvas
                                        // Use generated URL instead of qrValue
                                        value={getMobileChatURL()}
                                        size={168}
                                        level="H"
                                        style={{
                                            display: 'block',
                                            opacity: isExpired ? 0.06 : 1,
                                            transition: 'opacity 0.3s',
                                        }}
                                    />

                                    {/* Expired overlay */}
                                    {isExpired && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 1,
                                                bgcolor: 'rgba(240,242,245,0.75)',
                                                cursor: 'pointer',
                                            }}
                                            onClick={handleRefresh}
                                        >
                                            <Box
                                                sx={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: '50%',
                                                    bgcolor: '#e8f5e9',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'transform 0.2s',
                                                    '&:hover': { transform: 'scale(1.1)' },
                                                }}
                                            >
                                                <RefreshRoundedIcon sx={{ color: '#25d366', fontSize: 28 }} />
                                            </Box>
                                            <Typography
                                                level="body-xs"
                                                sx={{ color: '#41525d', fontWeight: 600, textAlign: 'center' }}
                                            >
                                                Click to refresh
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <Button
                                    variant="plain"
                                    size="sm"
                                    startDecorator={<RefreshRoundedIcon />}
                                    onClick={handleRefresh}
                                    sx={{
                                        color: '#7d0a7d',
                                        fontWeight: 600,
                                        fontSize: 13,
                                        '&:hover': { bgcolor: 'rgba(0,128,105,0.08)' },
                                    }}
                                >
                                    Refresh QR
                                </Button>

                                <Typography
                                    level="body-xs"
                                    sx={{
                                        color: '#8696a0',
                                        textAlign: 'center',
                                        px: 1,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Scan with your phone camera to open the chat
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* ── Footer ──────────────────────────────────────── */}
                <Box
                    sx={{
                        px: 3,
                        py: 1.5,
                        bgcolor: '#f0f2f5',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={onClose}
                        sx={{
                            bgcolor: '#7d0a7d',
                            color: '#ffffff',
                            fontWeight: 600,
                            borderRadius: 8,
                            px: 3,
                            '&:hover': { bgcolor: '#7d0a7d' },
                        }}
                    >
                        Done
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

// ── Sub-components ────────────────────────────────────────────────────

const StepRow = ({ number, children }) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Typography
            level="body-sm"
            sx={{ color: '#667781', minWidth: 18, pt: '1px', flexShrink: 0 }}
        >
            {number}.
        </Typography>
        <Typography level="body-sm" sx={{ color: '#41525d', lineHeight: 1.6 }}>
            {children}
        </Typography>
    </Stack>
);

export default memo(MobileChatQRModal);