import request from '../utils/request';

export async function setAgent(payload){
    return request('/api/v1/admin/set_agent',{
      method:"POST",
      body: payload
    });
}
export async function setOperation(payload){
  return request('/api/v1/admin/set_admin',{
    method:"POST",
    body: payload
  });
}

export async function queryAdminList(payload) {
    return request('/api/v1/admin/query_admin_list',{
      method:"POST",
      body: payload
    });
  }
  
  export async function queryAgentList(payload) {
    return request('/api/v1/admin/query_agent_list',{
      method:"POST",
      body: payload
    });
  }
  
  export async function queryUsers(payload) {
    return request('/api/v1/admin/query_user',{
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