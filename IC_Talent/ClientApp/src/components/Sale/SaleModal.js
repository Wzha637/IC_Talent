import React, { Component } from 'react';
import '../modal.css';

export class SaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            customerName: '',
            productName: '',
            storeName: '',
            dateSold: ''
        };
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onCancel();
        fetch('https://localhost:7166/api/Sales', {
            method: this.props.method,
            mode :'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                customerName: this.state.customerName,
                productName: this.state.productName,
                storeName: this.state.storeName,
                dateSold: this.state.dateSold,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div id="modal" style={{width:"500px",height:"400px"}}>
                <div id="overlay"></div>
                <form className="form-control">
                    <h2>Create New Sale</h2>
                    <div>
                        <input type="text" name="customerName" className="input" placeholder="Customer Name..." value={this.props.sale.customerName == '' ? this.state.customerName : this.props.sale.customerName} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <input type="text" name="productName" className="input" placeholder="Product Name..." value={this.props.sale.productName == '' ? this.state.productName : this.props.sale.productName} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <input type="text" name="StoreName" className="input" placeholder="Store Name..." value={this.props.sale.storeName == '' ? this.state.storeName : this.props.sale.storeName} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <input type="text" name="dateSold" className="input" placeholder="Date" onChange={this.changeHandler} value={this.props.sale.dateSold == '' ? this.state.dateSold : this.props.sale.dateSold}></input>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={this.submitHandler}>Create</button>
                    <button type="button" className="btn btn-danger" onClick={this.props.onCancel}>Close</button>
                </form>
            </div>
        );
    }
}