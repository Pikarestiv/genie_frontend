import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/icons';

import { getApiLink, snakeCaseToText, tagToText } from '../../utils';
import './styles.scss';

const Grant = (props) => {
  const { id = '' } = props;
  const [grant, setGrant] = useState({});

  useEffect(() => {
    (async () => await fetch(
      getApiLink(`grant/${id}`),
    )
      .then(res => res.json())
      .then(body => setGrant(body.data ? body.data[0] : {})))();
  }, [id]);

  return (
    <div className="grant_page">
      <button className="back">
        <div className="back_img" />
        <a href="/">
          Go to mainpage
      </a>
      </button>
      <h1 className="title"> {grant.title} </h1>
      <div>
        {
          grant.tags &&
          Object.keys(grant.tags).map(tag => (
            <div key={tag} className="grant_tags">
              <Typography>{snakeCaseToText(tag)}:</Typography>
              <Typography>{tagToText(grant.tags[tag])}</Typography>
            </div>
          ))
        }
      </div>
      <Paper className="grant_body">
        <a target="_blank" rel="noopener noreferrer" href={grant.web_link} className="grant_external-link">
          <Typography>Original page</Typography>
          <Link />
        </a>
        <div dangerouslySetInnerHTML={{ __html: grant.body }} />
      </Paper>
    </div>
  );
}

Grant.getInitialProps = ({ query }) => {
  const { id } = query;

  return { id };
}


export default Grant;