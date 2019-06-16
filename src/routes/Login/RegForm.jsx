import React from 'react';
import { createForm } from 'rc-form';
import { InputItem } from 'antd-mobile';
import {
    connect
  } from 'dva';
import {genDeviceid} from '../../utils/util';
import { getLocalStore, setLocalStore} from "../../utils/storage";
import styles from './Login.less';

@connect(state => {
    return {
      login: state.login
    }
  })
class RegForm extends React.Component{
      componentWillMount(){
        let deviceId = null;
        if(getLocalStore("deviceid") && !this.props.login.switchAccount){
            deviceId = getLocalStore("deviceid");
            const { dispatch } = this.props;
            dispatch({type:'login/regAndLogin',payload:{
              'deviceid':deviceId,
          },dispatch:dispatch})
        }
        else{
          if(this.props.inviteCode){
            this.register()
          }
        } 
      }
      register =() => {
        const { dispatch, inviteCode } = this.props;
        this.props.form.validateFields((error, value) => {
          if(error){
            //console.log(error)
          }
          else{
            //reg
            let deviceId = null;
            if(getLocalStore("deviceid")){
                deviceId = getLocalStore("deviceid");
            }
            else{
                deviceId = genDeviceid();
                setLocalStore("deviceid", deviceId)
            }
            dispatch({type:'login/regAndLogin',payload:{
                'deviceid':deviceId,
                'invite_code':value.invite_code || inviteCode
            }
        });
          }
        });
      }
     
      render(){
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        const { inviteCode } = this.props;
        return (
          <div>
             <div className='pop_title'>
                <div className='pop_title_h'>邀请码登录</div>
            </div>
            <div className={`form ${styles.form_content}`}>
              <div className='form_item'>
                <label className='form_item_label'>邀请码</label>
                <InputItem
                {...getFieldProps('invite_code' ,{
                  initialValue: inviteCode,
                  onChange(){}, // have to write original onChange here if you need
                  rules: [
                    //{required: true,message:'邀请码不能为空'},
                    {pattern: /^[0-9]{6}$/, message:'6位数字邀请码'}
                  ],
                  })}
                placeholder="邀请码"
                clear
                type='number' 
                editable={!inviteCode} 
                >
                </InputItem>
              </div>
              {(errors = getFieldError('invite_code')) ? <div className='errors'>{errors.join(',')}</div> : null}       
              <div className='form_item'>
                <label className='form_item_label'></label>
                <a onClick={this.register} className='btn_1'>登录</a>
              </div>
            </div>
          </div>
        );
      }
}
export default createForm()(RegForm);