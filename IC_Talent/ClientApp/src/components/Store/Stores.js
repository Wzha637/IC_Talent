import React, { Component } from 'react';
import { StoreModal } from './StoreModal';
import '../modal.css'


export class Store extends Component {
    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.openEditModalHandler = this.openEditModalHandler.bind(this);
        this.closeEditModalHandler = this.closeEditModalHandler.bind(this);
        this.state = {
            stores: [], loading: true, createModal: false, editModal: false, store: { id: 0, name: '', address: '' }
        };
    
    }

    componentDidMount() {
        this.populateStoreData();
    }
    openCreateModalHandler = () => this.setState({ ...this.state, createModal: true })
    closeCreateModalHandler = () => this.setState({ ...this.state, createModal: false })
    openEditModalHandler = () => this.setState({ ...this.state, editModal: true })
    closeEditModalHandler = () => this.setState({ ...this.state, editModal: false })

    static renderStoreTable(stores) {
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
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>
                                <button className="btn btn-success" onClick={(store) => {
                                    this.openEditModalHandler();
                                    this.setState({
                                        ...this.state, store: {
                                            id: store.id,
                                            name: store.name,
                                            address: store.address
                                        }
                                    })
                                }}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={async (e) => {
                                    e.preventDefault();
                                    const response = await fetch(`https://localhost:7166/api/Stores/${store.id}`, { method: "DELETE" });
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
            : Store.renderStoreTable(this.state.stores);

        return (
            <div>
                <h1 id="tabelLabel" >Store</h1>
                {this.state.createModal ? <StoreModal onCancel={this.closeCreateModalHandler} method={"POST"} store={this.state.store} /> : ''}
                {this.state.editModal ? <StoreModal onCancel={this.closeEditModalHandler} method={"UPDATE"} store={this.state.store} /> : ''}
                <button type="button" className="btn btn-primary" onClick={this.openCreateModalHandler}>Create New Store</button>
                {contents}
            </div>
        );
    }

    async populateStoreData() {
        const response = await fetch('https://localhost:7166/api/Stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}
