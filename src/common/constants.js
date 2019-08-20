// 错误消息
export const ret = {
  ok: 0,
  fail: 1,
  user_not_login: 2, // 用户还没登录
  user_not_found: 3, // 用户不存在
  password_incorrect: 4, // 密码不正确
  invalid_args: 5, // 无效参数
  password_not_set: 6, // 还没设置密码
  user_sign_failure: 7, // 签名错误
  insufficient_coins: 8, // 房币不足
  room_user_full: 9, // 房间人满了
};

export const loginType = {
  reg: 1,
  login: 2,
};

export const userType =  {
  user:0,
  operation:1,
  agent:2,
  super_agent:3
}
export const userTypeLabel = {
  0:'用户',
  1:'运营',
  2:'代理',
  3:'超级代理'
}
export const toastTime = 3;