
import React from 'react';
import { Modal,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import Confirm from './Confirm';
import FormItemComp from './FormItemComp';
import { userType } from '../common/constants';

const AgentModal = createForm()((props) => {
  const {visible, onClose, onConfirm, form,title }  = props;
  const { getFieldProps, getFieldError } = form;
  let errors;
  return(
      <Modal
      visible={visible}
      transparent
      maskClosable={false}
      onClose={onClose}
      title={title}
      closable={true}
      footer={[{ text: '取消', onPress: () => { onClose(); } },{ text: '确定', onPress: () => { 
        form.validateFields((error, value) => {
          if(error){
            //console.log(error)
          }
          else{
            onConfirm(value.other, form)
        }
        })
      } }]}
    >
      <div className={`modal_form form `} > 
          <FormItemComp label='用户ID' isRequired {...getFieldProps('other' ,{
              rules: [{required: true,message:'用户ID不能为空'}],
              })}
            placeholder="用户ID"
            type='number'  
            clear/> 
          {(errors = getFieldError('other')) ? <div className='errors'>{errors.join(',')}</div> : null}
      </div>       
    </Modal>
  )
})

class SetUserType extends React.Component{
    constructor(props){
      super();
      this.state = {
        confirmVisible: false,
        other:'',
        form: null
      }
    }
    toSetUsertype = () =>{
      const { dispatch, onClose,type} = this.props;
      this.onConfirmClose();
      let url = null;
      switch(type){
        case userType.operation:{
          url = "home/toSetOperation";
          break;
        }
        case userType.agent:{
          url = "home/toSetAgent";
          break;
        }
      }
      if(url){
        dispatch({type:url,payload:{
          other:parseInt(this.state.other),
        },
        callBack:() =>{
          onClose(); 
          this.state.form.resetFields();
        }
        });
      }
    }

    onConfirmClose = () => {
      this.setState({confirmVisible: false});
    }

    onConfirm = (other, form) =>{
      this.setState({confirmVisible: true, other: other, form});
    }

   render(){
     const { confirmVisible, other } = this.state;
     let desc ='',title='';
     switch(this.props.type){
      case userType.operation:{
        title='设置运营';
        desc =`确认设置用户${other}为运营？`;
        break;
      }
      case userType.agent:{
        title='设置代理';
        desc =`确认设置用户${other}为代理？`;
        break;
      }
    }
     return  (
       <div>
         <AgentModal {...this.props} onConfirm={this.onConfirm}></AgentModal>
         <Confirm visible={confirmVisible} onClose={this.onConfirmClose} onConfirm={this.toSetUsertype} desc={desc} title={title}></Confirm>
       </div>
     )
        
   }
}
export default SetUserType;