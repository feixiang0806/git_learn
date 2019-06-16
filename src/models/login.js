
import { routerRedux } from 'dva/router';
import { login } from '../services/user';
import { ret } from '../common/constants';
import { getSessionStore, setSessionStore, removeSessionStore } from '../utils/storage'

export default {
  namespace: 'login',
  state: {
      token: getSessionStore('userToken') || '',
      userInfo:getSessionStore('userInfo') || {},
      inviteCode:'',
      inviteRoomNo:'',
      switchAccount: getSessionStore('switchAccount') ||false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },

  effects: {
    *regAndLogin({ payload,dispatch }, { call, put}) {  // eslint-disable-line
        payload.timestamp = parseInt(new Date().getTime() / 1000);
        payload.nonce = parseInt(Math.random()*100);
        const response = yield call(login,payload);
      if(response.ret===ret.ok){
        yield put({type:'save',payload: {
            token: response.token,
            userInfo: response.user_info
        }
        });
        setSessionStore('userToken',response.token);
        setSessionStore('userInfo',response.user_info);
        yield put({type:'ws/wsLogin',payload:{dispatch:dispatch}})
        yield put(routerRedux.push('/home'));
      }
      else{
        yield put({type:'global/showErrorMessage',payload:{ret:response.ret,msg:response.msg}})
      }
    },
    *updateUserInfo({ payload }, { call, put}){
      yield put({type:'save',payload: {
          userInfo: payload
      }
      });
      setSessionStore('userInfo', payload);
    },
    *loginOut({ payload }, { call, put}){
      yield put({type:'save',payload: {
          userInfo: {},
          token:'',
          switchAccount: true
      }
      });
      setSessionStore('switchAccount', true);
      removeSessionStore('userInfo');
      removeSessionStore('userToken');
      yield put({ type: 'ws/wsClose'})
      yield put(routerRedux.push('/login'));
    },
  },

  reducers: {
    save(state, action) {
        return {
            ...state,
            ...action.payload
        }
    },
    saveInviteInfo(state, action){
       return {
         ...state,
         ...action.payload
       }
    }

  }

};
