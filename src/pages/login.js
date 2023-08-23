import React, {  useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bgLogin from "./../assets/login_bg.jpg";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LogoLrg from "./../assets/logo-lrg.png";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import man from "../assets/man.png";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { backEndDomain } from "../service/apiserver";

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
    <div className="center-align">
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {" © "}
        2023 Ant Labs.
      </Typography>
    </div>
  );
}

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SignInSide() {
  const [open, setOpen] = React.useState(false);
  const [openinvalid, setInvalid] = React.useState(false);
  const [openinvalid1, setInvalid1] = React.useState(false);

  const [open1, setOpen1] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  const [errormsg, seterrormsg] = React.useState(false);

  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    // showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setInvalid(false);
    setInvalid1(false);
    setOpen1(false);
  };
  useEffect(() => {
    if (localStorage.getItem("logout")) {
      setOpen(true);
      setTimeout(() => {
        localStorage.removeItem("logout");
      }, 2000);
    } else {
      setOpen(false);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.email && values.password) {
      setalert(false);
      let LoginData = {
        username: values.email,
        password: values.password,
      };

      try {
        axios({
          method: "post",
          url: `${backEndDomain}/webapi/webauthentication/login`,
          data: LoginData,
          headers: {
            "Content-type": "application/json",
          },
        })
          .then(function (response) {
            {
              response.data.message === "You Are LoggedIn Successfully" &&
              localStorage.setItem("userid", response.data.data.user[0].UserId);
              localStorage.setItem("Username", response.data.data.user[0].UserName);
              localStorage.setItem("email", response.data.data.user[0].Email);
              localStorage.setItem("UserToken", response.data.data.user[0].token);
              localStorage.setItem("TenantId", response.data.data.user[0].Tenants_M_TenantId);
              localStorage.setItem("type", response.data.data.user[1].UserTypeId);
              localStorage.setItem("userDesc", response.data.data.user[1].UserTypeDescription);

              {
                response.data.data.user[1].UserTypeDescription === "PSM" &&
                navigate("/knowledgebase");
              }
              {
                (response.data.data.user[1].UserTypeDescription === "Expert" ||
                  response.data.data.user[1].UserTypeDescription === "Expert Admin") &&
                navigate("/solutionDashboard");
              }
              { (response.data.data.user[1].UserTypeDescription === "PSM" || response.data.data.user[1].UserTypeDescription === "Expert" ||
              response.data.data.user[1].UserTypeDescription === "Expert Admin") &&
                setInvalid1(true);
              }
            }
          })
          .catch(function (response) {
            if (response.response.status === 422) {
              seterrormsg(response.response.data.message);
              setInvalid(true);
            }
          });
      } catch (err) {
        setInvalid(true);
      }
    } else {
      setalert(true);
    }
    // NOSONAR Start

    // if(localStorage.getItem('UserToken')){
    //   try {
    //     axios({
    //       method: 'get',
    //       url: `http://15.207.50.230:3001SignInSide/webapi/profile`,
    //       //data: UserId,
    //       headers: {
    //         'Content-type': 'application/json',
    //         'token' : localStorage.getItem('UserToken'),
    //      }
    //     })
    //     .then(function (response) {
    //           // setprofileimg(response.data.data.ImgPath)
    //            localStorage.setItem('Profilepic',response.data.data.ImgPath);

    //       }) .catch(function (response) {
    //         if(response.response.status == 422){
    //         }
    //       });
    //   }catch (err) {

    //   }
    // }
    // NOSONAR End
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* -------------------- Column Left -------------------- */}
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: "url(" + bgLogin + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* -------------------- Column Right -------------------- */}
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box>
            {/* ------------ Login Top ------------ */}
            <Box
              sx={{
                mb: 3,
              }}
            >
              <img src={LogoLrg} alt=""></img>
            </Box>
            <Typography component="h2" className="font-title" sx={{ mb: 4 }}>
              ANT LABS
            </Typography>

            {/* ------------ Login Form ------------ */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email / Mobile"
                  name="email"
                  autoComplete="email"
                  autoFocus />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                   label="Password"
                  // placeholder='Password'
                  type="password"
                  id="password"
                  autoComplete="current-password" 
                  /> */}
              <FormControl
                sx={{ mb: 2, width: "100%", borderRadius: "10px" }}
                className="custom-input"
                variant="outlined"
              >
                {/* <InputLabel htmlFor="outlined-adornment-password" required>Enter Email / Mobile</InputLabel> */}
                <OutlinedInput
                  required
                  id="email"
                  type={values.email}
                  value={values.email}
                  onChange={handleChange("email")}
                  // label="Enter Email / Mobile"
                  placeholder="Enter Email / Mobile"
                  autoCorrect="off"
                  autoComplete="off"
                />
              </FormControl>
              <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                {/* <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel> */}
                <OutlinedInput
                  id="password"
                  required
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className="eye-btn"
                      >
                        {values.showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  // label="Password"
                  placeholder="Password"
                />
              </FormControl>

              <Grid container sx={{ MarginTop: "2" }}>
                <Grid item xs>
                  <Link
                    to="/forgotpassword"
                    variant="body2"
                    className="forgotpw"
                  >
                    Forgot Password?
                  </Link>
                </Grid>
              </Grid>
              <Box textAlign="center">
                {alert ? (
                  <Typography sx={{ color: "#fc4d53" }} className="alert-txt">
                    Email / Mobile and Password is required
                  </Typography>
                ) : (
                  ""
                )}

                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                {/* <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  message="Login successfull"
                />
                <Snackbar
                  open={openinvalid}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  message="Invalid Credentials"
                /> */}
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert severity="success" sx={{ width: "100%" }}>
                    Logout successfully
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openinvalid}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {errormsg}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openinvalid1}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    User not allowed
                  </Alert>
                </Snackbar>
              </Box>
              {/* ------------ Copyright ------------ */}
              <Copyright className="copyright" />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* ____________________ modal____________ */}

      <Modal
        className="assign"
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="pp-content">
            <img className="pp-img" src={man} alt=""></img>
          </Box>
          <Typography>
            You don't have access to the system, Please contact customer support
            team on 1800 435 2800
          </Typography>
          <Button
            className="assignbtn"
            variant="contained"
            onClick={handleClose}
          >
            Ok
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
export default SignInSide;
