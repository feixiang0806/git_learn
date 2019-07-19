import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import styles  from '../index.less';
import FormItemComp from '../../components/FormItemComp';
import ChargeConfirm from '../../components/ChargeConfirm';
@connect(state => {
  return {
  }
})
class Charge extends React.Component{
    state ={
      confirmVisible:false,
      other:0,
      coins:0
    }
    
    charge =() => {
        const {form} = this.props;
        form.validateFields((error, value) => {
          if(error){
           // console.log(error)
          }
          else{
            this.setState({
              confirmVisible: true,
              other: value.other,
              coins: value.coins
            })          
          }
        });
      }
      
      onClose=() =>{
        this.setState({
          confirmVisible: false
        })    
      }

    render(){
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        const { confirmVisible, other, coins } = this.state;
        return <div className={`pop_box ${styles.form_box}`}>      
        <div className={`form ${styles.form_content}`}> 
          <FormItemComp label='用户ID' isRequired {...getFieldProps('other' ,{
              onChange(){}, // have to write original onChange here if you need
              rules: [{required: true,message:'用户ID不能为空'}],
              })}
            placeholder="用户ID"
            clear/>

          {(errors = getFieldError('other')) ? <div className='errors'>{errors.join(',')}</div> : null}
          <FormItemComp label='充币数量' isRequired {...getFieldProps('coins' ,{
              onChange(){}, // have to write original onChange here if you need
              rules: [
                {required: true,message:'充币数量不能为空'},
                {pattern: /^[1-9]\d*$/, message: '充币数量大于0'}
              ],
              })}
            type='number'  
            placeholder="充币数量"
            clear/>
          {(errors = getFieldError('coins')) ? <div className='errors'>{errors.join(',')}</div> : null}       
          <div className='form_item'>
            <label className='form_item_label'></label>
            <a onClick={this.charge} className='btn_1'>充币</a>
          </div>
        </div>
        <ChargeConfirm visible={confirmVisible} onClose={this.onClose} userid={other} amount={coins} dispatch={this.props.dispatch}/>
      </div>
    }
}

export default createForm()(Charge);