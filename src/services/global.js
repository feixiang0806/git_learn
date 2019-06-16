import request from '../utils/request';

export async function getErrorMessage() {
  return request('/api/v1/error_message');
}