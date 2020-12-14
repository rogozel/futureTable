import React, {Component} from 'react';
import SearchPanel from '../search-panel'
import AddPerson from '../add-person'
import TableHeader from '../table-header'
import TableList from '../table-list'
import Spinner from '../spinner'
import PersonInfo from '../person-info'
import './app.css'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: false,
            loading: true,
            pageList: 50,
            page: 0,
            term: '',
            info: '',
            reverseId: true,
            reverseFirstName: false,
            reverseLastName: false,
            reverseEmail: false,
            reversePhone: false,
            data: []
        };
        this.onIdSort = this.onIdSort.bind(this);
        this.onFirstNameSort = this.onFirstNameSort.bind(this);
        this.onLastNameSort = this.onLastNameSort.bind(this);
        this.onEmailSort = this.onEmailSort.bind(this);
        this.onPhoneSort = this.onPhoneSort.bind(this);
        this.info = this.info.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.setPage = this.setPage.bind(this);
        this.addForm = this.addForm.bind(this);
        this.unique = this.unique.bind(this);
        this.server = this.server.bind(this);
        this.setSelectData = this.setSelectData.bind(this);
    }

    onIdSort() {
        this.setState(({data, reverseId}) => {
            const newArr = (data).slice(0)
            if(reverseId) {
                newArr.sort((a, b) => b.id - a.id);
            }else {
                newArr.sort((a, b) => a.id - b.id);
            }
            return {
                data: newArr,
                reverseId: !reverseId,
                reverseFirstName: false,
                reverseLastName: false,
                reverseEmail: false,
                reversePhone: false,
            }
        })
    }

    onFirstNameSort() {
        this.setState(({data, reverseFirstName}) => {
            const newArr = data.slice(0)
            if(reverseFirstName === false){
                newArr.sort((a, b) => {
                    return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
                })
            } else {
                newArr.sort((a, b) => {
                    return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1
                })
            }
            return {
                data: newArr,
                reverseFirstName: !reverseFirstName,
                reverseId: false,
                reverseLastName: false,
                reverseEmail: false,
                reversePhone: false
            }
        })
    }

    onLastNameSort() {
        this.setState(({data, reverseLastName}) => {
            const newArr = data.slice(0)
            if(reverseLastName === false){
                newArr.sort((a, b) => {
                    return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
                })
            } else {
                newArr.sort((a, b) => {
                    return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1
                })
            }
            return {
                data: newArr,
                reverseLastName: !reverseLastName,
                reverseId: false,
                reverseFirstName: false,
                reverseEmail: false,
                reversePhone: false
            }
        })
    }

    onEmailSort() {
        this.setState(({data, reverseEmail}) => {
            const newArr = data.slice(0)
            if(reverseEmail === false){
                newArr.sort((a, b) => {
                    return a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
                })
            } else {
                newArr.sort((a, b) => {
                    return a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1
                })
            }
            return {
                data: newArr,
                reverseEmail: !reverseEmail,
                reverseId: false,
                reverseFirstName: false,
                reverseLastName: false,
                reversePhone: false
            }
        })
    }

    onPhoneSort() {
        this.setState(({data, reversePhone}) => {
            const newArr = data.slice(0)
            if(reversePhone){
                newArr.sort((a, b) => parseInt(b.phone.replace(/[^0-9]/g, '')) - parseInt(a.phone.replace(/[^0-9]/g, '')));
            } else {
                newArr.sort((a, b) => parseInt(a.phone.replace(/[^0-9]/g, '')) - parseInt(b.phone.replace(/[^0-9]/g, '')));
            }
            return {
                data: newArr,
                reversePhone: !reversePhone,
                reverseFirstName: false,
                reverseLastName: false,
                reverseEmail: false,
                reverseId: false
            }
        })
    }

    unique(data) {
        let result = [];
        let resultId = [];
        for (let str of data) {
            if (!resultId.includes(str.id)) {
                result.push(str);
                resultId.push(str.id);
            }
        }
        return result;
    }

    info(item) {
        this.setState({info: {...item}})
    }

    searchList(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            const label = item.id + ' ' + item.firstName + ' ' + item.lastName + ' ' + item.email + ' ' + item.phone;
                return label.toLowerCase().indexOf(term) > -1
        })
    }

    updateSearch(term) {
        this.setState({term: term})
    }

    addForm(item) {
        this.setState(({data}) => {
            const newData = [item, ...data]
            return {
                data: newData
            }
        })
    }

    setPage(p) {
        const pageList = this.state.pageList
        if(this.searchList(this.state.data, this.state.term).slice(p * pageList, (p + 1)* pageList).length === 0) return
        this.setState({page: p})
    }
//======================================server
    server(url) {
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState(({data, loading}) => {
                let res = this.unique(result)
                res = res.sort((a, b) => a.id - b.id);
                return {
                    data: res,
                    loading: false
                }
        })).catch(e =>  alert('Не удалось подключиться к серверу'));
        this.setSelectData();
    }

    setSelectData() {
        this.setState({selectData: true})
    }

    render() {

        if (!this.state.selectData) {
            return(
                <div className="btn-group">
                    <button className="btn btn-info" onClick={() => this.server('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')}
                    >Маленький объем данных</button>
                    <button className="btn btn-info" onClick={() => this.server('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')}
                    >Большой объем данных</button>
                </div>
            )

        } else {
            if (this.state.loading) {
                return(
                    <Spinner/>
                )

            } else {
                const {reverseId, reverseFirstName, reverseLastName, reverseEmail, reversePhone, data, term, page, pageList, info} = this.state;
                const visibleList = this.searchList(data, term).slice(page * pageList, (page + 1)* pageList);
    
                return(
                    <div 
                        className="app">
                        <div 
                            className="d-flex top-panel">
                            <SearchPanel
                            search={this.updateSearch}/>
                            <AddPerson
                            arrId={data}
                            addForm={this.addForm}/>
                        </div>
                        <TableHeader
                            reverseId={reverseId}
                            reverseFirstName={reverseFirstName}
                            reverseLastName={reverseLastName}
                            reverseEmail={reverseEmail}
                            reversePhone={reversePhone}
                            onIdSort={this.onIdSort}
                            onFirstNameSort={this.onFirstNameSort}
                            onLastNameSort={this.onLastNameSort}
                            onEmailSort={this.onEmailSort}
                            onPhoneSort={this.onPhoneSort}/>
                        <TableList
                            info={this.info}
                            posts={visibleList}/>
                            <div className="btn-group justify-content-center d-flex">
                                <button className="btn btn-primary" onClick={() => this.setPage(page - 1)}>Предыдущая страница</button>
                                <button className="btn btn-primary" onClick={() => this.setPage(page + 1)}>Следующая страница</button>
                            </div>
                        <PersonInfo
                            info={info}/>
                        <div className="footer"></div>
                    </div>
                )
            } 
        }
    }
}
