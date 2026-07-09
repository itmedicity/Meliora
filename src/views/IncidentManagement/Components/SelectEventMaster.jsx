
import React, { Fragment, memo, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy';
import { useAllIncidentNotificationEvents } from '../CommonComponent/useQuery';


const SelectEventMaster = ({ eventsection, setEventSection }) => {

    const [inputValue, setInputValue] = useState('');

    const { data: EventDetail = [], isLoading } = useAllIncidentNotificationEvents();

    const ActiveEvents = Array.isArray(EventDetail) ?
        EventDetail?.filter(item => item?.status === 1) :
        [];

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        width: '100%',
                        minHeight: 35,
                        borderRadius: 0
                    }}
                    placeholder="select Events"
                    options={ActiveEvents}
                    value={eventsection ?? null}
                    loading={isLoading}
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setEventSection(newValue ?? null);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option?.event_slno === value?.event_slno
                    }
                    getOptionKey={(option) => option.event_slno}
                    getOptionLabel={(option) => option?.event_name || ''}
                    loadingText="Loading..."
                />
            </CssVarsProvider>
        </Fragment>
    );
};

export default memo(SelectEventMaster);








