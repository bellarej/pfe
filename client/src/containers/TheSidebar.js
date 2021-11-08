import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
       CCreateElement,
       CSidebar,
       CSidebarBrand,
       CSidebarNav,
       CSidebarNavDivider,
       CSidebarNavTitle,
       CSidebarMinimizer,
       CSidebarNavDropdown,
       CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';

const TheSidebar = ({ securitiesStore }) => {
       const dispatch = useDispatch();
       const show = useSelector((state) => state.sidebarShow);
       const [SelectedUserROle, setSelectedUserROle] = useState([]);
       useEffect(() => {
              if (securitiesStore?.currentUser?.role) setSelectedUserROle(navigation[securitiesStore?.currentUser?.role]);
       }, [securitiesStore]);
       return (
              <CSidebar show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
                     <CSidebarBrand className="d-md-down-none" to="/">
                            <CIcon className="c-sidebar-brand-full" name="logo-negative" height={35} />
                            <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} />
                     </CSidebarBrand>
                     <CSidebarNav>
                            <CCreateElement
                                   items={SelectedUserROle}
                                   components={{
                                          CSidebarNavDivider,
                                          CSidebarNavDropdown,
                                          CSidebarNavItem,
                                          CSidebarNavTitle,
                                   }}
                            />
                     </CSidebarNav>
                     <CSidebarMinimizer className="c-d-md-down-none" />
              </CSidebar>
       );
};

export default TheSidebar;
