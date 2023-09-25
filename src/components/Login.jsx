import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser, singUpUser } from "../api/api" // api.js dosyasını içe aktarın
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Buttons from 'react-bootstrap/Button';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://canersahin.net/">
        Caner SAHIN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [newUser, setNewUser] = useState({
    username: '',
    mail: '',
    password: '',
    favImageIdList: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addUser = async () => {
    singUpUser(newUser)
    handleSingUpModalClose()
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await loginUser(data.get('username'), data.get('password'));
    if (!result) {
      showSweetAlert()
      console.log('Kullanıcı bulunamadı veya hata oluştu');
    }
    navigate('/dashboard');
  };



  const [showSingUpModal, setShowSingUpModal] = useState(false);
  const handleSingUpModalClose = () => setShowSingUpModal(false);
  const handleSingUpModalShow = () => setShowSingUpModal(true);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Giriş Yap
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Kullanıcı Adı"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Giriş Yap
                </Button>
                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                  <Grid item onClick={handleSingUpModalShow} >
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      <Modal show={showSingUpModal} onHide={handleSingUpModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kayıt Oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>E-posta</Form.Label>
              <Form.Control
                type="email"
                name='mail'
                placeholder="E-posta"
                value={newUser.mail}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsim"
                name='username'
                value={newUser.username}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre"
                name='password'
                value={newUser.password}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Buttons variant="secondary" onClick={handleSingUpModalClose}>
            Vazgeç
          </Buttons>
          <Buttons variant="primary" onClick={addUser}>
            Kayıt Ol
          </Buttons>
        </Modal.Footer>
      </Modal>
    </>
  );
}