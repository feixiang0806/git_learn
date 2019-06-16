
import React from 'react';
import { Modal, WhiteSpace } from 'antd-mobile';
export const confirm = (props) =>{
  const {visible, onClose,title,desc, onConfirm}  = props;
     return  (
        <Modal
        visible={visible}
        transparent
        maskClosable={false}
        onClose={onClose}
        closable={true}
        title={ title }
        footer={[{ text: '取消', onPress: () => { onClose(); } },{ text: '确定', onPress: () => { onConfirm()} }]}
      >
        <div className={`modal_form form`}>  
          { desc }
        </div> 
        <WhiteSpace size="lg" />      
     </Modal>
     )
}