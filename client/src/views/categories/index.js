import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getCatList, createNewCat, deleteCat } from 'src/providers/actions';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CButton, CDataTable, CRow } from '@coreui/react';

const fields = ['category name', 'created At', 'Actions'];

export const CategoriesPage = ({ createNewCat, getCatList, categoriesList, deleteCat }) => {
       const [NewCategory, setNewCategory] = useState();
       const [Errors, setErrors] = useState();
       const [CatList, setCatList] = useState();
       onsubmit = () => {
              createNewCat(NewCategory, setErrors);
       };

       useEffect(() => {
              getCatList();
       }, []);
       useEffect(() => {
              if (categoriesList?.length > 0) {
                     let data;

                     Promise.all(
                            (data = categoriesList.map((item, index) => ({
                                   id: item.id,
                                   'category name': item.categoriesName,
                                   'created At': item.createdAt,
                                   Actions: item.createdAt,
                            }))),
                     ).then(() => setCatList(data));
              }
       }, [categoriesList]);
       return (
              <div className="cat-main-page">
                     <div className="add-cate-div">
                            <Box
                                   component="form"
                                   sx={{
                                          '& > :not(style)': { m: 1, width: '25ch' },
                                   }}
                                   noValidate
                                   autoComplete="off"
                            >
                                   <TextField
                                          onChange={(e) => setNewCategory(e.target.value)}
                                          id="outlined-basic"
                                          label="Add new category"
                                          error={!!Errors?.categoriesName}
                                          helperText={!!Errors?.categoriesName?.message}
                                          variant="outlined"
                                   />

                                   <CButton className="btn-submit" disabled={!NewCategory} onClick={() => onsubmit()}>
                                          Submit
                                   </CButton>
                            </Box>
                     </div>
                     <div className="cat-list">
                            <CRow>
                                   <CCol>
                                          <CCard>
                                                 <CCardHeader>User List Table</CCardHeader>
                                                 <CCardBody>
                                                        {CatList?.length > 0 ? (
                                                               <CDataTable
                                                                      items={CatList}
                                                                      fields={fields}
                                                                      hover
                                                                      striped
                                                                      bordered
                                                                      size="sm"
                                                                      itemsPerPage={10}
                                                                      pagination
                                                                      scopedSlots={{
                                                                             Actions: (item) => (
                                                                                    <td>
                                                                                           <CButton
                                                                                                  id="btn-action"
                                                                                                  color="danger"
                                                                                                  onClick={() => deleteCat(item.id)}
                                                                                           >
                                                                                                  remove
                                                                                           </CButton>
                                                                                    </td>
                                                                             ),
                                                                      }}
                                                               />
                                                        ) : (
                                                               'There no users founds!!'
                                                        )}
                                                 </CCardBody>
                                          </CCard>
                                   </CCol>
                            </CRow>{' '}
                     </div>
              </div>
       );
};

CategoriesPage.propTypes = {
       getCatList: PropTypes.func.isRequired,
       createNewCat: PropTypes.func.isRequired,
       deleteCat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
       categoriesList: state.articles.catList,
});

const mapDispatchToProps = { getCatList, createNewCat, deleteCat };

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
