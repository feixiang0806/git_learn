import React from 'react';
import { createForm } from 'rc-form';
import FormItemComp from '../../components/FormItemComp';
import {
    connect
  } from 'dva';
//import {genDeviceid} from '../../utils/util';
import { getLocalStore, setLocalStore} from "../../utils/storage";
import styles from './Login.less';

@connect(state => {
    return {
      login: state.login
    }
  })
class RegForm extends React.Component{
      componentWillMount(){
        if(getLocalStore("user") && !this.props.login.switchAccount){
          let user = getLocalStore("user");
          const { dispatch } = this.props;
          dispatch({type:'login/userLogin',payload:user,dispatch:dispatch});
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
            // let deviceId = null;
            // if(getLocalStore("deviceid")){
            //     deviceId = getLocalStore("deviceid");
            // }
            // else{
            //     deviceId = genDeviceid();
            //     setLocalStore("deviceid", deviceId)
            // }
            dispatch({type:'login/userRegister',payload:{
                //'deviceid':deviceId,
                'name': value.name,
                'password': value.password,
                'invite_code':value.invite_code || inviteCode
            },dispatch:dispatch
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
                <div className='pop_title_h'>邀请码注册</div>
            </div>
            <div className={`form ${styles.form_content}`}>           
              <FormItemComp label='用户名' isRequired {...getFieldProps('name' ,{
                    onChange(){}, // have to write original onChange here if you need
                    rules: [{required: true,message:'用户名不能为空'}],
                    })}
                  placeholder="建议使用手机号"
                  clear/>
              {(errors = getFieldError('name')) ? <div className='errors'>{errors.join(',')}</div> : null}    
              <FormItemComp label='安全密码' isRequired {...getFieldProps('password' ,{
                  onChange(){}, // have to write original onChange here if you need
                  rules: [
                    {required: true,message:'密码不能为空'},
                    {pattern: /^[0-9a-zA-Z]{6,18}$/, message:'6-18位数字或字母组成'}
                  ],
                  })}
                type='password'  
                placeholder="安全密码"
                clear/>

              {(errors = getFieldError('password')) ? <div className='errors'>{errors.join(',')}</div> : null}       
              <FormItemComp label='确认密码' isRequired {...getFieldProps('cpassword' ,{
                    onChange(){}, // have to write original onChange here if you need
                    validateFirst:true,
                    rules: [
                      {required: true,message:'确认密码不能为空'},
                      {validator:(rule, value, callback) =>{
                        const pw = this.props.form.getFieldValue('password');
                        if (pw !== value) {
                          callback(new Error('两次密码不一致'))
                        } else {
                          callback()
                        }
                      }
                    }
                    ],
                    })}
                  type='password'  
                  placeholder="确认密码"
                  clear/>

              {(errors = getFieldError('cpassword')) ? <div className='errors'>{errors.join(',')}</div> : null}        
              <FormItemComp label='邀请码' {...getFieldProps('invite_code' ,{
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
                style={{color: inviteCode ? '#afadad' : ''}}/>

              {(errors = getFieldError('invite_code')) ? <div className='errors'>{errors.join(',')}</div> : null}       
              <div className='form_item'>
                <label className='form_item_label'></label>
                <a onClick={this.register} className='btn_1'>注册</a>
              </div>
            </div>
          </div>
        );
      }
}
export default createForm()(RegForm);