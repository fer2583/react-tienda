import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Header() {
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
 
  return (
    
      <AppBar position="fixed" style={{ top: 0, left: 0, right: 0 }}>
        <Toolbar> 
          <Stack  direction="row" spacing={2} display="flex" justifyContent="center" width="100%">
            <Button onClick={() => navigate('/products')} variant="contained" 
              sx={{backgroundColor: pathname == '/products' ? "#cccc" : "" }} >Products</Button>
            <Button onClick={() => navigate('/carts')} variant="contained"
              sx={{backgroundColor: pathname == '/carts' ? "#cccc" : "" }} >Carts</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    
  );
}