import React from 'react';

const Users = React.lazy(() => import('src/views/users/UsersList'));
const PlanningList = React.lazy(() => import('src/views/tasks/PlanningList'));
const ArticleList = React.lazy(() => import('src/views/article/ArticleList'));
const RelatedTasks = React.lazy(() => import('src/views/tasks/TecRelatedTasksList'));
const CategoriesPage = React.lazy(() => import('src/views/categories'));

const routes = [
       { path: '/', exact: true, name: 'Dashboard', component: React.lazy(() => import('src/views/dashboard/AmdinDashBoard')) },
       { path: '/users', exact: true, name: 'User Details', component: Users },
       { path: '/planning', exact: true, name: 'Planning details', component: PlanningList },
       { path: '/article', exact: true, name: 'Article Page', component: ArticleList },
       { path: '/my-tasks', exact: true, name: 'My tasks Page', component: RelatedTasks },
       { path: '/category', exact: true, name: 'Categories Page', component: CategoriesPage },
];

export default routes;
