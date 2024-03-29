import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CHeaderBrand, CHeaderNav, CHeaderNavItem, CHeaderNavLink, CSubheader, CBreadcrumbRouter, CLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';

// routes config
import routes from '../routes';

import { TheHeaderDropdown, TheHeaderDropdownMssg, TheHeaderDropdownNotif, TheHeaderDropdownTasks } from './index';

const TheHeader = (props) => {
       const dispatch = useDispatch();
       const sidebarShow = useSelector((state) => state.sidebarShow);

       const toggleSidebar = () => {
              const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
              dispatch({ type: 'set', sidebarShow: val });
       };

       const toggleSidebarMobile = () => {
              const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
              dispatch({ type: 'set', sidebarShow: val });
       };

       return (
              <CHeader withSubheader>
                     <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

                     <CHeaderNav className="px-3">
                            <TheHeaderDropdown {...props} />
                     </CHeaderNav>

                     <CSubheader className="px-3 justify-content-between">
                            <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
                     </CSubheader>
              </CHeader>
       );
};

export default TheHeader;
