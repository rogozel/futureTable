import React from 'react'
import './table-header.css'

const TableHeader = ({onIdSort, onFirstNameSort, onLastNameSort, onEmailSort, onPhoneSort, ...sort}) => {
    
    const {reverseId, reverseFirstName, reverseLastName, reverseEmail, reversePhone} = sort
    const desc = 'fa fa-sort-desc'
    const asc = 'fa fa-sort-asc'

    return(
        <div className='d-flex list-group-item table-header'>
            <div className="cell" onClick={() => onIdSort()}>id
                <i className={reverseId ? asc : desc} aria-hidden="true"></i></div>
            <div className="cell" onClick={() => onFirstNameSort()}>firstName
                <i className={reverseFirstName ? asc : desc} aria-hidden="true"></i></div>
            <div className="cell" onClick={() => onLastNameSort()}>lastName
                <i className={reverseLastName ? asc : desc} aria-hidden="true"></i></div>
            <div className="cell" onClick={() => onEmailSort()}>email
                <i className={reverseEmail ? asc : desc} aria-hidden="true"></i></div>
            <div className="cell" onClick={() => onPhoneSort()}>phone
                <i className={reversePhone ? asc : desc} aria-hidden="true"></i></div>
        </div>
    )
}

export default TableHeader;