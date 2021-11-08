import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CButton, CDataTable, CRow } from '@coreui/react';

import { getUsersList, deleteUserById } from 'src/providers/actions/users.actions';
import AddUser from './AddUser';
const fields = ['name', 'registered', 'role', 'status', 'action'];
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
const UsersList = (props) => {
       const { getUsersList, usersStore, deleteUserById } = props;
       const [usersList, setUsersList] = useState([]);
       useEffect(() => {
              getUsersList();
       }, []);
       useEffect(() => {
              if (usersStore?.userList?.length > 0) {
                     let data;

                     Promise.all(
                            (data = usersStore.userList.map((item, index) => ({
                                   id: item.id,
                                   name: item.fullName,
                                   registered: item.createdAt,
                                   role: item.role,
                                   status: item.status,
                                   action: item.id,
                            }))),
                     ).then(() => setUsersList(data));
              }
       }, [usersStore]);

       return (
              <>
                     <CRow>
                            <AddUser />
                     </CRow>
                     <CRow>
                            <CCol>
                                   <CCard>
                                          <CCardHeader>User List Table</CCardHeader>
                                          <CCardBody>
                                                 {usersList.length > 0 ? (
                                                        <CDataTable
                                                               items={usersList}
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
                                                                                    <CBadge color={getBadge(item.status)}>{'ezaeza'}</CBadge>
                                                                             </td>
                                                                      ),
                                                                      action: (item) => (
                                                                             <td id="td-action-user">
                                                                                    <CButton
                                                                                           id="btn-action"
                                                                                           color="danger"
                                                                                           onClick={() => deleteUserById(item.id)}
                                                                                    >
                                                                                           remove
                                                                                    </CButton>

                                                                                    <AddUser selectedUser={item} edit={true} />
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
                     </CRow>
              </>
       );
};

UsersList.propTypes = {
       getUsersList: PropTypes.func.isRequired,
       deleteUserById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
       usersStore: state.users,
});

const mapDispatchToProps = { getUsersList, deleteUserById };

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
