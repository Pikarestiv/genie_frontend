const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { API_LINK } = require('./config');

app.prepare().then(() => {
  const server = express();
  const jsonParser = bodyParser.json();
  server.use(bodyParser.json({ type: 'application/*+json' }));
  
  server.get('/grant/:slug', async (req, res) => {
    const actualPage = '/grant';
    const queryParams = { id: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/grant/:slug/:user_id', async (req, res) => {
    const actualPage = '/grant';
    const queryParams = { id: req.params.slug, user_id: req.params.user_id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/more/:slug/:user_id', async (req, res) => {
    const actualPage = '/more';

    console.log('req.params: ', req.params);
    const queryParams = { slug: req.params.slug, user_id: req.params.user_id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/less/:slug/:user_id', async (req, res) => {
    const actualPage = '/less';
    const queryParams = { slug: req.params.slug, user_id: req.params.user_id };
    app.render(req, res, actualPage, queryParams);
  });

  server.post('/new/user', jsonParser, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    console.log('req.body: ', req.body);
    const data = await fetch(API_LINK + 'user', {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());
    console.log('data: ', data);

    res.end(JSON.stringify(data));
  });


  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});