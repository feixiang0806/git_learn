import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import AgentList from './AgentList';
import styles from '../record.less';
@connect(state => {
  return {
  }
})
class ChargeCoins extends React.Component{
      render(){
        const { location, history } = this.props;
        const tabs = [{title:'代理查询',idx:0}];
        return (<Main location={location} history={history} title='代理查询'>
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                  <AgentList/>
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default ChargeCoins;