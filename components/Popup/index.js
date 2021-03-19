import React from 'react';
import FormNewSubscriber from '../FormNewSubscriber';
import Slider from '@material-ui/core/Slider';
import InputTag from '../InputTag';
import { makeStyles } from '@material-ui/core/styles';

import './styles.scss';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(true);
    const [subscribe, setSubscribe] = React.useState(false);

    const useStyles = makeStyles({
        thumb: {
            color: '#D3D3CF',
            width: 8,
            height: 15,
            borderRadius: 0
        },
        track: {
            color: '#D3D3CF',
            height: 5
        },
        rail: {
            color: '#D3D3CF',
            height: 5
        },
        markLabel: {
            left: '5%'
        },
        mark: {
            display: 'none'
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = e => {
        setOpen(false);
    };

    const handleSubscribe = () => {
        setSubscribe(true);
    }

    const classes = useStyles();
    return (
        <div className="popup">
            <div className="popup_bg" />
            <div onClose={props.close} class="popup_form">
                {!subscribe ?
                    <div className="form">
                        <div className="form_wrap">
                            <div onClick={props.close} className="close" />
                            <div className="title">Want to get tailored updates? Subscribe to know when new funding becomes available.</div>
                            <div className="cards">
                                <div className="card_form">
                                    <div className="card_form_image " />
                                    <h3>Match your grant</h3>
                                    <p>Take a few seconds to fill in the form below and give us a few informations that will help us determine what grants you qualify to apply for.</p>
                                </div>
                                <div className="card_form">
                                    <div className="card_form_image" />
                                    <h3>Subscribe</h3>
                                    <p>Take a few seconds to fill in the form below and give us a few informations that will help us determine what grants you qualify to apply for.</p>
                                </div>
                                <div className="card_form">
                                    <div className="card_form_image" />
                                    <h3>Get updates</h3>
                                    <p>Take a few seconds to fill in the form below and give us a few informations that will help us determine what grants you qualify to apply for.</p>
                                </div>
                            </div>
                            <div className="subscribe">
                                <FormNewSubscriber click={handleSubscribe} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="form_return">
                        <p>Thank you for subscribing! You will now receive emails with tailored updates on a regular basis</p>
                        <div onClick={props.close} className="back">
                            Back to your results
                            </div>
                    </div>
                }
            </div>
        </div>
    );
}