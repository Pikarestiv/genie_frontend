import React, { useState, useEffect } from 'react';
import Link from "next/link";

import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import StepConnector from '@material-ui/core/StepConnector';

import InputTag from '../InputTag';
import GrantCards from '../GrantCards';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import { validations } from './validations';
import { getSteps } from './static'
import './style.scss';

const stepsContent = (data) => {
  const {
    i = 0,
    value = '',
    info = {},
    handleChange = () => { },
    setInputStatus = () => { },
  } = data;

  const marks = [
    {
      value: 0,
      label: '< 1 hectare',
    },
    {
      value: 50,
      label: '1 - 50 hectares',
    },
    {
      value: 100,
      label: '> 50 hectares',
    },
  ];

  function valuetext(value) {
    return `${value}hec`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }

  return [
    (
      <TextField
        className="title_field"
        id="input-title"
        label="Postcode"
        onBlur={e => validations[0](e.target.value.toUpperCase(), setInputStatus)}
        value={value}
        onChange={e => {
          const value = e.target.value.toUpperCase();
          if (value.length > 2) {
            validations[0](value, setInputStatus);
          }
          handleChange(value);
        }}
      />
    ),
    (
      <FormControl style={{ minWidth: 200 }}>
        <InputLabel htmlFor={`selected-land-size`}>
          Land size
        </InputLabel>
        <Select
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
            validations[1](e.target.value, setInputStatus);
          }}
          input={<Input name={`selected-land-size`} id={`selected-land-size`} />}
        >
          <MenuItem value="">
            <em>Not specified</em>
          </MenuItem>
          {
            ['< 1 hectare', '1 - 50 hectares', '> 50 hectares']
              .map(e =>
                <MenuItem key={e} value={e}>{e}</MenuItem>)
          }
        </Select>
      </FormControl>
    ),
    // (
    //   <div>
    //     <Slider
    //       defaultValue={0}
    //       getAriaValueText={valuetext}
    //       aria-labelledby="discrete-slider-custom"
    //       step={50}
    //       valueLabelDisplay="auto"
    //       marks={marks}
    //       onChange={(e, value) => {
    //         if (value === 0) {
    //           handleChange("< 1 hectare");
    //           validations[1]("< 1 hectare", setInputStatus);
    //         } else if (value === 50) {
    //           handleChange("1 - 50 hectares");
    //           validations[1]("1 - 50 hectares", setInputStatus);
    //         } else {
    //           handleChange('> 50 hectares');
    //           validations[1]('> 50 hectares', setInputStatus);
    //         }
    //       }}
    //     />
    //     <div />
    //   </div>
    // ),
    (
      <InputTag
        value={value}
        tagGroup="land_use"
        onChange={value => { handleChange(value); validations[2](value, setInputStatus); }}
      />
    ),
    (
      <div className="input">
        <input className="search_input" placeholder="your email" required onChange={e => {
          if (e.target.value.length > 3) {
            validations[3](e.target.value, setInputStatus);
          }
          handleChange(e.target.value);
        }}
          onBlur={e => {
            validations[3](e.target.value, setInputStatus)
          }} />
      </div>
    ),
    (
      value.error ? (
        <div> {value.error} </div>
      ) : value.success ? (
        <div>
          Here are your first results, keep an eye on your inbox for new grants.
        </div>
      ) : (
            <div>
            </div>
          )
    )
  ][i];
}

export default (props) => {
  const [index, setIndex] = useState(0);
  const [postcode, setPostCode] = useState('');
  const [landSize, setLandSize] = useState('');
  const [landUse, setLandUse] = useState([]);
  const [email, setEmail] = useState('');
  const [landUseTags, setLandUseTags] = useState({});
  const [inputStatus, setInputStatus] = useState([]);
  const [result, setResult] = useState({});

  const stepsData = [
    { i: 0, value: postcode, handleChange: setPostCode, inputStatus, setInputStatus },
    { i: 1, value: landSize, handleChange: setLandSize, inputStatus, setInputStatus },
    { i: 2, value: landUse, info: { tags: landUseTags }, handleChange: setLandUse, inputStatus, setInputStatus },
    { i: 3, value: email, handleChange: setEmail, inputStatus, setInputStatus },
    { i: 4, value: result }
  ];

  // Validate on change step 
  useEffect(() => {
    if (index === stepsData.length - 1) {
      (async () => {
        await fetch(location.href + 'new/user', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            land_size: landSize,
            land_use: landUse.map(elm => elm.title),
            postcode: postcode
          })
        })
          .then(res => res.json())
          .then(res =>
            res && res.success ?
              setResult({ success: true, grants: res.data.grants })
              : setResult({ error: res.error || 'Something went wrong. Please try again later.' }))
          .catch(error => { console.error(error); setResult({ error: 'Something went wrong. Please try again later.' }) });
      })();
      return;
    }

    const value = stepsData[index].value;

    if (value === '') {
      return setInputStatus({
        isError: false,
        errorMessage: '',
        isValid: false
      });
    }

    validations[index](value, setInputStatus);
  }, [index]);

  const QontoConnector = withStyles({
    line: {
      display: 'none'
    },
  })(StepConnector);

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
  }))

  const handleSet = () => {
    setIndex(4);
    setTimeout(() => props.click(), 2000)
  }

  const classes = useStyles();
  return (
    <div className="new_sub_form_wrapper">
      <Paper
        className={classes.root}
      >
        <link href="https://cdn.quilljs.com/2.0.0-dev.2/quill.snow.css" rel="stylesheet" />
        <Stepper nonLinear activeStep={index} orientation="vertical" style={{ width: '90%', backgroundColor: 'transparent' }} connector={<QontoConnector />}>
          {
            getSteps().map((label, i) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent style={{ borderLeft: 'none' }} className="stepcontent">
                  <div>
                    {stepsContent(stepsData[i])}
                    <div className="grant_form_actions">
                      {
                        inputStatus.isError &&
                        <p style={{ margin: 0, position: 'absolute' }}>{inputStatus.errorMessage}</p>
                      }
                      {index === getSteps().length - 1 ?
                        null :
                        <React.Fragment>
                          <Button
                            disabled={index === 0}
                            onClick={() => setIndex(index - 1)}
                            style={{ marginTop: '20px' }}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={!inputStatus.isValid}
                            onClick={() => setIndex(index + 1)}
                            style={{ marginTop: '20px' }}
                          >
                            Next
                          </Button>
                        </React.Fragment>
                      }
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))
          }
        </Stepper>
        {index === 3 &&
          <input
            disabled={!inputStatus.isValid}
            onClick={handleSet}
            className="search_button"
            value="SIGN UP"
            type="button"
          />
        }
      </Paper>
      {/* {result.success &&
        <div>
          <GrantCards grants={result.grants} home />
        </div>
      } */}
    </div >
  );
}