import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import Button from 'react-bootstrap/Button';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        TodoList App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

/*const getUsersFromLS=()=>{
    const data = localStorage.getItem('users');
    //console.log(data);
    if(data){
      return JSON.parse(data)
    }
    else{
      return []
    }
  }*/



export const SignUp = ({ users, setUsers }) => {
    const formRef = React.useRef(null)

    const navigate = useNavigate();
    const [input, setInput] = useState({
      id : ""  ,
      firstName : "",
      lastName : "",
      email: "",
      password: "",
    } || []);

    //const [listUser, setListUser] = useState(getUsersFromLS);
    //console.log(listUser);
    const handleSubmit = (event) => {
    event.preventDefault();
    let tmpUser = {
        id : users[users.length - 1].id + 1,
        firstName : event.target.firstName.value,
        lastName : event.target.lastName.value,
        email : event.target.email.value,
        password : event.target.password.value
    }
    console.log(tmpUser);
    localStorage.setItem('users', JSON.stringify(tmpUser));
    
    setUsers( [ ...users, tmpUser ] )
    navigate('/');

    
  };
  
  const handleLogin = (e) =>{
    e.preventDefault();
    navigate("/")
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} ref={formRef} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={input.firstName}
                  onChange = {(e) => 
                    setInput({
                      ...input, 
                      [e.target.name]: e.target.value,
                    })}
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={input.lastName}
                  onChange = {(e) => 
                    setInput({
                      ...input, 
                      [e.target.name]: e.target.value,
                    })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange = {(e) => 
                    setInput({
                      ...input, 
                      [e.target.name]: e.target.value,
                    })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={input.password}
                  onChange = {(e) => 
                    setInput({
                      ...input, 
                      [e.target.name]: e.target.value,
                    })}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleLogin}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
                ); 
}

export default SignUp