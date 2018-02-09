import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config'; // required for SSR
import proxy from 'express-http-proxy';
import Routes from './client/Routes'; // required for SSR
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

/**  PROXY SETUP  **/
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(options) {
      options.headers['x-forwarded-host'] = 'localhost:3000';

      return options;
    }
  })
);
/**    =========   **/

app.use(express.static('public'));

/**  ROUTES HANDLER  **/
app.get('*', (req, res) => {
  // users
  const store = createStore(req);

  // Some logic to initialize and
  // load data into the store
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // resolves out what component needs to be rendered based on the current url
    return route.loadData ? route.loadData(store) : null; // required for SSR
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store)); // At this point all promises (loadData functions) are resolved
    // and store is full of data
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
