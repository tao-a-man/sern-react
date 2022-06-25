import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../components/Button';
import swal from 'sweetalert';
import * as actions from '../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserCreateModal extends React.Component {
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
            previewImg: '',
            isOpenPreview: false,
        };
    }

    componentDidMount() {
        this.props.fetchGenderStart();
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
            if (key !== 'isOpenPreview') {
                if (this.state[key].trim() === '') {
                    return { type: false, errMessage: 'Invalid Form' };
                }
            }
        }
        if (this.state.password !== this.state.passwordConfirm) {
            return { type: false, errMessage: 'Password Confirm not match' };
        }
        return { type: true, errMessage: 'Valid Form Success' };
    };

    handleResetState = () => {
        this.setState({
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            previewImg: '',
            isOpenPreview: false,
        });
    };

    handleCreateUserOfModal = async () => {
        const valid = this.handleValidateForm();
        if (valid.type) {
            const user = { ...this.state };
            delete user.passwordConfirm;
            const respon = await this.props.handleCreateUser(user);
            if (respon.errCode === 0) {
                swal({
                    title: 'Create Success!',
                    icon: 'success',
                });
                this.handleResetState();
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

    handleChangeInputImg = (e) => {
        const data = e.target.files;
        const avatar = URL.createObjectURL(data[0]);
        this.setState({ previewImg: avatar });
    };

    render() {
        const genders = this.props.gender;
        console.log(this.state);
        return (
            <div>
                <Modal zIndex="2" size="lg" isOpen={this.props.isShowModal} toggle={this.toggle}>
                    <ModalHeader>
                        <b>CREATE FORM</b>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
                                <label htmlFor="inputPassword4">Password</label>
                                <input
                                    value={this.state.password}
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
                                    value={this.state.passwordConfirm}
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
                            <div className="form-group col-8">
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
                                    value="123"
                                    id="inputStateGender"
                                    className="form-control"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option value="123" hidden disabled>
                                        Choose Gender
                                    </option>
                                    {genders.length > 0 &&
                                        genders.map((gender, index) => {
                                            return (
                                                <option key={index} value={gender.key}>
                                                    {gender.valueVi}
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
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
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
                                            background: `url('${this.state.previewImg}') center center / contain no-repeat`,
                                        }}
                                        onClick={() => {
                                            if (this.state.previewImg === '') return;
                                            this.setState({ isOpenPreview: true });
                                        }}
                                    ></div>
                                </div>
                                {this.state.isOpenPreview && (
                                    <Lightbox
                                        mainSrc={this.state.previewImg}
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
                            onClick={this.handleCreateUserOfModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateModal);
