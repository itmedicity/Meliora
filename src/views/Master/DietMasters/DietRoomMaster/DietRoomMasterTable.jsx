import React, { memo, useMemo } from 'react';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
import { UseRoomTypeDetail } from 'src/views/Diet/CommonData/UseQuery';

const DietRoomMasterTable = ({ tableData = [], rowSelect }) => {

    // Fetch room category master
    const { data: RoomType = [] } = UseRoomTypeDetail();

    //ID  NAME MAP
    const roomTypeMap = useMemo(() => {
        return Object.fromEntries(
            RoomType?.map(rt => [Number(rt?.fb_rc_slno), rt?.fb_rcc_desc])
        );
    }, [RoomType]);

    // Columns MUST be useMemo (NOT useState)
    const column = useMemo(() => [
        {
            headerName: 'Sl No',
            field: 'diet_rm_category_slno',
            width: 80
        },
        {
            headerName: 'Room Name',
            field: 'diet_rm_name',
            flex: 1
        },
        {
            headerName: 'Categories',
            flex: 2,
            valueGetter: (params) => {
                try {
                    const raw = params.data?.diet_rm_categories;
                    if (!raw) return '';

                    const ids = Array.isArray(raw)
                        ? raw
                        : JSON.parse(raw);

                    return ids
                        ?.map(id => roomTypeMap[Number(id)])
                        ?.filter(Boolean)
                        ?.join(', ');
                } catch (err) {
                    console.error('Category parse error', err);
                    return '';
                }
            }
        },
        {
            headerName: 'Status',
            width: 120,
            valueGetter: (params) =>
                params.data?.diet_rm_status === 1 ? 'Active' : 'Inactive'
        },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: (params) => (
                <EditButton onClick={() => rowSelect(params.data)} />
            )
        }
    ], [roomTypeMap, rowSelect]);

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tableData}
        />
    );
};

export default memo(DietRoomMasterTable);
