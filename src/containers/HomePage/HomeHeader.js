import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './HomeHeader.scss';

class HomePage extends Component {
    render() {
        return <h1>hi</h1>;
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
