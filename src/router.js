import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Index from './routes/index';
import cloneDeep from 'lodash/cloneDeep';
import { ActivityIndicator, WingBlank, Progress} from 'antd-mobile';
import { getNavData } from './common/nav.js';

dynamic.setDefaultLoadingComponent(() => {
  return (<div>        
    <Progress percent={100} position="fixed" unfilled={false} appearTransition style={{borderWidth:'1'}}/>
    <WingBlank><div style={{width:'100%',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
    <ActivityIndicator animating='true'/></div></WingBlank>
  </div>);
});
function getRouteData(navData) {
  const route = cloneDeep(navData[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}


function RouterConfig({
  history, app
}) {

  const navData = getNavData(app);
  const passProps = {
    app,
    navData,
    getRouteData: () => {
      return getRouteData(navData);
    },
  };
  return (
    <Router history={history}>
      <Switch>
       <Route path="/" render={props => <Index {...props} {...passProps} />} />
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
