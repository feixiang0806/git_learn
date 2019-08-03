import { createSignatureRequest } from '../utils/util';
import { Toast } from 'antd-mobile';
import { ret, toastTime } from '../common/constants'
import { queryUsers} from '../services/admin';
export default {
    namespace: 'user',
    state: {
        users:{
            list:[],
            pageSize:6,
            currentPage:0,
            totalAmount:0
          }
    },
    subscriptions: {
         
    },
    effects:{
        *getUsers({ payload }, { call, put }) {
            console.log(payload)

           let request = createSignatureRequest(payload);
           const response = yield call(queryUsers, request);
           if(response.ret == ret.ok){
                yield put({
                    type: 'save',
                    payload: {
                        users: {
                            list: [response.info],
                            pageSize: payload.rows,
                            currentPage: payload.page,
                         }
                    }
                })
           }
           else{
                yield put({type: 'global/showErrorMessage', payload: {ret: response.ret, msg: response.msg}})
          }

        }       
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