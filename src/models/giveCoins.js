import { createSignatureRequest } from '../utils/util';
import { ret, toastTime } from '../common/constants'
import { queryGiveRecords } from '../services/record';
export default {
    namespace: 'giveCoins',
    state: {
        giveRecord:{
            list:[],
            pageSize:6,
            currentPage:0,
            totalAmount:0
        },
        
    },
    subscriptions: {
         
    },
    effects:{
        *getGiveCoins({ payload }, { call, put }) {      
          let request = createSignatureRequest(payload);
           const response = yield call(queryGiveRecords, request);
           if(response.ret == ret.ok){
                yield put({
                    type: 'save',
                    payload: {
                        giveRecord: {
                            list: response.infos,
                            pageSize: payload.rows,
                            currentPage: payload.page,
                            totalAmount: response.total
                         }
                    }
                })
           }
           else{
                yield put({type: 'global/showErrorMessage', payload: {ret: response.ret, msg: response.msg}})
          }
        },
       
    },
    reducers: {
        save(state, action){
            return {
                ...state,
                ...action.payload
            }
        }
    }
}