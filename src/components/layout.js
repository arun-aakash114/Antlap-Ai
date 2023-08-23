import React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItemIcon from '@mui/material/ListItemIcon';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from './footer';
import Logo from './../assets/logo.png';
import Logo_icon from './../assets/logo_icon.png';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import userHeader from './../assets/user-header.jpg';
import { backEndDomain } from '../service/apiserver'
import GridOnTwoToneIcon from '@mui/icons-material/GridOnTwoTone';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ListItem from "@mui/material/ListItem";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import axios from "axios";


const MyNavLink = (props) => {
  return <NavLink {...props} activeClassName="active" />;
}


function Layout({ children }) {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openlog, setlogOpen] = React.useState(false);
  const usermail = localStorage.getItem('email')
  const profilepic = localStorage.getItem('Profilepic')

  const handleClose = () => setlogOpen(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
  // sidebar

  const [state, setState] = React.useState({


  });
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.4rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const toggleDrawer1 = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"

    >

      <List className='masters-menu'>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography> <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers-fill" viewBox="0 0 16 16">
              <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z" />
              <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z" />
            </svg>  Asset Management</Typography>
          </AccordionSummary>
          <AccordionDetails>

          <ListItemButton component={MyNavLink} to="/manageequips">
              <ListItemText primary="Manage Equipments" />
            </ListItemButton>
            <ListItemButton component={MyNavLink} to="/manageEqcustomer">
              <ListItemText primary="Mng.Equipment's & Customers" />
            </ListItemButton>


          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography> <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-central-south-asia" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM4.882 1.731a.482.482 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.721.721 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a.996.996 0 0 0-.462-.04 7.03 7.03 0 0 1 2.45-2.027Zm-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.78.78 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.454.454 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282a.61.61 0 0 0 .04-.001 7.003 7.003 0 0 1-12.658.905Z" />
            </svg> Region Management</Typography>
          </AccordionSummary>
          <AccordionDetails>

              <ListItemButton>
                <ListItemText primary="Manage Country" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage States" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Districts" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Cities" />
              </ListItemButton>


          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography> <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
            </svg> Master Code Management</Typography>
          </AccordionSummary>
          <AccordionDetails>

              <ListItemButton>
                <ListItemText primary="Manage Problem Codes" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage SMCS Parent Codes" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Reason Codes" />
              </ListItemButton>


          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>  <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench-adjustable" viewBox="0 0 16 16">
              <path d="M16 4.5a4.492 4.492 0 0 1-1.703 3.526L13 5l2.959-1.11c.027.2.041.403.041.61Z" />
              <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.49 4.49 0 0 0 11.5 9Zm-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376ZM3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg> Service Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
     
            <ListItemButton>
                <ListItemText primary="Manage Service Type" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Request Type" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Rating Type" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Resolution Status" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Allocation Type" />
              </ListItemButton>
             
        
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>   <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg> User Management</Typography>
          </AccordionSummary>
          <AccordionDetails>

          <ListItemButton component={MyNavLink} to="/managecustomers">
                <ListItemText primary="Manage Customers" />
              </ListItemButton>
              <ListItemButton component={MyNavLink} to="/manageusers">
                <ListItemText primary="Manage Users" />
              </ListItemButton>
              <ListItemButton component={MyNavLink} to="/usertypemapping">
                <ListItemText primary="User Type Mapping" />
              </ListItemButton>            
       
          </AccordionDetails>
        </Accordion>

        
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>  <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill" viewBox="0 0 16 16">
              <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
              <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
              <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
              <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
            </svg> Configuration Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <ListItemButton>
                <ListItemText primary="Manage Menus" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Priviledges" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Manage Allocation Types" />
              </ListItemButton>
              
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>  <svg className='mm-ic' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv-fill" viewBox="0 0 16 16">
              <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" />
            </svg> Tenancy Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <ListItemButton>
                <ListItemText primary="Manage Tenants"/>
              </ListItemButton>
          </AccordionDetails>
        </Accordion>
   
        

      </List>


    </Box>
  );






  const mainListItems = (
    <div className='sidebar'>
      <List
        sx={{
          [`& .active`]: {
            color: "#000",
            fontWeight: "bold",
            "& svg": {
              fill: "#4b61ff"
            }

          }
        }}
      >
        <ListItem component={MyNavLink} to="/dashboard" button className='sb_icon' >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={MyNavLink} to="/history" button className='sb_icon' >
          <ListItemIcon>
            <StickyNote2Icon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem component={MyNavLink} to="/managemeet" button className='sb_icon'>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Meeting" />
        </ListItem>
    
        <ListItem component={MyNavLink} to="/myprofile" button className='sb_icon'>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>


 


        <ListItem button className='sb_icon' onClick={toggleDrawer1("left", true)}>
          <ListItemIcon>

            <React.Fragment key={"left"}>
              <GridOnTwoToneIcon ></GridOnTwoToneIcon >
              <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer1("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>

          </ListItemIcon >

          <ListItemText primary="Masters"   onClick={toggleDrawer1("left", true)   }   />
        </ListItem>
       





        <ListItem className='sb_icon' button onClick={() => { setlogOpen(true); }} >
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );


  // side bar 

  //sidebar
  const drawerWidth = 240;
  const mdTheme = createTheme({
    overrides: {
      MuiButton: {
        label: {
          color: "red",
          fontFamily: 'Poppins',
        },
      },
    }
  });
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer1 = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const logout = () => {
    const jwt = localStorage.getItem('UserToken')
  
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webauthentication/logout`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          if (response.data.message === "You Are LoggedOut Successfully") {
            navigate('/')
            localStorage.setItem('logout', "logout");
            localStorage.removeItem("Profilepic");

          }
        }).catch(function (response) {

        });
    } catch (err) {
    }
  }

  return (
    <>
    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', background: 'white'
              }}
            >
              <IconButton onClick={toggleDrawer} sx={{
                marginRight: '36px',
                ...(!open && { display: 'none' }),
              }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"

                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, color: 'black' }}
              >

              </Typography>
              <Box sx={{
                display: 'flex',
              }}>
                <Stack className='user-profile-wrapper'>
                  <Box>
                    <Typography color="primary">Welcome</Typography>
                    <Typography color="primary" variant="caption" display="block" gutterBottom>{usermail}</Typography>
                  </Box>
                  <Box className='user-profile-sml' onClick={() => { navigate('/myprofile'); }}>
                    <img className="profilepic" src={profilepic} alt={userHeader}></img>
                  </Box>
                </Stack>

              </Box>
            </Toolbar>
          </AppBar>
          <Drawer1 variant="permanent" open={open} PaperProps={{
            sx: {
              backgroundColor: "#4B61FF",
              color: "red",
            }
          }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: [1],
                background: "white"
              }}
            >

              <img src={Logo_icon} alt='' className="logo_icon"></img>
              <img src={Logo} alt='' className="logo_title"></img>

            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer1("left", false)}
              >
                {list("left")}
              </Drawer>
          </Drawer1>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {children}
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
      
      <Modal
        open={openlog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to logout?
            </Typography>
            <Box className='fo-right'>
              <Box className='btn-flx'>
                <Button className='btn-primary mr' variant="contained" startIcon={<LogoutIcon />} onClick={logout}>Okay</Button>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => { setlogOpen(false); }}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
    </>
  )

}
export default Layout;
