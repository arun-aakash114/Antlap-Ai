import React, { useState }  from 'react';
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material'
import Grid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { backEndDomain } from '../../../../service/apiserver';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';



const Form = ( props) => {

  let navigate = useNavigate()

   

  const jwt = localStorage.getItem('UserToken')

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    firstName: '',
    alterphone: '',
    lastName: '',
    emailError: '',
    passwordError: '',
    phoneNumberError: '',
    usernameError: '',
    alterphoneError: '',
    firstNameError: '',
    lastNameError: '',
    status: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleClear = (e) => {
    
    setFormState({ });
  };


  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email)) {
      setFormState({ ...formState, emailError: 'Invalid email address' });
    } else {
      setFormState({ ...formState, emailError: '' });
    }
  };

  const validateusername = () => {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!usernamePattern.test(formState.username)) {
      setFormState({ ...formState, usernameError: '"Username must be 4-16 characters long and contain only letters, numbers, underscores, or hyphens"' });
    } else {
      setFormState({ ...formState, usernameError: '' });
    }
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(formState.password)) {
      setFormState({
        ...formState,
        passwordError:
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
      });
    } else {
      setFormState({ ...formState, passwordError: '' });
    }
  };


  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^[6-9]\d{9}$/;
    if (!phoneNumberPattern.test(formState.phoneNumber)) {
      setFormState({
        ...formState,
        phoneNumberError:
          'Invalid phone number. Please enter a 10-digit phone number',
      });
    } else {
      setFormState({ ...formState, phoneNumberError: '' });
    }
  };

  const validateAltPhoneNumber = () => {
    const altPhoneNumberPattern = /^[6-9]\d{9}$/;
    if (!altPhoneNumberPattern.test(formState.alterphone)) {
      setFormState({
        ...formState,
        alterphoneError:
          'Invalid phone number. Please enter a 10-digit phone number',
      });
    } else {
      setFormState({ ...formState, alterphoneError: '' });
    }
  };




  const validateFirstName = () => {
    const firstNamePattern = /^[a-zA-Z]+[a-zA-Z]+$/;
    if (!firstNamePattern.test(formState.firstName)) {
      setFormState({
        ...formState,
        firstNameError: 'Please enter a valid first name ',
      });
    } else {
      setFormState({ ...formState, firstNameError: '' });
    }
  };


  const validateLastName = () => {
    const lastNamePattern = /^[a-zA-Z]+[a-zA-Z]+$/; // only matches 8 alphabetical characters
    if (!lastNamePattern.test(formState.lastName)) {
      setFormState({
        ...formState,
        lastNameError: 'Please enter a valid last name',
      });
    } else {
      setFormState({ ...formState, lastNameError: '' });
    }
  };

// sonarqube-ignore-start
// ____________________________ Show/Hide Password ____________________________ 
// const [showPassword, setShowPassword] = React.useState(false);
// const handleClickShowPassword = () => setShowPassword((show) => !show);
// sonarqube-ignore-end

  const handleClickShowPassword = () => {
    setFormState({
      ...formState,
      showPassword: !formState.showPassword,
    });

  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

// ____________________________ Form Unsuccess ____________________________ 

const [formFailure, setFormFailure] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if(props.editData) {
      

      let applydata = {
        "UserId": props.editData.UserId,
        "phone": (formState.phoneNumber),
        "username": (formState.username),
        "email": (formState.email),
        "password": (formState.password),
        "firstname": (formState.firstName),
        "lastname": (formState.lastName),
        "alterphone": (formState.alterphone),
        "activestatus": (formState.status),
        "TenantId":localStorage.getItem('TenantId')

      }


      try {

        axios({
          method: 'put',
          url: `${backEndDomain}/masterapi/master/updateuser`,
          data: applydata,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          },

        })
          .then(function (response) {
            navigate ('/manageusers')   
// sonarqube-ignore-start
            //  setcity1(response.data.cityData)
          // sonarqube-ignore-end
          }).catch(function (response) {
// sonarqube-ignore-start
            //   if(response.response.status == 422){
            //   }   
// sonarqube-ignore-end
          });
      } catch (error) {
      }
    } else {
      
      validateEmail();
    validatePassword();
    validatePhoneNumber();
    validateusername();
    validateAltPhoneNumber();
    validateFirstName();

      if (formState.email !== '' &&
      formState.password !== '' &&
      formState.phoneNumber !== '' &&
      formState.username !== '' &&
      formState.alterphone !== '' &&
      formState.firstName !== '' &&
      formState.lastName !== '' &&
      formState.status !== ''
    ) {
      // prepare the data to send in the request body


      let applydata = {
        "phone": formState.phoneNumber,
        "username": formState.username,
        "email": formState.email,
        "password": formState.password,
        "firstname": formState.firstName,
        "lastname": formState.lastName,
        "alterphone": formState.alterphone,
        "activestatus": formState.status,
        "TenantId":localStorage.getItem('TenantId')

      }
      try {

        axios({
          method: 'post',
          url: `${backEndDomain}/masterapi/master/Adduser`,
          data: applydata,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          },

        })
          .then(function (response) {
            navigate ('/manageusers')   
// NOSONAR Start
            //  setcity1(response.data.cityData)basic
          // NOSONAR End
          }).catch(function (response) {
            setFormFailure(response.response.data.message)
            // NOSONAR Start
            //   if(response.response.status == 422){
            //   }   
// NOSONAR End
          });

      } catch (error) {
      }
    }
    }
  };


  const handlePhoneKeyPress = (event) => {
    if (formState.phoneNumber.length === 10) {
      event.preventDefault();
    }
  };
  const handleAltPhoneKeyPress = (event) => {
    if (formState.alterphone.length === 10) {
      event.preventDefault();
    }
  };



  return (
    <>
      <Card className='user'>
        <CardContent >

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <InputLabel shrink htmlFor="bootstrap-input" className='input'  >
              First Name 
            </InputLabel>
              <TextField
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                onBlur={validateFirstName}
                placeholder="Type Here" required />
              {formState.firstNameError && (
                <Typography color="error">
                  {formState.firstNameError}
                </Typography>
              )}
            </Grid>

            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input'>
              Last Name
            </InputLabel>
              <TextField
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                onBlur={validateLastName}
                placeholder="Type Here" required />
              {formState.lastNameError && (
                <Typography color="error">
                  {formState.lastNameError}
                </Typography>
              )}
            </Grid>



            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input'>
              Mobile Number
            </InputLabel>
              <TextField  placeholder="Type Here" type="number" name="phoneNumber" onKeyPress={handlePhoneKeyPress} value={formState.phoneNumber} onChange={handleChange} onBlur={validatePhoneNumber} required />
              {formState.phoneNumberError && (
                <Typography color="error">{formState.phoneNumberError}</Typography>
              )}
            </Grid>
            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input' >
              Alternate Mobile No
            </InputLabel>
              <TextField  placeholder="Type Here" type="number" onKeyPress={handleAltPhoneKeyPress} name="alterphone" value={formState.alterphone} onChange={handleChange} onBlur={validateAltPhoneNumber} required />
              {formState.alterphoneError && (
                <Typography color="error">{formState.alterphoneError}</Typography>
              )}
            </Grid>
            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input'>
              Email
            </InputLabel>
              <TextField  placeholder="Type Here" name="email" value={formState.email} onChange={handleChange} onBlur={validateEmail} required />
              {formState.emailError && (
                <Typography color="error">{formState.emailError}</Typography>
              )}
            </Grid>
            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input' >
              User Name
            </InputLabel>
              <TextField name="username"  placeholder="Type Here" value={formState.username} onChange={handleChange} onBlur={validateusername} required />
              {formState.usernameError && (
                <Typography color="error">{formState.usernameError}</Typography>
              )}
            </Grid>
            <Grid item xs={6} md={6}>
    
              <InputLabel shrink htmlFor="bootstrap-input" className='input' >
              Password
            </InputLabel>
              <OutlinedInput 
              type={!formState.showPassword ? 'text' : 'password'} 
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton
              //       aria-label="toggle password visibility"
              //       onClick={handleClickShowPassword}
              //       onMouseDown={handleMouseDownPassword}
              //       edge="end"
              //     >
              //       {formState.showPassword ? <VisibilityOff /> : <Visibility />}
              //     </IconButton>
              //   </InputAdornment>
              // }
              name="password"  
              placeholder="Type Here" 
              sx={{ width: '100%'}}
              value={formState.password} 
              onChange={handleChange} 
              onBlur={validatePassword} 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className='eye-btn'>
                    {formState.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    
                  </IconButton>
                </InputAdornment>
              }
              required />
              {formState.passwordError && (
                <Typography color="error">{formState.passwordError}</Typography>
              )}
      
            </Grid>
            <Grid item xs={6} md={6}><InputLabel shrink htmlFor="bootstrap-input" className='input' >
              Status
            </InputLabel>
              <Select
                name="status"
                defaultValue={props.editData}
                  value={formState.status}
                  onChange={handleChange}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='in active'>Inactive</MenuItem>
              </Select>

            </Grid>
          </Grid>
          {formFailure && <div className='errMsg'>
                {formFailure}
          </div>}
          
          <div className='rig'>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={handleClear}>Clear</Button>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>

            </Stack>
          </div>

        </CardContent>

      </Card>



    </>
  )
};

export default Form;
