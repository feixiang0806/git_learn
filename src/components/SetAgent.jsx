
import React from 'react';
import { Modal,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import Confirm from './Confirm';

class SetAgent extends React.Component{
    constructor(props){
      super();
      this.state = {
        confirmVisible: false
      }
    }
    toSetAgent = () =>{
      const { dispatch } = this.props;
      this.onConfirmClose()
      dispatch({type:"agent/toSetAgent",payload:{
        other:value.other,
      },
      callBack:() =>{
        onClose(); 
      }
      });
    }

    onConfirmClose = () => {
      this.setState({confirmVisible: false});
    }

    onConfrim = () =>{
      const {form}  = this.props;
      form.validateFields((error, value) => {
        if(error){
          //console.log(error)
        }
        else{
          this.setState({confirmVisible: true});
      }
      })
    }

   render(){
     const {visible, onClose}  = this.props;
     const { getFieldProps, getFieldError } = this.props.form;
     const { confirmVisible } = this.state;
     let errors;
     return  (
        <div>
          <Modal
          visible={visible}
          transparent
          maskClosable={false}
          onClose={onClose}
          title="设置代理"
          closable={true}
          footer={[{ text: '取消', onPress: () => { onClose(); } },{ text: '确定', onPress: () => { this.onConfrim()} }]}
        >
          <div className={`modal_form form`} >  
            <div className='form_item'>
              <label className='form_item_label'>用户ID</label>
              <InputItem
                {...getFieldProps('other' ,{
                  onChange(){}, // have to write original onChange here if you need
                  rules: [{required: true,message:'用户ID不能为空'}],
                  })}
                type='number'  
                placeholder="用户ID"
                clear
                >
                </InputItem>
              </div>
              {(errors = getFieldError('other')) ? <div className='errors'>{errors.join(',')}</div> : null}
          </div>       
      </Modal>
     </div>
     )
   }
}
export default createForm()(SetAgent);