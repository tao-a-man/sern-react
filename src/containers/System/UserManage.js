import React, { Component } from 'react';

import './UserManage.scss';
import { userService } from '../../services';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }
    async componentDidMount() {
        try {
            const users = await userService.userServiceGetUser('ALL');
            this.setState({ users: users.user });
        } catch (e) {
            console.log('erroo', e);
        }
    }
    render() {
        return (
            <div className="user-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Emal</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users &&
                            this.state.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <a
                                                href="/crud-edit?id=<%= data[i].id %>"
                                                type="button"
                                                className="btn btn-primary btn-custom"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href="/crud-delete?id=<%= data[i].id %>"
                                                type="button"
                                                className="btn btn-danger btn-custom"
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserManage;
