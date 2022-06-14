import React, { Component } from 'react';

import './UserManage.scss';
import { userService } from '../../services';
import Button from '../../components/Button';
import UserModal from './UserModal';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], isShowModal: false };
    }
    componentDidMount() {
        this.getUsers();
    }
    async getUsers() {
        try {
            const users = await userService.userServiceGetUser('ALL');
            this.setState({ users: users.user });
        } catch (e) {
            console.log('erroo', e);
        }
    }
    handleSetShowModal = () => {
        this.setState({ isShowModal: true });
    };
    handleToggleModal = () => {
        this.setState({ isShowModal: !this.state.isShowModal });
    };
    handleCreateUser = async (data) => {
        const respon = await userService.userServiceCreateUser(data);
        this.getUsers();
        return respon;
    };
    render() {
        return (
            <div className="mx-3">
                <UserModal
                    handleCreateUser={this.handleCreateUser}
                    toggle={this.handleToggleModal}
                    isShowModal={this.state.isShowModal}
                ></UserModal>
                <h1>USER MANAGEMENT</h1>
                <Button onClick={this.handleSetShowModal} small primary iconLeft={<i className="fas fa-plus"></i>}>
                    Create User
                </Button>
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
