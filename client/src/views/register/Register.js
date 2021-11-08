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

const Register = (props) => {
       const { history, register, securitiesStore, clearAuthProcess } = props;
       const [ErrorMsg, setErrorMsg] = useState(undefined);

       const schema = yup.object().shape({
              fullName: yup.string().required('this field is required!'),
              email: yup.string().email('invalid email address').required('this field is required!'),
              password: yup.string().required('this field is required!'),
              passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'confirm password does not much'),
       });
       const { control, handleSubmit } = useForm({
              mode: 'onSubmit',
              defaultValues: {
                     fullName: '',
                     email: '',
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
              register(data);
       };
       const onError = (_err) => {
              setErrorMsg(_err);
       };

       useEffect(() => {
              if (securitiesStore?.process?.type === 'REGISTER_FAILURE' || 'REGISTER_FAILURE ') {
                     if (securitiesStore?.process?.success?.status) {
                            history.push('/login');
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
       if (authChecker()) return <Redirect to="/" />;
       return (
              <div className="c-app c-default-layout flex-row align-items-center">
                     <CContainer>
                            <CRow className="justify-content-center">
                                   <CCol md="9" lg="7" xl="6">
                                          <CCard className="mx-4">
                                                 <CCardBody className="p-4">
                                                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                                                               <h1>Register</h1>
                                                               <p className="text-muted">Create your account</p>
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
                                                               <CButton color="success" type="submit" block>
                                                                      Create Account
                                                               </CButton>
                                                               <CButton color="danger" onClick={(e) => history.push('/login')} block>
                                                                      Return
                                                               </CButton>
                                                        </form>
                                                 </CCardBody>
                                                 <CCardFooter className="p-4"></CCardFooter>
                                          </CCard>
                                   </CCol>
                            </CRow>
                     </CContainer>
              </div>
       );
};

Register.prototype = {
       register: PropTypes.func.isRequired,
       clearAuthProcess: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       securitiesStore: state.securities,
});
export default connect(StateProps, {
       clearAuthProcess,
       register,
})(Register);
