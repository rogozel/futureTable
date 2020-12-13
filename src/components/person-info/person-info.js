import React from 'react'
import './person-info.css'

const PersonInfo = ({info=''}) => {

    if (info==='') {
        return(
            <div></div>
        )
    } else {
        return (
            <div className="person-info">
                Выбран пользователь <b>{info.firstName} {info.lastName}</b>
                <div>Описание:
                    <textarea 
                        className="form-control"
                         readOnly value={info.description}>
                    </textarea>
                </div>
                <div> 
                    Адрес проживания:<b>{info.address.streetAddress}</b>
                </div>
                <div>
                    Город: <b>{info.address.city}</b>
                </div>
                <div>
                    Провинция/штат: <b>{info.address.state}</b>
                </div>
                <div>
                    Индекс: <b>{info.address.zip}</b>
                </div>
            </div>
        )
    }
}

export default PersonInfo;