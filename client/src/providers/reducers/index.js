import { combineReducers } from 'redux';
import auth from './auth';
import users from './users.reducers.js';
import tasks from './tasks.reducers.js';
import articles from './articles.reducers.js';

export default combineReducers({
       users: users,
       tasks: tasks,
       securities: auth,
       articles: articles,
});
