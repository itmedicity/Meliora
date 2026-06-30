import React, { memo, useMemo, useState } from 'react';

import {
    Box,
    IconButton,
    Input
} from '@mui/joy';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import ConversationCard from './Component/ConversationCard';
import { useGroupedChats } from '../CommonComponent/Incidnethelper';


const DiscussionSidebar = ({
    openSidebar,
    setOpenSidebar,
    conversations = [],
    selectedChat,
    setSelectedChat,
    hasIncidentAccess,
    onlineUsers,
    UnReadCount
}) => {


    const groupedChats =
        useGroupedChats(conversations);

    const finalConversations =
        hasIncidentAccess
            ? (Array.isArray(conversations)
                ? conversations
                : [])
            : (Array.isArray(groupedChats)
                ? groupedChats
                : []);

    const [searchText, setSearchText] = useState('');

    const filteredConversations = useMemo(() => {
        if (!searchText?.trim()) {
            return finalConversations;
        }
        const lowerSearch = searchText.toLowerCase();
        return finalConversations?.filter(chat => {
            const title =
                chat?.title?.toLowerCase() || '';
            const participants =
                chat?.participants?.toLowerCase() || '';
            return (
                title?.includes(lowerSearch) ||
                participants?.includes(lowerSearch)
            );
        });
    }, [finalConversations, searchText]);


    return (
        <Box
            sx={{
                width: openSidebar ? '30%' : '0%',
                minWidth: openSidebar ? '320px' : '0px',
                transition: 'all 0.35s ease',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                borderRight: openSidebar
                    ? '1px solid'
                    : 'none',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
            <Box
                sx={{
                    p: 2,

                    borderBottom: '1px solid',
                    borderColor: 'divider',

                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',

                    gap: 1
                }}
            >

                <Box>

                    <IncidentTextComponent
                        text="DISCUSSIONS"
                        color="#74359c"
                        size={16}
                        weight={800}
                    />

                    <IncidentTextComponent
                        text="Incident Related Conversations"
                        color="#484849"
                        size={10}
                        weight={600}
                    />

                </Box>

                <IconButton
                    size="sm"
                    variant="soft"
                    color="neutral"
                    onClick={() => setOpenSidebar(false)}
                    sx={{
                        borderRadius: 10
                    }}
                >
                    ←
                </IconButton>

            </Box>

            {/* SEARCH */}

            <Box
                sx={{
                    px: 2,
                    pb: 2,
                    mt: 1
                }}
            >

                <Input
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                    startDecorator={
                        <SearchRoundedIcon />
                    }
                    placeholder="Search discussion..."
                    variant="soft"
                    sx={{
                        borderRadius: 12
                    }}
                />

            </Box>

            {/* CHAT LIST */}

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}>
                {filteredConversations?.map((chat) => {
                    const unReadCount = UnReadCount?.find(item => Number(item?.conversation_id) ===
                        Number(chat?.conversation_id))
                    return (
                        <ConversationCard
                            key={
                                chat?.is_group_chat
                                    ? `GROUP_${chat?.conversation_id}`
                                    : chat?.participant_ids
                            }
                            chat={chat}
                            unRead={unReadCount}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            onlineUsers={onlineUsers}
                        />
                    )
                })
                }

            </Box>

        </Box>
    );
};

export default memo(DiscussionSidebar);