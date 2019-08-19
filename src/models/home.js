import { Toast} from 'antd-mobile';
import { ret, toastTime } from '../common/constants';
import { createSignatureRequest } from '../utils/util';
import { setAgent,setOperation } from '../services/admin';

export default {
  namespace: 'home',
  state: {
    overview:{}
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
  *toSetOperation({ payload, callBack }, { call, put }) {
    let request = createSignatureRequest(payload);
    const response = yield call(setOperation, request);
    if(response.ret == ret.ok){
        Toast.info('设置运营成功！', toastTime, null, false);
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
