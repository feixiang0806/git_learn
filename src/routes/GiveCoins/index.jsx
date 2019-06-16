import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import styles from '../record.less';
import GiveRecord from './GiveRecord';
@connect(state => {
  return {
  }
})
class GiveCoins extends React.Component{
      
      render(){
        const { location, history } = this.props;
        const tabs = [{title:'赠币记录',idx:0}];
        return (<Main location={location} history={history} title='赠币记录' >
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                 <GiveRecord/>
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default GiveCoins;