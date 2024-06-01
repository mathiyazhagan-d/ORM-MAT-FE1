import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { Alert, Spinner, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  fetchProductsList,
  deleteProductAdmin,
  createProductAdmin,
} from "../../actions/productActions";
import types from "../../actions/types";

const ProductList = ({ history, match }) => {
  const pageNumber = Number(match.params.page) || 1;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, totalPages, page } = productList;

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteProduct;

  const createProduct = useSelector((state) => state.createProduct);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = createProduct;

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    image: '',
    ingredients: '',
    category: '',
    description: '',
    countInStock: 0,
  });

  const toggleModal = () => setModal(!modal);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAdmin(id));
    }
  };

  const createProductHandler = () => {
    toggleModal();
  };

  const handlePagination = (selectedPageNumber) => {
    history.push(`/admin/productlist/page/${selectedPageNumber}`);
    dispatch(fetchProductsList(selectedPageNumber));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductAdmin(productData));
    toggleModal(); // Close the modal after submitting
  };

  useEffect(() => {
    dispatch({
      type: types.PRODUCT_CREATE_RESET,
    });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(fetchProductsList(pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={i === page}>
          <PaginationLink
            onClick={() => handlePagination(i)}
            className={
              i === page
                ? "border-0 text-warning rounded-5 mx-2"
                : "bg-danger border-0 text-warning rounded-5 mx-2"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div>
      <Container>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center mt-5 p-5">
            <Spinner color="success">Loading...</Spinner>
          </div>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center gap-5 my-4 title py-4 rounded-2">
              <h2 className="fw-bold text">Products</h2>

              {loadingCreate ? (
                <div className="d-flex align-items-center justify-content-center mt-5 p-5">
                  <Spinner color="success">Loading...</Spinner>
                </div>
              ) : (
                <Button
                  className="order-page border-0 text"
                  onClick={createProductHandler}
                >
                  + Add Product
                </Button>
              )}
            </div>
            {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
            {errorCreate && <Alert severity="error">{errorCreate}</Alert>}
            <>
              <Table responsive hover>
                <thead>
                  <tr className="table-warning">
                    <th className="text-center" component="th" scope="row">
                      <strong>ID</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>NAME</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>PRICE</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>CATEGORY</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>STOCK</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="table-success">
                      <th className="fw-normal text-center">{product._id}</th>
                      <th className="fw-normal text-center">{product.name}</th>
                      <th className="fw-normal text-center">${product.price}</th>
                      <th className="fw-normal text-center">{product.category}</th>
                      <th className="fw-normal text-center">{product.countInStock}</th>
                      <th className="fw-normal pt-0">
                        <Button
                          onClick={() => {
                            history.push(`/admin/product/${product._id}/edit`);
                          }}
                          className="bg-transparent border-0 fs-5 text"
                        >
                          <FaEdit />
                        </Button>
                        {loadingDelete ? (
                          <></>
                        ) : (
                          <Button
                            onClick={() => deleteHandler(product._id)}
                            className="bg-transparent border-0 mx-2 fs-6 text-danger"
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>

            <Container className="d-flex align-items-center justify-content-center">
              <Pagination>
                <PaginationItem disabled={page === 1}>
                  <PaginationLink
                    previous
                    onClick={() => handlePagination(page - 1)}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem disabled={page === totalPages}>
                  <PaginationLink
                    next
                    onClick={() => handlePagination(page + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </Container>
          </>
        )}
      </Container>    
      <Modal isOpen={modal} toggle={toggleModal} style={{marginTop:"65px",marginBottom:"65px"}}>
        <ModalHeader toggle={toggleModal}>Add New Product</ModalHeader>
        <ModalBody>
          <form onSubmit={submitHandler}>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
            <Label for="image">Image URL</Label>
            <Input
              type="text"
              name="image"
              id="image"
              value={productData.image}
              onChange={handleInputChange}
              required
            />
            <Label for="ingredients">Ingredients</Label>
            <Input
              type="text"
              name="ingredients"
              id="ingredients"
              value={productData.ingredients}
              onChange={handleInputChange}
              required
            />
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={productData.category}
              onChange={handleInputChange}
              required
            />
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={productData.description}
              onChange={handleInputChange}
              required
            />
            <Label for="countInStock">Count In Stock</Label>
            <Input
              type="number"
              name="countInStock"
              id="countInStock"
              value={productData.countInStock}
              onChange={handleInputChange}
              required
            />
            <ModalFooter>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductList;
