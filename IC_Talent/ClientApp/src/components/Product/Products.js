import React, { Component } from 'react';
import { ProductModal } from './ProductModal'
import '../modal.css'

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.openEditModalHandler = this.openEditModalHandler.bind(this);
        this.closeEditModalHandler = this.closeEditModalHandler.bind(this);
        this.state = { products: [], loading: true, createModal: false, editModal: false, product: { id: 0, name: '', price: undefined } };
    }

    componentDidMount() {
        this.populateProductData();
    }

    openCreateModalHandler = () => this.setState({ ...this.state, createModal: true })
    closeCreateModalHandler = () => this.setState({ ...this.state, createModal: false })
    openEditModalHandler = () => this.setState({ ...this.state, editModal: true })
    closeEditModalHandler = () => this.setState({ ...this.state, editModal: false })

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
                                <button className="btn btn-success" onClick={(product) => {
                                    this.openEditModalHandler();
                                    this.setState({
                                        ...this.state, product: {
                                            id: product.id,
                                            name: product.name,
                                            address: product.price
                                        }
                                    })
                                }}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={async (e) => {
                                    e.preventDefault();
                                    const response = await fetch(`https://localhost:7166/api/Products/${product.id}`, { method: "DELETE" });
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
            : Product.renderProductTable(this.state.products);

        return (
            <div>
                <h1 id="tabelLabel" >Product</h1>
                {this.state.createModal ? <ProductModal onCancel={this.closeCreateModalHandler} method={"POST"} product={this.state.product} /> : ''}
                {this.state.editModal ? <ProductModal onCancel={this.closeEditModalHandler} method={"UPDATE"} product={this.state.product} /> : ''}
                <button type="button" className="btn btn-primary" onClick={this.openCreateModalHandler}>Create New Product</button>
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
