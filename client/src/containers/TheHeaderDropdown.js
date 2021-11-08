import React from 'react';
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { logout } from 'src/providers/actions/auth';
const TheHeaderDropdown = ({ logout, history, securitiesStore }) => {
       const dispatch = useDispatch();
       return (
              <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
                     <CDropdownToggle className="c-header-nav-link" caret={false}>
                            <div className="c-avatar " style={{ marginRight: '100px' }}>
                                   <CImg src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                                   {securitiesStore?.currentUser?.email}
                            </div>
                     </CDropdownToggle>
                     <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem header tag="div" color="light" className="text-center">
                                   <strong>Settings</strong>
                            </CDropdownItem>
                            <CDropdownItem>
                                   <CIcon name="cil-user" className="mfe-2" />
                                   Profile
                            </CDropdownItem>

                            <CDropdownItem divider />
                            <CDropdownItem
                                   onClick={() => {
                                          localStorage.removeItem('access_token');
                                          history.push('/login');
                                          dispatch({ type: 'USER_LOGOUT' });
                                   }}
                            >
                                   <CIcon name="cil-lock-locked" className="mfe-2" />
                                   Logout Account
                            </CDropdownItem>
                     </CDropdownMenu>
              </CDropdown>
       );
};

TheHeaderDropdown.prototype = {
       logout: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       securitiesStore: state.securities,
});
export default connect(StateProps, { logout })(TheHeaderDropdown);
