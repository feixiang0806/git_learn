import 'babel-polyfill';
import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
import router from './router';

import './index.less';
// 1. Initialize
const app = dva({
  history:createHistory({
    basename:''//这里放入你对应的 basename
  }),
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

// 3. Register global model
app.model(require('./models/global'));
app.model(require('./models/login'));


// 4. Router
app.router(router);

// 5. Start
app.start('#root');

