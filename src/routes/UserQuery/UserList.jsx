import React from 'react';
import ReactDOM from 'react-dom';
import { ListView ,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import FormItemComp from '../../components/FormItemComp';
import styles from '../record.less';

@connect(state =>{
    return { 
      users: state.user.users 
    }
})
class UserList extends React.Component{
  constructor(props) {
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => { return row1 !== row2},
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });
  
      this.state = {
        dataSource,
        isLoading: false,
        height: document.documentElement.clientHeight * 3 / 4,
        initData: [],
        pageSize: 6,
        currentPage:0,
        hasMore:false,
        formObj:{}
      };
    }
  
    componentDidMount() {
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop-300;
      // simulate initial Ajax
      this.setState({
          height: hei,
       });
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.users !== this.props.users) {
        const { initData, pageSize } = this.state;
        let iData = initData.concat(nextProps.users.list);
        let hasMore = nextProps.users.list.length === pageSize
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(iData),
          isLoading: false,
          initData: iData,
          hasMore 
        });
      }
    }
  
    doSearch =() =>{
      const { dispatch, form } = this.props;
       form.validateFields((error, value) => {
        if(error){
        }
        else{
          if(!value.id && !value.name){
            Toast.info('请输入查询条件！', 2, null, false);
            return;
          }
          let obj = {
            rows: this.state.pageSize,
            page: 0,
          },formObj = {};
          if(value.id){
            obj.id = formObj.id = parseInt(value.id);

          }
          if(value.name){
            obj.name =formObj.name = value.name;
          }
          dispatch({ 
            type:'user/getUsers', 
            payload:obj
          });
          this.setState({ isLoading: true, hasMore: true, currentPage: 0,initData:[],dataSource:this.state.dataSource.cloneWithRows([]),formObj });
        }
      });
    }
    onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading || !this.state.hasMore) {
        return;
      }
      const { dispatch } = this.props;
      let { pageSize, currentPage,formObj } = this.state;
      dispatch({ 
        type:'user/getUsers', 
        payload:{
          rows: pageSize,
          page: ++currentPage,
          ...formObj
        }
      });
      this.setState({ isLoading: true, hasMore: true, currentPage: currentPage });
    }

    
  render(){
        const row = (rowData, sectionID, rowID) => {
          return (
              <div className='table_row'>
              <div className='table_row_top'>
                  <span>
                    用户ID<label className='table_row_data1'>{rowData.userid}</label>
                  </span>
                  <span className='text-right'>外号<label className='table_row_data1'>{rowData.nickname}</label></span>
              </div>
              <div className='table_row_bottom'>
                  <div className='table_row_bottom_row'>
                      <span>
                          <label className='table_row_label'>己收币</label>
                          <label className='table_row_data2'>{rowData.recv_coins}</label>
                      </span>   
                      <span>
                          <label className='table_row_label'>已充币</label>
                          <label className='table_row_data2'>{rowData.charge_coins}</label>
                      </span>                                           
                  </div>
                  <div className='table_row_bottom_row'>
                      <span>
                          <label className='table_row_label'>己用币</label>
                          <label className='table_row_data2'>{rowData.game_coins}</label>
                      </span>   
                      <span>
                          <label className='table_row_label'>剩余币</label>
                          <label className='table_row_data2'>{rowData.remain_coins}</label>
                      </span>                                           
                  </div>
              </div>
          </div>  
          );
        };
      const { getFieldProps,getFieldError } = this.props.form;
      let errors;
      return (
       <div className={`pop_box ${styles.record_content}`}>
          <div className={styles.table_content}>
              <div className={`form`}>
                <FormItemComp label='用户ID' isRequired={false} {...getFieldProps('id' ,{
                      //rules: [{required: true,message:'用户ID不能为空'}],
                      })}
                    placeholder="用户ID"
                    type='number'  
                    clear/>
               {(errors = getFieldError('id')) ? <div className='errors'>{errors.join(',')}</div> : null}
                <FormItemComp label='用户名' isRequired={false} {...getFieldProps('name' ,{
                      })}
                    placeholder="用户名"
                    clear/>
                     <div className='form_item'>
                      <label className='form_item_label'></label>
                      <a onClick={this.doSearch} className='btn_1'>查询</a>
                    </div>   
              </div>
              <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              //     {this.state.isLoading ? 'Loading...' :  (this.state.hasMore ? '' :'没有更多')}
              // </div>)}
              renderRow={row}
              style={{
                  height: this.state.height,
                  overflow: 'auto',
              }}
              onScroll={() => {  }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
              />               
          </div>
      </div>)
  }
}

export default createForm()(UserList);