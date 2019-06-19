import request from '../utils/request';

export async function queryOpeningRecords(payload){
  return request('/api/v1/room/query_game',{
    method:"POST",
    body: payload
  });
}

export async function charge(payload){
  return request('/api/v1/charge',{
    method:"POST",
    body: payload
  });
}

export async function queryLotteryInfo(payload) {
  return request('/api/v1/lottery/query',{
    method:"POST",
    body: payload
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
