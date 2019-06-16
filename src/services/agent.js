export async function setAgent(payload){
    return request('/api/v1/admin/set_agent',{
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