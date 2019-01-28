var express = require('express'),
  app = express(),
  port = 3010;
var bodyParser = require('body-parser');
var request = require('request');
var buildUrl = require('build-url');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

app.post('/github/auth', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var postData = {
    client_id: req.body.client_id,
    client_secret: '66ff01584126904913ae7a1dc64fb73e6ed4e837',
    code: req.body.code
  };
  var url = 'https://github.com/login/oauth/access_token';
  var fullUrl = buildUrl(url, {
    queryParams: postData
  });
  console.log(fullUrl);
  request.post({
    url: fullUrl,
    form: postData
  }, (error, response, body) => {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.send(body);
    } else if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  });
})

app.listen(port, () => {
  console.log(`middleware running on port ${port}`)
});

