import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import Charge from './Charge';
import ToChargeRec from './ToChargeRec';
import styles from '../record.less';
@connect(state => {
  return {
  }
})
class ChargeCoins extends React.Component{
      render(){
        const { location, history } = this.props;
        //,{title:'充币记录',idx:1}
        const tabs = [{title:'充币',idx:0}];
        return (<Main location={location} history={history} title='充币'>
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                  <Charge/>
                  {/* <ToChargeRec/> */}
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default ChargeCoins;