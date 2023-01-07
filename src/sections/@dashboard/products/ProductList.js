import PropTypes from 'prop-types';
// @mui
import {useEffect, useState} from "react";
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  const[villes,setVilles]=useState([])
  useEffect(()=>{
    fetch("http://localhost:8085/ville")
        .then(res=>res.json())
        .then((result)=>{
          setVilles(result);
        })
  },[])
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
