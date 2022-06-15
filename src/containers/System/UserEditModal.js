import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../components/Button';
import swal from 'sweetalert';

class UserEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const data = nextProps.isEditModal;
        if (nextState.id !== data.user.id && data.type) {
            for (const state in nextState) {
                nextState[state] = data.user[state];
            }
        }
        return true;
    }

    toggle = () => {
        this.props.toggle();
    };

    handleChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    handleValidateForm = () => {
        for (let key in this.state) {
            if (this.state[key].toString().trim() === '') {
                return { type: false, errMessage: 'Invalid form' };
            }
        }
        return { type: true, errMessage: 'Valid Form Success' };
    };

    handleResetState = () => {
        this.setState({
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        });
    };

    handleCreateUserEditModal = async () => {
        const valid = this.handleValidateForm();
        if (valid.type) {
            const user = this.state;
            const respon = await this.props.handleEditUser(user);
            if (respon.errCode === 0) {
                swal({
                    title: 'Edit Success!',
                    icon: 'success',
                });
                this.handleResetState();
                this.toggle();
            } else {
                swal({
                    title: 'Error',
                    text: respon.errMessage.errors[0].message,
                    icon: 'error',
                });
            }
        } else {
            swal({
                title: 'Error',
                text: valid.errMessage,
                icon: 'error',
            });
        }
    };

    render() {
        return (
            <div>
                <Modal size="lg" isOpen={this.props.isEditModal.type} toggle={this.toggle}>
                    <ModalHeader>
                        <b>EDIT FORM</b>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <input value={this.state.id} hidden disabled></input>
                            <div className="form-group col-12">
                                <label htmlFor="inputEmail4">Email</label>
                                <input
                                    value={this.state.email}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="inputEmail4"
                                    placeholder="Email"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="LastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    id="LastName"
                                    placeholder="Enter your last name"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                value={this.state.address}
                                type="text"
                                className="form-control"
                                name="address"
                                id="inputAddress"
                                placeholder="Enter your address"
                                onChange={(e) => this.handleChangeInput(e)}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-4">
                                <label htmlFor="inputPhone">Phone Number</label>
                                <input
                                    value={this.state.phoneNumber}
                                    className="form-control"
                                    type="text"
                                    id="inputPhone"
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputStateGender">Gender</label>
                                <select
                                    defaultValue="default"
                                    id="inputStateGender"
                                    className="form-control"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option value={!this.state.gender && 'default'} hidden disabled>
                                        Choose Gender
                                    </option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Other</option>
                                </select>
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputStateRole">Role</label>
                                <select
                                    defaultValue="default"
                                    id="inputStateRole"
                                    className="form-control"
                                    name="roleId"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option value={!this.state.roleId && 'default'} hidden disabled>
                                        Choose Role
                                    </option>
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={this.toggle}
                            small
                            iconLeft={<i className="fas fa-times"></i>}
                            outline
                            type="submit"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreateUserEditModal}
                            small
                            iconLeft={<i className="fas fa-check"></i>}
                            primary
                            type="submit"
                        >
                            Edit User
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserEditModal;
