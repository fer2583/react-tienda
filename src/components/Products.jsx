import { useState } from "react";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import SkeletonProducts from "../components/SkeletonProducts";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [loading, setLoading] = useState(true)
 

  const query = useQuery({
    queryKey: ["products"],
    queryFn:()=>
      fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => { 
            
            setLoading(false);
        return json })
    }
  )

      const handleClick = ()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth" 
      });
    };

    if(loading){
      return <>
            <Typography fontWeight="bolder" variant="h4" textAlign="center">Products</Typography>
            <Typography fontWeight="bolder" variant="h6" textAlign="center" marginBottom="20px">
             Look for products in our store, we have a lot of products to offer you, come and see!
            </Typography>
          <SkeletonProducts/>
      </> 
    }
      
  return (
  
  <>
    <Typography fontWeight="bolder" variant="h4" textAlign="center">
      Products
    </Typography>
    <Typography
      fontWeight="bolder"
      variant="h6"
      textAlign="center"
      marginBottom="20px"
    >
      Look for products in our store, we have a lot of products to offer you, come and see!
    </Typography>

    <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {query.data.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link to={"/" + product.id} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    margin:"auto",
                    width: "75%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      marginTop: "20px",
                    }}
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom fontWeight="bolder" variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography fontWeight="bolder" variant="body2" color="text.primary">
                      {product.category}
                    </Typography>
                    <br />
                    <Typography variant="h5" fontWeight="bolder" color="green">
                      {product.price} USD
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>

    <Fab
      onClick={handleClick}
      color="primary"
      size="small"
      style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
    >
      <NavigationIcon style={{ marginRight: 0 }} />
    </Fab>
 
  </>
  );
}
