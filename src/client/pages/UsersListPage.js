import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers(); // As soon as this component is loaded up
                                 // it tries to fetch all users 
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        })
    }

    render() {
        return (
            <div className="center-align" style={{marginTop:200}}>
                <h3>Users</h3>
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { users: state.users }
};

function loadData(store) { // required for SSR
    return store.dispatch(fetchUsers()) // manual dispatch, fetchUsers returns a promise which represents a network request
}

export default { 
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList)
};