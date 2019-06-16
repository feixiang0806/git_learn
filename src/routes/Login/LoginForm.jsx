import React from 'react';
import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import {
  connect
} from 'dva';
import styles from './Login.less';
@connect(state => {
  return {
  }
})
class LoginForm extends React.Component{
      login =() => {
        const { dispatch, form} = this.props;
        form.validateFields((error, value) => {
          if(error){
            //console.log(error)
          }
          else{
            //login
            value.userid = parseInt(value.userid);
            dispatch({type:'login/regAndLogin',payload:value, dispatch: dispatch
           });
          }
        });
      }
      render(){
    
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
          <div>
            <div className='pop_title'>
                <div className='pop_title_h'>用户ID登录</div>
            </div>
            <div className={`form ${styles.form_content}`}>
              <div className='form_item'>
                  <label className='form_item_label'>用户ID</label>
                  <InputItem
                  {...getFieldProps('userid' ,{
                    onChange(){}, // have to write original onChange here if you need
                    rules: [{required: true,message:'用户名不能为空'}],
                    })}
                  type='number'  
                  placeholder="用户ID"
                  clear
                 >
                 </InputItem>
              </div>
              {(errors = getFieldError('userid')) ? <div className='errors'>{errors.join(',')}</div> : null}
            <div className='form_item'>
              <label className='form_item_label'>安全密码</label>
              <InputItem
              {...getFieldProps('password' ,{
                onChange(){}, // have to write original onChange here if you need
                rules: [
                  {required: true,message:'密码不能为空'},
                  {pattern: /^[0-9a-zA-Z]{6,18}$/, message:'6-18位数字或字母组成'}
                ],
                })}
              type='password'  
              placeholder="安全密码"
              clear
              >
              </InputItem>  
            </div>  
            {(errors = getFieldError('password')) ? <div className='errors'>{errors.join(',')}</div> : null}       
            <div className='form_item'>
              <label className='form_item_label'></label>
              <a onClick={this.login} className='btn_1'>登录</a>
            </div>      
             </div>
          </div>
     
        );
      }
}
export default createForm()(LoginForm);