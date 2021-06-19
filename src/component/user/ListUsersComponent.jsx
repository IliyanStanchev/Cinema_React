import React, { Component } from 'react'
import UserService from '../../service/UserService';

const INSTRUCTOR = 'bg.tu-varna'

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            options: { year: 'numeric', month: 'long', day: 'numeric' }
        }
        this.deleteUserClicked  = this.deleteUserClicked.bind(this)
        this.updateUserClicked  = this.updateUserClicked.bind(this)
        this.refreshUsers       = this.refreshUsers.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UserService.retrieveAllUsers()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ users: response.data })
                }
            )
    }

    deleteUserClicked(id) {
        UserService.deleteUser(id)
            .then(
                response => {
                    this.setState({ message: `Delete of user successful` })
                    this.refreshUsers()
                }
            )

    }


    updateUserClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/users/edit`, state: id})
    }

    render() {
        console.log('render')
        return ( 
            <div className="container">
                <h3>All Users</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Created On</th>
                                <th>Last login</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.username}</td>
                                            <td>{user.password}</td>
                                            <td>{user.email}</td>
                                            <td>{new Date(user.createdOn).toLocaleDateString("en-US",this.state.options)}</td>
                                            <td>{new Date(user.lastLogin).toLocaleDateString("en-US",this.state.options)}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateUserClicked(user.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.updateUserClicked(0)}>Add new User</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUsersComponent