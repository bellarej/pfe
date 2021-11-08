import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddTasks from './AddTasks';
import moment from 'moment';
import {
       CBadge,
       CCard,
       CCardBody,
       CCardHeader,
       CCol,
       CButton,
       CDataTable,
       CRow,
       CModal,
       CModalHeader,
       CModalBody,
       CModalFooter,
} from '@coreui/react';
import useCreatePDF from '../hooks/useCreatePDF';
import EditTask from './EditTask';
import { MenuItem, TextField } from '@mui/material';
const fields = [
       'Task name',
       'created at',
       'Start date',
       'End date',
       'status',
       'Total price',
       'Intervention Price',
       'Client name',
       'Client address',
       'Client num',
       'Assigned to',
       'Article name',
       'action',
];
const getBadge = (status) => {
       switch (status) {
              case 'Active':
                     return 'success';
              case 'Banned':
                     return 'danger';
              default:
                     return 'primary';
       }
};
const TaskList = (props) => {
       const { getAllTasks, usersStore, deleteTask, tasksStore, AllUsers } = props;
       const [taskList, setTasksList] = useState([]);
       const [FIlteredSTasks, setFIlteredSTasks] = useState();
       const [modal, setModal] = useState(false);
       const [SelectedItem, setSelectedItem] = useState(null);

       const { DownLoadPDFView } = useCreatePDF();
       useEffect(() => {
              getAllTasks();
       }, []);
       useEffect(() => {
              if (FIlteredSTasks) {
                     let data;
                     Promise.all(
                            (data = FIlteredSTasks.reverse().map((item, index) => {
                                   return {
                                          id: item.id,
                                          ['Task name']: item.taskName,
                                          ['created at']: item.createdAt,
                                          ['Start date']: item.startDate,
                                          ['End date']: item.endDate,
                                          ['Total price']: +item.interventionPrice + (+item?.additionalPrice || 0) + ' TND',
                                          ['status']: item.status,
                                          ['Intervention Price']: item.interventionPrice + 'TND',
                                          ['Client name']: item.client?.clientName,
                                          ['Client address']: item.client?.address,
                                          ['Client num']: item.client?.num,
                                          ['Assigned to']: item.changedBy.fullName,
                                          ['Article name']: item.selectedArticle,
                                          action: item,
                                   };
                            })),
                     ).then(() => setTasksList(data));
              }
       }, [FIlteredSTasks]);
       useEffect(() => {
              if (tasksStore?.taskList?.length > 0) {
                     setFIlteredSTasks(tasksStore?.taskList);
              }
       }, [tasksStore?.taskList]);
       const filter = (input) => {
              console.log();
              if (input.target.value) {
                     console.log(tasksStore?.taskList);
                     if (input.target.name === 'filter-date') {
                            setFIlteredSTasks(
                                   tasksStore?.taskList.filter((item) =>
                                          moment(moment(input.target.value).format('YYYY-MM-DD')).isBetween(
                                                 item.startDate,
                                                 item.endDate,
                                                 undefined,
                                                 '[]',
                                          ),
                                   ),
                            );
                     } else {
                            console.log(input.target.value);
                            setFIlteredSTasks(
                                   tasksStore?.taskList.filter((item) => {
                                          console.log(item?.changedBy?.id === input.target.value);
                                          return item?.changedBy?.id === input.target.value;
                                   }),
                            );
                     }
              } else {
                     setFIlteredSTasks(tasksStore?.taskList);
              }
       };
       return (
              <div>
                     <div className="filter-tasks">
                            <div>
                                   <TextField
                                          onChange={(e) => filter(e)}
                                          name="filter-date"
                                          variant="outlined"
                                          type="datetime-local"
                                          fullWidth
                                          label="Filter By date"
                                   />
                            </div>
                            <div className="filter-date">
                                   <TextField
                                          onChange={(e) => filter(e)}
                                          variant="outlined"
                                          select
                                          name="filter-user"
                                          fullWidth
                                          label="Filter By user"
                                          defaultValue={[]}
                                   >
                                          {AllUsers &&
                                                 AllUsers.map(({ id, fullName }) => (
                                                        <MenuItem key={id} value={id}>
                                                               {fullName}
                                                        </MenuItem>
                                                 ))}
                                   </TextField>
                            </div>
                     </div>

                     <CRow>
                            <CCol>
                                   <CCard>
                                          <CCardHeader>Task List Table</CCardHeader>
                                          <CCardBody>
                                                 {taskList.length > 0 ? (
                                                        <CDataTable
                                                               items={taskList}
                                                               fields={fields}
                                                               hover
                                                               striped
                                                               bordered
                                                               size="sm"
                                                               itemsPerPage={10}
                                                               pagination
                                                               scopedSlots={{
                                                                      status: (item) => (
                                                                             <td>
                                                                                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                                                                             </td>
                                                                      ),
                                                                      ['Article name']: (item) => (
                                                                             <td>
                                                                                    {item['Article name'].map((article) => {
                                                                                           return <p>{article.articleName}</p>;
                                                                                    })}
                                                                             </td>
                                                                      ),
                                                                      action: (item) => (
                                                                             <td id="modal_view_task" className="flex-center">
                                                                                    <CButton
                                                                                           color="secondary"
                                                                                           onClick={(e) => {
                                                                                                  setSelectedItem(item);
                                                                                                  setModal(true);
                                                                                           }}
                                                                                           className="mr-1"
                                                                                    >
                                                                                           view
                                                                                    </CButton>
                                                                                    <CButton
                                                                                           color="danger"
                                                                                           onClick={(e) => {
                                                                                                  deleteTask(item.id);
                                                                                           }}
                                                                                           className="mr-1"
                                                                                    >
                                                                                           delete
                                                                                    </CButton>
                                                                                    <div className="edit-task">
                                                                                           <EditTask
                                                                                                  {...props}
                                                                                                  edit={true}
                                                                                                  selectedTask={item.action}
                                                                                           />
                                                                                    </div>
                                                                             </td>
                                                                      ),
                                                               }}
                                                        />
                                                 ) : (
                                                        'There no users founds!!'
                                                 )}
                                          </CCardBody>
                                   </CCard>
                                   <CModal show={modal} onClose={() => setModal(!modal)} color="secondary">
                                          <CModalHeader> Topic details</CModalHeader>
                                          {SelectedItem && <CModalBody>{DownLoadPDFView(SelectedItem)} </CModalBody>}
                                   </CModal>
                            </CCol>
                     </CRow>
              </div>
       );
};

TaskList.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
