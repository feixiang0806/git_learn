import { Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { ret, toastTime } from '../common/constants';
import { createSignatureRequest } from '../utils/util';
export default {
  namespace: 'home',
  state: {
   
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     
    }
  },

  effects: {
    
   
},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  }

};
