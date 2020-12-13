import React from 'react'
import './table-list-item.css'

const TableListItem = ({...itemProps}) => {
    
    const {id, firstName, lastName, email, phone} = itemProps
    return (
        <div className="d-flex ">
            <div className="cell">{id}</div>
            <div className="cell">{firstName}</div>
            <div className="cell">{lastName}</div>
            <div className="cell">{email}</div>
            <div className="cell">{phone}</div>
        </div>
    )
}

export default TableListItem;