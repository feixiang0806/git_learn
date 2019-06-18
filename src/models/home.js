import { Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { ret, toastTime } from '../common/constants';
import { createSignatureRequest } from '../utils/util';
import { setAgent } from '../services/agent';

export default {
  namespace: 'home',
  state: {
   
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     
    }
  },

  effects: {
    *toSetAgent({ payload, callBack }, { call, put }) {
      let request = createSignatureRequest(payload);
      const response = yield call(setAgent, request);
      if(response.ret == ret.ok){
          Toast.info('设置代理成功！', toastTime, null, false);
          if(callBack){
              callBack();
          }
      }
      else{
        yield put({type:'global/showErrorMessage',payload:{ret:response.ret,msg:response.msg}})
    }

  },
   
},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  }

};
