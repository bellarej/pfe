import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
       {
              _tag: 'CSidebarNavItem',
              name: 'Dashboard',
              to: '/dashboard',
              icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
       },
       {
              _tag: 'CSidebarNavItem',
              name: 'My task List',
              to: '/my-tasks',
              icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
       },
];
const _navAdmin = [
       {
              _tag: 'CSidebarNavItem',
              name: 'Dashboard',
              to: '/dashboard',
              icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
       },
       {
              _tag: 'CSidebarNavItem',
              name: 'Users',
              to: 'users',
              icon: 'cil-drop',
       },
       {
              _tag: 'CSidebarNavItem',
              name: 'Planning',
              to: 'planning',
              icon: 'cil-drop',
       },
       {
              _tag: 'CSidebarNavItem',
              name: 'Articles',
              to: 'article',
              icon: 'cil-drop',
       },
       {
              _tag: 'CSidebarNavItem',
              name: 'Categories',
              to: 'category',
              icon: 'cil-drop',
       },
];

export default { admin: _navAdmin, technician: _nav };
