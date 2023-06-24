import React, { Component } from 'react';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };
    }

    componentDidMount() {
        this.populateProductData();
    }

    static renderProductTable(products) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(product.id)}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(product.id)}>Delete</button>
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
            : Product.renderProductTable(this.state.products);

        return (
            <div>
                <h1 id="tabelLabel" >Product</h1>
                {contents}
            </div>
        );
    }

    async populateProductData() {
        const response = await fetch('https://localhost:7166/api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}
