import { createSignatureRequest } from '../utils/util';
import { Toast } from 'antd-mobile';
import { ret, toastTime } from '../common/constants'
import { queryAgentList} from '../services/admin';
export default {
    namespace: 'agent',
    state: {
        agents:{
            list:[],
            pageSize:6,
            currentPage:0
          }
    },
    subscriptions: {
         
    },
    effects:{
        *getAgents({ payload }, { call, put }) {
           let request = createSignatureRequest(payload);
           const response = yield call(queryAgentList, request);
           if(response.ret == ret.ok){
                yield put({
                    type: 'save',
                    payload: {
                        agents: {
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