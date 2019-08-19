import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import SetUserType from '../../components/SetUserType';
import { userType } from '../../common/constants';
@connect(state => {
   return  {
    overview:state.home.overview
    }
})
export default class Home extends React.Component{
    constructor(props){
        super();
        this.state ={
            setUserTypeModal: false,
            utype:0
        }
    }
    
    onClose = (type) => () =>{
        this.setState({[type]: false})
    }
    loginOut = () => {
        this.props.dispatch({type:'login/loginOut'});
      }
    render(){
        const { overview } = this.props;
        return (
            <div className={`${styles.home_container}`}>
                <div className={styles.top_box}>
                    <a className={styles.top_box_btn} onClick={this.loginOut}></a>
                     运营首页
                </div>
                <div className={`pop_box ${styles.home_content}`}>
                    <div className={styles.table_box}>
                        <div className={styles.row}>
                            <div className={styles.row_col}>
                               用户数：<label className={styles.row_data}>{overview.user_count || 0}个</label>
                            </div>
                            <div className={styles.row_col}>
                               登录数：<label className={styles.row_data}>{overview.session_count || 0}个</label>
                            </div>
                        </div>
                        <div className={`${styles.row} ${styles.row_even}`}>
                            <div className={styles.row_col}>
                               在线数：<label className={styles.row_data}>{overview.online_count || 0}个</label>
                            </div>
                            <div className={styles.row_col}>
                               房间数：<label className={styles.row_data}>{overview.room_count || 0}个</label>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.row_col}>
                               开局数：<label className={styles.row_data}>{overview.game_count || 0}局</label>
                            </div>
                            <div className={styles.row_col}>
                               耗币数：<label className={styles.row_data}>{overview.spent_coins || 0}个</label>
                            </div>
                        </div>
                        <div className={`${styles.row} ${styles.row_even}`}>
                            <div className={styles.row_col}>
                               代理已收币：<label className={styles.row_data}>{overview.recv_coins || 0}个</label>
                            </div>
                            <div className={styles.row_col}>
                               代理已充币：<label className={styles.row_data}>{overview.charge_coins || 0}个</label>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.row_col}>
                               代理剩余币：<label className={styles.row_data}>{overview.remain_coins || 0}个</label>
                            </div>                    
                        </div>          
                    </div>
                     <div className={styles.btn_box}>
                        <a className='btn_3' onClick={() => {
                            this.setState({setUserTypeModal: true,utype:userType.operation})
                        }}>设置运营</a>
                        <a className='btn_3' href='/operation_query'>运营查询</a>
                        <a className='btn_3' href='/user_query'>用户查询</a>
                        {/* <a className='btn_3'>赠币记录</a> */}
                    </div>
                    <div className={styles.btn_box}>
                        <a className='btn_3' onClick={() => {
                            this.setState({setUserTypeModal: true,utype:userType.agent})
                        }}>设置代理</a>
                        <a className='btn_3' href='/agent_query'>代理查询</a>
                        <a className='btn_3' href='/charge'>给代理充值</a>
                        {/* <a className='btn_3'  href='/charge'>代理充值记录</a> */}
                    </div>
                    {/* <div className={styles.btn_box}>
                        <a className='btn_3'>提现处理</a>
                        <a className='btn_3'>提现记录</a>
                        <a className='btn_3'>佣金记录</a>
                    </div> */}
                    {/* <div className={styles.btn_box}>
                        <a className='btn_3'>房间查询</a>
                        <a className='btn_3'>开局记录</a>
                        <a className='btn_3'>押注记录</a>
                    </div> */}
                    {/* <div className={styles.btn_box}>
                        <a className='btn_3'>中奖记录</a>
                        <a className='btn_3'>公告发布</a>
                        <a className='btn_3'>公告记录</a>
                    </div> */}
                    {/* <div className={styles.btn_box}>
                        <a className='btn_3'>运营设置</a>
                        <a className='btn_3'>运营查询</a>
                        <a className='btn_3'>业绩统计</a>
                    </div> */}
                </div>
                <SetUserType visible={this.state.setUserTypeModal}  onClose={this.onClose('setUserTypeModal')} dispatch={this.props.dispatch} type={this.state.utype}/>
            </div>
        )
    }
}