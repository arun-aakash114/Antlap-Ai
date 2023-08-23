import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgLogin from './../assets/login_bg.jpg';
import LogoLrg from './../assets/logo-lrg.png';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { backEndDomain } from '../service/apiserver'

function Copyright(props) {
  return (
    // <Typography variant="body2" color="text.secondary" align="center" {...props}>
    //   {'Copyright © '}
    //   <Link color="inherit" to="https://mui.com/">
    //     GainCare
    //   </Link>{' '}
    //   {new Date().getFullYear()}
    //   {'.'}
    // </Typography>
    <div className='center-align'>

      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {' © '}
        2023 Ant Labs.

      </Typography></div>
  );
}

const theme = createTheme();

function Forgotpassword() {           //main(parent) function for this page
  const [values, setValues] = React.useState({
    password: '',
    reenterpassword: '',
    showPassword: false,
    showPassword2: false
  });
  const [otpon, setOtpon] = React.useState(true);
  const [verifyon, setVerifyon] = React.useState(false);
  const [passon, setPasson] = React.useState(false);
  const [openalert, setopenalert] = React.useState(false);
  const [openalert1, setopenalert1] = React.useState(false);
  const [openalert2, setopenalert2] = React.useState(false);
  const [openalert3, setopenalert3] = React.useState(false);
  const [openalert4, setopenalert4] = React.useState(false);
  const [openalert5, setopenalert5] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const [createpwdalert, setcreatepwdalert] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {                    //to get password values to pass on api
    setValues({ ...values, [prop]: event.target.value });

  };

  const handleClickShowPassword = () => {               //eye toggle to show password1
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowPassword1 = () => {               //eye toggle to show password2
    setValues({
      ...values,
      showPassword1: !values.showPassword1,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    setopenalert(false)
    setopenalert1(false)
    setopenalert2(false)

    event.preventDefault();
    if (values.password && values.reenterpassword) {
      setcreatepwdalert(false)
      let cpData = {
        "username": localStorage.getItem('email'),
        "password": values.password,
        "confirmpassword": values.reenterpassword
      }

      try {
        axios({
          method: 'post',
          url: `${backEndDomain}/webapi/user/forgotpassword/createpassword`,
          data: cpData,
          headers: {
            'Content-type': 'application/json',
          }
        })
          .then(function (response) {

            if (response.data.message === 'Password Updated SuccessFully') {
              setopenalert2(true)
              setTimeout(() => {
                navigate('/')
              }, 1000);
            }
          }).catch(function (response) {
            //sethelperText(response.response.status)
            if (response.response.data.message === "Please Provide Strong Password") {
              setopenalert(true)
            } else if (response.response.data.message === "CONFIRM PASSWORD DIFFERENT") {
              setopenalert1(true)

            }
          });
      } catch (err) {

      }


    } else {
      setcreatepwdalert(true)
    }
  };
  const [otp, setotp] = React.useState('');


  const handleSubmitfp = (event) => {
    setopenalert3(false)
    setopenalert4(false)

    event.preventDefault();
    const data = new FormData(event.currentTarget);
// NOSONAR Start
    // setOtpon(false); 
    // setVerifyon(true);
    // NOSONAR End
    if (data.get('email')) {
      setalert(false)
      let fpData = {
        "username": data.get('email'),

      }

      try {
        axios({
          method: 'post',
          url: `${backEndDomain}/webapi/user/forgotpassword/sendOTP`,
          data: fpData,
          headers: {
            'Content-type': 'application/json',
          }
        })
          .then(function (response) {

            if (response.data.message === 'PASSWORD VERIFICATION CODE SENT TO YOUR MAIL OR MOBILE SUCCESSFULLY') {
              setotp(response.data.data.OTP)
              setopenalert4(true)
              setTimeout(() => {
                setOtpon(false);
                setVerifyon(true);
              }, 2000);

            }
          }).catch(function (response) {
            if (response.response.data.message === "Invalid Email or Mobile!") {
              setopenalert3(true)

            }
          });
      } catch (err) {

      }


    } else {
      setalert(true)
    }
  }

  const RequestOtp = () => {                     //1st Templates' design to request OTP
    return (
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>

        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 3,

          }}>
            <img src={LogoLrg} alt=''></img>
          </Box>
          <Typography component="h1" className="font-title">
            Forgot Password?
          </Typography>
          <Typography component="h1" sx={{ mt: 2 }} className="font-med">
            An OTP will be sent to your registered                  </Typography>
          <Typography component="h1" variant="body2" className="font-med">
            Email / Mobile.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitfp} sx={{ mt: 1, width: '70%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Email / Mobile"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box textAlign='center'>
              {alert ? (<Typography sx={{ color: "#fc4d53" }} >Email / Mobile is required</Typography>) : ""}

              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              // onClick={() => { setOtpon(false); setVerifyon(true); }}
              >
                Request OTP
              </Button>

            </Box>
            <Box textAlign='center'>
              <Button
                variant="text"
                component={Link} to="/"
              >
                Back
              </Button>
            </Box>
            <Copyright className='copyright' />
          </Box>
        </Box>
      </Grid>
    );
  }

  const Verification = () => {
    if (otp) {
      let otpData = {
        "username": localStorage.getItem('email'),
        "OTP": otp,
      }

      try {
        axios({
          method: 'post',
          url: `${backEndDomain}/webapi/user/forgotpassword/VerifyOtp`,
          data: otpData,
          headers: {
            'Content-type': 'application/json',
          }
        })
          .then(function (response) {
            // alert("are you sure change password?")

            if (response.data.message === "PASSWORD VERIFICATION CODE IS SUCCESSFULLY VERIFIED") {
              setopenalert4(false)

              setTimeout(() => {
                setPasson(true)
                setVerifyon(false)
              }, 3000);

            }
          }).catch(function (response) {
            if (response.response.status === 422) {
              setopenalert5(true)
            }
          });
      } catch (err) {

      }


    }  


    //2nd Template design for OTP Verification
    return (
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div sx={{
            my: 8,

          }}>
            <img src={LogoLrg} alt=''></img>
          </div>
          <Typography component="h1" sx={{ mt: 3 }} className="font-title">
            Verification
          </Typography>
          <Typography component="h1" sx={{ mt: 2 }} className="font-med">
            Please enter the OTP received on your
          </Typography>
          <Typography component="h1" variant="body2" className="font-med">
            Email / Mobile.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }} className="verification-tb">
            <OtpInput
              value={otp}
              // onChange={this.handleChange}
              numInputs={4}
              className="otpinput"
              inputStyle="inputStyle"
              separator={<span></span>}
            />
          </Box>
          <Box textAlign='center' sx={{ mt: 2 }}>
            <Typography>Didn't receive a code?<Button className="outlined"
              type="submit"

              onClick={() => { setOtpon(true); setVerifyon(false); }}
            >
              Resend
            </Button></Typography>

          </Box>
          <Copyright className='copyright' />

        </Box>
      </Grid>
    );
  }

  const creatingPassword = () => {                       //3rd Template Generating password after OTP validation
    return (
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div sx={{
            my: 8,

          }}>
            <img src={LogoLrg} alt=''></img>
          </div>
          <Typography component="h1" className="font-title" sx={{ my: 2 }}>
            Create New Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '70%' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">

              <InputLabel htmlFor="outlined-adornment-password" required>Enter New Password</InputLabel>
              <OutlinedInput
                required
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className='eye-btn'
                    >
                      {values.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Enter New Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">

              <InputLabel htmlFor="outlined-adornment-password" required>Re-enter Password</InputLabel>
              <OutlinedInput
                required
                id="password"
                type={values.showPassword1 ? 'text' : 'password'}
                value={values.reenterpassword}
                onChange={handleChange('reenterpassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className='eye-btn'
                    >
                      {values.showPassword1 ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Re-enter Password"
              />
            </FormControl>

            {/* // NOSONAR Start  <FormHelperText>{helperText}</FormHelperText>;  // NOSONAR End */}
            <Box textAlign='center'>
              {createpwdalert ? (<Typography sx={{ color: "#fc4d53" }} >New Password and Re-enter Password is required</Typography>) : ""}

              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              //  component={Link} to="/"

              >
                Submit
              </Button>
            </Box>
            <Copyright className='copyright' />
          </Box>
        </Box>
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(' + bgLogin + ')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* ----------- from 313 line to 315 templates will be rendered dynamically ------- */}
        {otpon && RequestOtp()}
        {verifyon && Verification()}
        {passon && creatingPassword()}
        <Snackbar open={openalert} autoHideDuration={2000} className='alert-err2'>
          <Alert severity="error" sx={{ width: '100%' }}>
            Your password must be more than 8 characters
            long. Should contain a minimum of 1 Uppercase,
            1 Lowercase & 1 Numeric character.
          </Alert>
        </Snackbar>
        <Snackbar open={openalert1} autoHideDuration={2000} className='alert-err1'>
          <Alert severity="error" sx={{ width: '100%' }}>
            Both the passwords do not match
          </Alert>
        </Snackbar>
        <Snackbar open={openalert2} autoHideDuration={2000} className='alert-err1' >
          <Alert severity="success" sx={{ width: '100%' }}>
            Password has been changed successfully
          </Alert>
        </Snackbar>


        <Snackbar open={openalert3} autoHideDuration={2000} className='alert-err'>
          <Alert severity="error" sx={{ width: '100%' }}>
            Invalid Email or Mobile
          </Alert>
        </Snackbar>
        <Snackbar open={openalert4} autoHideDuration={2000} className='alert-err'>
          <Alert severity="success" sx={{ width: '100%' }}>
            OTP sent successfully
          </Alert>
        </Snackbar>

        <Snackbar open={openalert5} autoHideDuration={2000} className='alert-err' >
          <Alert severity="error" sx={{ width: '100%' }}>
            OTP is invalid or expired
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  )
}

export default Forgotpassword;

