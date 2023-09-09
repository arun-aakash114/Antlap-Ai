import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Layout from '../../components/layout';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import profilePhoto from '../../assets/user-profile.png';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Oval } from 'react-loader-spinner'
import * as Icon from 'react-bootstrap-icons';
import { backEndDomain } from '../../service/apiserver';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Myprofile() {
  const [openassign, setOpenassign] = React.useState(false);
  const [mobile, setmobile] = React.useState(false);
  const [mobNo, setMobNO] = React.useState('');

  const assignClose = () => setOpenassign(false);

  const [profile, setprofile] = React.useState({});
  const [loader, setloader] = React.useState(false);
  const [AlternateNumber, getAlternateNumber] = React.useState('');
    const [msg, setmessage] = React.useState('');

    const [values, setValues] = React.useState({
      currentpassword: '',
      newpassword: '',
      renewpassword: '',
    });
    const handleSubmit = (event) => {                     // to get email data to pass on api
      event.preventDefault();
      if (values.currentpassword && values.newpassword && values.renewpassword) {
        setalert(false)
        // NOSONAR Start
        let ChangepwdData = {
          "oldpassword": values.currentpassword,
          "newpassword": values.newpassword,
          "confirmpassword": values.renewpassword,
        }
        // NOSONAR End
      } else {
        setalert(true)
      }

    };
    const handleChange = (prop) => (event) => {                //to get password values to pass on api
      setValues({ ...values, [prop]: event.target.value });
      
    };
    const handleClickShowPassword = () => {               //eye toggle to show password1
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
    const handleClickShowPassword2 = () => {               //eye toggle to show password2
      setValues({
        ...values,
        showPassword2: !values.showPassword2,
      });
    };
    const handleClickShowPassword3 = () => {               //eye toggle to show password2
      setValues({
        ...values,
        showPassword3: !values.showPassword3,
      });
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };



  const jwt = localStorage.getItem('UserToken')

  useEffect(() => {
    setloader(true)

    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/profile`,
        // NOSONAR Start
        //data: UserId,
        // NOSONAR End
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setprofile(response.data.data)
          setMobNO(response.data.data.PrimayNumber)
          // NOSONAR Start
          // localStorage.setItem('Profilepic',response.data.data.ImgPath);
          // NOSONAR End
          getAlternateNumber(response.data.data.AlternateNumber)
          setloader(false)

        })
    } catch (err) {

    }

  }, [])

  const openAssignModal = () => {
    setOpenassign(true);
  }
  const [getimg, setimg] = React.useState({});



  const onImageChange = (e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', e.target.files[0]);
    setimg(bodyFormData)
  };

  const imageupload = () => {
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/user/upload`,
        data: getimg,
        headers: {
          'Accept': 'application/json',
          'token': jwt,
          'Content-Type': 'multipart/form-data',
          // NOSONAR Start
          //'file':'@men.png;type=image/png'
          // NOSONAR End
        }
      })
        .then(function (response) {
          // NOSONAR Start
          // setimagemsg(response.data.message)
          // setimg(response.data.data)
          // NOSONAR End
          setOpenalertimg(true)
          setprofile(response.data.data)
          localStorage.setItem('Profilepic', response.data.data.ImgPath);

        })
    } catch (err) {

    }
  }

  const [edit, seteditOpen] = React.useState(false);
  const [openalert, setOpenalert] = React.useState(false);
  const [openalertimg, setOpenalertimg] = React.useState(false);
  const [openalertupdate, setopenalertupdate] = React.useState(false);


  const [alert, setalert] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpenalert(false)
    setOpenalertimg(false)
    setopenalertupdate(false)
    setaltno(false)
  };
  const [altno, setaltno] = React.useState(false);
  const handlechangenumber = (event) => {

    if (event.target.value.length === 10) {
      let altnum = event.target.value
      getAlternateNumber(altnum)

    }
    else {
      getAlternateNumber('')
    }
  }

  const handlemobilenumber = (event) => {
    if (event.target.value.length === 10) {
      setMobNO(event.target.value)
    } else {
      setMobNO('')
    }
  }


  const handleSubmitupdate = () => {
    if (AlternateNumber.length !== 0) {
      let updatedata = {
        "PrimayNumber": mobNo,
        "alternumber": AlternateNumber,
        "TenantId": localStorage.getItem('TenantId')
      }
      try {
        axios({
          method: 'put',
          url: `${backEndDomain}/webapi/updateprofile`,
          data: updatedata,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            if (response.data.message === "Data Updated SuccessFully") {
              setprofile(response.data.updateUserdata);
              setMobNO(response.data.updateUserdata.PrimayNumber)
              setopenalertupdate(true)
              seteditOpen(false);
              setmobile(false)
            }
          })
      } catch (err) {

      }
    } else {
      setaltno(true)
      seteditOpen(false)
    }

  };


  return (
    <Layout>
      {setmessage}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div className={loader ? 'parentDisable' : ''} width="100%">

          {loader && <Oval
            height={80}
            width={80}
            color="#426e81"
            wrapperStyle={{
              position: 'absolute',
              top: '45%',
              left: '50%',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#2c79ff"
            strokeWidth={4}
            strokeWidthSecondary={4}

          />}
          <Box sx={{ maxWidth: 500 }} className="profile-holder">
            <Card >
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div"> */}
                <h2 className="page-heding">My Profile</h2>
                {/* </Typography> */}
                <Box className='profile-av-holder'>
                  {/* <Avatar alt="Remy Sharp" src={profilePhoto} className="profile-avatar" />  */}

                  <label htmlFor="upload-button">
                    <div className='prof-img-wrapper'>
                      <img src={profile?.ImgPath} alt={profilePhoto} className='profile-img' />
                    </div>
                  </label>

                  {/* <IconButton sx={{marginLeft:15}}> */}
                  <Avatar sx={{ marginLeft: 15 }} className="avtar-custom-rect-smll">
                    <FileUploadIcon onClick={imageupload} />
                  </Avatar>
                  {/* </IconButton> */}

                  <input type="file" id="upload-button" style={{ display: 'none' }} onChange={onImageChange} />

                  <Typography gutterBottom variant="h4" component="div" className="profile-title">{profile.UserName}</Typography>
                  {/* <Typography gutterBottom variant="subtitle2" component="div">Jr Service Engineer</Typography> */}
                </Box>
                {/* <Divider sx={{ my: 1 }} /> */}


                {/*---------------------- Email---------------------- */}
                <Box className='df'>
                  <Box className='df'>
                    <Avatar className="avtar-custom-rect"><Icon.SendFill /></Avatar>
                    <Box>
                      <Typography component="div" className='text-med'>Email</Typography>
                      <Typography variant="h5" component="div">{profile.Email}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/*---------------------- Mobile---------------------- */}
                <Box className='df'>
                  <Box className='df'>
                    <Avatar className="avtar-custom-rect"><Icon.PhoneFill /></Avatar>
                    <Box>
                      {!mobile && <><Typography component="div" className='text-med'>Mobile</Typography><Typography variant="h5" component="div">{profile.PrimayNumber}</Typography></>}
                      {/* <Typography component="div" className='text-med'>Mobile</Typography> */}
                      {mobile && <TextField
                        id="mobile Number"
                        label="Enter mobile Number"
                        defaultValue={mobNo}
                        onChange={(event) => handlemobilenumber(event)}
                        autoCorrect='off'
                        autoComplete='off'
                        inputProps={{ maxLength: 10 }}
                      />}
                    </Box>
                  </Box>
                  {!mobile && <Avatar sx={{ mb: 2 }} className="avtar-custom-rect-sml" onClick={() => { setmobile(true); }}><EditIcon /></Avatar>}
                  {mobile && <Avatar sx={{ mb: 2 }} className="avtar-custom-rect-sml" onClick={() => { setmobile(false); }}><ClearIcon /></Avatar>}
                </Box>

                {/*---------------------- Alternate Mobile---------------------- */}
                <Box className='df'>
                  <Box className='df'>
                    <Avatar className="avtar-custom-rect"><PhoneIcon /></Avatar>
                    <Box>
                      {!edit && <><Typography component="div" className='text-med'>Alternate Mobile</Typography><Typography variant="h5" component="div">{profile.AlternateNumber}</Typography></>}
                      {edit && <TextField
                        id="alternatenumber"
                        label="Enter Alternate Number"
                        defaultValue={AlternateNumber}
                        onChange={(event) => handlechangenumber(event)}
                        autoCorrect='off'
                        autoComplete='off'
                        inputProps={{ maxLength: 10 }}
                      />}
                    </Box>
                  </Box>
                  {!edit && <Avatar sx={{ mb: 2 }} className="avtar-custom-rect-sml" onClick={() => { seteditOpen(true); }}><EditIcon /></Avatar>}
                  {edit && <Avatar sx={{ mb: 2 }} className="avtar-custom-rect-sml" onClick={() => { seteditOpen(false); }}><ClearIcon /></Avatar>}

                </Box>


              </CardContent>
            </Card>
            {/*---------------------- Action Buttons---------------------- */}
            <Box className='box-btn' sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button className='outline-btn1' variant="contained" startIcon={<LockResetOutlinedIcon className='lock-btn' />} sx={{ mr: 2 }} onClick={openAssignModal}>Change Password</Button>
              <Button variant="contained" className='update-btn' onClick={handleSubmitupdate}>Update</Button>
            </Box>
          </Box>


          <>
      {/*---------------------- Change Password---------------------- */}

      <Modal
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Change Password
            <IconButton onClick={() => { setOpenassign(false); }} sx={{ marginLeft: 16 }}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} >
            <FormControl sx={{ width: '100%' }} variant="outlined">

              <InputLabel required>Enter Current Password</InputLabel>
              <OutlinedInput
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.currentpassword}
                onChange={handleChange('currentpassword')}
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
                label="Enter Current Password"
              />
            </FormControl>
            <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">

              <InputLabel required>Enter New Password</InputLabel>
              <OutlinedInput
                required
                type={values.showPassword2 ? 'text' : 'password'}
                value={values.newpassword}
                onChange={handleChange('newpassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className='eye-btn'
                    >
                      {values.showPassword2 ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Enter New Password"
              />
            </FormControl>
            <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">

              <InputLabel required>Re-enter New Password</InputLabel>
              <OutlinedInput
                required
                type={values.showPassword3 ? 'text' : 'password'}
                value={values.renewpassword}
                onChange={handleChange('renewpassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword3}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className='eye-btn'
                    >
                      {values.showPassword3 ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Re-enter New Password"
              />
            </FormControl>
            <Typography className="pwdcheck">{msg}</Typography>

            {/* {pwdcheck == true && (<Typography className="pwdcheck">Both the passwords do not match!</Typography>  )  }  
  {incrtpwd == true && (<Typography className="pwdcheck"> Incorrect password!</Typography>)}
  {strgpwd == true && (<Typography className="pwdcheck"> Your password must be more than 8 characters long. Should contain a minimum of 1 Uppercase, 1 Lowercase & 1 Numeric character</Typography>)} */}

            <Box className="btn_align_right">
              {alert ? (<Typography sx={{ color: "#fc4d53" }} className='alert-txt'>Enter required field</Typography>) : ""}

              <Button
                type="submit"
                size="large"
                variant="contained"
                // onClick={() => {setOpenassign(true);}}
                className='cpwd-btn'
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
          <Snackbar className='pwdalert' open={openalert} autoHideDuration={2000} onClose={handleClose} >
            <Alert severity="success" sx={{ width: '50%' }}>
              Password has been changed successfully
            </Alert>
          </Snackbar>
          <Snackbar className='pwdalert' open={openalertimg} autoHideDuration={2000} onClose={handleClose} >
            <Alert severity="success" sx={{ width: '50%' }}>
              Profile has been changed successfully
            </Alert>
          </Snackbar>
          <Snackbar className='pwdalert' open={openalertupdate} autoHideDuration={2000} onClose={handleClose} >
            <Alert severity="success" sx={{ width: '50%' }}>
              Profile update successfully
            </Alert>
          </Snackbar>
          <Snackbar className='pwdalert' open={altno} autoHideDuration={2000} onClose={handleClose} >
            <Alert severity="error" sx={{ width: '50%' }}>
              Enter Alternate Number Correctly
            </Alert>
          </Snackbar>
        </div>
      </Container>

    </Layout>
  )
}

export default Myprofile;
