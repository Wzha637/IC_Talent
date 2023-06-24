import React, { Component } from 'react';

export class Sale extends Component {
    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], loading: true };
    }

    componentDidMount() {
        this.populateSaleData();
    }

    static renderSaleTable(sales) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Store Name</th>
                        <th>Date Sold</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale =>
                        <tr key={sale.id}>
                            <td>{sale.customerName}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.storeName}</td>
                            <td>{sale.dateSold}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(sale.id)}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(sale.id)}>Delete</button>
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
            : Sale.renderSaleTable(this.state.sales);

        return (
            <div>
                <h1 id="tabelLabel" >Sale</h1>
                {contents}
            </div>
        );
    }

    async populateSaleData() {
        const response = await fetch('https://localhost:7166/api/Sales');
        const data = await response.json();
        this.setState({ sales: data, loading: false });
    }
}
