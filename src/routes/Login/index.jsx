import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'dva';
//import RegForm from './RegForm';
import LoginForm from './LoginForm';
import { loginType } from '../../common/constants';
import styles from './index.less';
@connect(state => {
  return {
    login:state.login
  }
})
class Login extends React.Component{
  state = {
    type: loginType.login,
    inviteCode:''
  }

  componentDidMount() {
  }

  componentWillMount(){
    const { location, dispatch } = this.props;
    let paths = location.pathname.split('/');
    let payload = {}
    if(paths.length === 3){
      payload.inviteCode = paths[2];
      dispatch({type:'login/saveInviteInfo',payLoad:payload});
    }
    else if(paths.length === 4){
      payload.inviteCode = paths[2];
      payload.inviteRoomNo = paths[3];
      dispatch({type:'login/saveInviteInfo',payLoad:payload});
    }
    if(payload.inviteCode){
      this.setState({inviteCode:payload.inviteCode});
    }
  }

  changeLoginType(type){
    this.setState({type})
  }
  render(){
    const { type, inviteCode } = this.state;
    return (
      <div className={styles.login_container}>
        <div className={`pop_box ${styles.login_content}`}>
          {/* {type ===loginType.reg && <RegForm inviteCode={inviteCode}/>}
          {type ===loginType.reg && <div className={styles.login_method}><a className={styles.login_method_a} onClick={() =>{
              this.changeLoginType(loginType.login);
          }}>
              已有用户ID，密码登录
            </a> </div>
          }       */}
          {type ===loginType.login && <LoginForm/>}
          {/* {type ===loginType.login && <div className={styles.login_method}><a className={styles.login_method_a} onClick={() =>{
              this.changeLoginType(loginType.reg);
          }}>
              没有用户ID，邀请码登录
            </a> </div>
          }    */}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired
};

export default Login;
