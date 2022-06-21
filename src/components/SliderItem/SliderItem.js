import React, { Component } from 'react';
import './SliderItem.scss';

class SldierItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div className="slider-item">
                <img className="slider-img" src={this.props.img}></img>
                <span className="slider-title">{this.props.title}</span>
            </div>
        );
    }
}

export default SldierItem;
