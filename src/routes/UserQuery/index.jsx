import React from 'react';
import {
  connect
} from 'dva';
import Main from '../../layouts/main';
import TabsComponent from '../../components/TabsComponent';
import UserList from './UserList';
import styles from '../record.less';
@connect(state => {
  return {
  }
})
class UserQuery extends React.Component{
      render(){
        const { location, history } = this.props;
        const tabs = [{title:'用户查询',idx:0}];
        return (<Main location={location} history={history} title='用户查询'>
            <div className={styles.record_container}>
                <TabsComponent tabs={tabs}>
                  <UserList/>
                </TabsComponent>
            </div>
           
        </Main>)
      }
}
export default UserQuery;