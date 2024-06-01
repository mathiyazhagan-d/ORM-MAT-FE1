import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Box } from '@mui/material';
import { getOrders } from '../../actions/orderActions';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useHistory } from 'react-router-dom';

const OrderList = () => {
  const history = useHistory(); // Use the useHistory hook
  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const orderList = useSelector(state => state.orderList);
  const { orders, loading, error } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    dispatch(getOrders());
  }, [dispatch, history, userInfo]);

  return (
    <Box className='order-page p-5 rounded-2'>
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
              Orders
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className='table-warning'>
                    <TableCell align='center'>ID</TableCell>
                    <TableCell align='center'>User</TableCell>
                    <TableCell align='center'>Date</TableCell>
                    <TableCell align='center'>Total</TableCell>
                    <TableCell align='center'>Paid</TableCell>
                    <TableCell align='center'>Delivered</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(order => (
                    <TableRow
                      key={order._id}
                      onClick={() => history.push(`/order/${order._id}`)} // Use history.push
                      className='table-success'
                      style={{ cursor: 'pointer' }}  // Make the row cursor a pointer
                    >
                      <TableCell align='center'>{order._id}</TableCell>
                      <TableCell align='center'>{order.user.name}</TableCell>
                      <TableCell align='center'>{order.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align='center'>${order.totalPrice}</TableCell>
                      <TableCell align='center'>
                        {order.isPaid ? (
                          order.paidAt.slice(0, 10)
                        ) : (
                          <FaCheckCircle className='text' />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        {order.isDelivered ? (
                          order.deliveredAt.slice(0, 10)
                        ) : (
                          <FaTimesCircle />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h5" align="center" gutterBottom className='fw-bold bg-light text rounded-2 w-100 text-center p-2 py-3'>
              Pending Income: <span className='text-warning px-3 rounded-1'>${orders.reduce((acc, order) => acc + order.totalPrice, 0)}</span>
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
};

export default OrderList;
