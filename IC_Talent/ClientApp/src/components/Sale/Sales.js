import React, { Component } from 'react';
import { SaleModal } from './SaleModal';
import '../modal.css'

export class Sale extends Component {
    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = { sales: [], loading: true, createModal: false, editModal: false, sale: { id: 0, customerName: '', productName: '', storeName: '', dateSold: '' } };
    }

    componentDidMount() {
        this.populateSaleData();
    }

    openCreateModalHandler = () => this.setState({ ...this.state, createModal: true })
    closeCreateModalHandler = () => this.setState({ ...this.state, createModal: false })
    openEditModalHandler = () => this.setState({ ...this.state, editModal: true })
    closeEditModalHandler = () => this.setState({ ...this.state, editModal: false })

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
                                <button className="btn btn-success" onClick={(sale) => {
                                    this.openEditModalHandler();
                                    this.setState({
                                        ...this.state, sale: {
                                            id: sale.id,
                                            customerName: sale.customerName,
                                            productName: sale.productName,
                                            storeName: sale.storeName,
                                            dateSold: sale.dateSold,
                                        }
                                    })
                                }}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={async (e) => {
                                    e.preventDefault();
                                    const response = await fetch(`https://localhost:7166/api/Sales/${sale.id}`, { method: "DELETE" });
                                    const data = await response.json();
                                    console.log(data);
                                }}>Delete</button>
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
                {this.state.createModal ? <SaleModal onCancel={this.closeCreateModalHandler} method={"POST"} sale={this.state.sale} /> : ''}
                {this.state.editModal ? <SaleModal onCancel={this.closeEditModalHandler} method={"UPDATE"} sale={this.state.sale} /> : ''}
                <button type="button" className="btn btn-primary" onClick={this.openCreateModalHandler}>Create New Sale</button>
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
