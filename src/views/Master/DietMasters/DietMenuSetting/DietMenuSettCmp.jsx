import React, { memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { editicon } from 'src/color/Color'
import { Table } from '@mui/joy'

const DietMenuSettCmp = ({ dataPost, setdataPost }) => {
  // Delete row from data
  const rowSelect = id => {
    const newdata = dataPost.filter(val => val.id !== id)
    setdataPost(newdata)
  }

  return (
    <div style={{ maxHeight: 250, overflowY: 'auto' }}>
      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5' }}>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Diet</th>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Diet Type</th>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Day</th>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Item Group</th>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Item</th>
            <th style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataPost &&
            dataPost.map(val => (
              <tr key={val.id}>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>{val.dietname}</td>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>{val.typename}</td>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>{val.dayname}</td>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>{val.groupname}</td>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>{val.itemname}</td>
                <td style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                  <button
                    style={{ color: editicon, background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onClick={() => rowSelect(val.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default memo(DietMenuSettCmp)

