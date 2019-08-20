import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import ChargeCoinsRec from './ChargeCoinsRec';
import styles from '../record.less';
@connect(state => {
  return {
  }
})
class ReceiveCoins extends React.Component{
      
      render(){
        const { location, history } = this.props;
        const tabs = [{title:'充币查询',idx:0}];
        return (<Main location={location} history={history} title='充币查询' >
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                  <ChargeCoinsRec/>
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default ReceiveCoins;