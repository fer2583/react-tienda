import { useState } from "react";
import { Typography, Select, MenuItem, Box, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Cart() {

  const [selectedUserId, setSelectedUserId] = useState("");

  const query = useQuery({
    queryKey:["users"],
    queryFn:()=> fetch("https://fakestoreapi.com/users")
    .then((response) => response.json())
    .then((json) => { 
    return json})
  });

  const queryU = useQuery({
    queryKey: ["selectedUser", selectedUserId],
    queryFn: async () => {
      if (selectedUserId !== "") {
        const response = await fetch("https://fakestoreapi.com/carts/user/" + selectedUserId);
        const json = await response.json();
        return json;
        
      } else {
        
        return [];
      }
    },
  });
  
  const handleUserSelect = (event) =>{
    setSelectedUserId(event.target.value);
  }

  const getTotalProducts = (cart) => {
    return cart.products.reduce((total, product) => total + product.quantity, 0);
  }

  return (
    <>
      
    <Box style={{width: "60%", backgroundColor: "lightgrey", display:"flex", flexDirection:"column", marginTop:"20px", alignItems: "center", margin:"auto"}}>
   
    <Typography fontWeight="bolder" variant="h4" textAlign="center" marginTop="20px">Carts</Typography>
   
    <Select sx={{marginTop: 2, width: 250, height: 45, textAlign: "center"}}
        labelId="demo-select-label"
        id="demo-select"
        value={selectedUserId}
        onChange={handleUserSelect}
        displayEmpty
      >
    <MenuItem value="" disabled>
            Seleccione un usuario
          </MenuItem>
       {query.data?.map((user) => (
          <MenuItem key={user.id} value={user.id} >
            {user.name.firstname + " " + user.name.lastname}
          </MenuItem>
        ))}
       
      </Select>

      <br />
      {queryU.isSuccess && queryU.data.length === 0 && (
          <Typography>No hay carritos disponibles para este usuario.</Typography>
        )}
    {queryU.data?.map((cart) => (
     
  <div key={cart.id} style={{ width: '100%', backgroundColor: 'silver', display: 'flex', flexDirection: 'column' }}>
    <div style={{ margin:"auto", width:"90%", display:"flex", justifyContent: "space-between" }}>
    <Typography fontWeight= "500" variant="h5" > {format(new Date(cart.date), 'dd/MM/yyyy')}</Typography>

    
    <Typography fontWeight="500" variant="h5">Total {getTotalProducts(cart)}</Typography>
    </div>
    <TableContainer component={Paper} style={{ backgroundColor: "silver",  }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell fontWeight="bolder" align="center">ID</TableCell>
            <TableCell fontWeight="bolder" align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((product) => (
            <TableRow key={product.productId}>
              
              <TableCell align="center"><Link to={"/" + product.productId} style={{ textDecoration: "none", color: "black" }}>
            {product.productId}
              </Link>
            </TableCell>
              <TableCell align="center">{product.quantity} </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider style={{width:"50%", margin:"auto", borderRadius: 8, marginTop:20, marginBottom:20, height:5, backgroundColor:"grey"}}/>
  </div>
  
          ))}
      </Box>
        
    </>
)}


