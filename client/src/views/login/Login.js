import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
       CButton,
       CCard,
       CCardBody,
       CCardGroup,
       CCol,
       CContainer,
       CInput,
       CInvalidFeedback,
       CInputGroup,
       CInputGroupPrepend,
       CInputGroupText,
       CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { authChecker } from 'src/utils/authCheck';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, clearAuthProcess } from 'src/providers/actions/auth';

const Login = (props) => {
       const { login, history, securitiesStore, clearAuthProcess } = props;
       const [ErrorMsg, setErrorMsg] = useState(undefined);

       const schema = yup.object().shape({
              email: yup.string().email('invalid email address').required('this field is required!'),
              password: yup.string().required('this field is required!'),
       });
       const { control, handleSubmit, setError, reset } = useForm({
              mode: 'onSubmit',
              defaultValues: {
                     email: '',
                     password: '',
              },
              resolver: yupResolver(schema),
       });

       const onSubmit = (data) => {
              clearAuthProcess();
              login(data);
       };
       const onError = (_err) => {
              clearAuthProcess();
              setErrorMsg(_err);
       };

       useEffect(() => {
              if (securitiesStore?.process.type === 'LOGIN_SUCCESS' || 'LOGIN_FAILURE ') {
                     if (securitiesStore?.process?.success?.status) {
                            history.push('/');
                     } else if (securitiesStore?.process?.fail?.status) {
                            setErrorMsg({
                                   email: { message: securitiesStore?.process.fail?.data?.email },
                            });
                     }
              }
       }, [securitiesStore]);
       useEffect(() => {
              clearAuthProcess();
              reset();
       }, []);
       if (authChecker()) return <Redirect to="/" />;
       return (
              <div className="c-app c-default-layout flex-row align-items-center login-page">
                     <CContainer>
                            <CRow className="justify-content-center">
                                   <CCol md="6">
                                          <CCardGroup>
                                                 <CCard className="p-4">
                                                        <CCardBody>
                                                               <form onSubmit={handleSubmit(onSubmit, onError)}>
                                                                      <h1>Login</h1>
                                                                      <p className="text-muted">Sign In to your account</p>
                                                                      <CInputGroup className="mb-3">
                                                                             <CInputGroupPrepend>
                                                                                    <CInputGroupText>
                                                                                           <CIcon name="cil-user" />
                                                                                    </CInputGroupText>
                                                                             </CInputGroupPrepend>
                                                                             <Controller
                                                                                    name="email"
                                                                                    control={control}
                                                                                    render={({ field }) => (
                                                                                           <CInput
                                                                                                  placeHolder="Email"
                                                                                                  type="text"
                                                                                                  {...field}
                                                                                                  name="email"
                                                                                                  invalid={!!ErrorMsg?.email}
                                                                                           />
                                                                                    )}
                                                                             />
                                                                             <CInvalidFeedback>{ErrorMsg?.email?.message}</CInvalidFeedback>
                                                                      </CInputGroup>
                                                                      <CInputGroup className="mb-4">
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
                                                                                                  placeHolder="Password"
                                                                                                  type="password"
                                                                                                  {...field}
                                                                                                  name="password"
                                                                                                  invalid={!!ErrorMsg?.password}
                                                                                           />
                                                                                    )}
                                                                             />
                                                                             <CInvalidFeedback>{ErrorMsg?.password?.message}</CInvalidFeedback>
                                                                      </CInputGroup>
                                                                      <CRow>
                                                                             <CCol xs="6">
                                                                                    <CButton color="primary" type="submit" className="px-4">
                                                                                           Login
                                                                                    </CButton>
                                                                             </CCol>
                                                                      </CRow>
                                                               </form>
                                                        </CCardBody>
                                                 </CCard>
                                          </CCardGroup>
                                   </CCol>
                            </CRow>
                     </CContainer>
              </div>
       );
};

Login.prototype = {
       login: PropTypes.func.isRequired,
       clearAuthProcess: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       auth: state.auth,
       securitiesStore: state.securities,
});
export default connect(StateProps, { login, clearAuthProcess })(Login);
