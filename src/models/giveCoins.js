import { createSignatureRequest } from '../utils/util';
import { ret, toastTime } from '../common/constants'
import { queryToChargeRecords } from '../services/record';
export default {
    namespace: 'giveCoins',
    state: {
        giveRecord:{
            list:[],
            pageSize:6,
            currentPage:0,
        },
        
    },
    subscriptions: {
         
    },
    effects:{
        *getGiveCoins({ payload }, { call, put }) {
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
                        giveRecord: {
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