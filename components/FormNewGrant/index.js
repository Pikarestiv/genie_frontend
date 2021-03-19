import React, { useState, useEffect } from 'react';
import Link from "next/link";
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import InputTag from '../InputTag';
import InputUnit from '../InputUnit';
import { getApiLink } from '../../utils';

import './style.scss';

const getSteps = () => [
  'Grant Title', 'Grant Body',
  'Grant Tags', 'Grant Units',
  'Original Source', 'Save'];

const stepDescription = [
  {
    title: 'Write grant title',
    description: 'For example: GS17: Lenient grazing supplement'
  },
  {
    title: 'Write grant description',
    description: 'Feel free to copy and paste it from original source.'
  },
  {
    title: 'Put grants meta tags',
    description: `
    Start writing some and then select from suggestion with arrow keys.
    If you are unsure what to write just skip it.`
  },
  {
    title: 'Select what exactly will be paid for.',
    description: "If you are unsure or can't find right variant you can skip this."
  },
  {
    title: 'Write information of the original source.',
    description: 'It is preferable to put link of web-page you take information from.'
  }
];

const stepsContent = (data) => {
  const { i = 0, value = '', handleChange = () => { } } = data;

  return [
    (
      <TextField
        className="title_field"
        id="input-title"
        label="Title"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
    ),
    (
      <div className="body_field">
        <div id="body_editor" />
      </div>
    ),
    (
      <InputTag value={value} onChange={handleChange} />
    ),
    (
      <InputUnit className="select_units" onChange={handleChange} />
    ),
    (
      <TextField
        className="web_link_field"
        id="input-web_link"
        label="HTTP link or another source"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
    ),
    (
      value.error ? (
        <div> Unknown Error </div>
      ) : value.id ? (
        <div>
          <Link href={`/grant/${value.id}`}>grant page</Link>
        </div>
      ) : (
            <div>
              Loading...
        </div>
          )
    )
  ][i];
}

export default () => {
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [unit, setUnit] = useState('');
  const [web_link, setWebLink] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [result, setResult] = useState({});

  const stepsData = [
    { i: 0, value: title, handleChange: setTitle },
    { i: 1 },
    { i: 2, value: tags, handleChange: setTags },
    { i: 3, value: unit, handleChange: setUnit },
    { i: 4, value: web_link, handleChange: setWebLink },
    { i: 5, value: result }
  ];

  // Add rich text editor for Grant Body
  useEffect(() => {
    if (typeof Quill !== 'undefined' && index === 1) {
      setTimeout(() => {
        // eslint-disable-next-line
        const quill = new Quill('#body_editor', {
          theme: 'snow',
          modules: {
            table: true,
          }
        });
        quill.on('text-change', () => setBody(document.querySelector('#body_editor .ql-editor').innerHTML));
        quill.clipboard.dangerouslyPasteHTML(body);
      },
        400
      );
    }
    // eslint-disable-next-line
  }, [typeof Quill === 'undefined', index]);


  // Save data to BE
  useEffect(() => {
    if (index === getSteps().length - 1 && !isSaved) {
      fetch(getApiLink('grant'), {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          tags,
          web_link,
          parsed_units: unit
        })
      })
        .then(res => {
          setIsSaved(true);
          return res.json();
        })
        .then(json => {
          console.log('json.data: ', json.data);
          return setResult(json.data);
        })
        .catch(err => {
          console.error(err);
          setIsSaved(false);
          setResult({ error: true });
          throw err;
        });
    }
  }, [index]);

  return (
    <div>
      <Paper
        className="new_grant_form"
      >
        <link href="https://cdn.quilljs.com/2.0.0-dev.2/quill.snow.css" rel="stylesheet" />
        <h1>Add new grant</h1>
        <Stepper activeStep={index} orientation="vertical">
          {
            getSteps().map((label, i) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>
                    {stepsContent(stepsData[i])}
                    <div className="grant_form_actions">
                      <Button
                        disabled={index === 0}
                        onClick={() => setIndex(index - 1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIndex(index + 1)}
                      >
                        {index === getSteps().length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))
          }
        </Stepper>
      </Paper>
      {
        stepDescription[index] ? (
          <Paper className="form-helper">
            <h3>{stepDescription[index].title}</h3>
            <p>{stepDescription[index].description}</p>
          </Paper>
        ) : ''
      }
    </div>
  );
}