import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from "@tanstack/react-query";

export default function SingleProduct() {

const { id } = useParams();
const [loading, setLoading] = useState(true)

const query = useQuery({
  queryKey: ["cardProduct", id],
  queryFn:()=> fetch("https://fakestoreapi.com/products/"+ id)
  .then((response) => response.json())
  .then((json) => { setLoading(false);
    return json
  })
})

  if(loading){
    return <Skeleton style={{margin: "auto", width: "75%",height:700, marginTop:-120}} className="esqueleto"/>
  }

  return (
   
    <Card sx={{ width: "90%", marginBottom: 5, cursor: "pointer", margin: "auto" }}>
    <Grid container spacing={2}>
      
      <Grid item xs={12} md={4} >
        <CardMedia
          component="img"
          sx={{ width: "80%" }}
          image={query.data.image}
        />
      </Grid>
       <Grid item xs={12} md={8}>
        <CardContent>
          <Typography gutterBottom fontWeight="bolder" variant="h3" component="div" textAlign="right">
            {query.data.title}
          </Typography>
          <Typography variant="h6" color="text.primary" textAlign="right">
            {query.data.category}
          </Typography>
          <br />
          <Typography fontWeight="bolder" variant="body2" color="text.primary" textAlign="right">
            {query.data.description}
          </Typography>
          <br />
          <br />
          <Typography variant="h4" fontWeight="bolder" color="text.primary" textAlign="right">
            {query.data.price} USD
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
 
  )
}