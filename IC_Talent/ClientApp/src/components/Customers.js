import React, { Component, useState } from 'react';
import { CustomerModal } from './CustomerModal';
import './modal.css'

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, createModal: false, editModal:false };
    }

    componentDidMount() {
        this.populateCustomerData();
    }

    openCreateModalHandler = () => this.setState({ ...this.state, createModal: true })
    closeCreateModalHandler = () => this.setState({ ...this.state, createModal: false })
    openEditModalHandler = () => this.setState({ ...this.state, editModal: true })
    closeEditModalHandler = () => this.setState({ ...this.state, editModal: false })

    static renderCustomerTable(customers) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button className="btn btn-success" onClick={this.openEditModalHandler}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(e) => {
                                    fetch(`api/Customers/${customer.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                console.log('Delete request successful');
                                                // Handle successful deletion here
                                            } else {
                                                console.error('Delete request failed');
                                                // Handle deletion failure here
                                            }
                                        })
                                }
                                }>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customer.renderCustomerTable(this.state.customers);

        return (
            <div>
                <h1 id="tabelLabel" >Customer</h1>
                {this.state.createModal ? <CustomerModal onCancel={this.closeCreateModalHandler} /> : ''}
                {this.state.editModal ? <CustomerModal onCancel={this.closeEditModalHandler} /> : ''}
                <button type="button" className="btn btn-primary" onClick={this.openCreateModalHandler}>Create New Customer</button>
                {contents}
            </div>
        );
    }

    async populateCustomerData() {
        const response = await fetch('https://localhost:7166/api/Customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false, createModal:false, editModal :false });
    }
}