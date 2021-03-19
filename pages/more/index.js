import React from 'react';
import fetch from 'node-fetch';

import EmailFeedback from '../../components/EmailFeedback';
import {tokenize, getApiLink} from '../../utils';

import './style.scss';

const PageMore = (params) => {
  const { slug, success } = params;

  return (
    <div className="email_feedback_wrapper">
      <EmailFeedback title={slug} positive={true} success={success}/>
    </div>
  )
}

PageMore.getInitialProps = async ({ query }) => {
  const { slug, user_id } = query;
  const tokens = tokenize(slug);

  const res = await fetch(getApiLink('user/interested'), {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tokens,
      user_id,
      positive: true
    })
  }).then(res => res.json());

  return { tokens, slug: slug.split('+').join(' '), success: res.success };
}

export default PageMore;