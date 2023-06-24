import React, { Component } from 'react';

export class Store extends Component {
    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
    }

    componentDidMount() {
        this.populateStoreData();
    }

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
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(store.id)}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(store.id)}>Delete</button>
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
