import {
    Box,
    Input,
    Typography,
    IconButton
} from '@mui/joy'
import React, { memo, useMemo, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
    useFetchAllItemFileDetail,
    UseIemFullDetail
} from 'src/views/Diet/CommonData/UseQuery'
import DietTextComponent from 'src/views/Diet/DietComponent/DietTextComponent'
import KotItemHeader from 'src/views/Diet/KotItemList/KotItemHeader'

const ViewItemDetail = () => {

    const { data: ExistFoodDetail = [], isLoading } = UseIemFullDetail()
    const { data: ExistingFoodFiles = [] } = useFetchAllItemFileDetail()

    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const [imgIndex, setImgIndex] = useState({})

    /* ---------------- IMAGE MAP ---------------- */
    const imageMap = useMemo(() => {
        const map = new Map()

        ExistingFoodFiles?.forEach((file) => {
            const key = String(file.item_id)
            if (!map.has(key)) map.set(key, [])
            map.get(key).push({
                url: file.url,
                name: file.name
            })
        })

        return map
    }, [ExistingFoodFiles])

    /* ---------------- GROUP DATA ---------------- */
    const groupedData = useMemo(() => {
        const map = new Map()

        ExistFoodDetail.forEach((item) => {

            if (!map.has(item.item_id)) {
                map.set(item.item_id, {
                    item_id: item.item_id,
                    item_name: item.item_name,
                    description: item.description,
                    group_name: item.group_name,
                    category_name: item.category_name,
                    item_type_name: item.item_type_name,
                    images: imageMap.get(String(item.item_id)) || [],
                    ingredients: [],
                    prices: []
                })
            }

            const target = map.get(item.item_id)

            if (item?.ingredients) {
                try {
                    JSON.parse(item.ingredients).forEach((ing) => {
                        target.ingredients.push(ing)
                    })
                } catch { }
            }

            if (item?.item_prices) {
                try {
                    JSON.parse(item.item_prices).forEach((p) => {
                        if (!target.prices.some(x => x.party_type_id === p.party_type_id)) {
                            target.prices.push(p)
                        }
                    })
                } catch { }
            }
        })

        return Array.from(map.values())
    }, [ExistFoodDetail, imageMap])


    const filteredData = useMemo(() => {
        if (!search.trim()) return groupedData

        return groupedData.filter(item =>
            item.item_name?.toLowerCase().includes(search.toLowerCase())
        )
    }, [groupedData, search])


    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id)
    }

    const nextImage = (itemId, imagesLength) => {
        setImgIndex(prev => ({
            ...prev,
            [itemId]: ((prev[itemId] || 0) + 1) % imagesLength
        }))
    }

    const prevImage = (itemId, imagesLength) => {
        setImgIndex(prev => ({
            ...prev,
            [itemId]: ((prev[itemId] || 0) - 1 + imagesLength) % imagesLength
        }))
    }


    return (
        <Box sx={{ width: '100%' }}>

            <Box
                sx={{
                    position: 'sticky',
                    top: -15,
                    zIndex: 10,
                    background: '#fff',
                    borderBottom: '1px solid #eee'
                }}
            >
                <KotItemHeader
                    name={'ITEM DETAILS'}
                    goBackPath={'/Home/ItemMaster'}
                />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'flex-end',
                    my: 2
                }}>
                    <Input
                        size="sm"
                        placeholder="Search..."
                        startDecorator={<SearchRoundedIcon />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 300, right: 0 }}
                    />
                </Box>
            </Box>

            {/* LIST */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>

                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : filteredData.length === 0 ? (
                    <Typography>No Items</Typography>
                ) : (
                    filteredData?.map((item) => {

                        const images = item.images || []
                        const currentIndex = imgIndex[item.item_id] || 0

                        return (
                            <Box
                                key={item.item_id}
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: 12,
                                    p: 1.5,
                                    background: '#fff'
                                }}
                            >

                                {/* HEADER ROW */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 1.5
                                    }}
                                >

                                    {/* LEFT SECTION */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    >

                                        {/* SMALL IMAGE CAROUSEL */}
                                        {images.length > 0 && (
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 10,
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    border: '1px solid #ddd',
                                                    bgcolor: '#f5f5f5'
                                                }}
                                            >

                                                <img
                                                    src={images[currentIndex]?.url}
                                                    alt=""
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />

                                                {
                                                    images.length > 1 && (
                                                        <>
                                                            {/* PREV */}
                                                            <Box
                                                                onClick={() =>
                                                                    prevImage(
                                                                        item.item_id,
                                                                        images.length
                                                                    )
                                                                }
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: 4,
                                                                    transform: 'translateY(-50%)',
                                                                    width: 22,
                                                                    height: 22,
                                                                    borderRadius: '50%',
                                                                    bgcolor: '#00000088',
                                                                    color: '#fff',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 11,
                                                                    cursor: 'pointer',
                                                                    userSelect: 'none'
                                                                }}
                                                            >
                                                                ◀
                                                            </Box>

                                                            {/* NEXT */}
                                                            <Box
                                                                onClick={() =>
                                                                    nextImage(
                                                                        item.item_id,
                                                                        images.length
                                                                    )
                                                                }
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    right: 4,
                                                                    transform: 'translateY(-50%)',
                                                                    width: 22,
                                                                    height: 22,
                                                                    borderRadius: '50%',
                                                                    bgcolor: '#00000088',
                                                                    color: '#fff',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: 11,
                                                                    cursor: 'pointer',
                                                                    userSelect: 'none'
                                                                }}
                                                            >
                                                                ▶
                                                            </Box>
                                                        </>
                                                    )
                                                }
                                            </Box>
                                        )}

                                        {/* ITEM INFO */}
                                        <Box
                                            sx={{
                                                flex: 1,
                                                minWidth: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.3
                                            }}
                                        >

                                            <DietTextComponent
                                                value={item?.item_name?.toUpperCase()}
                                                size={15}
                                                weight={700}
                                                wrap
                                                lines={1}
                                            />

                                            <DietTextComponent
                                                value={`${item?.item_type_name || ''} • ${item?.group_name || ''} • ${item?.category_name || ''}`}
                                                size={12}
                                                weight={500}
                                                color="#666"
                                                wrap
                                                lines={1}
                                            />

                                            <DietTextComponent
                                                value={item?.description || '-'}
                                                size={12}
                                                weight={400}
                                                color="#888"
                                                wrap
                                                lines={2}
                                            />

                                        </Box>
                                    </Box>

                                    {/* RIGHT ACTION */}
                                    <IconButton
                                        onClick={() => toggleExpand(item.item_id)}
                                        sx={{
                                            border: '1px solid #ddd'
                                        }}
                                    >
                                        {
                                            expandedId === item.item_id
                                                ? <ExpandLessIcon />
                                                : <ExpandMoreIcon />
                                        }
                                    </IconButton>

                                </Box>



                                {/* ACCORDION CONTENT */}
                                {
                                    expandedId === item.item_id && (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                display: 'flex',
                                                flexDirection: {
                                                    xs: 'column',
                                                    lg: 'row'
                                                },
                                                gap: 2
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    border: '1px solid #e4e4e4',
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    bgcolor: '#fafafa'
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        px: 1.5,
                                                        py: 1,
                                                        borderBottom: '1px solid #ececec',
                                                        bgcolor: '#f3f3f3',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <DietTextComponent
                                                        value={`INGREDIENTS`}
                                                        size={14}
                                                        weight={700}
                                                    />

                                                    <DietTextComponent
                                                        value={`${item?.ingredients?.length || 0} ITEMS`}
                                                        size={11}
                                                        color="#666"
                                                        weight={600}
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1,
                                                        maxHeight: 320,
                                                        overflow: 'auto'
                                                    }}
                                                >

                                                    {
                                                        item?.ingredients?.length > 0 ? (
                                                            item?.ingredients?.map((ing, i) => (

                                                                <Box
                                                                    key={i}
                                                                    sx={{
                                                                        p: 1,
                                                                        borderRadius: 10,
                                                                        bgcolor: '#fff',
                                                                        border: '1px solid #eee',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        gap: 1
                                                                    }}
                                                                >

                                                                    <Box
                                                                        sx={{
                                                                            minWidth: 0,
                                                                            flex: 1
                                                                        }}
                                                                    >
                                                                        <DietTextComponent
                                                                            value={ing?.ingredient_name}
                                                                            size={13}
                                                                            weight={600}
                                                                            wrap
                                                                            lines={2}
                                                                        />
                                                                    </Box>

                                                                    <Box
                                                                        sx={{
                                                                            px: 1,
                                                                            py: 0.4,
                                                                            borderRadius: 20,
                                                                            bgcolor: '#f3ebff',
                                                                            flexShrink: 0
                                                                        }}
                                                                    >
                                                                        <DietTextComponent
                                                                            value={`${ing?.quantity} ${ing?.unit_name}`}
                                                                            size={12}
                                                                            weight={700}
                                                                            color="#7b1fa2"
                                                                        />
                                                                    </Box>

                                                                </Box>

                                                            ))
                                                        ) : (

                                                            <Box
                                                                sx={{
                                                                    py: 3,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <DietTextComponent
                                                                    value="NO INGREDIENTS ADDED"
                                                                    size={12}
                                                                    color="#888"
                                                                />
                                                            </Box>

                                                        )
                                                    }

                                                </Box>

                                            </Box>

                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    border: '1px solid #e4e4e4',
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    bgcolor: '#fafafa'
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        px: 1.5,
                                                        py: 1,
                                                        borderBottom: '1px solid #ececec',
                                                        bgcolor: '#f3f3f3',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <DietTextComponent
                                                        value={`PRICE DETAILS`}
                                                        size={14}
                                                        weight={700}
                                                    />

                                                    <DietTextComponent
                                                        value={`${item?.prices?.length || 0} HOSPITALS`}
                                                        size={11}
                                                        color="#666"
                                                        weight={600}
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1,
                                                        maxHeight: 320,
                                                        overflow: 'auto'
                                                    }}
                                                >

                                                    {
                                                        item?.prices?.length > 0 ? (

                                                            item?.prices?.map((p, i) => (

                                                                <Box
                                                                    key={i}
                                                                    sx={{
                                                                        p: 1,
                                                                        borderRadius: 10,
                                                                        bgcolor: '#fff',
                                                                        border: '1px solid #eee',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                        gap: 1
                                                                    }}
                                                                >

                                                                    <Box
                                                                        sx={{
                                                                            minWidth: 0,
                                                                            flex: 1
                                                                        }}
                                                                    >

                                                                        <DietTextComponent
                                                                            value={p?.party_name}
                                                                            size={13}
                                                                            weight={700}
                                                                            wrap
                                                                            lines={2}
                                                                        />

                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 1,
                                                                                mt: 0.5,
                                                                                flexWrap: 'wrap'
                                                                            }}
                                                                        >

                                                                            <Box
                                                                                sx={{
                                                                                    px: 0.8,
                                                                                    py: 0.2,
                                                                                    borderRadius: 20,
                                                                                    bgcolor: '#fff4e5'
                                                                                }}
                                                                            >
                                                                                <DietTextComponent
                                                                                    value={`GST ${p?.gst_rate}%`}
                                                                                    size={10}
                                                                                    weight={700}
                                                                                    color="#b26a00"
                                                                                />
                                                                            </Box>

                                                                            <Box
                                                                                sx={{
                                                                                    px: 0.8,
                                                                                    py: 0.2,
                                                                                    borderRadius: 20,
                                                                                    bgcolor: '#eef7ff'
                                                                                }}
                                                                            >
                                                                                <DietTextComponent
                                                                                    value={`DISC ₹${p?.discount}`}
                                                                                    size={10}
                                                                                    weight={700}
                                                                                    color="#0057a3"
                                                                                />
                                                                            </Box>

                                                                        </Box>

                                                                    </Box>

                                                                    <Box
                                                                        sx={{
                                                                            px: 1.2,
                                                                            py: 0.6,
                                                                            borderRadius: 10,
                                                                            bgcolor: '#e8f7ee',
                                                                            flexShrink: 0
                                                                        }}
                                                                    >
                                                                        <DietTextComponent
                                                                            value={`₹ ${p?.price}`}
                                                                            size={14}
                                                                            weight={700}
                                                                            color="#067647"
                                                                        />
                                                                    </Box>

                                                                </Box>

                                                            ))

                                                        ) : (

                                                            <Box
                                                                sx={{
                                                                    py: 3,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <DietTextComponent
                                                                    value="NO PRICE DETAILS"
                                                                    size={12}
                                                                    color="#888"
                                                                />
                                                            </Box>

                                                        )
                                                    }

                                                </Box>

                                            </Box>

                                        </Box>
                                    )
                                }
                            </Box>
                        )
                    })
                )}

            </Box>
        </Box>
    )
}

export default memo(ViewItemDetail)