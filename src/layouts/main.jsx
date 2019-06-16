import React from 'react';
import PropTypes from 'prop-types';
import Header from './header.jsx';
import styles from './main.less';

function Main({
  children, location,bgClass,title,backUrl,history
}) {
  return (
    <div className={`${styles.normal} ${bgClass?styles[bgClass]:''}`}>
       <Header location={location} title={title} backUrl={backUrl} history={history}/>
      {children}
    </div>
  );
}

Main.propTypes = {
  location: PropTypes.object.isRequired
};

export default Main;
