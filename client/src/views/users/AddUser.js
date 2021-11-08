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
       CModal,
       CModalBody,
       CModalFooter,
       CModalHeader,
       CModalTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router-dom';
import { authChecker } from 'src/utils/authCheck';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register, clearAuthProcess } from 'src/providers/actions/auth';
import { updateUserById } from 'src/providers/actions';

const AddUser = (props) => {
       const { register, securitiesStore, clearAuthProcess, selectedUser, edit, updateUserById } = props;
       const [ErrorMsg, setErrorMsg] = useState(undefined);
       const [modal, setModal] = useState(false);

       const schema = yup.object().shape({
              fullName: yup.string().required('this field is required!'),
              email: yup.string().email('invalid email address').required('this field is required!'),
              password: yup.string().required('this field is required!'),
              passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'confirm password does not much'),
       });
       const { control, handleSubmit } = useForm({
              mode: 'onSubmit',
              defaultValues: {
                     fullName: selectedUser?.name || '',
                     email: selectedUser?.email || '',
                     password: '',
                     passwordConfirm: '',
              },
              resolver: yupResolver(schema),
       });

       const onSubmit = (data) => {
              data.role = 'technician';
              delete data.passwordConfirm;
              clearAuthProcess();
              setErrorMsg();
              edit ? updateUserById(selectedUser.id, { ...selectedUser, ...data }, setModal, setErrorMsg) : register(data);
       };
       const onError = (_err) => {
              setErrorMsg(_err);
       };

       useEffect(() => {
              if (securitiesStore?.process?.type === 'REGISTER_FAILURE' || 'REGISTER_FAILURE ') {
                     if (securitiesStore?.process?.success?.status) {
                            setModal(false);
                            clearAuthProcess();
                     } else if (securitiesStore?.process?.fail?.status) {
                            setErrorMsg({
                                   email: { message: securitiesStore?.process.fail?.data?.email },
                            });
                     }
              }
       }, [securitiesStore]);
       useEffect(() => {
              clearAuthProcess();
       }, []);
       return (
              <div className="btn_modal_add_user">
                     <CButton color="success" onClick={() => setModal(!modal)} className="mr-1">
                            {selectedUser ? 'Edit' : 'Add new user'}
                     </CButton>
                     <CModal show={modal} onClose={() => setModal(!modal)} color="secondary">
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                   <CModalHeader closeButton>
                                          <CModalTitle>
                                                 <h1>{selectedUser ? 'Edit current user ' : 'Add new user'}</h1>
                                          </CModalTitle>
                                   </CModalHeader>
                                   <CModalBody>
                                          <p className="text-muted">{selectedUser ? 'Edit user ' : 'Create your account'}</p>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="fullName"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="fullName"
                                                                      placeHolder="Full name"
                                                                      invalid={!!ErrorMsg?.fullName}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.fullName?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>@</CInputGroupText>
                                                 </CInputGroupPrepend>
                                                 <Controller
                                                        name="email"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="email"
                                                                      placeHolder="email"
                                                                      invalid={!!ErrorMsg?.email}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.email?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-lock-locked" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>
                                                 <Controller
                                                        name="password"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="password"
                                                                      {...field}
                                                                      name="password"
                                                                      placeHolder="password"
                                                                      invalid={!!ErrorMsg?.password}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.password?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-4">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-lock-locked" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>
                                                 <Controller
                                                        name="passwordConfirm"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="password"
                                                                      {...field}
                                                                      name="passwordConfirm"
                                                                      placeHolder="Confirm your password"
                                                                      invalid={!!ErrorMsg?.passwordConfirm}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.passwordConfirm?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                   </CModalBody>
                                   <CModalFooter style={{ justifyContent: 'flex-start' }}>
                                          <CButton id="btn-action" color="secondary" onClick={() => setModal(!modal)}>
                                                 Cancel
                                          </CButton>
                                          <CButton id="btn-action" color="primary" type="submit" style={{ marginLeft: 'auto' }}>
                                                 Create User
                                          </CButton>
                                   </CModalFooter>
                            </form>
                     </CModal>
              </div>
       );
};

AddUser.prototype = {
       register: PropTypes.func.isRequired,
       updateUserById: PropTypes.func.isRequired,
       clearAuthProcess: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       securitiesStore: state.securities,
});
export default connect(StateProps, {
       clearAuthProcess,
       register,
       updateUserById,
})(AddUser);
