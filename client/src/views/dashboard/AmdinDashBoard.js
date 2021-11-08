import React, { useEffect, useState } from 'react';
import { CCol, CRow, CWidgetProgress } from '@coreui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTasks } from 'src/providers/actions';
import { CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CProgress, CCallout } from '@coreui/react';
import { gteListArticle } from 'src/providers/actions/article.actions';
import { getUsersList, deleteUserById } from 'src/providers/actions/users.actions';
import { getColor } from '@coreui/utils';
import { CCardGroup } from '@coreui/react';
import { CChartBar, CChartLine, CChartDoughnut, CChartRadar, CChartPie, CChartPolarArea } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';

const AmdinDashBoard = (props) => {
       const { getAllTasks, securitiesStore, tasksStore, articleStore, usersStore, gteListArticle, getUsersList } = props;
       const { backgroundColor, pointHoverBackgroundColor, dataPoints, label, pointed, ...attributes } = props;
       const [ArticleList, SetArticles] = useState(null);
       const [UserList, SetUserList] = useState(null);
       const [Stats, setStats] = useState({
              done: 0,
              in_progress: 0,
              ready: 0,
              failed: 0,
       });
       useEffect(() => {
              getAllTasks(securitiesStore?.currentUser.role !== 'admin' ? securitiesStore?.currentUser?.id : null);
       }, [securitiesStore?.currentUser]);

       useEffect(() => {
              if (tasksStore.taskList) {
                     let counter = Stats;
                     counter.done = tasksStore.taskList.reduce(function (n, val) {
                            return n + (val.status === 'done');
                     }, 0);
                     counter.in_progress = tasksStore.taskList.reduce(function (n, val) {
                            return n + (val.status === 'in_progress');
                     }, 0);
                     counter.ready = tasksStore.taskList.reduce(function (n, val) {
                            return n + (val.status === 'ready');
                     }, 0);
                     counter.failed = tasksStore.taskList.reduce(function (n, val) {
                            return n + (val.status === 'failed');
                     }, 0);

                     setStats(counter);
              }
       }, [tasksStore.taskList]);
       useEffect(() => {
              gteListArticle();
       }, []);

       useEffect(() => {
              getUsersList();
       }, []);
       useEffect(() => {
              articleStore?.articlesList &&
                     SetArticles(
                            articleStore?.articlesList?.sort(function (a, b) {
                                   return b?.howManyTimeSelected - a?.howManyTimeSelected;
                            }),
                     );
       }, [articleStore?.articlesList]);
       useEffect(() => {
              usersStore?.userList &&
                     SetUserList(
                            usersStore?.userList.sort(function (a, b) {
                                   return b?.totalTasks - a?.totalTasks;
                            }),
                     );
       }, [usersStore?.userList]);

       return (
              <div>
                     {securitiesStore?.currentUser.role !== 'admin' ? (
                            <CRow>
                                   <CCol xs="12" sm="6" lg="3">
                                          <CWidgetProgress inverse color="success" variant="inverse" text={Stats.done} footer="Total tasks done..." />
                                   </CCol>
                                   <CCol xs="12" sm="6" lg="3">
                                          <CWidgetProgress
                                                 inverse
                                                 color="info"
                                                 variant="inverse"
                                                 text={Stats.in_progress}
                                                 footer="Total tasks in progress..."
                                          />
                                   </CCol>
                                   <CCol xs="12" sm="6" lg="3">
                                          <CWidgetProgress
                                                 inverse
                                                 color="warning"
                                                 variant="inverse"
                                                 text={Stats.ready}
                                                 footer="Total tasks ready..."
                                          />
                                   </CCol>
                                   <CCol xs="12" sm="6" lg="3">
                                          <CWidgetProgress
                                                 inverse
                                                 color="danger"
                                                 variant="inverse"
                                                 value={95}
                                                 text={Stats.failed}
                                                 footer="Total tasks failed..."
                                          />
                                   </CCol>
                            </CRow>
                     ) : (
                            <CRow>
                                   <CCol>
                                          <CCard>
                                                 <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                                                 <CCardBody>
                                                        <CRow>
                                                               <CCol xs="12" md="6" xl="6">
                                                                      <CRow>
                                                                             <CCol sm="6">
                                                                                    <CCallout color="info">
                                                                                           <small className="text-muted">Total tasks done</small>
                                                                                           <br />
                                                                                           <strong className="h4">{Stats.done}</strong>
                                                                                    </CCallout>
                                                                             </CCol>
                                                                             <CCol sm="6">
                                                                                    <CCallout color="danger">
                                                                                           <small className="text-muted">
                                                                                                  Total tasks in progress
                                                                                           </small>
                                                                                           <br />
                                                                                           <strong className="h4">{Stats.in_progress}</strong>
                                                                                    </CCallout>
                                                                             </CCol>
                                                                      </CRow>

                                                                      <hr className="mt-0" />

                                                                      {ArticleList?.length > 0 &&
                                                                             ArticleList.slice(0, 5).map((item) => {
                                                                                    return (
                                                                                           <div className="progress-group mb-4">
                                                                                                  <div className="progress-group-prepend">
                                                                                                         <span className="progress-group-text">
                                                                                                                {item.articleName}
                                                                                                         </span>
                                                                                                  </div>
                                                                                                  <div className="progress-group-bars">
                                                                                                         <CProgress
                                                                                                                className="progress-xs"
                                                                                                                color="info"
                                                                                                                value={item.howManyTimeSelected}
                                                                                                         />
                                                                                                  </div>
                                                                                                  <h5 style={{ whiteSpace: 'pre' }}>
                                                                                                         {'    '}
                                                                                                         {item.howManyTimeSelected}
                                                                                                  </h5>
                                                                                           </div>
                                                                                    );
                                                                             })}
                                                               </CCol>

                                                               <CCol xs="12" md="6" xl="6">
                                                                      <CRow>
                                                                             <CCol sm="6">
                                                                                    <CCallout color="warning">
                                                                                           <small className="text-muted">Total tasks ready</small>
                                                                                           <br />
                                                                                           <strong className="h4">{Stats.ready}</strong>
                                                                                    </CCallout>
                                                                             </CCol>
                                                                             <CCol sm="6">
                                                                                    <CCallout color="success">
                                                                                           <small className="text-muted">Total tasks failed</small>
                                                                                           <br />
                                                                                           <strong className="h4">{Stats.failed}</strong>
                                                                                    </CCallout>
                                                                             </CCol>
                                                                      </CRow>
                                                                      <hr className="mt-0" />
                                                                      <CChartPie
                                                                             datasets={[
                                                                                    {
                                                                                           backgroundColor: [
                                                                                                  '#41B883',
                                                                                                  '#E46651',
                                                                                                  '#00D8FF',
                                                                                                  '#DD1B16',
                                                                                           ],
                                                                                           data: [
                                                                                                  Stats.done,
                                                                                                  Stats.in_progress,
                                                                                                  Stats.ready,
                                                                                                  Stats.failed,
                                                                                           ],
                                                                                    },
                                                                             ]}
                                                                             labels={['success', 'in progress', 'ready', 'failed']}
                                                                             options={{
                                                                                    tooltips: {
                                                                                           enabled: true,
                                                                                    },
                                                                             }}
                                                                      />
                                                               </CCol>
                                                        </CRow>

                                                        <br />

                                                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                                                               <thead className="thead-light">
                                                                      <tr>
                                                                             <th className="text-center">
                                                                                    <CIcon name="cil-people" />
                                                                             </th>
                                                                             <th>User</th>
                                                                             <th className="text-center">Total tasks</th>
                                                                             <th>Tasks done </th>
                                                                             <th>Tasks failed </th>
                                                                      </tr>
                                                               </thead>
                                                               <tbody>
                                                                      {UserList?.map((item) => (
                                                                             <tr>
                                                                                    <td className="text-center">
                                                                                           <div className="c-avatar">
                                                                                                  <img
                                                                                                         src={'avatars/1.jpg'}
                                                                                                         className="c-avatar-img"
                                                                                                         alt="admin@bootstrapmaster.com"
                                                                                                  />
                                                                                                  <span className="c-avatar-status bg-success"></span>
                                                                                           </div>
                                                                                    </td>
                                                                                    <td>
                                                                                           <div>{item.fullName}</div>
                                                                                           <div className="small text-muted">{item.email}</div>
                                                                                    </td>
                                                                                    <td className="text-center">
                                                                                           <div className="small text-muted">{item.totalTasks}</div>
                                                                                    </td>
                                                                                    <td>
                                                                                           <div className="clearfix">
                                                                                                  <div className="float-left">
                                                                                                         <strong>{item.tasksSuccess}</strong>
                                                                                                  </div>
                                                                                                  <div className="float-right">
                                                                                                         <small className="text-muted">
                                                                                                                Jun 11, 2015 - Jul 10, 2015
                                                                                                         </small>
                                                                                                  </div>
                                                                                           </div>
                                                                                           <CProgress
                                                                                                  className="progress-xs"
                                                                                                  color="success"
                                                                                                  value={item.tasksSuccess}
                                                                                           />
                                                                                    </td>
                                                                                    <td>
                                                                                           <div className="clearfix">
                                                                                                  <div className="float-left">
                                                                                                         <strong>{item.tasksFailed}</strong>
                                                                                                  </div>
                                                                                                  <div className="float-right">
                                                                                                         <small className="text-muted">
                                                                                                                Jun 11, 2015 - Jul 10, 2015
                                                                                                         </small>
                                                                                                  </div>
                                                                                           </div>
                                                                                           <CProgress
                                                                                                  className="progress-xs"
                                                                                                  color="danger"
                                                                                                  value={item.tasksFailed}
                                                                                           />
                                                                                    </td>
                                                                             </tr>
                                                                      ))}
                                                               </tbody>
                                                        </table>
                                                 </CCardBody>
                                          </CCard>
                                   </CCol>
                            </CRow>
                     )}
              </div>
       );
};

AmdinDashBoard.propTypes = {
       getUsersList: PropTypes.func.isRequired,
       getAllTasks: PropTypes.func.isRequired,
       gteListArticle: PropTypes.func.isRequired,
       tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
       className: PropTypes.string,
       backgroundColor: PropTypes.string,
       pointHoverBackgroundColor: PropTypes.string,
       dataPoints: PropTypes.array,
       label: PropTypes.string,
       pointed: PropTypes.bool,
};
AmdinDashBoard.defaultProps = {
       backgroundColor: 'rgba(0,0,0,.2)',
       dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
       label: 'Sales',
};

const mapStateToProps = (state) => ({
       securitiesStore: state.securities,
       tasksStore: state.tasks,
       usersStore: state.users,
       articleStore: state.articles,
});

const mapDispatchToProps = { getAllTasks, gteListArticle, getUsersList };

export default connect(mapStateToProps, mapDispatchToProps)(AmdinDashBoard);
