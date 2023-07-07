import React, { Component } from 'react';
import '../modal.css';

export class StoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 99,
            name: '',
            address: ''
        };
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onCancel();
        fetch('https://localhost:7166/api/Stores', {
            method: this.props.method,
            mode :'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div id="modal">
                <div id="overlay"></div>
                <form>
                    <h2>Create New Store</h2>
                    <div>
                        <input type="text" name="name" className="input" placeholder="Name..." value={this.props.store.name == '' ? this.state.name : this.props.store.name} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <input type="text" name="address" className="input" placeholder="Address..." value={this.props.store.address == '' ? this.state.address : this.props.store.adress} onChange={this.changeHandler}></input>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={this.submitHandler}>Create</button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onCancel}>Close</button>
                </form>
            </div>
        );
    }
}