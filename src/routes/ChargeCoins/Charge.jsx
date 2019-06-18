import React from 'react';
import { InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import styles  from '../index.less';
@connect(state => {
  return {
  }
})
class Charge extends React.Component{

    charge =() => {
        const { dispatch, form} = this.props;
        form.validateFields((error, value) => {
          if(error){
           // console.log(error)
          }
          else{
            dispatch({type:'charge/chargeCoins',payload:{
              other: parseInt(value.other),
              coins: parseInt(value.coins)
            }});
          }
        });
      }

    render(){
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return <div className={`pop_box ${styles.form_box}`}>      
        <div className={`form ${styles.form_content}`}> 
        <div className='form_item'>
            <label className='form_item_label'>用户ID</label>
            <InputItem
            {...getFieldProps('other' ,{
              onChange(){}, // have to write original onChange here if you need
              rules: [{required: true,message:'用户ID不能为空'}],
              })}
            placeholder="用户ID"
            
            clear
            >
           </InputItem>
          </div>
          {(errors = getFieldError('other')) ? <div className='errors'>{errors.join(',')}</div> : null}
          <div className='form_item'>
            <label className='form_item_label'>充币数量</label>
            <InputItem
            {...getFieldProps('coins' ,{
              onChange(){}, // have to write original onChange here if you need
              rules: [{required: true,message:'充币数量不能为空'}],
              })}
            type='number'  
            placeholder="充币数量"
            clear
            >
           </InputItem>
          </div>
          {(errors = getFieldError('coins')) ? <div className='errors'>{errors.join(',')}</div> : null}       
          <div className='form_item'>
            <label className='form_item_label'></label>
            <a onClick={this.charge} className='btn_1'>充币</a>
          </div>
        </div>
      </div>
    }
}

export default createForm()(Charge);