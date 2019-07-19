
import React from 'react';
import { Modal, WhiteSpace } from 'antd-mobile';

class ChargeConfirm extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    charge =() => {
      const { dispatch, amount,userid,onClose} = this.props;
      dispatch({type:'charge/chargeCoins',payload:{
        other: parseInt(userid),
        coins: parseInt(amount)
      },
      callBack:() => {
        onClose();
      }
    });
    }

   render(){
     const {visible, onClose,amount,userid}  = this.props;
     return  (
        <Modal
        visible={visible}
        transparent
        maskClosable={false}
        onClose={onClose}
        closable={true}
        title='充值'
        footer={[{ text: '取消', onPress: () => { onClose(); } },{ text: '确定', onPress: () => { this.charge()} }]}
      >
        <div className={`modal_form form`}>  
          { `确定给用户${userid}充值${amount}个房币？`}
        </div> 
        <WhiteSpace size="lg" />      
     </Modal>
     )
   }
}
export default ChargeConfirm;