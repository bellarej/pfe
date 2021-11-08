import { useState, useEffect } from 'react';
import {
       CButton,
       CCard,
       CCardBody,
       CCardFooter,
       CCol,
       CContainer,
       CInput,
       CInputGroup,
       CInputGroupPrepend,
       CInvalidFeedback,
       CInputGroupText,
       CRow,
       CCardHeader,
       CSelect,
       CModal,
       CModalBody,
       CModalFooter,
       CModalHeader,
       CModalTitle,
} from '@coreui/react';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router-dom';
import { authChecker } from 'src/utils/authCheck';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddTask = (props) => {
       const { AllArticles, AllUsers, createNewTask, securitiesStore } = props;
       const [ErrorMsg, setErrorMsg] = useState(undefined);
       const [modal, setModal] = useState(false);

       const schema = yup.object().shape({
              taskName: yup.string().required('this field is required!'),
              startDate: yup.string().required('this field is required!'),
              endDate: yup.string().required('this field is required!'),
              interventionPrice: yup.string().required('this field is required!'),
              clientName: yup.string().required('this field is required!'),
              clientAddress: yup.string().required('this field is required!'),
              clientNum: yup.string().required('this field is required!'),
              changedBy: yup.string().required('this field is required!'),
              selectedArticle: yup.array().min(1, 'this field is required!'),
       });
       const { control, handleSubmit } = useForm({
              mode: 'onSubmit',
              defaultValues: {
                     taskName: '',
                     startDate: '',
                     endDate: '',
                     interventionPrice: '',
                     clientName: '',
                     clientAddress: '',
                     clientNum: '',
                     changedBy: '',
                     selectedArticle: [],
              },
              resolver: yupResolver(schema),
       });

       const onSubmit = (data) => {
              data.client = {
                     clientName: data.clientName,
                     address: data.clientAddress,
                     num: data.clientNum,
              };
              delete data.clientName;
              delete data.clientAddress;
              delete data.clientNum;
              createNewTask(data, setModal, setErrorMsg);

              setErrorMsg();
       };

       const onError = (_err) => {
              setErrorMsg(_err);
       };

       return (
              <div className="btn_modal_add_user">
                     <CButton color="success" onClick={() => setModal(!modal)} className="mr-1">
                            Create new task
                     </CButton>
                     <CModal show={modal} onClose={() => setModal(!modal)} color="secondary">
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                   <CModalHeader closeButton>
                                          <CModalTitle>
                                                 <h1>Add new task</h1>
                                          </CModalTitle>
                                   </CModalHeader>
                                   <CModalBody>
                                          <p className="text-muted">Add new task</p>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="taskName"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="taskName"
                                                                      placeHolder="Task name"
                                                                      invalid={!!ErrorMsg?.taskName}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.taskName?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="startDate"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="datetime-local"
                                                                      id="date-input"
                                                                      {...field}
                                                                      name="startDate"
                                                                      placeHolder="startDate"
                                                                      invalid={!!ErrorMsg?.startDate}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.startDate?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="endDate"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="datetime-local"
                                                                      id="date-input"
                                                                      {...field}
                                                                      name="endDate"
                                                                      placeHolder="endDate"
                                                                      invalid={!!ErrorMsg?.endDate}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.endDate?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="interventionPrice"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="number"
                                                                      {...field}
                                                                      name="Intervention price"
                                                                      placeHolder="interventionPrice"
                                                                      invalid={!!ErrorMsg?.interventionPrice}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.interventionPrice?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="clientName"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="clientName"
                                                                      placeHolder="client name"
                                                                      invalid={!!ErrorMsg?.clientName}
                                                               />
                                                        )}
                                                 />
                                                 <Controller
                                                        name="clientAddress"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="clientAddress"
                                                                      placeHolder="client address"
                                                                      invalid={!!ErrorMsg?.clientAddress}
                                                               />
                                                        )}
                                                 />
                                                 <Controller
                                                        name="clientNum"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="clientNum"
                                                                      placeHolder="client num"
                                                                      invalid={!!ErrorMsg?.clientNum}
                                                               />
                                                        )}
                                                 />
                                          </CInputGroup>

                                          <CInputGroup className="mb-3">
                                                 <Controller
                                                        defaultValue={[]}
                                                        name="selectedArticle"
                                                        control={control}
                                                        render={({ field, value, onChange }) => (
                                                               <TextField
                                                                      {...field}
                                                                      name="selectedArticle"
                                                                      variant="outlined"
                                                                      select
                                                                      error={!!ErrorMsg?.selectedArticle}
                                                                      helperText={!!ErrorMsg?.selectedArticle?.message}
                                                                      fullWidth
                                                                      label="Articles"
                                                                      defaultValue={[]}
                                                                      SelectProps={{
                                                                             multiple: true,
                                                                      }}
                                                               >
                                                                      {AllArticles.map(({ id, articleName }) => (
                                                                             <MenuItem key={id} value={id}>
                                                                                    {articleName}
                                                                             </MenuItem>
                                                                      ))}
                                                               </TextField>
                                                        )}
                                                 />

                                                 <CInvalidFeedback>{ErrorMsg?.selectedArticle?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="changedBy"
                                                        control={control}
                                                        render={({ field, onChange, value, name, ref }) => (
                                                               <CSelect
                                                                      {...field}
                                                                      custom
                                                                      name="changedBy"
                                                                      id="changedBy"
                                                                      invalid={!!ErrorMsg?.changedBy}
                                                               >
                                                                      <option value="">Assign this Task to...</option>
                                                                      {AllUsers.filter((us) => us.id !== securitiesStore?.currentUser.id).map(
                                                                             (item) => (
                                                                                    <option value={item.id}>{item.email}</option>
                                                                             ),
                                                                      )}
                                                               </CSelect>
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.changedBy?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                   </CModalBody>
                                   <CModalFooter style={{ justifyContent: 'flex-start' }}>
                                          <CButton color="secondary" onClick={() => setModal(!modal)}>
                                                 Cancel
                                          </CButton>
                                          <CButton color="primary" type="submit" style={{ marginLeft: 'auto' }}>
                                                 Create task
                                          </CButton>
                                   </CModalFooter>
                            </form>
                     </CModal>
              </div>
       );
};

AddTask.prototype = {
       /*        register: PropTypes.func.isRequired,
        */
};
const StateProps = (state) => ({
       securitiesStore: state.securities,
});
export default connect(StateProps, {})(AddTask);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
       PaperProps: {
              style: {
                     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                     width: 250,
              },
       },
};
