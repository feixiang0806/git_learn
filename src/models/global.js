
import { ret, toastTime } from '../common/constants'
import { getErrorMessage } from '../services/global'
import { Toast} from 'antd-mobile';

export default {
  namespace: 'global',
  state: {
      errorMessages:[]
  },

  subscriptions: {
    setup({ dispatch, history}) {  // eslint-disable-line
      dispatch({type: 'fetchErrorMessage'})
    }
  },

  effects: {
    *fetchErrorMessage({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(getErrorMessage);
      if(response.ret == ret.ok){
        yield put({type: 'save', payload:response.infos || []});
      }
    },
    *showErrorMessage({ payload }, { select, call, put }){    
      const errorMessages = yield select(state => {
        return state.global.errorMessages
      });
      let error = null;
       errorMessages.some(item =>{
        if(item.error_code === payload.ret){
           error = item;
        }
      });
      if(error){
        Toast.info(error.message || '请求出错', toastTime, null, false);
      }
      else{
        Toast.info(payload.msg || '请求出错', toastTime, null, false);
      }
      if(payload.ret === 2){
        yield put({type:'login/loginOut'});
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state, 
        errorMessages:action.payload
      }
    }
  }

};
