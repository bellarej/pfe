import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddTasks from './AddTasks';
import UsersList from '../users/UsersList';
import { gteListArticle } from 'src/providers/actions/article.actions';
import { getUsersList } from 'src/providers/actions/users.actions';
import { createNewTask, getAllTasks, deleteTask, updateTask } from 'src/providers/actions/tasks.actions';
import TaskList from './TaskList';
import { MenuItem, TextField } from '@mui/material';

export const PlanningList = ({
       updateTask,
       gteListArticle,
       getUsersList,
       articleStore,
       usersStore,
       createNewTask,
       tasksStore,
       getAllTasks,
       deleteTask,
}) => {
       const [AllArticles, setAllArticles] = useState(null);
       const [AllUsers, setAllUsers] = useState(null);

       useEffect(() => {
              gteListArticle();
              getUsersList();
       }, []);
       useEffect(() => {
              if (articleStore?.articlesList && usersStore?.userList) {
                     setAllArticles(articleStore?.articlesList);
                     setAllUsers(usersStore?.userList);
              }
       }, [articleStore, usersStore]);

       return (
              <div className="planning-list-container">
                     <div className="add_task_btn">
                            <div className="add">
                                   {AllArticles && AllUsers && (
                                          <AddTasks createNewTask={createNewTask} AllArticles={AllArticles} AllUsers={AllUsers} />
                                   )}
                            </div>
                     </div>

                     <div className="task-list">
                            <TaskList
                                   getAllTasks={getAllTasks}
                                   deleteTask={deleteTask}
                                   tasksStore={tasksStore}
                                   createNewTask={createNewTask}
                                   AllArticles={AllArticles}
                                   AllUsers={AllUsers}
                                   updateTask={updateTask}
                            />
                     </div>
              </div>
       );
};

PlanningList.propTypes = {
       gteListArticle: PropTypes.func.isRequired,
       getUsersList: PropTypes.func.isRequired,
       createNewTask: PropTypes.func.isRequired,
       getAllTasks: PropTypes.func.isRequired,
       updateTask: PropTypes.func.isRequired,
       deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
       articleStore: state.articles,
       usersStore: state.users,
       tasksStore: state.tasks,
       securitiesStore: state.securities,
});

const mapDispatchToProps = { gteListArticle, getUsersList, createNewTask, updateTask, getAllTasks, deleteTask };

export default connect(mapStateToProps, mapDispatchToProps)(PlanningList);
