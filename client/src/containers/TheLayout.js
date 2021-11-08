import React, { useEffect } from 'react';
import Loader from 'src/views/loader/Loader';
import { TheContent, TheSidebar, TheFooter, TheHeader } from './index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from 'src/providers/actions/auth';
import { authChecker } from 'src/utils/authCheck';

import { Redirect, Route, Switch } from 'react-router-dom';

const TheLayout = (props) => {
       const { securitiesStore, loadUser } = props;
       useEffect(() => localStorage.getItem('access_token') && loadUser(), []);
       if (!authChecker()) return <Redirect to="/login" />;
       else if (!securitiesStore?.currentUser)
              return (
                     <div className="c-app c-default-layout">
                            <Loader />;
                     </div>
              );
       else
              return (
                     <div className="c-app c-default-layout">
                            <TheSidebar {...props} />
                            <div className="c-wrapper">
                                   <TheHeader {...props} />
                                   <div className="c-body">
                                          <TheContent {...props} />
                                   </div>
                                   <TheFooter {...props} />
                            </div>
                     </div>
              );
};

TheLayout.prototype = {
       loadUser: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       securitiesStore: state.securities,
});
export default connect(StateProps, { loadUser })(TheLayout);
