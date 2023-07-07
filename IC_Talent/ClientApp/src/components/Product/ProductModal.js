import React, { Component } from 'react';
import '../modal.css';

export class ProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 99,
            name: '',
            price: undefined
        };
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onCancel();
        fetch('https://localhost:7166/api/Products', {
            method: this.props.method,
            mode :'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                price: this.state.price
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
                    <h2>Create New Product</h2>
                    <div>
                        <input type="text" name="name" className="input" placeholder="Name..." value={this.props.product.name == '' ? this.state.name : this.props.product.name} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <input type="text" name="price" className="input" placeholder="Price..." value={this.props.product.address == '' ? this.state.price : this.props.product.price} onChange={this.changeHandler}></input>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={this.submitHandler}>Create</button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onCancel}>Close</button>
                </form>
            </div>
        );
    }
}