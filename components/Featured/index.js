import React from 'react';
import SimpleSlider from '../Slider';

import './styles.scss';

const Featured = () => (
    <div className="featured">
        <div className="featured_background" />
        <div className="featured_slider">
            <SimpleSlider />
        </div>
    </div>
)

export default Featured;