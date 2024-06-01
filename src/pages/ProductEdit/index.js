import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert, Button, Container, Input, Label, Row, Col, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProductAdmin } from '../../actions/productActions'
import types from '../../actions/types';

const styles = {
  container: {
    marginTop: "65px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "12px",
    marginBottom: "20px",
    fontFamily: "Popins, sans-serif",
  },
  form: {
    width: "50%",
    margin: "0 auto",
  },
  input: {
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    marginBottom: "20px",
    backgroundColor: "lightgreen",
    border: "0",
    fontWeight: "bold",
    fontFamily: "Popins, sans-serif",
  },
};

const ProductEdit = ({ match, history }) => {

    const productId = match.params.id;
 
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    
    const currentProduct = useSelector(state => state.currentProduct);
    const { loading, error, product } = currentProduct;

    const currentUser = useSelector(state => state.currentUser);
    const { userInfo } = currentUser;

    const updateProduct = useSelector(state => state.updateProduct);
    const { error: updateError, success: updateSuccess } = updateProduct;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductAdmin({
            _id: productId,
            name,
            price,
            image,
            ingredients,        
            countInStock,
            category,
            description
        }))
    }
    
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('https://orm-mat-be.onrender.com/api/upload', formData, config);

            setImage(data)
            setUploading(false)
        } catch(err) {
            console.log(err);
            setUploading(false);
        }
    }
    useEffect(() => { 
        if(!userInfo){
            history.push('/login') 
        }else{
            if(updateSuccess){
                dispatch({type: types.PRODUCT_UPDATE_RESET});
                history.push('/admin/productList/page/1')
            }else{
                if(!product.name || product._id !== productId){
                    dispatch(fetchProduct(productId))
                } else {
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setIngredients(product.ingredients);                  
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                    setDescription(product.description);
                }
            }
        }
        //eslint-disable-next-line
    }, [history, userInfo, product._id, dispatch,updateSuccess])


    return (
      <div style={styles.container} className='mb-4'>
        <h2 style={styles.title}>Edit Product</h2>
        <Container>
          {updateError && <Alert severity="error">{updateError}</Alert>}
          {updateSuccess && (
            <Alert severity="success">Updated Successfully</Alert>
          )}
          <Container >
            <Row>
              <Col lg='12' className='d-flex align-items-center justify-content-center'>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <Alert severity="info">{"Updating..."}</Alert>}
            <form onSubmit={submitHandler} style={styles.form}>
              <Label>Drink Name</Label>
              <Input
                required
                margin="dense"           
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
              <Label>Ingredients</Label>
              <Input
                required
                margin="dense"               
                label="ingredients"
                type="textarea"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                style={styles.input}
              />
              <Label>Price</Label>
               <Input
                required
                type="number"
                margin="dense"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
              />
              <Label>Image</Label>
              
              <Input  type="file" onChange={uploadImageHandler} style={styles.input} />
              {uploading && <Spinner color='success' className='text-center'>Loading...</Spinner>}
              <Input
                required
                margin="dense"
                placeholder='image path'
                label="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={styles.input}
              />
              <Label id="select-genre">Category</Label>
              <Input
                label="select-genre"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="select"
                style={styles.input}
              > <option defaultValue={"coffee"}>Choose...</option>     
                <option value={"tea"}>tea</option>
                <option value={"juice"}>juice</option>
                <option value={"milk"}>milk</option>
                <option value={"coffee"}>coffee</option>
              </Input>
              <br />
              <Label>Stock</Label>
              <Input
                required
                margin="dense"
                type="number"               
                label="Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                style={styles.input}
              />
              <Label>Description</Label>
              <Input
                required
                margin="dense"        
                label="Description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
              />
              <Button style={styles.button} type="submit">
                Submit
              </Button>
            </form>
            </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
}

export default ProductEdit;
