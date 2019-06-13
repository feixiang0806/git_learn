import 'babel-polyfill';
import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';

import './index.less';
// 1. Initialize
const app = dva({
  history:createHistory(),
  onError(err, dispatch) {
    if (err.resp) {
      console.error(err.resp.msg);
    } else if (err.srv) {
      console.error(err.srv.msg);
    } else {
      console.error(err);
    }
  }
});

// 2. Plugins
//app.use(createLoading());

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
