import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import BannerImg from '../../assets/banner-mt.jpg';
import { Link } from 'react-router-dom';
import { gsap, Power3 } from 'gsap';

const Banner = () => {
  let genreRef = useRef([]);

  useEffect(() => {
    gsap.from(genreRef.current, {
      opacity: 0,
      scale: 0,
      stagger: 0.1,
      ease: Power3.easeOut,
      delay: 1,
    });
  }, []);

  return (
    <Grid container spacing={2} className="m-0">
      <Grid item xs={12} lg={6} className="title">
        <img src={BannerImg} ref={(el) => (genreRef.current[3] = el)} alt="Loading" className="bannerImg" />
      </Grid>
      <Grid item xs={12} lg={6} className="d-flex title justify-content-center flex-column flex-wrap p-0 pb-4">
        
        <div ref={(el) => (genreRef.current[1] = el)} className="order-page p-5 banner-text mb-2 mt-1">
          <Typography variant="h3" className="fw-bold text">
            Welcome to ORM<span className="text rounded-2 py-0">MAT</span> Store
          </Typography>
          <Typography variant="h5">Quench Your Thirst, Elevate Your Taste.</Typography>
          <Button component={Link} to="/drinks" className=" text px-5 mt-2" variant="contained">
            Explore <i className="fas fa-arrow-right-long"></i>
          </Button>
        </div>
        <div ref={(el) => (genreRef.current[4] = el)} className="banner-text-container">
          <Typography variant="h6" className="mt-3 banner-text-3">
            <span className=" w-50 p-3 text rounded-5 relative">
              <i className="fas fa-mug-hot text order-page rounded-5 fs-5 px-4 py-2"></i>
              &nbsp; Heat or Cool, We Never Lose
              <span className="vapor-effect"></span>
            </span>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Banner;
