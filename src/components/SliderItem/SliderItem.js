import React, { Component } from 'react';
import './SliderItem.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class SldierItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="slider-item">
                <img className="slider-img" src={this.props.img}></img>
                <span className="slider-title">{this.props.title}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SldierItem);
