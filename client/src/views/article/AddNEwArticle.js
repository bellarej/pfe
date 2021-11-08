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
       CTextarea,
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
import { createNewArticle, editArticle } from 'src/providers/actions/article.actions';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getCatList } from 'src/providers/actions';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const AddArticle = (props) => {
       const { createNewArticle, getCatList, categoriesList, editArticle } = props;
       const [ErrorMsg, setErrorMsg] = useState(undefined);
       const [modal, setModal] = useState(false);
       const [ImageUpload, setImageUpload] = useState();
       const schema = yup.object().shape({
              articleName: yup.string().required('this field is required!'),
              category: yup.string().required('this field is required!'),
              price: yup.string().required('this field is required!'),
              image: yup.string(),
       });
       const { control, handleSubmit, reset } = useForm({
              mode: 'onSubmit',
              defaultValues: {
                     articleName: props.article?.articleName || '',
                     category: props.article?.category || '',
                     price: props.article?.price || '',
                     description: props.article?.description || '',
                     image: '',
              },
              resolver: yupResolver(schema),
       });

       const onSubmit = (data) => {
              setErrorMsg();
              var bodyFormData = new FormData();
              bodyFormData.append('image', ImageUpload);
              bodyFormData.append('articleName', data.articleName);
              bodyFormData.append('description', data.description);
              bodyFormData.append('price', data.price);
              bodyFormData.append('category', data.category);
              props.edit ? editArticle(bodyFormData, props.article.id, setModal) : createNewArticle(bodyFormData, setModal, setErrorMsg);
       };
       const onError = (_err) => {
              setErrorMsg(_err);
       };
       useEffect(() => {
              reset();
              setImageUpload();
       }, []);
       useEffect(() => {
              getCatList();
       }, []);
       return (
              <div className="btn_modal_add_user">
                     {props.edit ? (
                            <IconButton
                                   onClick={() => {
                                          setModal(!modal);
                                   }}
                                   aria-label="settings"
                            >
                                   <ModeEditIcon />
                            </IconButton>
                     ) : (
                            <CButton color="success" onClick={() => setModal(!modal)} className="mr-1">
                                   Create new Article
                            </CButton>
                     )}
                     <CModal show={modal} onClose={() => setModal(!modal)} color="secondary">
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                   <CModalHeader closeButton>
                                          <CModalTitle>
                                                 <h1>Add new Article</h1>
                                          </CModalTitle>
                                   </CModalHeader>
                                   <CModalBody>
                                          <p className="text-muted">Add new Article</p>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="articleName"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="text"
                                                                      {...field}
                                                                      name="articleName"
                                                                      placeHolder="Article name "
                                                                      invalid={!!ErrorMsg?.articleName}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.articleName?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="price"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CInput
                                                                      type="number"
                                                                      {...field}
                                                                      name="price"
                                                                      placeHolder="Price en TND"
                                                                      invalid={!!ErrorMsg?.price}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.price?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <CInputGroup className="mb-3">
                                                 <CInputGroupPrepend>
                                                        <CInputGroupText>
                                                               <CIcon name="cil-user" />
                                                        </CInputGroupText>
                                                 </CInputGroupPrepend>

                                                 <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <CTextarea
                                                                      type="text"
                                                                      {...field}
                                                                      row={15}
                                                                      name="description"
                                                                      placeHolder="description..."
                                                                      invalid={!!ErrorMsg?.description}
                                                               />
                                                        )}
                                                 />
                                                 <CInvalidFeedback>{ErrorMsg?.description?.message}</CInvalidFeedback>
                                          </CInputGroup>
                                          <Controller
                                                 name="category"
                                                 control={control}
                                                 render={({ field, value, onChange }) => (
                                                        <TextField
                                                               {...field}
                                                               name="category"
                                                               variant="outlined"
                                                               select
                                                               error={!!ErrorMsg?.category}
                                                               helperText={!!ErrorMsg?.category?.message}
                                                               fullWidth
                                                               label="Article category"
                                                        >
                                                               {categoriesList?.length > 0 &&
                                                                      categoriesList?.map((item) => (
                                                                             <MenuItem key={0} value={item.categoriesName}>
                                                                                    {item.categoriesName}
                                                                             </MenuItem>
                                                                      ))}
                                                        </TextField>
                                                 )}
                                          />
                                          Image:
                                          <Controller
                                                 name="image"
                                                 control={control}
                                                 render={({ field }) => (
                                                        <CInput
                                                               type="file"
                                                               {...field}
                                                               name="image"
                                                               placeHolder="image"
                                                               onChange={(e) => setImageUpload(e.target.files[0])}
                                                               invalid={!!ErrorMsg?.image}
                                                        />
                                                 )}
                                          />
                                          <CInvalidFeedback>{ErrorMsg?.image?.message}</CInvalidFeedback>
                                   </CModalBody>
                                   <CModalFooter style={{ justifyContent: 'flex-start' }}>
                                          <CButton color="secondary" onClick={() => setModal(!modal)}>
                                                 Cancel
                                          </CButton>
                                          <CButton color="primary" type="submit" style={{ marginLeft: 'auto' }}>
                                                 {props.edit ? 'Edit article' : 'Create Article'}
                                          </CButton>
                                   </CModalFooter>
                            </form>
                     </CModal>
              </div>
       );
};

AddArticle.prototype = {
       getCatList: PropTypes.func.isRequired,
       createNewArticle: PropTypes.func.isRequired,
       editArticle: PropTypes.func.isRequired,
};
const StateProps = (state) => ({
       categoriesList: state.articles.catList,
       securitiesStore: state.securities,
});
export default connect(StateProps, {
       createNewArticle,
       editArticle,
       getCatList,
})(AddArticle);
