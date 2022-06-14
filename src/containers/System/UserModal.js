import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../components/Button';
import swal from 'sweetalert';

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        };
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
            if (this.state[key].trim() === '') {
                return { type: false, errMessage: 'Invalid Form' };
            }
        }
        if (this.state.password !== this.state.passwordConfirm) {
            return { type: false, errMessage: 'Password Confirm not match' };
        }
        return { type: true, errMessage: 'Valid Form Success' };
    };

    handleCreateUserModal = async () => {
        const valid = this.handleValidateForm();
        if (valid.type) {
            const user = this.state;
            delete user.passwordConfirm;
            const respon = await this.props.handleCreateUser(user);
            if (respon.errCode === 0) {
                swal({
                    title: 'Create Success!',
                    icon: 'success',
                });
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
                <Modal size="lg" isOpen={this.props.isShowModal} toggle={this.toggle}>
                    <ModalHeader>
                        <h1>CREATE FORM</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-4">
                                <label htmlFor="inputEmail4">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="inputEmail4"
                                    placeholder="Email"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputPassword4">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="inputPassword4"
                                    placeholder="Password"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="inputPassword5">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="passwordConfirm"
                                    id="inputPassword5"
                                    placeholder="Confirm Password"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">First Name</label>
                                <input
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
                                    className="form-control"
                                    type="text"
                                    id="inputPhone"
                                    name="phoneNumber"
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputStateGender">Gender</label>
                                <select
                                    defaultValue=""
                                    id="inputStateGender"
                                    className="form-control"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option value="" hidden disabled>
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
                                    defaultValue=""
                                    id="inputStateRole"
                                    className="form-control"
                                    name="roleId"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option value="" hidden disabled>
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
                            onClick={this.handleCreateUserModal}
                            small
                            iconLeft={<i className="fas fa-check"></i>}
                            primary
                            type="submit"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UserModal;
