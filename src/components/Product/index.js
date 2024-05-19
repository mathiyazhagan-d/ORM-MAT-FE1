import React from "react";
import { Container, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { GiCoffeeCup } from "react-icons/gi";
import Stars from "../Stars/index";

function Product({ product }) {
  return (
    <Container className="d-flex align-items-center justify-content-center flex-wrap">
      <Link to={`/product/${product._id}`} className=" my-5" style={{ textDecoration: 'none' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="150"
            image={`https://orm-mat-be.onrender.com${product.image}`}
            alt={product.name}
          />
          <CardContent className="bg rounded-bottom p-0">
            <Typography gutterBottom variant="h6" component="div" className="text mt-3 text-center text rounded-2 m-2">
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stars rating={product.rating} />
            </Box>
            <Button className="category rounded-right rounded-0 title border-0 text-center fw-bolder">
              {product.category === "coffee" && (
                <GiCoffeeCup className="rating-icon fs-5 text-center" />
              )}
              {product.category === "tea" && (
                <i className="fa-solid fa-mug-hot fs-6 mx-1 text-center"></i>
              )}
              {product.category === "juice" && (
                <i className="fa-solid fa-martini-glass-citrus fs-6 mx-1 text-center"></i>
              )}
              {product.category === "milk" && (
                <i className="fa-solid fa-mug-saucer fs-6 mx-1 text-center"></i>
              )}
              {product.category}
            </Button>
            <Typography variant="h6" className="text-center buy-now mb-4">
              <span className="text p-2 px-5 rounded-5 order-page">
                Buy Now
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Container>
  );
}

export default Product;
