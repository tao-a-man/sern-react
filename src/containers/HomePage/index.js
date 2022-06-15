import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import HomeHeader from './HomePage';

class HomePage extends Component {
    render() {
        return <div>hi</div>;
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
