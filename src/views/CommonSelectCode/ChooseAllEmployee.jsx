import React, { memo, useMemo } from 'react'
import { useAllEmployeeFetch } from '../Diet/CommonData/UseQuery'

const ChooseAllEmployee = ({ value, setValue }) => {

    const { data: AllEmployee = [] } = useAllEmployeeFetch()

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    /**
     * 
     * Before Maping just Filetering the Employee in the Ascenidng Order
     */
    const SortedEmployeeArray = useMemo(() => {
        return AllEmployee
            ? [...AllEmployee].sort((a, b) =>
                a.em_name?.localeCompare(b.em_name)
            )
            : []
    }, [AllEmployee])

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 140,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="" >
                Select Diet Type
            </option>

            {SortedEmployeeArray?.map((item, index) => (
                <option key={index} value={item.em_id}>
                    {`${item.em_name} (${item.em_no})`}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseAllEmployee)



/**?
 *
 *
 * MAY BE WE CAN REUSE THIS KEEPING IT AS IT IS
 */

// import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
// import SearchIcon from '@mui/icons-material/Search'
// import CloseIcon from '@mui/icons-material/Close'
// import { useAllEmployeeFetch } from '../Diet/CommonData/UseQuery'

// const ChooseAllEmployee = ({ value, setValue }) => {
//     const { data: AllEmployee = [] } = useAllEmployeeFetch()

//     const [searchMode, setSearchMode] = useState(false)
//     const [searchText, setSearchText] = useState('')
//     const [showSuggestions, setShowSuggestions] = useState(false)
//     const inputRef = useRef(null)

//     const SortedEmployeeArray = useMemo(() => {
//         return [...AllEmployee].sort((a, b) =>
//             a.em_name?.localeCompare(b.em_name)
//         )
//     }, [AllEmployee])

//     const filteredEmployees = useMemo(() => {
//         return SortedEmployeeArray.filter(emp =>
//             emp.em_name?.toLowerCase().includes(searchText.toLowerCase())
//         )
//     }, [searchText, SortedEmployeeArray])

//     useEffect(() => {
//         if (searchMode && inputRef.current) {
//             inputRef.current.focus()
//         }
//     }, [searchMode])

//     const handleSelectChange = (e) => {
//         setValue(e.target.value)
//     }

//     const handleSuggestionClick = (emp) => {
//         setValue(emp.em_id)
//         setSearchText(emp.em_name)
//         setShowSuggestions(false)
//         setSearchMode(false) // switch back to select mode
//     }

//     return (
//         <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>

//             {/* Toggle Icon */}
//             {!searchMode ? (
//                 <SearchIcon
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => setSearchMode(true)}
//                 />
//             ) : (
//                 <CloseIcon
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => {
//                         setSearchMode(false)
//                         setSearchText('')
//                         setShowSuggestions(false)
//                     }}
//                 />
//             )}

//             {/* SELECT MODE */}
//             {!searchMode && (
//                 <select
//                     value={value ? String(value) : ''}
//                     onChange={handleSelectChange}
//                     style={{
//                         minWidth: 160,
//                         height: 30,
//                         fontSize: 11,
//                         borderRadius: 4,
//                         border: '1px solid #ccc'
//                     }}
//                 >
//                     <option value="">Select Employee</option>
//                     {SortedEmployeeArray.map((item) => (
//                         <option key={item.em_id} value={item.em_id}>
//                             {`${item.em_name} (${item.em_no})`}
//                         </option>
//                     ))}
//                 </select>
//             )}

//             {/* SEARCH MODE */}
//             {searchMode && (
//                 <div style={{ position: 'relative' }}>
//                     <input
//                         className='qty-input'
//                         ref={inputRef}
//                         value={searchText}
//                         onChange={(e) => {
//                             setSearchText(e.target.value)
//                             setShowSuggestions(true)
//                         }}
//                         placeholder="Search employee..."
//                         style={{
//                             fontSize: 11,
//                             width: '220px',
//                             backgroundColor: 'white'
//                         }}
//                     />

//                     {/* Suggestions Dropdown */}
//                     {showSuggestions && searchText && (
//                         <div
//                             style={{
//                                 position: 'absolute',
//                                 top: 32,
//                                 left: 0,
//                                 width: '100%',
//                                 maxHeight: 150,
//                                 overflowY: 'auto',
//                                 background: '#fff',
//                                 border: '1px solid #ccc',
//                                 borderRadius: 4,
//                                 zIndex: 1000
//                             }}
//                         >
//                             {filteredEmployees.length > 0 ? (
//                                 filteredEmployees.map(emp => (
//                                     <div
//                                         key={emp.em_id}
//                                         onClick={() => handleSuggestionClick(emp)}
//                                         style={{
//                                             padding: '6px 8px',
//                                             cursor: 'pointer',
//                                             fontSize: 11
//                                         }}
//                                         onMouseEnter={e =>
//                                             (e.target.style.background = '#f0f0f0')
//                                         }
//                                         onMouseLeave={e =>
//                                             (e.target.style.background = '#fff')
//                                         }
//                                     >
//                                         {`${emp.em_name} (${emp.em_no})`}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div style={{ padding: 8, fontSize: 11 }}>
//                                     No match found
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default memo(ChooseAllEmployee)
