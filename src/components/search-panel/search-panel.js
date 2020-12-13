import React, { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
    }

    search(e) {
        this.setState({term: e.target.value})
    }
    
    render() {
        return(
            <div className="search d-flex">
                <input 
                    type="text"
                    className="form-control search-input search"
                    placeholder="Поиск"
                    onChange={this.search}/>
                <button
                    className="btn btn-secondary"
                    onClick={() => this.props.search(this.state.term)}
                    >Найти
                </button>
            </div>
        )
    }
}

