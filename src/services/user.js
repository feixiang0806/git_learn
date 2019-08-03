import request from '../utils/request';

export async function login(payload) {
  return request('/api/v1/user/login',{
      method:'post',
      body:payload
  });
}

export async function queryGiveRecords(payload) {
  return request('/api/v1/user/query_give_coin_log',{
    method:"POST",
    body: payload
  });
}

export async function queryChargeRecords(payload) {
  return request('/api/v1/user/query_charge_log',{
    method:"POST",
    body: payload
  });
}