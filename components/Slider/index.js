import React, { Component } from "react";
import Slider from "react-slick";

import './styles.scss';

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <div className="slider_wrap">
                            <h3>As featured in</h3>
                            <div className="slider_image" src="/static/img/organisation.png" />
                            <p>The UK government has all kinds of grants available which can offer payment for taking care of your environment and rural community.</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider_wrap">
                            <h3>As featured in</h3>
                            <div className="slider_image" src="/static/img/organisation.png" />
                            <p>The UK government has all kinds of grants available which can offer payment for taking care of your environment and rural community.</p>
                        </div>
                    </div>
                    <div>
                        <div className="slider_wrap">
                            <h3>As featured in</h3>
                            <div className="slider_image" src="/static/img/organisation.png" />
                            <p>The UK government has all kinds of grants available which can offer payment for taking care of your environment and rural community.</p>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}