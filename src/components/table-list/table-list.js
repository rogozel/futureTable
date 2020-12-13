import React from 'react'
import TableListItem from '../table-list-item'
import './table-list.css'

const TableList = ({posts, info}) => {
    
    const elements = posts.map((item) => {
        const {...itemProps} = item;
        return( 
            <li key={item.id}
                className="list-group-item"
                onClick={() => info(item)}>
                <TableListItem
                {...itemProps}/>
            </li>
        )
    })
 
    return (
        <div>
            <ul className="app-list list-group">
                {elements}
            </ul>
        </div>
    )
}

export default TableList;