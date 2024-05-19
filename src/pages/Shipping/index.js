import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';

const ShippingPage = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <div className='shipping-page mb-5'>
            <StepperNav stepNumber={1} />
            <Container maxWidth='sm'>
                <form onSubmit={submitHandler}>
                    <Typography variant='h5' align='center' gutterBottom>
                        SHIPPING
                    </Typography>
                    <TextField
                        id='address'
                        label='Address'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <TextField
                        id='city'
                        label='City'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <TextField
                        id='postalCode'
                        label='Postal Code'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    <TextField
                        id='country'
                        label='Country'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                   <Button
    variant='contained'
    style={{
        backgroundColor: '#4CAF50', // Green color
        color: 'white', // Text color
        borderRadius: 25, // Rounded corners
        padding: '10px 20px', // Padding
        marginTop: 20, // Top margin
        boxShadow: 'none', // No shadow
        textTransform: 'none', // No text transformation
        fontWeight: 'bold', // Bold text
    }}
    fullWidth
    type='submit'
>
    Continue
</Button>

                </form>
            </Container>
        </div>
    );
};

export default ShippingPage;
