import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../components/Button';
import swal from 'sweetalert';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

import { CommonUtils } from '../../utils';

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
            image: '',
            isOpenPreview: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const data = nextProps.isEditModal;
        if (nextState.id !== data.user.id && data.type) {
            for (const state in nextState) {
                nextState[state] = data.user[state];
                nextState['image'] = data.user['image'];
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
            console.log('satate', key, this.state[key]);
            if (key !== 'isOpenPreview' && key !== 'id' && this.state[key]) {
                if (this.state[key].trim() === '') {
                    return { type: false, errMessage: 'Invalid Form' };
                }
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
            image: '',
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
    handleChangeInputImg = async (e) => {
        const data = e.target.files;
        const avatarPreview = URL.createObjectURL(data[0]);
        const image = await CommonUtils.getBase64(data[0]);
        this.setState({
            image: avatarPreview,
            image: image,
        });
    };

    render() {
        console.log('edit', this.props);
        return (
            <div>
                <Modal zIndex="2" size="lg" isOpen={this.props.isEditModal.type} toggle={this.toggle}>
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
                        <div className="row">
                            <div className="form-group col-6">
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
                            <div className="form-group col-6">
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
                                    defaultValue={this.state.gender}
                                    className="form-control"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    {this.props.gender.map((data, index) => {
                                        return (
                                            <option value={data.keyMap} key={index}>
                                                {data.valueEn}
                                            </option>
                                        );
                                    })}
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
                                    <option value="R1">Admin</option>
                                    <option value="R2">Doctor</option>
                                    <option value="R3">Patient</option>
                                </select>
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputStateImg">Avatar</label>

                                <div style={{ display: 'flex' }}>
                                    <label htmlFor="inputStateImg">
                                        <div
                                            style={{
                                                fontSize: '22px',
                                                backgroundColor: '#ccc',
                                                borderRadius: '4px',
                                                width: '100px',
                                                height: '34px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <i className="fas fa-upload"></i>
                                            Tải lên
                                        </div>
                                    </label>
                                    <div
                                        style={{
                                            marginLeft: '4px',
                                            border: '1px solid #ccc',
                                            height: '74px',
                                            width: '138px',
                                            background: `url('${this.state.image}') center center / contain no-repeat`,
                                        }}
                                        onClick={() => {
                                            if (!this.state.image) return;
                                            this.setState({ isOpenPreview: true });
                                        }}
                                    ></div>
                                </div>
                                {this.state.isOpenPreview && (
                                    <Lightbox
                                        mainSrc={this.state.image}
                                        reactModalStyle={{ zIndex: '2000' }}
                                        onCloseRequest={() => this.setState({ isOpenPreview: false })}
                                    />
                                )}
                                <input
                                    onChange={(e) => this.handleChangeInputImg(e)}
                                    id="inputStateImg"
                                    type="file"
                                    hidden
                                ></input>
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
const mapStateToProps = (state) => {
    return {
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditModal);
