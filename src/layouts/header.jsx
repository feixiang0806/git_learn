import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './header.less';

@connect(state => {
  return {
  }
})
class Header extends React.Component{
  toBack = () => {
    const { backUrl, history, dispatch } = this.props;
    if( backUrl ){
      dispatch(routerRedux.push(backUrl));
    }
    else{
      history.goBack();
    }
  }
  render(){
     // fix in codepen
    const { title } = this.props;
    return (
      <div className={styles.top_box}>
        <a className={styles.top_box_btn} onClick={this.toBack}></a>
        {title}
      </div>
    );
  }
}
Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default Header;
