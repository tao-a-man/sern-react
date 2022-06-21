import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './HomePage.scss';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeContent from './HomeContent/HomeContent';
import HomeSection from './HomeSection/HomeSection';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <HomeHeader />
                <HomeContent />
                <HomeSection />
                <HomeSection />
                <HomeSection />
                <HomeSection />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
