import { createSignatureRequest } from '../utils/util';
import { Toast } from 'antd-mobile';
import { ret, toastTime } from '../common/constants'
import { queryAdminList} from '../services/admin';
export default {
    namespace: 'operation',
    state: {
        operations:{
            list:[],
            pageSize:6,
            currentPage:0,
          }
    },
    subscriptions: {
         
    },
    effects:{
        *getOperations({ payload }, { call, put }) {
           let request = createSignatureRequest(payload);
           const response = yield call(queryAdminList, request);
           if(response.ret == ret.ok){
                yield put({
                    type: 'save',
                    payload: {
                        operations: {
                            list: response.infos,
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