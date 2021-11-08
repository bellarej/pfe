import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
       CModalBody,
       CModalFooter,
       CModalHeader,
       CModalTitle,
} from '@coreui/react';
import { getTasksByUserID, updateTaskStatus, updateTask } from 'src/providers/actions/tasks.actions';
import TextField from '@mui/material/TextField';
import useCreatePDF from '../hooks/useCreatePDF';

const fields = [
       'Task name',
       'Start date',
       'End date',
       'status',
       'Intervention Price',
       'Total price',
       'Client name',
       'Client address',
       'Client num',
       'Actions',
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
const getNextStatus = (status) => {
       switch (status) {
              case 'ready':
                     return 'start';
              case 'in-progress':
                     return 'done';
              case 'start':
                     return 'in-progress';
              case 'done':
                     return 'done';
              case 'failed':
                     return '--';
              default:
                     return 'primary';
       }
};
const TecRelatedTasksList = (props) => {
       const { getTasksByUserID, tasksStore, securitiesStore, updateTaskStatus, updateTask } = props;
       const [taskList, setTasksList] = useState([]);
       const [CommentDetails, SetCommentDetails] = useState(false);
       const [danger, setDanger] = useState(false);
       const [SuccessModal, setSuccessModal] = useState(false);
       const [ViewModal, setViewModal] = useState(false);
       const [SelectedItem, setSelectedItem] = useState(null);
       const [selectedArticle, setSelectedArticle] = useState();
       const [SelectedTask, setSelectedTask] = useState();

       const [FinishedTaskData, setFinishedTaskData] = useState();
       const { DownLoadPDFView } = useCreatePDF();

       const onChange = (e) => setFinishedTaskData({ ...FinishedTaskData, [e.target.name]: e.target.value });

       useEffect(() => {
              getTasksByUserID(securitiesStore?.currentUser.id);
       }, []);
       useEffect(() => {
              if (tasksStore?.selectedTasksList?.length > 0) {
                     let data;

                     Promise.all(
                            (data = tasksStore?.selectedTasksList.map((item, index) => {
                                   return {
                                          id: item.id,
                                          ['Task name']: item.taskName,
                                          ['Start date']: item.startDate,
                                          ['End date']: item.endDate,
                                          ['status']: item.status,
                                          ['Intervention Price']: item.interventionPrice + ' TND',
                                          ['Total price']: +item.interventionPrice + +item.additionalPrice + ' TND',
                                          ['Client name']: item.client?.clientName,
                                          ['Client address']: item.client?.address,
                                          ['Article name']: item.selectedArticle.filter((art) => !item?.rejectedArticles?.includes(art.id)),
                                          ['Client num']: item.client?.num,
                                          articles: item.selectedArticle,
                                          Actions: item.selectedArticle.articleName,
                                   };
                            })),
                     ).then(() => setTasksList(data));
              }
       }, [tasksStore]);
       const ignoreTask = ({ id }) => {
              updateTaskStatus(id, 'failed', securitiesStore?.currentUser?.id, CommentDetails, setDanger);
       };
       const confirmTask = (item) => {
              FinishedTaskData['status'] = 'done';
              updateTask(item.id, securitiesStore?.currentUser?.id, FinishedTaskData, setSuccessModal, setFinishedTaskData);
       };

       return (
              <>
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

                                                                      Actions: (item) => {
                                                                             let { id, status } = item;
                                                                             return (
                                                                                    <td id="tec-action">
                                                                                           {status !== 'failed' && (
                                                                                                  <CButton
                                                                                                         color={
                                                                                                                status === 'ready'
                                                                                                                       ? 'primary'
                                                                                                                       : status === 'in-progress'
                                                                                                                       ? 'success'
                                                                                                                       : 'secondary'
                                                                                                         }
                                                                                                         disabled={status === ('done' || 'failed')}
                                                                                                         onClick={() =>
                                                                                                                status === 'in-progress'
                                                                                                                       ? (setSuccessModal(true),
                                                                                                                         setSelectedTask(item))
                                                                                                                       : updateTaskStatus(
                                                                                                                                id,
                                                                                                                                getNextStatus(
                                                                                                                                       getNextStatus(
                                                                                                                                              status,
                                                                                                                                       ),
                                                                                                                                ),
                                                                                                                                securitiesStore
                                                                                                                                       ?.currentUser
                                                                                                                                       ?.id,
                                                                                                                         )
                                                                                                         }
                                                                                                         className="mr-1"
                                                                                                  >
                                                                                                         {getNextStatus(status)}
                                                                                                  </CButton>
                                                                                           )}

                                                                                           <CButton
                                                                                                  color={'danger'}
                                                                                                  disabled={status === 'failed' || status === 'done'}
                                                                                                  onClick={() => {
                                                                                                         setSelectedArticle(id);
                                                                                                         setDanger(!danger);
                                                                                                  }}
                                                                                                  className="mr-1"
                                                                                           >
                                                                                                  ignore
                                                                                           </CButton>
                                                                                           <CButton
                                                                                                  color="success"
                                                                                                  onClick={(e) => {
                                                                                                         setSelectedItem(item);
                                                                                                         setViewModal(true);
                                                                                                  }}
                                                                                                  className="mr-1"
                                                                                           >
                                                                                                  view
                                                                                           </CButton>
                                                                                    </td>
                                                                             );
                                                                      },
                                                               }}
                                                        />
                                                 ) : (
                                                        'There no users founds!!'
                                                 )}
                                          </CCardBody>
                                   </CCard>
                            </CCol>
                            <CModal show={ViewModal} onClose={() => setViewModal(!ViewModal)} color="secondary">
                                   <CModalHeader> Topic details</CModalHeader>
                                   {SelectedItem && <CModalBody>{DownLoadPDFView(SelectedItem)} </CModalBody>}
                            </CModal>
                            {/* ----------**************************------------------------------------------------- */}
                            <CModal show={SuccessModal} onClose={() => setSuccessModal(!SuccessModal)} color="danger">
                                   <CModalHeader closeButton>
                                          <CModalTitle>Modal title</CModalTitle>
                                   </CModalHeader>
                                   <CModalBody>
                                          <TextField
                                                 style={{ marginBottom: '2em' }}
                                                 onChange={(e) => onChange(e)}
                                                 variant="outlined"
                                                 type="number"
                                                 fullWidth
                                                 value={FinishedTaskData?.additionalPrice}
                                                 name="additionalPrice"
                                                 label="Additional price en TND"
                                                 required
                                          />

                                          <TextField
                                                 style={{ marginBottom: '2em' }}
                                                 name="rejectedArticles"
                                                 variant="outlined"
                                                 select
                                                 fullWidth
                                                 onChange={(e) => onChange(e)}
                                                 label="Rejected articles"
                                                 defaultValue={[]}
                                                 SelectProps={{
                                                        multiple: true,
                                                 }}
                                          >
                                                 {SelectedTask?.articles?.length > 0 &&
                                                        SelectedTask?.articles.map(({ id, articleName }) => (
                                                               <MenuItem key={id} value={id}>
                                                                      {articleName}
                                                               </MenuItem>
                                                        ))}
                                          </TextField>

                                          <TextField
                                                 style={{ marginBottom: '2em' }}
                                                 onChange={(e) => onChange(e)}
                                                 variant="outlined"
                                                 fullWidth
                                                 multiline
                                                 defaultValue={FinishedTaskData?.comment}
                                                 value={FinishedTaskData?.comment}
                                                 rows={4}
                                                 name="comment"
                                                 label="Add comment"
                                                 required
                                          />
                                   </CModalBody>
                                   <CModalFooter>
                                          <CButton
                                                 disabled={!FinishedTaskData?.comment || !FinishedTaskData?.additionalPrice}
                                                 color="danger"
                                                 onClick={() => confirmTask(SelectedTask)}
                                          >
                                                 confirm
                                          </CButton>{' '}
                                          <CButton
                                                 color="secondary"
                                                 onClick={() => {
                                                        setSuccessModal(!SuccessModal);

                                                        setFinishedTaskData({ comment: null });
                                                 }}
                                          >
                                                 Cancel
                                          </CButton>
                                   </CModalFooter>
                            </CModal>
                            {/* ----------**************************------------------------------------------------- */}

                            <CModal show={danger} onClose={() => setDanger(!danger)} color="danger">
                                   <CModalHeader closeButton>
                                          <CModalTitle>Modal title</CModalTitle>
                                   </CModalHeader>
                                   <CModalBody>
                                          <TextField
                                                 onChange={(e) => SetCommentDetails(e.target.value)}
                                                 variant="outlined"
                                                 fullWidth
                                                 label="Add comment"
                                                 required
                                          />
                                   </CModalBody>
                                   <CModalFooter>
                                          <CButton color="danger" onClick={() => ignoreTask({ id: selectedArticle })}>
                                                 confirm
                                          </CButton>{' '}
                                          <CButton color="secondary" onClick={() => setDanger(!danger)}>
                                                 Cancel
                                          </CButton>
                                   </CModalFooter>
                            </CModal>
                     </CRow>
              </>
       );
};

TecRelatedTasksList.propTypes = {
       getTasksByUserID: PropTypes.func.isRequired,
       updateTaskStatus: PropTypes.func.isRequired,
       updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
       tasksStore: state.tasks,
       securitiesStore: state.securities,
});

const mapDispatchToProps = { getTasksByUserID, updateTaskStatus, updateTask };

export default connect(mapStateToProps, mapDispatchToProps)(TecRelatedTasksList);
