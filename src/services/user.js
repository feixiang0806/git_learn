import request from '../utils/request';

export async function login(payload) {
  return request('/api/v1/user/login',{
      method:'post',
      body:payload
  });
}

