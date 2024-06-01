import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUserList } from '../../actions/userActions';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Box, IconButton } from '@mui/material';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

const UserList = () => {
  const history = useHistory();
  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const userList = useSelector(state => state.userList);
  const { users, loading, error } = userList;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm('Reconfirm to remove')) {
      dispatch(deleteUser(id));
      dispatch(getUserList());
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Box className='user-page p-5 rounded-2'>
      <Container>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity='error'>{error}</Alert>
        ) : (
          <>
            <Typography variant="h4" align="center" gutterBottom className='text rounded-1 px-3 bg-light p-2 fw-bold'>
              Users
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className='table-warning'>
                    <TableCell align='center'>ID</TableCell>
                    <TableCell align='center'>Name</TableCell>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>Admin</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow
                      key={user._id}
                      onClick={() => {
                        history.push(`/order/${user._id}`);
                      }}
                      className='table-success'
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell align='center'>{user._id}</TableCell>
                      <TableCell align='center'>{user.name}</TableCell>
                      <TableCell align='center'>{user.email}</TableCell>
                      <TableCell align='center'>
                        {user.isAdmin ? (
                          <RiCheckLine style={{ color: 'green' }} />
                        ) : (
                          <RiCloseLine style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(user._id);
                        }}>
                          <RiDeleteBinLine />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </Box>
  );
};

export default UserList;
