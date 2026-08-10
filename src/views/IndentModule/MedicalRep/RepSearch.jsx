import React from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

const RepSearch = ({ searchName, setSearchName }) => {
    return (
        <TextFieldCustom
            placeholder="Search By Name"
            type="text"
            size="sm"
            name="rep_name"
            value={searchName}
            onchange={(e) => setSearchName(e.target.value)}
        />
    )
}

export default RepSearch