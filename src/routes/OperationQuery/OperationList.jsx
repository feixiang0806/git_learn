import React from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import { connect } from 'dva';
import styles from '../record.less';

@connect(state =>{
    return { 
      operations: state.operation.operations 
    }
})
export default class OperationList extends React.Component{
  constructor(props) {
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => { return row1 !== row2},
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });
  
      this.state = {
        dataSource,
        isLoading: true,
        height: document.documentElement.clientHeight * 3 / 4,
        initData: [],
        pageSize: 6,
        currentPage:0,
        hasMore:true
      };
    }
  
    componentDidMount() {
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop-60;
      // simulate initial Ajax
      const { dispatch } = this.props;
      dispatch({ 
        type:'operation/getOperations', 
        payload:{
          rows: this.state.pageSize,
          page: this.state.currentPage,
          recv: false
        }
      });
      this.setState({
          height: hei,
       });
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.operations !== this.props.operations) {
        const { initData, pageSize } = this.state;
        let iData = initData.concat(nextProps.operations.list);
        let hasMore = nextProps.operations.list.length === pageSize
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(iData),
          isLoading: false,
          initData: iData,
          hasMore 
        });
      }
    }
  
    onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading || !this.state.hasMore) {
        return;
      }
      const { dispatch } = this.props;
      let { pageSize, currentPage } = this.state;
      dispatch({ 
        type:'operation/getOperations', 
        payload:{
          rows: pageSize,
          page: ++currentPage,
          recv: false
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
          </div>  
          );
        };
    
      return (
       <div className={`pop_box ${styles.record_content}`}>
          <div className={styles.table_content}>
              <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                  {this.state.isLoading ? 'Loading...' :  (this.state.hasMore ? '' :'没有更多')}
              </div>)}
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