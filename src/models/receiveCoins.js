import { createSignatureRequest } from '../utils/util';
import { ret } from '../common/constants'
import { queryCharge} from '../services/admin';
export default {
    namespace: 'recCoins',
    state: {
        chargeCoins:{
            list:[],
            pageSize:6,
            currentPage:0
          }
    },
    subscriptions: {
         
    },
    effects:{
        *queryChargeCoins({ payload }, { call, put }) {
           let request = createSignatureRequest(payload);
           const response = yield call(queryCharge, request);
           if(response.ret == ret.ok){
                yield put({
                    type: 'save',
                    payload: {
                        chargeCoins: {
                            list: response.infos || [],
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
            console.log(action)
            return {
                ...state,
                ...action.payload
            }
        }
    }
}