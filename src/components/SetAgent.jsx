
import React from 'react';
import { Modal,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import Confirm from './Confirm';

const AgentModal = createForm()((props) => {
  const {visible, onClose, onConfirm, form}  = props;
  const { getFieldProps, getFieldError } = form;
  let errors;
  return(
      <Modal
      visible={visible}
      transparent
      maskClosable={false}
      onClose={onClose}
      title="设置代理"
      closable={true}
      footer={[{ text: '取消', onPress: () => { onClose(); } },{ text: '确定', onPress: () => { 
        form.validateFields((error, value) => {
          if(error){
            //console.log(error)
          }
          else{
            onConfirm(value.other)
        }
        })
      } }]}
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
  )
})

class SetAgent extends React.Component{
    constructor(props){
      super();
      this.state = {
        confirmVisible: false,
        other:''
      }
    }
    toSetAgent = () =>{
      const { dispatch } = this.props;
      this.onConfirmClose()
      dispatch({type:"agent/toSetAgent",payload:{
        other:this.state.other,
      },
      callBack:() =>{
        onClose(); 
      }
      });
    }

    onConfirmClose = () => {
      this.setState({confirmVisible: false});
    }

    onConfirm = (other) =>{
      this.setState({confirmVisible: true, other: other});
    }

   render(){
     const { confirmVisible, other } = this.state;
     return  (
       <div>
         <AgentModal {...this.props} onConfirm={this.onConfirm}></AgentModal>
         <Confirm visible={confirmVisible} onClose={this.onConfirmClose} onConfirm={this.toSetAgent} title={'确认'} desc={`确认设置用户${other}为代理？`}></Confirm>
       </div>
     )
        
   }
}
export default SetAgent;