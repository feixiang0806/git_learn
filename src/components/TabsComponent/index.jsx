import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './index.less';
export default class TabsComponent extends React.Component{
    constructor(props){
        super();
        this.state ={
            tabIdx:0
        }
    }
    render(){
        const { tabs, children } = this.props; 
        const { tabIdx } = this.state;
        return   <div className={styles.tab_container}>
        <Tabs tabs={tabs} tabBarBackgroundColor='transparent'
        renderTab={
          tab =>  <span className = { [styles.tab_item,tab.idx === tabIdx?styles.tab_item_sel:''].join(' ') }>{tab.title}</span>
          }
          onTabClick={(tab, index) => { this.setState({'tabIdx':index})}}
          >
          {children}
      </Tabs>
      </div>
    }
}