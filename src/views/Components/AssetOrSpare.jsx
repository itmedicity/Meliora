import React from 'react'

const AssetOrSpare = () => {
    return (
        <Select
            placeholder="Select Type"
            sx={{ width: 200 }}
        >
            <Option value="asset">Asset</Option>
            <Option value="spare">Spare</Option>
        </Select>
    );
}

export default AssetOrSpare

