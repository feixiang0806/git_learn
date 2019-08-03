import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import OperationList from './OperationList';
import styles from '../record.less';
@connect(state => {
  return {
  }
})
class ChargeCoins extends React.Component{
      render(){
        const { location, history } = this.props;
        const tabs = [{title:'运营查询',idx:0}];
        return (<Main location={location} history={history} title='运营查询'>
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                  <OperationList/>
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default ChargeCoins;