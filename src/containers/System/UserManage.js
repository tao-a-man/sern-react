import React, { Component } from 'react';
import swal from 'sweetalert';

import './UserManage.scss';
import { userService } from '../../services';
import Button from '../../components/Button';
import UserCreateModal from './UserCreateModal';
import UserEditModal from './UserEditModal';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], isShowModal: false, isEditModal: { type: false, user: {} } };
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
    handleToggleCreateModal = () => {
        this.setState({ isShowModal: !this.state.isShowModal });
    };
    handleToggleEditModal = () => {
        this.setState({ isEditModal: { ...this.state.isEditModal, type: !this.state.isEditModal.type } });
    };
    handleShowEditModal = (user) => {
        this.setState({ isEditModal: { type: true, user: user } });
    };
    handleCreateUser = async (data) => {
        const respon = await userService.userServiceCreateUser(data);
        this.getUsers();
        return respon;
    };
    handleDeleteUser = async (id) => {
        const respon = await userService.userServiceDeleteUser(id);
        this.getUsers();
        return respon;
    };
    handleEditUser = async (data) => {
        const respon = await userService.userServiceEditUser(data);
        this.getUsers();
        return respon;
    };
    render() {
        return (
            <div className="mx-3">
                <UserCreateModal
                    handleCreateUser={this.handleCreateUser}
                    toggle={this.handleToggleCreateModal}
                    isShowModal={this.state.isShowModal}
                ></UserCreateModal>
                <UserEditModal
                    handleEditUser={this.handleEditUser}
                    toggle={this.handleToggleEditModal}
                    isEditModal={this.state.isEditModal}
                ></UserEditModal>
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
                                            <button
                                                onClick={(e) => this.handleShowEditModal(user)}
                                                className="btn btn-primary btn-custom"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => this.handleDeleteUser(user.id)}
                                                className="btn btn-danger btn-custom"
                                            >
                                                Delete
                                            </button>
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
