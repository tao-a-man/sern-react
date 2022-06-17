import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import Button from '../../../components/Button';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils';

class HomeHeader extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageHeader(language);
    };

    render() {
        console.log('ho', this.props);
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="item">
                            <h3 className="title">
                                <FormattedMessage id="homeHeader.specialist" />
                            </h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                    </div>
                    <div className="right-content">
                        <Button primary iconLeft={<i className="fas fa-sign-in-alt"></i>}>
                            Login
                        </Button>
                        <div className="language">
                            <span
                                onClick={() => {
                                    this.handleChangeLanguage(LANGUAGES.VI);
                                }}
                                className={this.props.language === LANGUAGES.VI ? 'active' : ''}
                            >
                                VI
                            </span>
                            <span
                                onClick={() => {
                                    this.handleChangeLanguage(LANGUAGES.EN);
                                }}
                                className={this.props.language === LANGUAGES.EN ? 'active' : ''}
                            >
                                EN
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageHeader: (language) => dispatch(actions.changeLanguageRedux(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
