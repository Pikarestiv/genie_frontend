import React, {Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './style.scss';

export default (props) => {
  const {title = "", positive = false, success = false} = props;

  return (
    <Paper className="feedback-block">
      {
        success ? 
          <Fragment>
            <h2>We will show you {positive ? "more" : "less"} like this:</h2>
            <p>
              {title}
            </p>
            <h3>Thanks for your feedback!</h3>
          </Fragment>
          : <h3>Invalid url.</h3>
      }
    </Paper>
  )
}