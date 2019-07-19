 import React from 'react';
 import { InputItem } from 'antd-mobile';
 export default class FormItemComp extends React.Component{
    render(){
        const { isRequired, label, ...inputProps} = this.props;
        return (
            <div className='form_item' onClick={() =>this.inputRef.focus()}>
                {label && <label className='form_item_label'>{isRequired && <span>*</span>}{label}</label>}
                <InputItem
                {...inputProps}
                ref={el => this.inputRef = el}
                >
                </InputItem>  
          </div>  
        )
    }
 }

