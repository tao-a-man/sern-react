import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Button from '../../../components/Button';
import Slideritem from '../../../components/SliderItem/SliderItem';
import './HomeSection.scss';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            prev
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ height: '40px', width: '40px', backgroundColor: 'red' }}
            onClick={onClick}
        />
    );
}

class HomeSection extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageHeader(language);
    };

    render() {
        const settings = {
            accessibility: true,
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,
            speed: 2000,
            autoplaySpeed: 3000,
            cssEase: 'linear',
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div className="section">
                <Slider {...settings}>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                    <Slideritem
                        title="Cơ xương khớp"
                        img="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    ></Slideritem>
                </Slider>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);
