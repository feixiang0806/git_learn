
import { Toast} from 'antd-mobile';
import { ret, toastTime } from '../common/constants'
import { createSignatureRequest } from '../utils/util';
import { charge, queryToChargeRecords } from '../services/agent';

export default {
  namespace: 'agent',
  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history}) {  // eslint-disable-line
    }
  },

  effects: {  
    *getToChargeRecord({ payload }, { call, put }) {
        payload = {
            rows: 10,
            page: 0,
            room_no: "062045"
        }
       let request = createSignatureRequest(payload);
       const response = yield call(queryToChargeRecords, request);
       if(response.ret == ret.ok){
            yield put({
                type: 'save',
                payload: {
                    toChargeRecord: {
                        list: response.infos,
                        pageSize: payload.rows,
                        currentPage: payload.page
                     }
                }
            })
       }
       else{
            yield put({type: 'global/showErrorMessage', payload: {ret: response.ret, msg: response.msg}})
      }

    },
    *chargeCoins({payload,callBack},{call,put}){
        let request = createSignatureRequest(payload);
        const response = yield call(charge,request);
         if(response.ret === ret.ok){
             Toast.info('充币成功！', toastTime, null, false);
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
      return {
        ...state, 
        errorMessages:action.payload
      }
    }
  }

};
