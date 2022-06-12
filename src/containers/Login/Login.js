import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import { userService } from '../../services';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
    }
    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleOnClick = async (event) => {
        this.setState({
            errMessage: '',
        });
        try {
            const respon = await userService.userServiceLogin(this.state.username, this.state.password);
            if (respon && respon.errCode !== 0) {
                this.setState({
                    errMessage: respon.errMessage,
                });
            } else if (respon && respon.errCode == 0) {
                this.props.userLoginSuccess(respon.user);
                console.log(respon.user);
            }
        } catch (err) {
            if (err.response.data) {
                this.setState({
                    errMessage: err.response.data.errMessage,
                });
            }
        }
    };

    handleClickEye = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <h1 className="login-title">Login</h1>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-label">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input
                                    className="login-input form-control"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.handleChangeUsername(event);
                                    }}
                                />
                            </div>
                            <div className="input-group input-group-lg input-parent">
                                <div className="input-group-prepend">
                                    <span className="input-label">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                                <input
                                    className="login-input form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.handleChangePassword(event);
                                    }}
                                />
                                <i
                                    className={
                                        this.state.isShowPassword
                                            ? 'fas fa-eye hideAndShowPassword hideAndShowPassword'
                                            : 'fas fa-eye-slash hideAndShowPassword'
                                    }
                                    onClick={this.handleClickEye}
                                ></i>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary btn-login" onClick={this.handleOnClick}>
                            Login
                        </button>
                        <span style={{ color: 'red' }}>{this.state.errMessage}</span>
                        <span className="forgot-password">Forgot your password?</span>
                        <span className="sign-or">Or sign in with:</span>
                        <div className="socal-media">
                            <i className="fab fa-facebook socal-facebook"></i>
                            <i className="fab fa-google-plus socal-google"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
