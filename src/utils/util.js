import createHmac from 'create-hmac';
import moment from 'moment';
import { getSessionStore} from './storage';
export function getUrl() {
    let obj = {apiUrl:'', wsUrl:''};
    const env = process.env.NODE_ENV;
    //120.79.52.18
    switch (env) {
      case 'dev':          
        obj.apiUrl = 'http://117.48.201.173:21356';
        obj.wsUrl = 'ws://117.48.201.173:21356/ws';     
        break;
      case 'production':
        obj.apiUrl = 'https://b561.cc:21356';
        obj.wsUrl = 'wss://b561.cc:21356/ws';
        break;
      default:
        break;
    }
    return obj;
  };
  const sortstringify = obj =>{
     let res = '';
     let keys = Object.keys(obj).sort(), len = keys.length;
     keys.forEach((k, i) =>{
       res += `${k}=`;
      if(obj[k].constructor === String){
         res += `${encodeURIComponent(obj[k]).replace(/%/g,'')}`;
      }
      else if(obj[k].constructor === Array ){
        res += `[${obj[k].join(' ')}]`;
      }
      else{
        res += obj[k];
      }
      if( i < len -1){
        res += '&';
      }
     })
    return res;
  }
const sortObj = obj => {
    const res = {};
    Object.keys(obj)
        .sort()
        .forEach(k => {
            if(obj[k].constructor === String){
              res[k] = encodeURIComponent(obj[k]).replace(/%/g,'');
            }
            else if(obj[k].constructor === Array ){
              res[k] = '['+obj[k].join(' ')+']';
            }
            else{
              res[k] = obj[k];
            }
        });
    return res;
};

export const getSignature = payload => {
    const secret =  getSessionStore('userToken') || '';
    let content = payload;
    if (typeof payload === 'object') {
        content = sortstringify(payload);
    }
    const hmac = createHmac('sha256', Buffer.from(secret));
    hmac.update(content);
    return hmac.digest('hex');
};

export const createRequest = () => {
    let userInfo = getSessionStore('userInfo');
    if(!userInfo) return null;
    return { userid: userInfo.id };
}

export const createSignatureRequest = (payload) => {
    let request = createRequest() || {};
    if(payload){
        Object.assign(request,payload);
    }
    request.sign = getSignature(request);
    return request;
}

export const formatUnixtTime = (unixTime) =>{
  return moment.unix(unixTime).format('YYYY-MM-DD HH:mm:ss')
}