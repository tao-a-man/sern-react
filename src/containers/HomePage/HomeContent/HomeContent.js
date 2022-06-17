import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import Button from '../../../components/Button';
import './HomeContent.scss';
import Search from '../../Search/Search';

class HomeContent extends Component {
    render() {
        return (
            <div className="home-content">
                <div className="home-content-title">
                    <span className="title">Nền tảng y tế chăm sóc sức khỏe toàn diện</span>
                    <span className="sub-title">Uy tín - Tận tâm - Chất lượng</span>
                </div>
                <Search></Search>
                <div className="home-option">
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                    <div className="item">
                        <i className="fas fa-hospital"></i>
                        <span>Khám chuyên khoa</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
