import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';


const proxy = {
  'POST /api/v1/user/login': {
    $body: {
      "ret": 0,
      "msg": "ddd",
      "token": "dfdfsf-ddd",
      "user_info": {
        "id":12345678,
        "nickname":"大鱼",
        "invite_code":"1242424242255",
        "cash":1000,
        "coins":1009
      },
    },
  },
  'GET /api/v1/error_message': {
    $body: {
      ret: 0,
      msg: 'ddd',
      infos: [{
        error_code:2,
        message:'用户不存在',
      },
      {
        error_code:3,
        message:'密码不正确',
      }],
    },
  },
}
export default noProxy ? {} : delay(proxy, 1000);
