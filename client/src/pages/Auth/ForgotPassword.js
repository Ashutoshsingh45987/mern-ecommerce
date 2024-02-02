
import Layout from "../../components/Layout/Layout";
import {useState} from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();

export default function ForgotPassword(){

    const [email,setEmail]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [answer,setAnswer]= useState("");
    const navigate= useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
            email,
            answer,
            newPassword,
          });
      
          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/login');
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error('Something went wrong');
        }
      };
  return(
    <Layout title={"Forgot-Password"}>
        <ThemeProvider theme={defaultTheme}>
        <Container  component="main" maxWidth="xs">
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
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="answer"
                    label="Enter your favourite sport name"
                    name="answer"
                    autoComplete="answer"
                    value={answer}
                    onChange={(e)=>setAnswer(e.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="newPassword"
                    type="newPassword"
                    id="newPassword"
                    autoComplete="new-Password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}

                  />
                </Grid>
                
              </Grid>
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Reset
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/register"  variant="body2">
                    Dont have an account? Register
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5}} />
        </Container>
      </ThemeProvider>
    </Layout>
  ); 
};


