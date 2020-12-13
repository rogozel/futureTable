import React, { Component } from 'react';
import './add-person.css'

export default class AddPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkData: '',
            btn: 'btn btn-outline-success',
            classNames: 'add-form none',
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                streetAddress: '',
                city: '',
                state: '',
                zip: ''
            },
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleClassNames = this.toggleClassNames.bind(this);
        this.send = this.send.bind(this);
        this.onValueChangeId = this.onValueChangeId.bind(this);
        this.onValueChangeFirstName = this.onValueChangeFirstName.bind(this);
        this.onValueChangeLastName = this.onValueChangeLastName.bind(this);
        this.onValueChangeEmail = this.onValueChangeEmail.bind(this);
        this.onValueChangePhone = this.onValueChangePhone.bind(this);
    }

    toggleClassNames() {
        this.setState(({classNames}) => {
            if (classNames === 'add-form') {
                return {
                    classNames: `${classNames} none`,
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    checkData: ''
                }
            } else {
                return {
                    classNames: `add-form`,
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    checkData: ''
                }
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }

    send() {
        const idList = this.props.arrId.map((item) => {return item.id})

        if (!isNaN(this.state.id) && (this.state.id >= 0) && (!/\d/.test((this.state.firstName))) &&
            (!/\d/.test((this.state.lastName))) && (isNaN(this.state.email)) &&
            (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(this.state.phone)) && !idList.includes(parseInt(this.state.id))) {
            
            const {classNames, btn, ...st} = this.state
            this.props.addForm(st)
            this.toggleClassNames()
            this.setState({checkData: ''})
        } 
        else this.setState({checkData: 'Проверьте корректность введенных данных'})
    }

    onValueChangeId(e) {
        this.setState({id: e.target.value})
    }

    onValueChangeFirstName(e) {
        this.setState({firstName: e.target.value})
    }

    onValueChangeLastName(e) {
        this.setState({lastName: e.target.value})
    }

    onValueChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    onValueChangePhone(e) {
        this.setState({phone: e.target.value})
    }
    
    render() {
        return(
            <div>
                <button className='btn btn-info' onClick={this.toggleClassNames}>Добавить</button>
                <div className={this.state.classNames}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="" >Id</label>
                            <input type="text" className="form-control" placeholder="id" value={this.state.id} onChange={this.onValueChangeId}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" >firstName</label>
                            <input className="form-control" type="text" placeholder="firstName" value={this.state.firstName} onChange={this.onValueChangeFirstName}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" >lastName</label>
                            <input className="form-control" type="text" placeholder="lastName" value={this.state.lastName} onChange={this.onValueChangeLastName}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" >email</label>
                            <input className="form-control" type="text" placeholder="email" value={this.state.email} onChange={this.onValueChangeEmail}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" >phone</label>
                            <input className="form-control" type="text" placeholder="phone" value={this.state.phone} onChange={this.onValueChangePhone}></input>
                        </div>
                        <label htmlFor="" className="check-data">{this.state.checkData}</label>
                        <div className="form-item d-flex form-group btn-group">
                            <button className={this.state.btn} type="submit" onClick={this.send}>Добавить</button>
                            <button className="btn btn-danger" type="submit" onClick={this.toggleClassNames} >Закрыть</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
