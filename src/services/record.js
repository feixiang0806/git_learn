import request from '../utils/request';

export async function queryOpeningRecords(payload){
  return request('/api/v1/room/query_game',{
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

export async function querySendRecords(payload) {
  return request('/api/v1/',{
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

export async function queryToChargeRecords(payload) {
  return request('/api/v1/',{
    method:"POST",
    body: payload
  });
}